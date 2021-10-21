import styled from 'styled-components'
import { DivSupportedEmployeesTable } from 'web/components/SupportedEmployeesTable/SupportedEmployeesTable.styles'

export const DivOnboarding = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 18px 18px 18px;

  ${DivSupportedEmployeesTable} {
    margin-top: 10px;
  }
`

export const DivOnboardingHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0 10px 0;
`

export const CommingSoon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  width: 100%;
`