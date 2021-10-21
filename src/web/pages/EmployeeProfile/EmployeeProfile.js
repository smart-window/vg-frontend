import React, {useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { Route, Switch } from 'react-router-dom'
import useMatchTabPath from 'web/hooks/useMatchTabPath'

import TabControl from 'web/components/TabControl/TabControl'
import PegaContainer from 'web/components/PegaContainer/PegaContainer'
import arrowBackButton from 'assets/images/icons/arrowBackButton.svg'
import { routes } from 'web/constants/routeConstants'
import EmployeeInformation from 'web/modules/EmployeeInformation/EmployeeInformation.js'
import LocalLoader from 'web/components/LocalLoader/LocalLoader'
import useGetUserDocumentsQuery from 'shared/hooks/queries/useDocumentsUserQuery.js'
import DocumentsPage from 'web/components/DocumentsPage/DocumentsPage'
import { documentTypes } from 'web/constants/documentConstants'
import EmployeeWorkInformation from 'web/modules/EmployeeWorkInformation/EmployeeWorkInformation'
import {employmentFragment} from 'web/apollo/fragments/employmentFragments'

import {
  DivContainer,
  SectionContentContainer,
  DivProfileHeader,
  SpanUserName,
  SpanUserTitle,
} from './EmployeeProfile.styles'

const INFORMATION_TAB = 0
const WORK_INFORMATION_TAB = 1
const PAYROLL_TAB = 2
const TIME_OFF_TAB = 3
const DOCUMENTS_TAB = 4

const employeeReportingTabs = [
  { id: INFORMATION_TAB, label: 'Employee Information', analyticsCategory: 'Profile', route: routes.SUPPORTED_EMPLOYEE},
  { id: WORK_INFORMATION_TAB, label: 'Work Information', analyticsCategory: 'Profile', route: routes.SUPPORTED_EMPLOYEE_WORK_INFORMATION},
  { id: PAYROLL_TAB, label: 'Payroll', analyticsCategory: 'Profile', route: routes.SUPPORTED_EMPLOYEE_PAYROLL},
  { id: TIME_OFF_TAB, label: 'Time Off', analyticsCategory: 'Profile', route: routes.SUPPORTED_EMPLOYEE_TIMEOFF},
  { id: DOCUMENTS_TAB, label: 'Documents', analyticsCategory: 'Profile', route: routes.SUPPORTED_EMPLOYEE_DOCUMENTS},
]

const tabIdToPegaHarness = {
  [PAYROLL_TAB]: 'EmployeePayrollHarness',
  [TIME_OFF_TAB]: 'EmployeePTOHarness',
  [DOCUMENTS_TAB]: ''
}

export const EMPLOYEE_QUERY = gql`
  query Employee($id: ID!) {
    employee(id: $id) {
      pegaAk
      user {
        fullName
        id
        lastName
        firstName
      }
      employments {
        ...EmploymentFields
      }
    }
  },
  ${employmentFragment}
`

/**
 * A detailed view of an EE's profile.
 * @category Pages
 * @namespace EmployeeProfile
 */
export default function EmployeeProfile() {
  const matchTab = useMatchTabPath()
  const currentTab = matchTab(employeeReportingTabs)
  const selectedTab = currentTab ? currentTab.id : INFORMATION_TAB
  const history = useHistory()
  const [selectedTabId, setSelectedTabId] = useState(selectedTab)
  const [savingChanges, setSavingChanges] = useState(false)

  const {employeeId} = useParams()
  const {data: {employee = {}} = {}} = useQuery(EMPLOYEE_QUERY, {
    variables: {
      id: employeeId
    }
  })

  const userId = employee.user?.id
  const { data: {userDocuments = []} = {}, loading} = useGetUserDocumentsQuery(userId)

  /**
   * Fires on tab selection, replaces history with tab url
   * @param {integer} tab integer representing selected tab id
   */
  function handleTabSelect(tab) {
    const tabPath = employeeReportingTabs[tab].route.replace(':employeeId', employeeId)
    history.replace(tabPath)
    setSelectedTabId(tab)
  }

  return (
    <DivContainer>
      <TabControl
        tabs={employeeReportingTabs}
        onTabSelect={handleTabSelect}
        selectedTabId={selectedTabId}
      />
      <DivProfileHeader>
        <img src={arrowBackButton} onClick={history.goBack} alt='back button'/>
        <SpanUserName>{employee.user?.fullName}</SpanUserName>
        <SpanUserTitle>User's title goes here</SpanUserTitle>
        <LocalLoader visible={savingChanges}/>
      </DivProfileHeader>
      <SectionContentContainer>
        <Switch>
          <Route path={routes.SUPPORTED_EMPLOYEE_WORK_INFORMATION}>
            <EmployeeWorkInformation employee={employee} setSavingFields={setSavingChanges}/>
          </Route>
          <Route path={routes.SUPPORTED_EMPLOYEE_PAYROLL}>
            <PegaContainer
              operatorId={employee?.pegaAk}
              harnessName={tabIdToPegaHarness[selectedTabId]}
              pegaClassName='Data-Portal'
            />
          </Route>
          <Route path={routes.SUPPORTED_EMPLOYEE_TIMEOFF}>
            <PegaContainer
              operatorId={employee?.pegaAk}
              harnessName={tabIdToPegaHarness[selectedTabId]}
              pegaClassName='Data-Portal'
            />
          </Route>
          <Route path={routes.SUPPORTED_EMPLOYEE_DOCUMENTS}>
            {!loading && <DocumentsPage entityId={parseInt(employeeId)} documents={userDocuments} type={documentTypes.EMPLOYEE}/>}
          </Route>
          <Route path={'/'}>
            <EmployeeInformation employee={employee} setSavingFields={setSavingChanges}/>
          </Route>
        </Switch>
      </SectionContentContainer>
    </DivContainer>
  )
}
