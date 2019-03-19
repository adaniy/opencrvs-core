import { GQLRegStatus } from '@opencrvs/gateway/src/graphql/schema'
import { IAction } from '../ListItem'
export { IAction } from '../ListItem'

interface IStatus {
  type: GQLRegStatus | null | undefined
  practitionerName: string
  timestamp: string | null
  practitionerRole: string
  officeName: string | Array<string | null> | null | undefined
}

export interface IDynamicValues {
  [key: string]:
    | string
    | IAction[]
    | Array<string | null>
    | IStatus[]
    | undefined
}

export interface IExpandedContentPreference {
  label: string
  allowedEvents?: string[]
  key: string
}