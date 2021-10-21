import React from 'react'
import PropTypes from 'prop-types'
import analyticsService from 'web/services/analyticsService'
import stringFormatter from 'shared/services/stringFormatter'

import {
  DivContainer,
  DivTabItem
} from './TabControl.styles'

TabControl.propTypes = {
  /** tabs */
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  /** selected tab */
  selectedTabId: PropTypes.number,
  /** Function to handle a tab switch
    param: selected tab id from tabs
  */
  onTabSelect: PropTypes.func
}

/**
 * A simple tabcontrol
 * @category Components - Web
 * @namespace TabControl
 */
export default function TabControl(props) {

  const {tabs, onTabSelect} = props
  const selectedTabId = props.selectedTabId || tabs[0].id

  /**
   * Handles tab item selection notifying owner via the onTabSelect property.
   * @param {object} event
   */
  function handleTabChange(e) {
    const newSelectedTab = parseInt(e.target.dataset.tabid, 10)
    onTabSelect(newSelectedTab)
    analyticsService.logEvent(
      tabs[newSelectedTab].analyticsCategory,
      'Clicked',
      `Tab_${stringFormatter.removeSpaces(tabs[newSelectedTab].label)}`
    )
  }

  return (
    <DivContainer>
      {tabs.map(tab => (
        <DivTabItem key={tab.id} data-tabid={tab.id} onClick={handleTabChange} selected={selectedTabId === tab.id}>{tab.label}</DivTabItem>
      ))}
    </DivContainer>
  )
}
