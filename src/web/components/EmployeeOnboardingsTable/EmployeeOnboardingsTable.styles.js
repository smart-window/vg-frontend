import styled from 'styled-components'
import { fonts } from 'shared/constants/cssConstants'
import { SectionGridContainer } from 'web/modules/Grid/Grid.styles'

export const DivContainer = styled.div`
  display: flex;
  height: 100%;
  margin-top: 10px;
`

export const DivEmployeeOnboardingsTable = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 0 18px 18px 18px;
  ${SectionGridContainer} {
    height: calc(100% - 54px); // subtract report header
  }
`

export const DivFilterContainer = styled.div`
padding-top: 10px;
`

export const DivHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding: 0 0 10px 0;
  top: -50px;
  right: 18px;
  position: absolute;
  width: calc(100% - 250px);
`

export const DivReportHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  h1 {
    font-family: ${fonts.helvetica};
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 21px;
  }
`

export const DivRecordsContainer = styled.div`
  padding-top: 18px;
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  font-family: ${fonts.openSans};
  font-size: 0.8rem;
  font-style: italic;
  font-weight: 400;
  line-height: 16px;
  p {
    margin-right: 6px;
  }
`
