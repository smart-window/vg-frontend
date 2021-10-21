import React, {useState} from 'react'
import {useHistory} from 'react-router'
import {useLocation} from 'react-router-dom'

import {routes} from 'web/constants/routeConstants'
import useAccessibleRoutes from 'web/hooks/useAccessibleRoutes'
import analyticsService from 'web/services/analyticsService'

import DropdownModal from 'web/components/DropdownModal/DropdownModal'
import MenuWrapper from 'web/components/MenuWrapper/MenuWrapper'
import ControlsItem from '../ControlsItem/ControlsItem'
import PlusButtonIcon from 'web/components/DynamicIcons/PlusButtonIcon'
import {SpanControlsItemContainer, DivMenuItem} from './AddNewDropdown.styles'

const menuHeaderTitle = 'Add/Edit'
const menuItems = [
  { name: 'Payroll Request', route: routes.PAYROLL_REQUEST, analyticsAction: 'PayrollRequest'},
  { name: 'Payroll Deactivation', route: routes.PAYROLL_DEACTIVATION, analyticsAction: 'PayrollDeactivation'},
  { name: 'PTO Request', route: routes.PTO_REQUEST, analyticsAction: 'PTORequest'},
  { name: 'Manage Employee', route: routes.EMPLOYEE_PROFILE, analyticsAction: 'ManageEmployeeProfile'},
  { name: 'Manage My Profile', route: routes.MANAGE_MY_PROFILE, analyticsAction: 'ManageEmployeeProfile'},
  { name: 'Manage ICP', route: routes.ICP_PROFILE, analyticsAction: 'ManageICPProfile'},
  { name: 'Manage ICP Contact', route: routes.ICP_CONTACT_PROFILE, analyticsAction: 'ManageICPContactProfile'},
  { name: 'Manage Client', route: routes.CLIENT_PROFILE, analyticsAction: 'ManageClientProfile'},
  { name: 'Manage Client Manager', route: routes.CLIENT_MANAGER_PROFILE, analyticsAction: 'ManageClientManagerProfile'},
  { name: 'Manage Velocity Global Employee', route: routes.VG_EMPLOYEE_PROFILE, analyticsAction: 'ManageVelocityGlobalEmployeeProfile'},
  { name: 'Case Management Support Case', route: routes.SUPPORT_CASE, analyticsAction: 'SupportCase'},
  { name: 'Upload Documents', route: routes.UPLOAD_DOCUMENTS, analyticsAction: 'UploadDocuments'},
]

/**
 * Uses ControlsItem to invoke an 'add/edit' (PEGA) DropdownModal when clicked.
 * @category Modules - Web
 * @subcategory GlobalHeader
 * @namespace AddNewDropdown
 */
export default function AddNewDropdown(props) {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const routesForUserSet = useAccessibleRoutes()
  const currentLocation = useLocation()
  const history = useHistory()

  /** Close DropdownModal */
  function closeDropdown() {
    analyticsService.logEvent('AddNew', 'AddNewClose')
    setDropdownIsOpen(false)
  }

  /** Open DropdownModal */
  function openDropdown() {
    analyticsService.logEvent('AddNew', 'AddnewOpen')
    setDropdownIsOpen(true)
  }

  /**
   * Close Dropdown and navigate to route for menu item
   * @param {object} menuItem - maps to a member of menuItems[] at the top of the file
   */
  function handleMenuItemClick(menuItem) {
    if (currentLocation.pathname === menuItem.route) {
      // refresh current route
      history.go(0)
    }
    else {
      analyticsService.logEvent('AddNew', menuItem.analyticsAction)
      history.push(menuItem.route)
    }
    setDropdownIsOpen(false)
  }

  const menuContents = menuItems
    .filter(item => routesForUserSet.has(item.route))
    .map(item => {
      return (
        <DivMenuItem
          onClick={() => handleMenuItemClick(item)}
          key={item.route}
          role='menuItem'
        >
          {item.name}
        </DivMenuItem>
      )
    })

  const dropdownContents = (
    <DropdownModal closeModal={closeDropdown}>
      <MenuWrapper icon={<PlusButtonIcon/>} headerTitle={menuHeaderTitle}>
        {menuContents}
      </MenuWrapper>
    </DropdownModal>
  )

  return (
    <SpanControlsItemContainer>
      <ControlsItem
        onClick={openDropdown}
        icon={PlusButtonIcon}
        label={menuHeaderTitle}
        menuHeaderTitle={menuHeaderTitle}
      >
        { dropdownIsOpen && dropdownContents }
      </ControlsItem>
    </SpanControlsItemContainer>
  )
}