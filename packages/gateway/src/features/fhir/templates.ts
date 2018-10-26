import { v4 as uuid } from 'uuid'

export const MOTHER_CODE = 'mother-details'
export const FATHER_CODE = 'father-details'
export const CHILD_CODE = 'child-details'
export const DOCS_CODE = 'supporting-documents'
export const BIRTH_ENCOUNTER_CODE = 'birth-encounter'
export const BODY_WEIGHT_CODE = '3141-9'
export const BIRTH_TYPE_CODE = '57722-1'
export const BIRTH_ATTENDANT_CODE = '73764-3'
export const BIRTH_REG_TYPE_CODE = 'birth-reg-type'
export const BIRTH_REG_PRESENT_CODE = 'present-at-birth-reg'
export const NUMBER_BORN_ALIVE_CODE = 'num-born-alive'
export const NUMBER_FOEATAL_DEATH_CODE = 'num-foetal-death'
export const LAST_LIVE_BIRTH_CODE = '68499-3'

export function createMotherSection(refUuid: string) {
  return {
    title: "Mother's details",
    code: {
      coding: {
        system: 'http://opencrvs.org/doc-sections',
        code: 'mother-details'
      },
      text: "Mother's details"
    },
    text: '',
    entry: [
      {
        reference: `urn:uuid:${refUuid}`
      }
    ]
  }
}

export function createFatherSection(refUuid: string) {
  return {
    title: "Father's details",
    code: {
      coding: {
        system: 'http://opencrvs.org/doc-sections',
        code: 'father-details'
      },
      text: "Father's details"
    },
    text: '',
    entry: [
      {
        reference: `urn:uuid:${refUuid}`
      }
    ]
  }
}

export function createChildSection(refUuid: string) {
  return {
    title: 'Child details',
    code: {
      coding: {
        system: 'http://opencrvs.org/doc-sections',
        code: 'child-details'
      },
      text: 'Child details'
    },
    text: '',
    entry: [
      {
        reference: `urn:uuid:${refUuid}`
      }
    ]
  }
}

export function createCompositionTemplate() {
  return {
    resource: {
      identifier: {
        system: 'urn:ietf:rfc:3986',
        value: uuid()
      },
      resourceType: 'Composition',
      status: 'preliminary',
      type: {
        coding: {
          system: 'http://opencrvs.org/doc-types',
          code: 'birth-declaration'
        },
        text: 'Birth Declaration'
      },
      class: {
        coding: {
          system: 'http://opencrvs.org/doc-classes',
          code: 'crvs-document'
        },
        text: 'CRVS Document'
      },
      title: 'Birth Declaration',
      section: []
    }
  }
}

export function createPersonEntryTemplate(refUuid: string) {
  return {
    fullUrl: `urn:uuid:${refUuid}`,
    resource: {
      resourceType: 'Patient',
      active: true
    }
  }
}

export function createSupportingDocumentsSection() {
  return {
    title: 'Supporting documents',
    code: {
      coding: {
        system: 'http://opencrvs.org/specs/sections',
        code: 'supporting-documents'
      },
      text: 'Supporting documents'
    },
    text: '',
    entry: []
  }
}

export function createDocRefTemplate(refUuid: string) {
  return {
    fullUrl: `urn:uuid:${refUuid}`,
    resource: {
      resourceType: 'DocumentReference',
      masterIdentifier: {
        system: 'urn:ietf:rfc:3986',
        value: refUuid
      },
      status: 'current'
    }
  }
}