import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { routes } from 'web/constants/routeConstants'
import ClientOnboardingsTable from 'web/components/ClientOnboardingsTable/ClientOnboardingsTable'
import EmployeeOnboardingsTable from 'web/components/EmployeeOnboardingsTable/EmployeeOnboardingsTable'

import TabControl from 'web/components/TabControl/TabControl.js'

import {
  DivOnboarding,
  DivOnboardingHeaderContainer,
} from './Onboarding.styles'

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
 * Renders a list of employee onboarding of a job by an employee under a contract by default
 * If Clients tab is selected, renders a list of client onboarding under a contract
 * @category Components - Web
 * @namespace Onboarding
 */
export default function Onboarding() {
  const { pathname } = useLocation()
  const history = useHistory()
  const [selectedTab, setSelectedTab] = useState(EMPLOYEES_VIEW_TAB)
  const [filters, setFilters] = useState([])

  useEffect(
    function setDefaultRoute() {
      const [, , urlTab] = pathname.split('/')
      if (!urlTab) {
        history.push(`${pathname}/employee`)
      }
      else {
        setSelectedTab(tabNames[urlTab])
      }
    },
    [pathname]
  )

  /**
   * Fires on tab selection, replaces history with tab url
   * @param {integer} tab integer representing selected tab id
   */
  function handleTabSelect(tab) {
    history.push(`/onboarding/${routeNames[tab]}`)
    setSelectedTab(tab)
  }

  return (
    <DivOnboarding>
      <DivOnboardingHeaderContainer>
        <TabControl
          tabs={employeeReportingTabs}
          onTabSelect={handleTabSelect}
          selectedTabId={selectedTab}
        />
      </DivOnboardingHeaderContainer>
      <Switch>
        <Route path={routes.ONBOARDING_EMPLOYEE_TABLE}>
          <EmployeeOnboardingsTable filters={filters} setFilters={setFilters} />
        </Route>
        <Route path={routes.ONBOARDING_CLIENT_TABLE}>
          <ClientOnboardingsTable filters={filters} setFilters={setFilters} />
        </Route>
      </Switch>
    </DivOnboarding>
  )
}
