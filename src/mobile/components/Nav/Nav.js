import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components/native'
import mobilePageConstants from 'mobile/constants/mobilePageConstants'
import analyticsService from 'mobile/services/analyticsServiceMobile'

import {colors, measurements} from 'shared/constants/cssConstants'
import NavDashboardIcon from 'mobile/icons/DynamicIcons/NavDashboardIcon'
// import NavProfileIcon from 'mobile/icons/DynamicIcons/NavProfileIcon'
import NavCalendarIcon from 'mobile/icons/DynamicIcons/NavCalendarIcon'
import NavSettingsIcon from 'mobile/icons/DynamicIcons/NavSettingsIcon'

Nav.propTypes = {
  /** Automatically passed from navigator, used to change location/screen
   * https://reactnavigation.org/docs/navigation-prop */
  navigation: PropTypes.object,
  /** Automatically passed from navigator, used to read screen state
   * https://reactnavigation.org/docs/navigation-state */
  state: PropTypes.object
}

const ViewNav = styled.View`
  width: 100%;
  height: ${measurements.mobileNavBarHeight}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const TouchableOpacityNav = styled.TouchableOpacity`
  padding-left: 18px;
  ${props => props.firstIcon &&
    css`
      padding-left: 0;
    `}
`

const pageInfo = {
  [mobilePageConstants.DASHBOARD]: {icon: NavDashboardIcon, analyticsCategory: 'Dashboard'},
  // [mobilePageConstants.PROFILE]: {icon: NavProfileIcon},
  [mobilePageConstants.TIMETRACKING]: {icon: NavCalendarIcon, hasWhiteLineColor: true, analyticsCategory: 'TimeTracking'},
  [mobilePageConstants.SETTINGS]: {icon: NavSettingsIcon, analyticsCategory: 'Settings'},
}

/**
 * The bottom navigational component for a full mobile page component.
 * @category Components - Mobile
 * @namespace Nav
 */
export default function Nav(props) {
  const { navigation, state } = props

  function navigateToPage(item) {
    navigation.navigate(item)
    analyticsService.logEvent(pageInfo[item].analyticsCategory, 'Clicked', 'Icon_Nav')
  }

  const navLinks = Object.keys(pageInfo).map((item, index) => {
    const isFocused = state.index === index

    const IconToRender = pageInfo[item].icon
    // Check to see if svg has internal lines that should be outlined in white
    const lineColor = pageInfo[item].hasWhiteLineColor ? colors.white : colors.officialBlue
    return (
      <TouchableOpacityNav
        testID={'Nav' + item}
        key={index}
        firstIcon={index === 0}
        onPress={() => navigateToPage(item)}
      >
        <IconToRender
          lineColor={isFocused ? lineColor : undefined}
          fillColor={isFocused ? colors.officialBlue : undefined}
        />
      </TouchableOpacityNav>
    )
  })

  return (
    <ViewNav testID='Nav'>
      { navLinks }
    </ViewNav>
  )
}