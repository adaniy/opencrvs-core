import { RadioSize } from '@opencrvs/components/lib/forms'
import {
  IFormSection,
  RADIO_GROUP,
  SELECT_WITH_OPTIONS,
  TEXT,
  PARAGRAPH,
  IMAGE_UPLOADER_WITH_OPTIONS,
  CHECKBOX_GROUP,
  IFormSectionGroup,
  SIMPLE_DOCUMENT_UPLOADER,
  FIELD_WITH_DYNAMIC_DEFINITIONS
} from '@register/forms'
import {
  birthIdentityOptions,
  deathIdentityOptions,
  identityNameMapper,
  identityTypeMapper
} from '@register/forms/identity'
import { conditionals } from '@register/forms/utils'
import { formMessages } from '@register/i18n/messages'
import { messages as certificateMessages } from '@register/i18n/messages/views/certificate'
import { validIDNumber } from '@register/utils/validate'

export const certCollectorGroupForBirthAppWithFatherDetails: IFormSectionGroup = {
  id: 'birthCertCollectorGroup',
  title: certificateMessages.whoToCollect,
  error: certificateMessages.certificateCollectorError,
  fields: [
    {
      name: 'collector',
      type: RADIO_GROUP,
      size: RadioSize.LARGE,
      label: certificateMessages.whoToCollect,
      required: true,
      initialValue: '',
      validate: [],
      options: [
        { value: 'MOTHER', label: formMessages.contactDetailsMother },
        { value: 'FATHER', label: formMessages.contactDetailsFather },
        { value: 'OTHER', label: formMessages.someoneElse }
      ]
    }
  ]
}

export const certCollectorGroupForBirthAppWithoutFatherDetails: IFormSectionGroup = {
  id: 'birthCertCollectorGroup',
  title: certificateMessages.whoToCollect,
  error: certificateMessages.certificateCollectorError,
  fields: [
    {
      name: 'collector',
      type: RADIO_GROUP,
      size: RadioSize.LARGE,
      label: certificateMessages.whoToCollect,
      required: true,
      initialValue: '',
      validate: [],
      options: [
        { value: 'MOTHER', label: formMessages.contactDetailsMother },
        { value: 'OTHER', label: formMessages.someoneElse }
      ]
    }
  ]
}

export const collectBirthCertificateFormSection: IFormSection = {
  id: 'collectBirthCertificate',
  viewType: 'form',
  name: certificateMessages.printCertificate,
  title: certificateMessages.certificateCollectionTitle,
  groups: [
    {
      id: 'otherCollectorGroup',
      conditionals: [conditionals.certCollectorOther],
      title: certificateMessages.otherCollectorFormTitle,
      error: certificateMessages.certificateOtherCollectorInfoError,
      fields: [
        {
          name: 'paragraph',
          type: PARAGRAPH,
          label: certificateMessages.otherCollectorFormParagraph,
          initialValue: '',
          validate: []
        },
        {
          name: 'iDType',
          type: SELECT_WITH_OPTIONS,
          label: formMessages.typeOfId,
          required: true,
          initialValue: '',
          validate: [],
          placeholder: formMessages.select,
          options: birthIdentityOptions
        },
        {
          name: 'iDTypeOther',
          type: TEXT,
          label: formMessages.iDTypeOtherLabel,
          required: true,
          initialValue: '',
          validate: [],
          conditionals: [conditionals.iDType]
        },
        {
          name: 'iD',
          type: FIELD_WITH_DYNAMIC_DEFINITIONS,
          dynamicDefinitions: {
            label: {
              dependency: 'iDType',
              labelMapper: identityNameMapper
            },
            type: {
              kind: 'dynamic',
              dependency: 'iDType',
              typeMapper: identityTypeMapper
            },
            validate: [
              {
                validator: validIDNumber,
                dependencies: ['iDType']
              }
            ]
          },
          label: formMessages.iD,
          required: true,
          initialValue: '',
          validate: []
        },
        {
          name: 'firstName',
          type: TEXT,
          label: formMessages.firstName,
          required: true,
          initialValue: '',
          validate: []
        },
        {
          name: 'lastName',
          type: TEXT,
          label: formMessages.lastName,
          required: true,
          initialValue: '',
          validate: []
        },
        {
          name: 'relationship',
          type: TEXT,
          label: formMessages.applicantsRelationWithChild,
          required: true,
          initialValue: '',
          validate: []
        }
      ]
    },
    {
      id: 'affidavit',
      conditionals: [conditionals.certCollectorOther],
      title: certificateMessages.certificateOtherCollectorAffidavitFormTitle,
      error: certificateMessages.certificateOtherCollectorAffidavitError,
      fields: [
        {
          name: 'paragraph',
          type: PARAGRAPH,
          label:
            certificateMessages.certificateOtherCollectorAffidavitFormParagraph,
          initialValue: '',
          validate: []
        },
        {
          name: 'signedFile',
          type: SIMPLE_DOCUMENT_UPLOADER,
          label: certificateMessages.signedAffidavitFileLabel,
          description: certificateMessages.noLabel,
          initialValue: '',
          required: false,
          validate: []
        },
        {
          name: 'checkbox',
          type: CHECKBOX_GROUP,
          label: certificateMessages.noLabel,
          initialValue: [],
          validate: [],
          required: false,
          options: [
            {
              value: 'AFFIDAVIT',
              label: certificateMessages.noSignedAffidavitAvailable
            }
          ]
        }
      ]
    }
  ]
}

export const collectDeathCertificateFormSection: IFormSection = {
  id: 'collectDeathCertificate',
  viewType: 'form',
  name: certificateMessages.printCertificate,
  title: certificateMessages.certificateCollectionTitle,
  groups: [
    {
      id: 'deathCertCollectorGroup',
      title: certificateMessages.certificateCollectionTitle,
      error: certificateMessages.certificateCollectorError,
      fields: [
        {
          name: 'collector',
          type: RADIO_GROUP,
          size: RadioSize.LARGE,
          label: certificateMessages.whoToCollect,
          required: true,
          initialValue: true,
          validate: [],
          options: [
            { value: 'APPLICANT', label: formMessages.applicantName },
            { value: 'OTHER', label: formMessages.someoneElse }
          ]
        }
      ]
    },
    {
      id: 'otherCollectorGroup',
      conditionals: [conditionals.certCollectorOther],
      title: certificateMessages.otherCollectorFormTitle,
      error: certificateMessages.certificateOtherCollectorInfoError,
      fields: [
        {
          name: 'paragraph',
          type: PARAGRAPH,
          label: certificateMessages.otherCollectorFormParagraph,
          initialValue: '',
          validate: []
        },
        {
          name: 'iDType',
          type: SELECT_WITH_OPTIONS,
          label: formMessages.typeOfId,
          required: true,
          initialValue: '',
          validate: [],
          placeholder: formMessages.select,
          options: deathIdentityOptions
        },
        {
          name: 'iDTypeOther',
          type: TEXT,
          label: formMessages.iDTypeOtherLabel,
          required: true,
          initialValue: '',
          validate: [],
          conditionals: [conditionals.iDType]
        },
        {
          name: 'iD',
          type: FIELD_WITH_DYNAMIC_DEFINITIONS,
          dynamicDefinitions: {
            label: {
              dependency: 'iDType',
              labelMapper: identityNameMapper
            },
            type: {
              kind: 'dynamic',
              dependency: 'iDType',
              typeMapper: identityTypeMapper
            },
            validate: [
              {
                validator: validIDNumber,
                dependencies: ['iDType']
              }
            ]
          },
          label: formMessages.iD,
          required: true,
          initialValue: '',
          validate: []
        },
        {
          name: 'firstName',
          type: TEXT,
          label: formMessages.firstName,
          required: true,
          initialValue: '',
          validate: []
        },
        {
          name: 'lastName',
          type: TEXT,
          label: formMessages.lastName,
          required: true,
          initialValue: '',
          validate: []
        },
        {
          name: 'relationship',
          type: TEXT,
          label: formMessages.applicantsRelationWithDeceased,
          required: true,
          initialValue: '',
          validate: []
        }
      ]
    },
    {
      id: 'affidavit',
      conditionals: [conditionals.certCollectorOther],
      title: certificateMessages.certificateOtherCollectorAffidavitFormTitle,
      error: certificateMessages.certificateOtherCollectorAffidavitError,
      fields: [
        {
          name: 'paragraph',
          type: PARAGRAPH,
          label:
            certificateMessages.certificateOtherCollectorAffidavitFormParagraph,
          initialValue: '',
          validate: []
        },
        {
          name: 'signedFile',
          type: SIMPLE_DOCUMENT_UPLOADER,
          label: certificateMessages.signedAffidavitFileLabel,
          description: certificateMessages.noLabel,
          initialValue: '',
          required: false,
          validate: []
        },
        {
          name: 'checkbox',
          type: CHECKBOX_GROUP,
          label: certificateMessages.noLabel,
          required: false,
          initialValue: [],
          validate: [],
          options: [
            {
              value: 'AFFIDAVIT',
              label: certificateMessages.noSignedAffidavitAvailable
            }
          ]
        }
      ]
    }
  ]
}