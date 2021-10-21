import React, {useContext, useState, useEffect} from 'react'
import {useOktaAuth} from '@okta/okta-react'
import {useHistory} from 'react-router'
import {useLocation} from 'react-router-dom'

import {AppModeContext, AppModes} from 'web/providers/AppModeProvider'
import usePermissions from 'web/hooks/usePermissions'
import permissions from 'shared/constants/permissions'
import {routes} from 'web/constants/routeConstants'
import GlobalNav from './components/GlobalNav/GlobalNav'
import UserProfileDropdown from './components/UserProfileDropdown/UserProfileDropdown'
import NotificationsDropdown from './components/NotificationsDropdown/NotificationsDropdown'
import AddNewDropdown from './components/AddNewDropdown/AddNewDropdown'
import SearchButton from './components/SearchButton/SearchButton'

import VGLogoImg from 'assets/images/velocityGlobalLogoFull.svg'
import BlueLineImg from 'assets/images/GlobalHeader/blueLine.png'

import {
  DivGlobalHeaderContainer,
  ImgLogo,
  DivControls,
  DivTopRow,
  ImgBlueBorder
} from './GlobalHeader.styles'

/**
 * The top-level header for the app, always displayed as long as the user is logged in.
 * Contains nav-items and top-level user actions such as 'new' and 'logout'
 * @category Modules - Web
 * @subcategory GlobalHeader
 * @namespace GlobalHeader
 */
export default function GlobalHeader(props) {
  const { authState } = useOktaAuth()
  const currentLocation = useLocation()
  const history = useHistory()
  const [selectedNavItemRoute, setSelectedNavItemRoute] = useState(currentLocation.pathname)
  const userPermissionsSet = usePermissions()
  const userCanViewNotifications = userPermissionsSet.has(permissions.NOTIFICATIONS)
  const userCanViewSearch = userPermissionsSet.has(permissions.SEARCH)
  const {appMode} = useContext(AppModeContext)
  const inOnboardingMode = appMode === AppModes.ONBOARDING

  useEffect(function didUpdate() {
    // If the route changes, update the header state to display selected item.
    if (currentLocation.pathname !== selectedNavItemRoute) {
      setSelectedNavItemRoute(currentLocation.pathname)
    }
  }, [currentLocation.pathname, selectedNavItemRoute])

  /**
   * Update the current app route based on selected nav item/icon.
   * @param {string} route a route in App.js
   */
  function setNavRoute(route) {
    if (route === selectedNavItemRoute) {
      // refresh current route
      history.go(0)
    }
    else {
      setSelectedNavItemRoute(route)
      history.push(route)
    }
  }

  return (
    <DivGlobalHeaderContainer data-testid='global-header'>
      <DivTopRow>
        { !inOnboardingMode && <ImgLogo src={VGLogoImg} onClick={() => setNavRoute(routes.HOME)} alt='Velocity Global' role='button' />}
        { authState.isAuthenticated &&
          <DivControls role='toolbar'>
            { userCanViewSearch && <SearchButton/> }
            { userCanViewNotifications && <NotificationsDropdown/> }
            { !inOnboardingMode && <AddNewDropdown/> }
            <UserProfileDropdown/>
          </DivControls>
        }
      </DivTopRow>
      { !inOnboardingMode && <GlobalNav selectedNavItemRoute={selectedNavItemRoute} setNavRoute={setNavRoute}/> }
      { !inOnboardingMode && <ImgBlueBorder src={BlueLineImg} alt='border'/>}
    </DivGlobalHeaderContainer>
  )
}
