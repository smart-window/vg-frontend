import {useContext} from 'react'
import {CurrentUserContext} from 'web/providers/CurrentUserProvider.web'
import {publicRoutes, privateRoutes} from 'web/constants/routeConstants'
import permissionsConstants from 'shared/constants/permissions'

/**
 * Hook to simplify getting accessible routes from current user/permissions context.
 * @returns {Set} Routes for which the current user is authorized.
 * @category Hooks - Web
 * @module useAccessibleRoutes
 */
export default function useAccessibleRoutes() {

  // By default, the name of the route is used as the permission slug
  // The following slugs override that default for the given route
  const overriddenPermissionSlugsToRoute = {
    [permissionsConstants.EE_WELCOME_WIZARD]: privateRoutes.EE_WELCOME_WIZARD
  }

  const allPrivateRoutesSet = new Set(Object.values(privateRoutes))
  const {permissions} = useContext(CurrentUserContext)
  const routesForUser = permissions
    .map(permission => overriddenPermissionSlugsToRoute[permission.slug] || '/' + permission.slug)
    .filter(permissionSlug => allPrivateRoutesSet.has(permissionSlug))

  // Push all public routes
  routesForUser.push(...Object.values(publicRoutes))
  return new Set(routesForUser)
}