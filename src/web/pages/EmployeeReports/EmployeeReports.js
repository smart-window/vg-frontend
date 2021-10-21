import React, {useState} from 'react'

import TabControl from 'web/components/TabControl/TabControl.js'
import TimeTrackingReport from 'web/components/TimeTrackingReport/TimeTrackingReport.js'
import EmployeeTrainingReport from 'web/components/EmployeeTrainingReport/EmployeeTrainingReport.js'

import {
  DivEmployeeReports,
  DivEmployeeReportsHeaderContainer
} from './EmployeeReports.styles'

const TIME_TRACKING_TAB = 0
const TRAINING_TAB = 1

const employeeReportingTabs = [
  { id: TIME_TRACKING_TAB, label: 'Time Tracking', analyticsCategory: 'Time Tracking' },
  { id: TRAINING_TAB, label: 'Employee Training', analyticsCategory: 'EE Employment Training' }
]

/**
 * Renders time tracking report
 * @category Components - Web
 * @namespace TimeTrackingReport
 */
export default function EmployeeReports() {

  const [selectedTab, setSelectedTab] = useState(TIME_TRACKING_TAB)

  return (
    <DivEmployeeReports>
      <DivEmployeeReportsHeaderContainer>
        <TabControl
          tabs={employeeReportingTabs}
          onTabSelect={setSelectedTab}
          selectedTabId={selectedTab}
        />
      </DivEmployeeReportsHeaderContainer>
      {selectedTab === TIME_TRACKING_TAB
        ? <TimeTrackingReport/>
        : <EmployeeTrainingReport/>
      }
    </DivEmployeeReports>
  )
}
