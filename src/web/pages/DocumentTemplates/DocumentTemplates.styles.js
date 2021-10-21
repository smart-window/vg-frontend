import styled from 'styled-components'
import { colors, fonts } from 'shared/constants/cssConstants'
import { SectionGridContainer } from 'web/modules/Grid/Grid.styles'

export const H2Subheader = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 10px 0;
`

export const Table = styled.table`
  border: 1px solid black;
  width: 100%;
  text-align: center;
`

export const Trow = styled.tr`
  border: 1px solid black;
`

export const Td = styled.td `
  padding: 10px 0;
`

export const DivTimeTrackingReport = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 18px 18px 18px;

  ${SectionGridContainer} {
    height: calc(100% - 48px); // subtract report header
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
  margin-left: 21px;
  font-family: ${fonts.openSans};
  font-size: 0.8rem;
  font-style: italic;
  font-weight: 400;
  line-height: 16px;
  p {
    margin-right: 6px;
  }
`

export const SectionEmptyState = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  div {
    width: 100%;
  }
  img {
    width: 100%;
  }
`

export const DivGrayHeader = styled.div`
  width: 100%;
  height: 30px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: ${colors.coolGray};
`

export const DivEmptyStateInstructions = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  p {
    width: 248px;
    font-family: ${fonts.openSans};
    font-size: 1rem;
    font-style: italic;
    font-weight: 400;
    line-height: 22px;
  }
  span {
    font-family: ${fonts.openSans};
    font-size: 1rem;
    font-style: italic;
    font-weight: 700;
    line-height: 22px;
  }
`

export const DivDownloadContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid black;
  cursor: pointer;
`
