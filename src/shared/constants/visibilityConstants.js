const INTERNAL_USERS_ONLY = 'internal_only'
const ALL_USERS = 'public'

export const visibilityTypes = {INTERNAL_USERS_ONLY, ALL_USERS}
export const visibilityTypeToLabel = {
  [INTERNAL_USERS_ONLY]: 'Internal Users Only',
  [ALL_USERS]: 'All Users'
}
export default {visibilityTypes, visibilityTypeToLabel}
