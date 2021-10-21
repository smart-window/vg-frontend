import styled from 'styled-components'
import {DivTimeTrackingReport, DivHeaderContainer as TimeTrackingHeaderContainer} from 'web/components/TimeTrackingReport/TimeTrackingReport.styles'
import {DivEmployeeTrainingReport, DivHeaderContainer as EmployeeTrainingHeaderContainer} from 'web/components/EmployeeTrainingReport/EmployeeTrainingReport.styles'

export const DivEmployeeReports = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 18px 18px 18px;

  ${DivTimeTrackingReport} {
    margin-top: 10px;
  }
  ${TimeTrackingHeaderContainer} {
    top: 0;
    right: 36px;
    position: absolute;
    width: calc(100% - 400px);
  }
  ${DivEmployeeTrainingReport} {
    margin-top: 10px;
  }
  ${EmployeeTrainingHeaderContainer} {
    top: 0;
    right: 36px;
    position: absolute;
    width: calc(100% - 400px);
  }
`

export const DivEmployeeReportsHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0 10px 0;
`
