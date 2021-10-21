import React, {useState} from 'react'

import TabControl from 'web/components/TabControl/TabControl.js'
import SupportedEmployeesTable from 'web/components/SupportedEmployeesTable/SupportedEmployeesTable.js'
import EmployeeMap from 'web/components/EmployeeMap/EmployeeMap.js'

import {
  DivSupportedEmployees,
  DivSupportedEmployeesHeaderContainer
} from './SupportedEmployees.styles'

const GLOBAL_VIEW_TAB = 0
const LIST_VIEW_TAB = 1

const employeeReportingTabs = [
  { id: GLOBAL_VIEW_TAB, label: 'Global View', analyticsCategory: 'Global View' },
  { id: LIST_VIEW_TAB, label: 'List View', analyticsCategory: 'List View' }
]

/**
 * Renders time tracking report
 * @category Components - Web
 * @namespace TimeTrackingReport
 */
export default function SupportedEmployees() {

  const [selectedTab, setSelectedTab] = useState(GLOBAL_VIEW_TAB)
  const [filters, setFilters] = useState([])

  return (
    <DivSupportedEmployees>
      <DivSupportedEmployeesHeaderContainer>
        <TabControl
          tabs={employeeReportingTabs}
          onTabSelect={setSelectedTab}
          selectedTabId={selectedTab}
        />
      </DivSupportedEmployeesHeaderContainer>
      {selectedTab === GLOBAL_VIEW_TAB
        ? <EmployeeMap setSelectedTab={setSelectedTab} setFilters={setFilters} />
        : <SupportedEmployeesTable filters={filters} setFilters={setFilters} />
      }
    </DivSupportedEmployees>
  )
}
