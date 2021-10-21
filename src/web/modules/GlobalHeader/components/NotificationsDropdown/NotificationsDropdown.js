import React, {useCallback, useEffect, useState} from 'react'
import { useHistory } from 'react-router'

import {routes} from 'web/constants/routeConstants'
import dateHelper from 'shared/services/dateHelper'
import analyticsService from 'web/services/analyticsService'
import notificationsService from 'shared/services/notificationsService'

import DropdownModal from 'web/components/DropdownModal/DropdownModal'
import MenuWrapper from 'web/components/MenuWrapper/MenuWrapper'
import ControlsItem from '../ControlsItem/ControlsItem'
import UserInitials from 'web/components/UserInitials/UserInitials'
import NotificationsIcon from 'web/components/DynamicIcons/NotificationsIcon'
import ChevronArrowIcon from 'web/components/DynamicIcons/ChevronArrowIcon'

import EmptyBoxIcon from 'assets/images/icons/emptyBox.svg'
import {
  SpanControlsItemContainer,
  SpanNotificationsPip,
  DivNotificationItem,
  DivNotificationContents,
  DivNotificationMessage,
  DivNotificationMetadata,
  PMenuSubheader,
  SpanChevronIconContainer,
  DivEmptyContainer
} from './NotificationsDropdown.styles'

const menuHeaderTitle = 'Notifications'

/**
 * Uses ControlsItem to invoke a DropdownModal with a list of notifications from PEGA.
 * Data is hard-coded for now, but before release it should fetch notifications with the PEGA API.
 * @category Modules - Web
 * @subcategory GlobalHeader
 * @namespace NotificationsDropdown
 */
export default function NotificationsDropdown() {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [hasNewNotifications, setHasNewNotifications] = useState(null)
  const history = useHistory()

  /**
   * Fetches notifications from custom pega endpoint.
   * Memoized to prevent render loop in useEffect.
   */
  const fetchNotifications = useCallback(
    async function fetchNotifications() {
      const notificationsData = await notificationsService.fetchNotifications()
      setNotifications(notificationsData.notifications)
      setHasNewNotifications(notificationsData.hasNewNotifications)
    },
    []
  )

  useEffect(() => {
    // fetch once on mount
    fetchNotifications()

    // set up subsequent polling on 5 minute intervals
    const fiveMinutesMs = 300000
    const dataPollInterval = setInterval(fetchNotifications, fiveMinutesMs)

    return function cleanup() {
      clearInterval(dataPollInterval)
    }
  }, [fetchNotifications])

  /** Close DropdownModal */
  function closeDropdown() {
    analyticsService.logEvent('Notifications', 'CloseNotifications')
    setDropdownIsOpen(false)
  }

  /** Open DropdownModal */
  function openDropdown() {
    analyticsService.logEvent('Notifications', 'OpenNotifications')
    // ensure notifications update when opening the modal
    fetchNotifications()
    notificationsService.markNotificationsViewed()
    setDropdownIsOpen(true)
    setHasNewNotifications(false)
  }

  /** Route user to routes.NOTIFICATION_SETTINGS */
  function openNotificationSettings() {
    analyticsService.logEvent('Notifications', 'NotificationSettings')
    setDropdownIsOpen(false)
    history.push(routes.NOTIFICATION_SETTINGS)
  }

  /**
   * Route user to a specific case (based on a notification)
   * @param {string} caseId pega 'pzInsKey' for the case
   */
  function handleNotificationClick(notificationId, caseId) {
    // mark status as READ in Pega
    notificationsService.markNotificationRead(notificationId)
    // Update UI with notification removed from list (avoid another fetch)
    const updatedNotifications = notifications.filter(notif => notif.uuid !== notificationId)
    setNotifications(updatedNotifications)

    // open the case for the clicked notification
    const casePrefix = caseId.split('-')[0]
    analyticsService.logEvent('Notifications', 'NotificationClickthru', casePrefix)
    closeDropdown()
    history.push(routes.CASES + '/' + caseId)
  }

  const menuEmptyStateContents = (
    <DivEmptyContainer>
      <img src={EmptyBoxIcon} alt='empty-box'/>
      <h3>Nothing new for you</h3>
    </DivEmptyContainer>
  )

  const notificationItems = notifications.map(notification => {
    const {createTime, message, ID, createdBy_fullname, uuid} = notification
    const formattedDateString = dateHelper.getDateStringForMT(new Date(createTime))
    const caseId = ID.split(' ').pop()
    return (
      <DivNotificationItem onClick={() => handleNotificationClick(uuid, caseId)} key={createTime} role='menuItem'>
        <UserInitials fullName={createdBy_fullname}/>
        <DivNotificationContents>
          <DivNotificationMessage>{message}</DivNotificationMessage>
          <DivNotificationMetadata>{formattedDateString + ' · ' + caseId}</DivNotificationMetadata>
        </DivNotificationContents>
        <SpanChevronIconContainer>
          <ChevronArrowIcon/>
        </SpanChevronIconContainer>
      </DivNotificationItem>
    )
  })

  const hasNotifications = notificationItems.length
  const menuContents = hasNotifications ? notificationItems : menuEmptyStateContents
  const dropdownContents = (
    <DropdownModal closeModal={closeDropdown}>
      <MenuWrapper
        icon={<NotificationsIcon/>}
        headerTitle={menuHeaderTitle}
        subheaderContent={<PMenuSubheader role='button' onClick={openNotificationSettings}>Settings</PMenuSubheader>}
      >
        {menuContents}
      </MenuWrapper>
    </DropdownModal>
  )

  return (
    <SpanControlsItemContainer>
      <ControlsItem
        onClick={openDropdown}
        icon={NotificationsIcon}
        label={menuHeaderTitle}
        menuHeaderTitle={menuHeaderTitle}
      >
        { hasNewNotifications && <SpanNotificationsPip role='alert' aria-label='new notifications!' /> }
        { dropdownIsOpen && dropdownContents }
      </ControlsItem>
    </SpanControlsItemContainer>
  )
}