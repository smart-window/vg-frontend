import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

import TabControl from 'web/components/TabControl/TabControl.js'
import ProcessBoard from 'web/modules/ProcessBoard/ProcessBoard'

import {
  DivOnboarding,
  DivOnboardingHeaderContainer,
} from './OnboardingDetail.styles'

const EMPLOYEES_VIEW_TAB = 0
const CLIENTS_VIEW_TAB = 1

const employeeReportingTabs = [
  {
    id: EMPLOYEES_VIEW_TAB,
    label: 'Employees',
    analyticsCategory: 'Employees',
  },
  { id: CLIENTS_VIEW_TAB, label: 'Clients', analyticsCategory: 'Clients' },
]

const routeNames = {
  [EMPLOYEES_VIEW_TAB]: 'employee',
  [CLIENTS_VIEW_TAB]: 'client',
}

const tabNames = {
  employee: EMPLOYEES_VIEW_TAB,
  client: CLIENTS_VIEW_TAB,
}

/**
 * Renders a detailed view of a single onboarding process
 * @category Components - Web
 * @namespace OnboardingDetail
 */
export default function OnboardingDetail() {
  const { tab } = useParams()
  const history = useHistory()

  /**
   * Fires on tab selection, replaces history with tab url
   * @param {integer} tab integer representing selected tab id
   */
  function handleTabSelect(tab) {
    history.replace(`/onboarding/${routeNames[tab]}`)
  }

  return (
    <DivOnboarding>
      <DivOnboardingHeaderContainer>
        <TabControl
          tabs={employeeReportingTabs}
          onTabSelect={handleTabSelect}
          selectedTabId={tabNames[tab]}
        />
      </DivOnboardingHeaderContainer>
      <ProcessBoard />
    </DivOnboarding>
  )
}
