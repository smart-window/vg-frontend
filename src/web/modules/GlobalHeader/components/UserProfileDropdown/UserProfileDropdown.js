import React, {useState, useContext} from 'react'
import { useOktaAuth } from '@okta/okta-react'
import {useHistory} from 'react-router'
import styled from 'styled-components'

import {CurrentUserContext} from 'web/providers/CurrentUserProvider.web'
import {GlobalLoaderContext} from 'shared/providers/GlobalLoaderProvider'
import analyticsService from 'web/services/analyticsService'

import pegaConstants from 'web/constants/pegaConstants'
import storageConstants from 'shared/constants/storageConstants'
import DropdownModal from 'web/components/DropdownModal/DropdownModal'
import MenuWrapper from 'web/components/MenuWrapper/MenuWrapper'
import UserIcon from 'web/components/DynamicIcons/UserIcon'
import ControlsItem from '../ControlsItem/ControlsItem'
import VgButton from 'web/components/VgButton/VgButton'
import {Button, SpanArrowIconContainer} from 'web/components/VgButton/VgButton.styles'
import localStorageService from 'web/services/localStorageService'

export const SpanControlsItemContainer = styled.span`
  display: inline-flex;
  ${Button} {
    margin-top: 21px;
    margin-bottom: 18px;
  }
  ${SpanArrowIconContainer} {
    height: 24px;
  }
`

const menuHeaderTitle = 'User Profile'

/**
 * Uses ControlsItem to invoke a profile DropdownModal when clicked.
 * @category Modules - Web
 * @subcategory GlobalHeader
 * @namespace UserProfileDropdown
 */
export default function UserProfileDropdown() {
  const history = useHistory()
  const { authState, oktaAuth } = useOktaAuth()
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const currentUserContext = useContext(CurrentUserContext)
  const {setIsLoading} = useContext(GlobalLoaderContext)

  /** Fire an Okta logout event */
  async function logout() {
    analyticsService.logEvent('Session', 'SignOut')
    // Update UI
    setDropdownIsOpen(false)
    setIsLoading(true)
    // Clear Pega session
    if (window.pega) {
      window.pega.web.api.doAction(pegaConstants.GADGET_NAME, 'logoff')
    }
    // Clear user data and log out
    history.push('/login')
    currentUserContext.clearUserData()
    localStorageService.removeFromStorage(storageConstants.EXPANDED_SECTIONS)
    await oktaAuth.signOut('/')
  }

  /** Close DropdownModal */
  function closeDropdown() {
    analyticsService.logEvent('UserProfile', 'UserProfileClose')
    setDropdownIsOpen(false)

  }

  /** Open DropdownModal */
  function openDropdown() {
    analyticsService.logEvent('UserProfile', 'UserProfileOpen')
    setDropdownIsOpen(true)
  }

  const dropdownContents = (
    <DropdownModal closeModal={closeDropdown}>
      <MenuWrapper icon={<UserIcon/>} headerTitle={menuHeaderTitle}>
        <VgButton arrowDirection={'right'} onClick={logout} text={'Sign Out'} invertColors={true} shape={'rectangle'}/>
      </MenuWrapper>
    </DropdownModal>
  )

  return (
    <SpanControlsItemContainer>
      <ControlsItem
        onClick={openDropdown}
        icon={UserIcon}
        label={currentUserContext.currentUser.fullName || authState?.idToken?.claims?.name || 'User Profile'}
        menuHeaderTitle={menuHeaderTitle}
      >
        { dropdownIsOpen && dropdownContents }
      </ControlsItem>
    </SpanControlsItemContainer>
  )
}