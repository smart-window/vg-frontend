import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { SecureRoute } from '@okta/okta-react'
import {CurrentUserContext} from 'web/providers/CurrentUserProvider.web'

PrivateRoute.propTypes = {
  /** The content protected by this route. Should be a react component or HTML */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  /** React component if not using children (like classic Route) */
  component: PropTypes.func,
  /** The Route's path */
  path: PropTypes.string
}

/**
 * This component represents a route with Authorization.
 * It uses component composition (props.children) to pass underlying content.
 * @category Components - Web
 * @namespace PrivateRoute
 */
export default function PrivateRoute(props) {
  // 'component' renamed bc components have to be upper case in jsx
  const {children, path, permissionSlug, component: Component, ...rest} = props
  const {permissions, userDataLoading} = useContext(CurrentUserContext)
  const userPermissionSlugs = permissions.map(permission => permission.slug)
  const userPermissionSlugSet = new Set(userPermissionSlugs)

  /** Render prop for underlying okta SecureRoute */
  function renderRouteWithPermissions() {
    if (userDataLoading) return null

    // Avoid matching path params etc
    const firstPartOfPath = path.split('/')[1]
    const routePermission = permissionSlug || firstPartOfPath
    if (userPermissionSlugSet.has(routePermission)) {
      return children || <Component/>
    }
    else {
      // user not autorized for route
      return <Redirect to={{pathname: '/'}}/>
    }
  }

  return (
    <SecureRoute
      render={renderRouteWithPermissions}
      path={path}
      {...rest}
    />
  )
}