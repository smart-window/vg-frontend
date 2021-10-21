import {useContext} from 'react'
import {CurrentUserContext} from 'web/providers/CurrentUserProvider.web'

// TODO: potentially share this between web/mobile. Provider would have to be shared

/**
 * Hook to simplify getting a set of permission slugs for the current user/permissions context.
 * @returns {Set} All permission slug strings the user has.
 * @category Hooks - Web
 * @module usePermissions
 */
export default function usePermissions() {
  const {permissions} = useContext(CurrentUserContext)
  const allPermissionSlugs = permissions.map(permission => permission.slug)
  return new Set(allPermissionSlugs)
}