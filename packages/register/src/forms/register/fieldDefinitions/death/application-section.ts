import {
  IFormSection,
  ViewType,
  TEXT,
  SELECT_WITH_OPTIONS,
  DATE,
  SUBSECTION,
  SELECT_WITH_DYNAMIC_OPTIONS,
  NUMBER,
  RADIO_GROUP,
  TEL,
  FIELD_WITH_DYNAMIC_DEFINITIONS
} from 'src/forms'
import { defineMessages } from 'react-intl'
import {
  bengaliOnlyNameFormat,
  englishOnlyNameFormat,
  isValidBirthDate,
  validIDNumber
} from 'src/utils/validate'
import { countries } from 'src/forms/countries'

import {
  messages as identityMessages,
  identityNameMapper,
  identityTypeMapper,
  deathIdentityOptions
} from '../../../identity'
import { messages as addressMessages } from '../../../address'

import { OFFLINE_LOCATIONS_KEY } from 'src/offline/reducer'
import { conditionals } from 'src/forms/utils'
import { phoneNumberFormat } from 'src/utils/validate'
import {
  fieldValueSectionExchangeTransformer,
  fieldToAddressTransformer,
  fieldToIdentifierTransformer,
  fieldToNameTransformer,
  fieldNameTransformer,
  fieldToArrayTransformer,
  copyAddressTransformer,
  fieldToPhoneNumberTransformer
} from 'src/forms/mappings/mutation/field-mappings'

import {
  fieldValueNestingTransformer,
  OBJECT_TYPE
} from './mappings/mutation/applicant-mapping'

const messages = defineMessages({
  applicantTab: {
    id: 'register.form.tabs.applicantTab',
    defaultMessage: 'Applicant',
    description: 'Tab title for Applicant'
  },
  applicantTitle: {
    id: 'register.form.section.applicantTitle',
    defaultMessage: "Applicant's details",
    description: 'Form section title for applicants'
  },
  applicantsIdType: {
    id: 'formFields.applicantsIdType',
    defaultMessage: 'Existing ID',
    description: 'Label for form field: Existing ID'
  },
  applicantsGivenNames: {
    id: 'formFields.applicantsGivenNames',
    defaultMessage: 'First Name(s) in Bengali',
    description: 'Label for form field: Given names'
  },
  applicantsFamilyName: {
    id: 'formFields.applicantsFamilyName',
    defaultMessage: 'Last Name(s) in Bengali',
    description: 'Label for form field: Family name'
  },
  applicantsGivenNamesEng: {
    id: 'formFields.applicantsGivenNamesEng',
    defaultMessage: 'First Name(s) in English',
    description: 'Label for form field: Given names in english'
  },
  applicantsFamilyNameEng: {
    id: 'formFields.applicantsFamilyNameEng',
    defaultMessage: 'Last Name(s) in English',
    description: 'Label for form field: Family name in english'
  },
  applicantsNationality: {
    id: 'formFields.applicants.nationality',
    defaultMessage: 'Nationality',
    description: 'Label for form field: Nationality'
  },
  applicantsDateOfBirth: {
    id: 'formFields.applicantsDateOfBirth',
    defaultMessage: 'Date of Birth',
    description: 'Label for form field: Date of birth'
  },
  applicantsRelationWithDeceased: {
    id: 'formFields.applicantsRelationWithDeceased',
    defaultMessage: 'Relationship to Deceased',
    description: 'Label for Relationship to Deceased select'
  },
  relationFather: {
    id: 'formFields.applicantRelation.father',
    defaultMessage: 'Father',
    description: 'Label for option Father'
  },
  relationMother: {
    id: 'formFields.applicantRelation.mother',
    defaultMessage: 'Mother',
    description: 'Label for option Mother'
  },
  relationSpouse: {
    id: 'formFields.applicantRelation.spouse',
    defaultMessage: 'Spouse',
    description: 'Label for option Spouse'
  },
  relationSon: {
    id: 'formFields.applicantRelation.son',
    defaultMessage: 'Son',
    description: 'Label for option Son'
  },
  relationDaughter: {
    id: 'formFields.applicantRelation.daughter',
    defaultMessage: 'Daughter',
    description: 'Label for option Daughter'
  },
  relationExtendedFamily: {
    id: 'formFields.applicantRelation.extendedFamily',
    defaultMessage: 'Extended Family',
    description: 'Label for option Extended Family'
  },
  relationOther: {
    id: 'formFields.applicantRelation.other',
    defaultMessage: 'Other(Specify)',
    description: 'Label for option Other'
  },
  permanentAddressSameAsCurrent: {
    id: 'formFields.applicantsCurrentAddressSameAsPermanent',
    defaultMessage:
      'Is applicant’s permanent address the same as their current address?',
    description:
      'Title for the radio button to select that the applicants current address is the same as their permanent address'
  },
  applicantsPhone: {
    defaultMessage: 'Phone number',
    id: 'formFields.applicant.phone',
    description: 'Input label for phone input'
  },
  currentAddress: {
    id: 'formFields.currentAddress',
    defaultMessage: 'Current Address',
    description: 'Title for the current address fields'
  },
  permanentAddress: {
    id: 'formFields.permanentAddress',
    defaultMessage: 'Permanent Address',
    description: 'Title for the permanent address fields'
  }
})

const NESTED_SECTION = 'individual'

export const applicantsSection: IFormSection = {
  id: 'informant',
  viewType: 'form' as ViewType,
  name: messages.applicantTab,
  title: messages.applicantTitle,
  fields: [
    {
      name: 'iDType',
      type: SELECT_WITH_OPTIONS,
      label: messages.applicantsIdType,
      required: true,
      initialValue: '',
      validate: [],
      options: deathIdentityOptions,
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToIdentifierTransformer('type')
        )
      }
    },
    {
      name: 'iDTypeOther',
      type: TEXT,
      label: identityMessages.iDTypeOtherLabel,
      required: true,
      initialValue: '',
      validate: [],
      conditionals: [conditionals.iDType]
    },
    {
      name: 'applicantID',
      type: FIELD_WITH_DYNAMIC_DEFINITIONS,
      dynamicDefinitions: {
        label: {
          dependency: 'iDType',
          labelMapper: identityNameMapper
        },
        type: {
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
      label: identityMessages.iD,
      required: true,
      initialValue: '',
      validate: [],
      conditionals: [conditionals.iDAvailable],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToIdentifierTransformer('id')
        )
      }
    },
    {
      name: 'applicantFirstNames',
      type: TEXT,
      label: messages.applicantsGivenNames,
      required: false,
      initialValue: '',
      validate: [bengaliOnlyNameFormat],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToNameTransformer('bn', 'firstNames'),
          OBJECT_TYPE.NAME
        )
      }
    },
    {
      name: 'applicantFamilyName',
      type: TEXT,
      label: messages.applicantsFamilyName,
      required: true,
      initialValue: '',
      validate: [bengaliOnlyNameFormat],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToNameTransformer('bn', 'familyName'),
          OBJECT_TYPE.NAME
        )
      }
    },
    {
      name: 'applicantFirstNamesEng',
      type: TEXT,
      label: messages.applicantsGivenNamesEng,
      required: false,
      initialValue: '',
      validate: [englishOnlyNameFormat],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToNameTransformer('en', 'firstNames'),
          OBJECT_TYPE.NAME
        )
      }
    },
    {
      name: 'applicantFamilyNameEng',
      type: TEXT,
      label: messages.applicantsFamilyNameEng,
      required: false,
      initialValue: '',
      validate: [englishOnlyNameFormat],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToNameTransformer('en', 'familyName'),
          OBJECT_TYPE.NAME
        )
      }
    },
    {
      name: 'nationality',
      type: SELECT_WITH_OPTIONS,
      label: messages.applicantsNationality,
      required: false,
      initialValue: 'BGD',
      validate: [],
      options: countries,
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToArrayTransformer
        )
      }
    },
    {
      name: 'applicantBirthDate',
      type: DATE,
      label: messages.applicantsDateOfBirth,
      required: false,
      initialValue: '',
      validate: [isValidBirthDate],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldNameTransformer('birthDate')
        )
      }
    },
    {
      name: 'applicantsRelationToDeceased',
      type: SELECT_WITH_OPTIONS,
      label: messages.applicantsRelationWithDeceased,
      required: true,
      initialValue: '',
      validate: [],
      options: [
        { value: 'FATHER', label: messages.relationFather },
        { value: 'MOTHER', label: messages.relationMother },
        { value: 'SPOUSE', label: messages.relationSpouse },
        {
          value: 'SON',
          label: messages.relationSon
        },
        {
          value: 'DAUGHTER',
          label: messages.relationDaughter
        },
        {
          value: 'EXTENDED_FAMILY',
          label: messages.relationExtendedFamily
        },
        {
          value: 'OTHER',
          label: messages.relationOther
        }
      ],
      mapping: {
        mutation: fieldValueSectionExchangeTransformer(
          'informant',
          'relationship'
        )
      }
    },
    {
      name: 'applicantPhone',
      type: TEL,
      label: messages.applicantsPhone,
      required: false,
      initialValue: '',
      validate: [phoneNumberFormat],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToPhoneNumberTransformer
        )
      }
    },
    {
      name: 'currentAddress',
      type: SUBSECTION,
      label: messages.currentAddress,
      initialValue: '',
      validate: [],
      conditionals: []
    },
    {
      name: 'country',
      type: SELECT_WITH_OPTIONS,
      label: addressMessages.country,
      required: true,
      initialValue: window.config.COUNTRY.toUpperCase(),
      validate: [],
      options: countries,
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('CURRENT'),
          OBJECT_TYPE.NAME
        )
      }
    },
    {
      name: 'state',
      type: SELECT_WITH_DYNAMIC_OPTIONS,
      label: addressMessages.state,
      required: true,
      initialValue: '',
      validate: [],
      dynamicOptions: {
        resource: OFFLINE_LOCATIONS_KEY,
        dependency: 'country'
      },
      conditionals: [conditionals.country],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('CURRENT'),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'district',
      type: SELECT_WITH_DYNAMIC_OPTIONS,
      label: addressMessages.district,
      required: true,
      initialValue: '',
      validate: [],
      dynamicOptions: {
        resource: OFFLINE_LOCATIONS_KEY,
        dependency: 'state'
      },
      conditionals: [conditionals.country, conditionals.state],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('CURRENT'),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'addressLine4',
      type: SELECT_WITH_DYNAMIC_OPTIONS,
      label: addressMessages.addressLine4,
      required: true,
      initialValue: '',
      validate: [],
      dynamicOptions: {
        resource: OFFLINE_LOCATIONS_KEY,
        dependency: 'district'
      },
      conditionals: [
        conditionals.country,
        conditionals.state,
        conditionals.district
      ],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('CURRENT', 6),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'addressLine3',
      type: SELECT_WITH_DYNAMIC_OPTIONS,
      label: addressMessages.addressLine3,
      required: true,
      initialValue: '',
      validate: [],
      dynamicOptions: {
        resource: OFFLINE_LOCATIONS_KEY,
        dependency: 'addressLine4'
      },
      conditionals: [
        conditionals.country,
        conditionals.state,
        conditionals.district,
        conditionals.addressLine4
      ],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('CURRENT', 4),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'addressLine2',
      type: TEXT,
      label: addressMessages.addressLine2,
      required: false,
      initialValue: '',
      validate: [],
      conditionals: [
        conditionals.country,
        conditionals.state,
        conditionals.district,
        conditionals.addressLine4,
        conditionals.addressLine3
      ],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('CURRENT', 3),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'addressLine1',
      type: TEXT,
      label: addressMessages.addressLine1,
      required: true,
      initialValue: '',
      validate: [],
      conditionals: [
        conditionals.country,
        conditionals.state,
        conditionals.district,
        conditionals.addressLine4,
        conditionals.addressLine3
      ],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('CURRENT', 1),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'postCode',
      type: NUMBER,
      label: addressMessages.postCode,
      required: false,
      initialValue: '',
      validate: [],
      conditionals: [
        conditionals.country,
        conditionals.state,
        conditionals.district,
        conditionals.addressLine4,
        conditionals.addressLine3
      ],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('CURRENT', 0, 'postalCode'),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'permanentAddress',
      type: SUBSECTION,
      label: messages.permanentAddress,
      initialValue: '',
      validate: [],
      mapping: {
        mutation: fieldValueNestingTransformer(NESTED_SECTION)
      }
    },
    {
      name: 'applicantPermanentAddressSameAsCurrent',
      type: RADIO_GROUP,
      label: messages.permanentAddressSameAsCurrent,
      required: true,
      initialValue: true,
      validate: [],
      options: [
        { value: true, label: addressMessages.confirm },
        { value: false, label: addressMessages.deny }
      ],
      conditionals: [],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          copyAddressTransformer(
            'CURRENT',
            'informant',
            'PERMANENT',
            'informant',
            true,
            NESTED_SECTION
          ),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'countryPermanent',
      type: SELECT_WITH_OPTIONS,
      label: addressMessages.country,
      required: true,
      initialValue: window.config.COUNTRY.toUpperCase(),
      validate: [],
      options: countries,
      conditionals: [conditionals.applicantPermanentAddressSameAsCurrent],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('PERMANENT', 0, 'country'),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'statePermanent',
      type: SELECT_WITH_DYNAMIC_OPTIONS,
      label: addressMessages.state,
      required: true,
      initialValue: '',
      validate: [],
      dynamicOptions: {
        resource: OFFLINE_LOCATIONS_KEY,
        dependency: 'countryPermanent'
      },
      conditionals: [
        conditionals.countryPermanent,
        conditionals.applicantPermanentAddressSameAsCurrent
      ],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('PERMANENT', 0, 'state'),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'districtPermanent',
      type: SELECT_WITH_DYNAMIC_OPTIONS,
      label: addressMessages.district,
      required: true,
      initialValue: '',
      validate: [],
      dynamicOptions: {
        resource: OFFLINE_LOCATIONS_KEY,
        dependency: 'statePermanent'
      },
      conditionals: [
        conditionals.countryPermanent,
        conditionals.statePermanent,
        conditionals.applicantPermanentAddressSameAsCurrent
      ],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('PERMANENT', 0, 'district'),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'addressLine4Permanent',
      type: SELECT_WITH_DYNAMIC_OPTIONS,
      label: addressMessages.addressLine4,
      required: true,
      initialValue: '',
      validate: [],
      dynamicOptions: {
        resource: OFFLINE_LOCATIONS_KEY,
        dependency: 'districtPermanent'
      },
      conditionals: [
        conditionals.countryPermanent,
        conditionals.statePermanent,
        conditionals.districtPermanent,
        conditionals.applicantPermanentAddressSameAsCurrent
      ],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('PERMANENT', 6),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'addressLine3Permanent',
      type: SELECT_WITH_DYNAMIC_OPTIONS,
      label: addressMessages.addressLine3,
      required: true,
      initialValue: '',
      validate: [],
      dynamicOptions: {
        resource: OFFLINE_LOCATIONS_KEY,
        dependency: 'addressLine4Permanent'
      },
      conditionals: [
        conditionals.countryPermanent,
        conditionals.statePermanent,
        conditionals.districtPermanent,
        conditionals.addressLine4Permanent,
        conditionals.applicantPermanentAddressSameAsCurrent
      ],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('PERMANENT', 4),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'addressLine2Permanent',
      type: TEXT,
      label: addressMessages.addressLine2,
      required: false,
      initialValue: '',
      validate: [],
      conditionals: [
        conditionals.countryPermanent,
        conditionals.statePermanent,
        conditionals.districtPermanent,
        conditionals.addressLine4Permanent,
        conditionals.addressLine3Permanent,
        conditionals.applicantPermanentAddressSameAsCurrent
      ],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('PERMANENT', 2),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'addressLine1Permanent',
      type: TEXT,
      label: addressMessages.addressLine1,
      required: true,
      initialValue: '',
      validate: [],
      conditionals: [
        conditionals.countryPermanent,
        conditionals.statePermanent,
        conditionals.districtPermanent,
        conditionals.addressLine4Permanent,
        conditionals.addressLine3Permanent,
        conditionals.applicantPermanentAddressSameAsCurrent
      ],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('PERMANENT', 1),
          OBJECT_TYPE.ADDRESS
        )
      }
    },
    {
      name: 'postCodePermanent',
      type: NUMBER,
      label: addressMessages.postCode,
      required: false,
      initialValue: '',
      validate: [],
      conditionals: [
        conditionals.countryPermanent,
        conditionals.statePermanent,
        conditionals.districtPermanent,
        conditionals.addressLine4Permanent,
        conditionals.addressLine3Permanent,
        conditionals.applicantPermanentAddressSameAsCurrent
      ],
      mapping: {
        mutation: fieldValueNestingTransformer(
          NESTED_SECTION,
          fieldToAddressTransformer('PERMANENT', 0, 'postalCode'),
          OBJECT_TYPE.ADDRESS
        )
      }
    }
  ]
}
