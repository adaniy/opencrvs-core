import {
  ICON_ALIGNMENT,
  PrimaryButton,
  TertiaryButton,
  LinkButton
} from '@opencrvs/components/lib/buttons'
import { BackArrow, TickLarge } from '@opencrvs/components/lib/icons'
import { EventTopBar, Modal } from '@opencrvs/components/lib/interface'
import {
  BodyContent,
  Container,
  FullBodyContent
} from '@opencrvs/components/lib/layout'
import {
  deleteApplication,
  IApplication,
  IPayload,
  modifyApplication,
  SUBMISSION_STATUS,
  writeApplication
} from '@register/applications'

import { FormFieldGenerator } from '@register/components/form'
import { RejectRegistrationForm } from '@register/components/review/RejectRegistrationForm'
import {
  Action,
  Event,
  IForm,
  IFormField,
  IFormSection,
  IFormSectionData,
  IFormSectionGroup
} from '@register/forms'
import {
  goBack as goBackAction,
  goToHome,
  goToPageGroup as goToPageGroupAction
} from '@register/navigation'
import { toggleDraftSavedNotification } from '@register/notification/actions'
import { IOfflineDataState } from '@register/offline/reducer'
import { HOME } from '@register/navigation/routes'
import { getOfflineState } from '@register/offline/selectors'
import { getScope } from '@register/profile/profileSelectors'
import { IStoreState } from '@register/store'
import styled from '@register/styledComponents'
import { Scope } from '@register/utils/authUtils'
import { ReviewSection } from '@register/views/RegisterForm/review/ReviewSection'
import { isNull, isUndefined, merge } from 'lodash'
// @ts-ignore - Required for mocking
import debounce from 'lodash/debounce'
import * as React from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

const FormSectionTitle = styled.h3`
  ${({ theme }) => theme.fonts.h3Style};
  color: ${({ theme }) => theme.colors.copy};
`
const FooterArea = styled.div`
  margin: 24px 0px 48px;
`

const Notice = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.11);
  padding: 25px;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.bigBodyStyle};
  margin: 30px -25px;
`
const CancelButton = styled.a`
  text-decoration: underline;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
`
const StyledLinkButton = styled(LinkButton)`
  margin-left: 32px;
`

export const messages: {
  [key: string]: ReactIntl.FormattedMessage.MessageDescriptor
} = defineMessages({
  newBirthRegistration: {
    id: 'register.form.newBirthRegistration',
    defaultMessage: 'New birth application',
    description: 'The message that appears for new birth registrations'
  },
  newVitalEventRegistration: {
    id: 'register.form.newVitalEventRegistration',
    defaultMessage:
      'New {event, select, birth {birth} death {death} marriage {marriage} divorce {divorce} adoption {adoption}} application',
    description: 'The message that appears for new vital event registration'
  },
  previewEventRegistration: {
    id: 'register.form.previewEventRegistration',
    defaultMessage:
      '{event, select, birth {Birth} death {Death} marriage {Marriage} divorce {Divorce} adoption {Adoption}} Application Preview',
    description: 'The message that appears for new birth registrations'
  },
  reviewEventRegistration: {
    id: 'register.form.reviewEventRegistration',
    defaultMessage:
      '{event, select, birth {Birth} death {Death} marriage {Marriage} divorce {Divorce} adoption {Adoption}} Application Review',
    description: 'The message that appears for new birth registrations'
  },
  saveDraft: {
    id: 'register.form.saveDraft',
    defaultMessage: 'Save draft',
    description: 'Save draft button'
  },
  next: {
    id: 'register.form.next',
    defaultMessage: 'Next',
    description: 'Next button'
  },
  cancel: {
    id: 'register.form.modal.cancel',
    defaultMessage: 'Cancel',
    description: 'Cancel button on submit modal'
  },
  submitDescription: {
    id: 'register.form.modal.submitDescription',
    defaultMessage:
      'By clicking “Submit” you confirm that the informant has read and reviewed the information and understands that this information will be shared with Civil Registration authorities.',
    description: 'Submit description text on submit modal'
  },
  submitButton: {
    id: 'register.form.modal.submitButton',
    defaultMessage: 'Submit',
    description: 'Submit button on submit modal'
  },
  back: {
    id: 'menu.back',
    defaultMessage: 'Back',
    description: 'Back button in the menu'
  },
  valueSaveAsDraft: {
    id: 'register.form.saveDraft',
    defaultMessage: 'Save as draft',
    description: 'Save as draft Button Text'
  },
  optionalLabel: {
    id: 'formFields.optionalLabel',
    defaultMessage: 'Optional',
    description: 'Optional label'
  },
  submitConfirmation: {
    id: 'modal.title.submitConfirmation',
    defaultMessage: 'Are you ready to submit?',
    description: 'Title for submit confirmation modal'
  },
  queryError: {
    id: 'register.registerForm.queryError',
    defaultMessage:
      'The page cannot be loaded at this time due to low connectivity or a network error. Please click refresh to try again, or try again later.',
    description: 'The error message shown when a search query fails'
  },
  continueButton: {
    id: 'register.selectVitalEvent.continueButton',
    defaultMessage: 'Continue',
    description: 'Continue Button Text'
  },
  saveExitButton: {
    id: 'register.selectVitalEvent.saveExitButton',
    defaultMessage: 'SAVE & EXIT',
    description: 'SAVE & EXIT Button Text'
  },
  backToReviewButton: {
    id: 'register.selectVitalEvent.backToReviewButton',
    defaultMessage: 'Back to review'
  }
})

const Optional = styled.span.attrs<
  { disabled?: boolean } & React.LabelHTMLAttributes<HTMLLabelElement>
>({})`
  ${({ theme }) => theme.fonts.bigBodyStyle};
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.disabled : theme.colors.placeholder};
  flex-grow: 0;
`

const ConfirmBtn = styled(PrimaryButton)`
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  &:disabled {
    background: ${({ theme }) => theme.colors.primary};
    path {
      stroke: ${({ theme }) => theme.colors.disabled};
    }
  }
`

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.error};
  ${({ theme }) => theme.fonts.bodyStyle};
  text-align: center;
  margin-top: 100px;
`

function getNextSection(sections: IFormSection[], fromSection: IFormSection) {
  const currentIndex = sections.findIndex(
    (section: IFormSection) => section.id === fromSection.id
  )
  if (currentIndex === sections.length - 1) {
    return null
  }
  return sections[currentIndex + 1]
}

function getNextSectionIds(
  sections: IFormSection[],
  fromSection: IFormSection,
  fromSectionGroup: IFormSectionGroup
) {
  const currentGroupIndex = fromSection.groups.findIndex(
    (group: IFormSectionGroup) => group.id === fromSectionGroup.id
  )

  if (currentGroupIndex === fromSection.groups.length - 1) {
    const currentIndex = sections.findIndex(
      (section: IFormSection) => section.id === fromSection.id
    )
    if (currentIndex === sections.length - 1) {
      return null
    }
    return {
      sectionId: sections[currentIndex + 1].id,
      groupId: sections[currentIndex + 1].groups[0].id
    }
  }
  return {
    sectionId: fromSection.id,
    groupId: fromSection.groups[currentGroupIndex + 1].id
  }
}

export interface IFormProps {
  application: IApplication
  registerForm: IForm
  pageRoute: string
  duplicate?: boolean
}

type DispatchProps = {
  goToPageGroup: typeof goToPageGroupAction
  goBack: typeof goBackAction
  goToHome: typeof goToHome
  writeApplication: typeof writeApplication
  modifyApplication: typeof modifyApplication
  deleteApplication: typeof deleteApplication
  toggleDraftSavedNotification: typeof toggleDraftSavedNotification
  handleSubmit: (values: unknown) => void
}

type Props = {
  activeSection: IFormSection
  activeSectionGroup: IFormSectionGroup
  setAllFieldsDirty: boolean
  offlineResources: IOfflineDataState
}

export type FullProps = IFormProps &
  Props &
  DispatchProps &
  InjectedIntlProps & { scope: Scope } & RouteComponentProps<{
    pageId: string
    groupId?: string
    applicationId: string
  }>

type State = {
  showSubmitModal: boolean
  showRegisterModal: boolean
  isDataAltered: boolean
  rejectFormOpen: boolean
  hasError: boolean
}
const VIEW_TYPE = {
  FORM: 'form',
  REVIEW: 'review',
  PREVIEW: 'preview',
  HIDDEN: 'hidden'
}

class RegisterFormView extends React.Component<FullProps, State> {
  constructor(props: FullProps) {
    super(props)
    this.state = {
      showSubmitModal: false,
      isDataAltered: false,
      rejectFormOpen: false,
      showRegisterModal: false,
      hasError: false
    }
  }

  userHasRegisterScope() {
    return this.props.scope && this.props.scope.includes('register')
  }

  modifyApplication = (
    sectionData: IFormSectionData,
    activeSection: IFormSection,
    application: IApplication
  ) => {
    if (application.review && !this.state.isDataAltered) {
      this.setState({ isDataAltered: true })
    }
    this.props.modifyApplication({
      ...application,
      data: {
        ...application.data,
        [activeSection.id]: {
          ...application.data[activeSection.id],
          ...sectionData
        }
      }
    })
  }

  submitForm = () => {
    this.setState({ showSubmitModal: true })
  }

  confirmSubmission = (
    application: IApplication,
    submissionStatus: string,
    action: string,
    payload?: IPayload
  ) => {
    application.submissionStatus = submissionStatus
    application.action = action
    application.payload = payload
    this.props.modifyApplication(application)
    this.props.history.push(HOME)
  }

  registerApplication = () => {
    this.setState({ showRegisterModal: true })
  }

  toggleSubmitModalOpen = () => {
    this.setState((prevState: State) => ({
      showSubmitModal: !prevState.showSubmitModal
    }))
  }

  toggleRegisterModalOpen = () => {
    this.setState((prevState: State) => ({
      showRegisterModal: !prevState.showRegisterModal
    }))
  }

  generateSectionListForReview = (
    disabled: boolean,
    sections: IFormSection[]
  ) => {
    const result: IFormSection[] = []
    sections.map((section: IFormSection) => {
      result.push(
        merge(
          {
            disabled: section.viewType !== VIEW_TYPE.REVIEW && disabled
          },
          section
        )
      )
    })
    return result
  }

  toggleRejectForm = () => {
    this.setState(state => ({
      rejectFormOpen: !state.rejectFormOpen
    }))
  }

  getEvent() {
    const eventType = this.props.application.event || 'BIRTH'
    switch (eventType.toLocaleLowerCase()) {
      case 'birth':
        return Event.BIRTH
      case 'death':
        return Event.DEATH
      default:
        return Event.BIRTH
    }
  }

  onSaveAsDraftClicked = () => {
    this.props.writeApplication(this.props.application)
    this.props.goToHome()
    this.props.toggleDraftSavedNotification()
  }

  continueButtonHandler = (
    pageRoute: string,
    applicationId: string,
    pageId: string,
    groupId: string,
    event: string
  ) => {
    this.props.writeApplication(this.props.application)
    this.props.goToPageGroup(pageRoute, applicationId, pageId, groupId, event)
  }

  render() {
    const {
      intl,
      setAllFieldsDirty,
      application,
      history,
      registerForm,
      offlineResources,
      handleSubmit,
      duplicate
    } = this.props

    let activeSection: IFormSection = this.props.activeSection
    let activeSectionGroup: IFormSectionGroup = this.props.activeSectionGroup

    if (activeSection.viewType === VIEW_TYPE.HIDDEN) {
      const nextSection = getNextSection(registerForm.sections, activeSection)
      if (nextSection) {
        activeSection = nextSection
        activeSectionGroup = nextSection.groups[0]
      }
    }
    const nextSectionGroup = getNextSectionIds(
      registerForm.sections,
      activeSection,
      activeSectionGroup
    )
    const title =
      activeSection.viewType === VIEW_TYPE.REVIEW
        ? messages.reviewEventRegistration
        : activeSection.viewType === VIEW_TYPE.PREVIEW
        ? messages.previewEventRegistration
        : messages.newVitalEventRegistration

    const isErrorOccured = this.state.hasError
    const debouncedModifyApplication = debounce(this.modifyApplication, 500)

    return (
      <Container id="informant_parent_view">
        {isErrorOccured && (
          <ErrorText id="error_message_section">
            {intl.formatMessage(messages.queryError)}
          </ErrorText>
        )}

        {!isErrorOccured && (
          <>
            <EventTopBar
              title={intl.formatMessage(title, { event: application.event })}
              iconColor={
                application.submissionStatus === SUBMISSION_STATUS.DRAFT
                  ? 'orange'
                  : 'violet'
              }
              saveAction={{
                handler: this.onSaveAsDraftClicked,
                label: intl.formatMessage(messages.saveExitButton)
              }}
              menuItems={[
                {
                  label: 'Delete Application',
                  handler: () => {
                    this.props.deleteApplication(application)
                    this.props.goToHome()
                  }
                }
              ]}
            />

            {activeSection.viewType === VIEW_TYPE.PREVIEW && (
              <FullBodyContent>
                <ReviewSection
                  pageRoute={this.props.pageRoute}
                  draft={application}
                  submitClickEvent={this.submitForm}
                  saveDraftClickEvent={() => this.onSaveAsDraftClicked()}
                  deleteApplicationClickEvent={() => {
                    this.props.deleteApplication(application)
                    history.push('/')
                  }}
                />
              </FullBodyContent>
            )}
            {activeSection.viewType === VIEW_TYPE.REVIEW && (
              <FullBodyContent>
                <ReviewSection
                  pageRoute={this.props.pageRoute}
                  draft={application}
                  rejectApplicationClickEvent={() => {
                    this.toggleRejectForm()
                  }}
                  registerClickEvent={this.registerApplication}
                />
              </FullBodyContent>
            )}

            {activeSection.viewType === VIEW_TYPE.FORM && (
              <>
                <BodyContent>
                  <TertiaryButton
                    align={ICON_ALIGNMENT.LEFT}
                    icon={() => <BackArrow />}
                    onClick={this.props.goBack}
                  >
                    {intl.formatMessage(messages.back)}
                  </TertiaryButton>
                  <FormSectionTitle
                    id={`form_section_title_${activeSectionGroup.id}`}
                  >
                    {intl.formatMessage(
                      activeSectionGroup.title || activeSection.title
                    )}
                    {activeSection.optional && (
                      <Optional
                        id={`form_section_opt_label_${activeSectionGroup.id}`}
                        disabled={
                          activeSectionGroup.disabled || activeSection.disabled
                        }
                      >
                        &nbsp;&nbsp;•&nbsp;
                        {intl.formatMessage(messages.optionalLabel)}
                      </Optional>
                    )}
                  </FormSectionTitle>
                  {activeSection.notice && (
                    <Notice id={`form_section_notice_${activeSectionGroup.id}`}>
                      {intl.formatMessage(activeSection.notice)}
                    </Notice>
                  )}
                  <form
                    id={`form_section_id_${activeSectionGroup.id}`}
                    onSubmit={handleSubmit}
                  >
                    <FormFieldGenerator
                      id={activeSectionGroup.id}
                      onChange={values => {
                        debouncedModifyApplication(
                          values,
                          activeSection,
                          application
                        )
                      }}
                      setAllFieldsDirty={setAllFieldsDirty}
                      fields={activeSectionGroup.fields}
                      offlineResources={offlineResources}
                      draftData={application.data}
                    />
                  </form>
                  {nextSectionGroup && (
                    <FooterArea>
                      <PrimaryButton
                        id="next_section"
                        onClick={() => {
                          this.continueButtonHandler(
                            this.props.pageRoute,
                            application.id,
                            nextSectionGroup.sectionId,
                            nextSectionGroup.groupId,
                            application.event.toLowerCase()
                          )
                        }}
                      >
                        {intl.formatMessage(messages.continueButton)}
                      </PrimaryButton>
                      {application.review && (
                        <StyledLinkButton
                          id="back-to-review-button"
                          className="item"
                          onClick={() => {
                            this.continueButtonHandler(
                              this.props.pageRoute,
                              application.id,
                              application.submissionStatus &&
                                application.submissionStatus ===
                                  SUBMISSION_STATUS.DRAFT
                                ? 'preview'
                                : 'review',
                              application.submissionStatus &&
                                application.submissionStatus ===
                                  SUBMISSION_STATUS.DRAFT
                                ? 'preview-view-group'
                                : 'review-view-group',
                              application.event.toLowerCase()
                            )
                          }}
                        >
                          {intl.formatMessage(messages.backToReviewButton)}
                        </StyledLinkButton>
                      )}
                    </FooterArea>
                  )}
                </BodyContent>
              </>
            )}
          </>
        )}

        {this.state.showSubmitModal && (
          <Modal
            title={intl.formatMessage(messages.submitConfirmation)}
            actions={[
              <ConfirmBtn
                key="submit"
                id="submit_confirm"
                onClick={() =>
                  this.confirmSubmission(
                    application,
                    SUBMISSION_STATUS.READY_TO_SUBMIT,
                    Action.SUBMIT_FOR_REVIEW
                  )
                }
              >
                <>
                  <TickLarge />
                  {intl.formatMessage(messages.submitButton)}
                </>
              </ConfirmBtn>,
              <CancelButton
                id="cancel-btn"
                key="cancel"
                onClick={() => {
                  this.toggleSubmitModalOpen()
                  if (document.documentElement) {
                    document.documentElement.scrollTop = 0
                  }
                }}
              >
                {intl.formatMessage(messages.cancel)}
              </CancelButton>
            ]}
            show={this.state.showSubmitModal}
            handleClose={this.toggleSubmitModalOpen}
          >
            {intl.formatMessage(messages.submitDescription)}
          </Modal>
        )}
        {this.state.showRegisterModal && (
          <Modal
            title={intl.formatMessage(messages.submitConfirmation)}
            actions={[
              <ConfirmBtn
                key="register"
                id="register_confirm"
                // @ts-ignore
                onClick={() =>
                  this.confirmSubmission(
                    application,
                    SUBMISSION_STATUS.READY_TO_REGISTER,
                    Action.REGISTER_APPLICATION
                  )
                }
              >
                <>
                  <TickLarge />
                  {intl.formatMessage(messages.submitButton)}
                </>
              </ConfirmBtn>,
              <CancelButton
                key="register_cancel"
                id="register_cancel"
                onClick={() => {
                  this.toggleRegisterModalOpen()
                  if (document.documentElement) {
                    document.documentElement.scrollTop = 0
                  }
                }}
              >
                {intl.formatMessage(messages.cancel)}
              </CancelButton>
            ]}
            show={this.state.showRegisterModal}
            handleClose={this.toggleRegisterModalOpen}
          >
            {intl.formatMessage(messages.submitDescription)}
          </Modal>
        )}

        {this.state.rejectFormOpen && (
          <RejectRegistrationForm
            onBack={this.toggleRejectForm}
            confirmRejectionEvent={this.confirmSubmission}
            duplicate={duplicate}
            draftId={application.id}
            event={this.getEvent()}
            application={application}
          />
        )}
      </Container>
    )
  }
}

export function replaceInitialValues(fields: IFormField[], sectionValues: any) {
  return fields.map(field => ({
    ...field,
    initialValue:
      isUndefined(sectionValues[field.name]) ||
      isNull(sectionValues[field.name])
        ? field.initialValue
        : sectionValues[field.name]
  }))
}

function mapStateToProps(
  state: IStoreState,
  props: IFormProps &
    Props &
    RouteComponentProps<{
      pageId: string
      groupId?: string
      applicationId: string
    }>
) {
  const { match, registerForm, application } = props

  const sectionId = match.params.pageId || registerForm.sections[0].id
  const activeSection = registerForm.sections.find(
    section => section.id === sectionId
  )
  if (!activeSection) {
    throw new Error(`Configuration for tab "${match.params.pageId}" missing!`)
  }
  const groupId = match.params.groupId || activeSection.groups[0].id
  const activeSectionGroup = activeSection.groups.find(
    group => group.id === groupId
  )
  if (!activeSectionGroup) {
    throw new Error(
      `Configuration for group "${match.params.groupId}" missing!`
    )
  }

  if (!application) {
    throw new Error(`Draft "${match.params.applicationId}" missing!`)
  }
  const visitedSections = registerForm.sections.filter(
    ({ id }) => id !== 'registration' && Boolean(application.data[id])
  )

  const rightMostVisited = visitedSections[visitedSections.length - 1]

  const setAllFieldsDirty =
    rightMostVisited &&
    registerForm.sections.indexOf(activeSection) <
      registerForm.sections.indexOf(rightMostVisited)

  const fields = replaceInitialValues(
    activeSectionGroup.fields,
    application.data[activeSection.id] || {}
  )

  const offlineResources = getOfflineState(state)

  return {
    registerForm,
    scope: getScope(state),
    setAllFieldsDirty,
    offlineResources,
    activeSection,
    activeSectionGroup: {
      ...activeSectionGroup,
      fields
    },
    application
  }
}

export const RegisterForm = connect<
  Props,
  DispatchProps,
  FullProps,
  IStoreState
>(
  mapStateToProps,
  {
    writeApplication,
    modifyApplication,
    deleteApplication,
    goToPageGroup: goToPageGroupAction,
    goBack: goBackAction,
    goToHome,
    toggleDraftSavedNotification,
    handleSubmit: (values: any) => {
      console.log(values)
    }
  }
)(injectIntl<FullProps>(RegisterFormView))
