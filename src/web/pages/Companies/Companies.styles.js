import styled from 'styled-components'
import { DivSupportedEmployeesTable } from 'web/components/SupportedEmployeesTable/SupportedEmployeesTable.styles'

export const DivCompanies = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 18px 18px 18px;

  ${DivSupportedEmployeesTable} {
    margin-top: 10px;
  }
`

export const DivCompaniesHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0 10px 0;
`
