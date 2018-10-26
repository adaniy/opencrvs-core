import { v4 as uuid } from 'uuid'
import {
  createMotherSection,
  createFatherSection,
  createChildSection,
  createPersonEntryTemplate,
  createEncounterSection,
  createEncounter,
  createLocationResource,
  createSupportingDocumentsSection,
  createDocRefTemplate
} from 'src/features/fhir/templates'
import { IExtension } from 'src/type/person'

export function findCompositionSectionInBundle(code: string, fhirBundle: any) {
  return fhirBundle.entry[0].resource.section.find(
    (section: any) => section.code.coding.code === code
  )
}

export function findCompositionSection(code: string, composition: any) {
  return composition.section.find(
    (section: any) => section.code.coding.code === code
  )
}

export function selectOrCreatePersonResource(
  sectionCode: string,
  fhirBundle: fhir.Bundle,
  context: any
) {
  const section = findCompositionSectionInBundle(sectionCode, fhirBundle)

  let personEntry
  if (!section) {
    // create person
    const ref = uuid()
    let personSection
    switch (sectionCode) {
      case 'mother-details':
        personSection = createMotherSection(ref)
        break
      case 'father-details':
        personSection = createFatherSection(ref)
        break
      case 'child-details':
        personSection = createChildSection(ref)
        break
      default:
        throw new Error(`Unknown section code ${sectionCode}`)
    }
    fhirBundle.entry[0].resource.section.push(personSection)
    personEntry = createPersonEntryTemplate(ref)
    fhirBundle.entry.push(personEntry)
  } else {
    personEntry = fhirBundle.entry.find(
      (entry: any) => entry.fullUrl === section.entry[0].reference
    )
  }

  return personEntry.resource
}

export function selectOrCreateEncounterResource(
  sectionCode: string,
  fhirBundle: fhir.Bundle,
  context: any
) {
  const section = findCompositionSectionInBundle(sectionCode, fhirBundle)
  let encounterEntry

  if (!section) {
    const ref = uuid()
    let encounterSection
    if (sectionCode === 'birth-encounter') {
      encounterSection = createEncounterSection(ref)
    } else {
      throw new Error(`Unknown section code ${sectionCode}`)
    }
    fhirBundle.entry[0].resource.section.push(encounterSection)
    encounterEntry = createEncounter(ref)
    fhirBundle.entry.push(encounterEntry)
  } else {
    encounterEntry = fhirBundle.entry.find(
      (entry: any) => entry.fullUrl === section.entry[0].reference
    )
  }

  return encounterEntry.resource
}

export function selectOrCreateLocationRefResource(
  sectionCode: string,
  fhirBundle: fhir.Bundle,
  context: any
) {
  let encounter
  let locationEntry

  encounter = selectOrCreateEncounterResource(sectionCode, fhirBundle, context)

  if (!encounter.location) {
    // create location
    const locationRef = uuid()
    locationEntry = createLocationResource(locationRef)
    fhirBundle.entry.push(locationEntry)
    encounter.location = []
    encounter.location.push({
      location: { reference: `urn:uuid:${locationRef}` }
    })
  } else {
    locationEntry = fhirBundle.entry.find(
      (entry: any) => entry.fullUrl === encounter.location[0].location.reference
    )
  }

  return locationEntry.resource
}

export function selectOrCreateDocRefResource(
  sectionCode: string,
  fhirBundle: fhir.Bundle,
  context: any
) {
  const section = findCompositionSectionInBundle(sectionCode, fhirBundle)

  let docRef
  if (!section) {
    const ref = uuid()
    const docSection = createSupportingDocumentsSection()
    docSection.entry[context._index.attachments] = {
      reference: `urn:uuid:${ref}`
    }
    fhirBundle.entry[0].resource.section.push(docSection)
    docRef = createDocRefTemplate(ref)
    fhirBundle.entry.push(docRef)
  } else {
    docRef = fhirBundle.entry.find(
      (entry: any) =>
        section.entry[context._index.attachments] &&
        entry.fullUrl === section.entry[context._index.attachments].reference
    )
    if (!docRef) {
      const ref = uuid()
      docRef = createDocRefTemplate(ref)
      fhirBundle.entry.push(docRef)
      section.entry[context._index.attachments] = {
        reference: `urn:uuid:${ref}`
      }
    }
  }

  return docRef.resource
}

export function setObjectPropInResourceArray(
  resource: any,
  label: string,
  value: string | string[],
  propName: string,
  context: any
) {
  if (!resource[label]) {
    resource[label] = []
  }
  if (!resource[label][context._index[label]]) {
    resource[label][context._index[label]] = {}
  }
  resource[label][context._index[label]][propName] = value
}

export function findExtension(url: string, composition: any): IExtension {
  const extension = composition.find((obj: IExtension) => {
    return obj.url === url
  })
  return extension
}

export function getMaritalStatusCode(fieldValue: string) {
  switch (fieldValue) {
    case 'SINGLE':
      return 'S'
    case 'WIDOWED':
      return 'W'
    case 'DIVORCED':
      return 'D'
    case 'NOT_STATED':
      return 'UNK'
    case 'MARRIED':
      return 'M'
    default:
      return 'UNK'
  }
}
