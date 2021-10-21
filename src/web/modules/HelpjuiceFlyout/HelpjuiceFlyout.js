import React, { useEffect, useContext } from 'react'
import { useOktaAuth } from '@okta/okta-react'

import analyticsService from 'web/services/analyticsService'
import scriptsHelper from 'web/services/scriptsHelper'
import usePermissions from 'web/hooks/usePermissions'
import permissions from 'shared/constants/permissions'

import {colors} from 'shared/constants/cssConstants'
import XIcon from 'web/components/DynamicIcons/XIcon'
import drawerTabImg from 'assets/images/Helpjuice/helpjuiceDrawerTab.svg'
import drawerBorderImg from 'assets/images/Helpjuice/helpjuiceDrawerBorder.svg'

import {
  AsideFlyoutContainer,
  ImgTabButton,
  ImgLeftBorder,
  DivContent,
  SpanCloseIconContainer
} from './HelpjuiceFlyout.styles'
import { HelpjuiceFlyoutContext } from 'web/providers/HelpjuiceFlyoutProvider'

global.helpjuice_account_url = 'https://kb.velocityglobal.com'

/**
*
* 'Flyout' side drawer component for Helpjuice.
*  Uses external script to load it into div with id=helpjuice_js_widget_content.
*  - https://help.helpjuice.com/integrations
*  @category Modules - Web
*  @subcategory HelpjuiceFlyout
*  @namespace HelpjuiceFlyout
*/
export default function HelpjuiceFlyout() {
  const { authState } = useOktaAuth()
  const {isExpanded, setIsExpanded} = useContext(HelpjuiceFlyoutContext)
  const userPermissionsSet = usePermissions()
  const userCanViewHelpjuice = userPermissionsSet.has(permissions.KNOWLEDGE_MANAGEMENT)

  useEffect(function didUpdate() {
    if (authState.isAuthenticated && userCanViewHelpjuice) {
      // set global var required for helpjuice and load script
      scriptsHelper.loadExternalScript('helpjuice', 'https://s3.amazonaws.com/assets.helpjuice.com/helpjuice.min.js', true)
    }
  }, [userCanViewHelpjuice, authState.isAuthenticated])

  /** Close flyout */
  function closeFlyout() {
    setIsExpanded(false)
    analyticsService.logEvent('KnowledgeManagement', 'CloseDrawer')
  }
  /** Toggle flyout open or closed */
  function toggleFlyout() {
    const analyticsAction = isExpanded ? 'CloseDrawer' : 'OpenDrawer'
    analyticsService.logEvent('KnowledgeManagement', analyticsAction)
    setIsExpanded(!isExpanded)
  }

  if (!authState.isAuthenticated || !userCanViewHelpjuice) return null
  else return (
    <AsideFlyoutContainer isExpanded={isExpanded} data-testid='flyout-container'>
      <ImgTabButton src={drawerTabImg} onClick={toggleFlyout} alt='Open Knowledge Management' title='Knowledge Management' role='button'/>
      <ImgLeftBorder src={drawerBorderImg} alt='border'/>
      <DivContent id='helpjuice_js_widget_content'>
        <SpanCloseIconContainer onClick={closeFlyout} aria-label='Close Knowledge Management' role='button'>
          <XIcon fillColor={colors.coolGray}/>
        </SpanCloseIconContainer>
      </DivContent>
    </AsideFlyoutContainer>
  )
}