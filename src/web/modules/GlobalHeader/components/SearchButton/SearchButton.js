import React from 'react'
import {useHistory} from 'react-router'
import styled from 'styled-components'
import {useLocation} from 'react-router-dom'

import {routes} from 'web/constants/routeConstants'
import ControlsItem from '../ControlsItem/ControlsItem'
import SearchIcon from 'web/components/DynamicIcons/SearchIcon'
import analyticsService from 'web/services/analyticsService'

const SpanControlsItemContainer = styled.span`
  display: inline-flex;
`

/**
 * Uses a ControlsItem button to direct the user to routes.SEARCH
 * @category Modules - Web
 * @subcategory GlobalHeader
 * @namespace SearchButton
 */
export default function SearchButton(props) {
  const currentLocation = useLocation()
  const history = useHistory()
  const searchRouteSelected = currentLocation.pathname === routes.SEARCH

  /** Navigate to /search */
  function search() {
    if (!searchRouteSelected) {
      analyticsService.logEvent('Search', 'OpenSearch')
      history.push(routes.SEARCH)
    }
    else {
      // refresh search route
      history.go(0)
    }
  }

  return (
    <SpanControlsItemContainer>
      <ControlsItem
        onClick={search}
        icon={SearchIcon}
        isSelected={searchRouteSelected}
        label={'Search'}
      />
    </SpanControlsItemContainer>
  )
}