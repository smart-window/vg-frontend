import styled from 'styled-components'
import { SectionGridContainer } from 'web/modules/Grid/Grid.styles'

export const DivContainer = styled.div`
  display: flex;
  height: 100%;
  margin-top: 10px;
`
export const DivPartnerCompaniesTableContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 0 18px 18px 18px;
  ${SectionGridContainer} {
    height: calc(100% - 48px); // subtract report header
  }
`

export const DivSidebar = styled.div`
  transition: width .2s ease-in, padding .2s ease-in;
  padding: ${p => p.open ? '4px' : 0};
  flex-shrink: 0;
  width: ${p => p.open ? '348px' : 0};
  height: 415px;
  overflow: hidden;
  padding-top: 50px
`
export const DivPartnerCompaniesTable = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 0px 18px 0;
  ${SectionGridContainer} {
    height: calc(100% - 54px); // subtract report header
  }
`

export const DivFilterContainer = styled.div`
  padding-top: 10px;
`

export const DivHeaderContainer = styled.div`
  margin-top:-50px;
  margin-left:30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 0 10px 0;
`

export const DivPageTitle = styled.div`
  font-size: 1.2rem;
  line-height: 21px;
`

export const DivViewingRecords = styled.div`
  font-size: 0.8rem;
  line-height: 16px;
  display: flex;
  align-items: flex-end;
  span {
    text-decoration: underline;
    font-style: italic;
    margin-left: 5px;
    cursor: pointer;
  }
`