import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'

const schemaString = `
  type Address {
    use: String
    type: String
    text: String
    line: [String]
    city: String
    district: String
    state: String
    postalCode: String
    country: String
    from: Date
    to: Date
  }

  input AddressInput {
    use: String
    type: String
    text: String
    line: [String]
    city: String
    district: String
    state: String
    postalCode: String
    country: String
    from: Date
    to: Date
  }

  type Attachment {
    id: ID!
    data: String
    status: String
    originalFileName: String
    systemFileName: String
    createdAt: Date
  }

  input AttachmentInput {
    data: String
    status: String
    originalFileName: String
    systemFileName: String
    createdAt: Date
  }

  type BirthRegistration {
    id: ID!
    registration: Registration
    child: Person
    mother: Person
    father: Person
    informant: Person
    birthLocation: Location
    birthRegistrationType: BirthRegType
    createdAt: Date
    updatedAt: Date
  }

  input BirthRegistrationInput {
    registration: RegistrationInput
    child: PersonInput
    mother: PersonInput
    father: PersonInput
    informant: PersonInput
    birthLocation: LocationInput
    birthRegistrationType: BirthRegType
    createdAt: Date
    updatedAt: Date
  }

  enum BirthRegType {
    SELF
    STATELESS
    REFUGEE
    INFORMANT_ONLY
    SINGLE_PARENT
    TEST
  }

  enum CauseOfDeath {
    NATURAL
    ACCIDENT
  }

  type ContactPoint {
    system: String
    value: String
    use: String
  }

  input ContactPointInput {
    system: String
    value: String
    use: String
  }

  scalar Date

  type DeathRegistration {
    id: ID!
    registration: Registration
    deceased: Person
    mother: Person
    father: Person
    informant: Person
    spouse: Person
    deathLocation: Location
    causeOfDeath: CauseOfDeath
    createdAt: Date
    updatedAt: Date
  }

  input DeathRegistrationInput {
    registration: RegistrationInput
    deceased: PersonInput
    mother: PersonInput
    father: PersonInput
    informant: PersonInput
    spouse: PersonInput
    deathLocation: LocationInput
    causeOfDeath: CauseOfDeath
    createdAt: Date
    updatedAt: Date
  }

  type Dummy {
    dummy: String!
  }

  type HumanName {
    use: String
    givenName: String
    familyName: String
  }

  input HumanNameInput {
    use: String
    givenName: String
    familyName: String
  }

  type Location {
    id: ID!
    identifier: [ID]
    status: String
    name: String
    alias: [String]
    description: String
    telecom: [ContactPoint]
    address: Address
    longitude: Float
    latitude: Float
    altitude: Float
  }

  input LocationInput {
    identifier: [ID]
    status: String
    name: String
    alias: [String]
    description: String
    telecom: [ContactPointInput]
    address: AddressInput
    longitude: Float
    latitude: Float
    altitude: Float
  }

  type Mutation {
    createNotification(details: NotificationInput!): Notification!
    voidNotification(id: ID!): Notification
    createBirthRegistration(details: BirthRegistrationInput!): ID!
    updateBirthRegistration(id: ID!, details: BirthRegistrationInput!): BirthRegistration!
    markBirthAsVerified(id: ID!, location: LocationInput): BirthRegistration
    markBirthAsRegistered(id: ID!, location: LocationInput): BirthRegistration
    markBirthAsCertified(id: ID!, location: LocationInput): BirthRegistration
    markBirthAsVoided(id: ID!, reason: String!, location: LocationInput): BirthRegistration
    createDeathRegistration(details: DeathRegistrationInput!): ID!
    updateDeathRegistration(id: ID!, details: DeathRegistrationInput!): DeathRegistration!
    markDeathAsVerified(id: ID!, location: LocationInput): DeathRegistration
    markDeathAsRegistered(id: ID!, location: LocationInput): DeathRegistration
    markDeathAsCertified(id: ID!, location: LocationInput): DeathRegistration
    markDeathAsVoided(id: ID!, reason: String!, location: LocationInput): DeathRegistration
  }

  type Notification {
    id: ID!
    child: Person
    mother: Person
    father: Person
    informant: Person
    location: Location
    createdAt: Date
    updatedAt: Date
  }

  input NotificationInput {
    child: PersonInput
    mother: PersonInput
    father: PersonInput
    informant: PersonInput
    location: LocationInput
    createdAt: Date
    updatedAt: Date
  }

  type Person {
    id: ID
    identifier: [ID]
    name: [HumanName]
    telecom: [ContactPoint]
    gender: String
    birthDate: String
    address: [Address]
    photo: Attachment
    nationality: String
  }

  input PersonInput {
    identifier: [ID]
    name: [HumanNameInput]
    telecom: [ContactPointInput]
    gender: String
    birthDate: String
    address: [AddressInput]
    photo: AttachmentInput
  }

  type Query {
    listNotifications(locationIds: [String], status: String, userId: String, from: Date, to: Date): [Notification]
    listBirthRegistrations(locationIds: [String], status: String, userId: String, from: Date, to: Date): [BirthRegistration]
    listDeathRegistrations(locationIds: [String], status: String, userId: String, from: Date, to: Date): [BirthRegistration]
  }

  type Registration {
    id: ID!
    trackingID: String
    registrationNumber: String
    paperFormID: String
    bookId: ID
    status: [RegWorkflow]
    type: RegistrationType
    attachments: [Attachment]
    location: Location
  }

  input RegistrationInput {
    trackingID: String
    registrationNumber: String
    paperFormID: String
    bookId: ID
    status: [RegWorkflowInput]
    type: RegistrationType
    attachments: [AttachmentInput]
    location: LocationInput
  }

  enum RegistrationType {
    BIRTH
    DEATH
  }

  enum RegStatus {
    DECLARED
    VERIFIED
    REGISTERED
    CERTIFIED
  }

  type RegWorkflow {
    id: ID!
    type: RegStatus
    user: User
    timestamp: Date
    location: Location
  }

  input RegWorkflowInput {
    type: RegStatus
    user: UserInput
    timestamp: Date
    location: LocationInput
  }

  type User {
    id: ID!
    userName: String
    created: Date
    lastLoggedIn: Date
    firstName: String
    lastName: String
    email: String
    telecom: [ContactPoint]
    role: [UserRole]!
    address: Address
    primaryOffice: Location
    currentLocation: Location
    catchmentArea: [Location]
  }

  input UserInput {
    userName: String
    created: Date
    lastLoggedIn: Date
    firstName: String
    lastName: String
    email: String
    telecom: [ContactPointInput]
    role: [UserRoleInput]!
    address: AddressInput
    primaryOffice: LocationInput
    currentLocation: LocationInput
    catchmentArea: [LocationInput]
  }

  type UserRole {
    id: ID!
    type: String
  }

  input UserRoleInput {
    type: String
  }
`

export function getSchema() {
  const schema = makeExecutableSchema({
    typeDefs: schemaString
  })

  addMockFunctionsToSchema({
    schema,
    mocks: {
      Date: () => {
        return new Date()
      }
    }
  })

  return schema
}
