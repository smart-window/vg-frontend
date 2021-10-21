import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import ClientCompaniesTable from 'web/pages/Companies/components/ClientCompaniesTable/ClientCompaniesTable'
import PartnerCompaniesTable from 'web/pages/Companies/components/PartnerCompaniesTable/PartnerCompaniesTable'
import TabControl from 'web/components/TabControl/TabControl.js'
import { routes } from 'web/constants/routeConstants'

import {
  DivCompanies,
  DivCompaniesHeaderContainer
} from './Companies.styles'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

const CLIENTS_VIEW_TAB = 0
const PARTNERS_VIEW_TAB = 1

const clientCompaniesTabs = [
  {
    id: CLIENTS_VIEW_TAB,
    label: 'Clients',
    analyticsCategory: 'Clients',
  },
  {
    id: PARTNERS_VIEW_TAB,
    label: 'Partners',
    analyticsCategory: 'Partners'
  },
]

const tabNames = {
  client: CLIENTS_VIEW_TAB,
  partner: PARTNERS_VIEW_TAB,
}

const routeNames = {
  [CLIENTS_VIEW_TAB]: 'client',
  [PARTNERS_VIEW_TAB]: 'partner',
}

/**
 * Renders a page where users can search and filter the companies.
 * @category Components - Web
 * @namespace Companies
 */
export default function Companies() {
  const { type = routeNames[CLIENTS_VIEW_TAB] } = useParams()
  const selectedTab = tabNames[type]
  const history = useHistory()

  /**
   * Fires on tab selection, replaces history with tab url
   * @param {integer} tab integer representing selected tab id
   */
  function handleTabSelect(tab) {
    history.push(routes.CLIENT_COMPANIES + `/${routeNames[tab]}`)
  }

  return (
    <DivCompanies>
      <DivCompaniesHeaderContainer>
        <TabControl
          tabs={clientCompaniesTabs}
          onTabSelect={handleTabSelect}
          selectedTabId={selectedTab}
        />
      </DivCompaniesHeaderContainer>
      <Switch>
        <Route path={routes.CLIENT_COMPANIES_TABLE}>
          <ClientCompaniesTable />
        </Route>
        <Route path={routes.PARTNER_COMPANIES_TABLE}>
          <PartnerCompaniesTable />
        </Route>
        <Route path="*">
          <ClientCompaniesTable />
        </Route>
      </Switch>
    </DivCompanies>
  )
}
