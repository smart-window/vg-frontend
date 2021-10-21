import styled from 'styled-components'
import { colors, fonts } from 'shared/constants/cssConstants'
import { SectionGridContainer } from 'web/modules/Grid/Grid.styles'

export const DivDocumentManagementContainer = styled.div`
  display: flex;
  height: 100%;
`

export const H2Subheader = styled.h2`
  font-family: ${fonts.helvetica};
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 21px;
`

export const DivDocumentTemplatesTable = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 0 18px 28px 18px;
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

export const DivTableTitle = styled.div`
  padding-top: 18px;
  display: flex;
  flex-direction: row;
  font-family: ${fonts.openSans};
  font-size: 1.2rem;
  font-weight: 600;
`

export const DivBottomSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

export const ButtonCreateTemplate = styled.button`
  display: flex;
  align-items: center;
  font-family: ${fonts.helvetica};
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 21px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`

export const DivPlusIconContainer = styled.div`
  height: 24px;
  width: 24px;
  margin-right: 6px;

  svg {
    height: 24px;
    width: 24px;
    fill: ${colors.successGreen};

    use {
      fill: ${colors.successGreen};
    }

    ellipse {
      stroke: ${colors.successGreen};
    }
  }
`

export const DivSidebar = styled.div`
  transition: width .2s ease-in, padding .2s ease-in;
  padding: ${p => p.open ? '4px': 0};
  flex-shrink: 0;
  width: ${p => p.open ? '450px': 0};
  height: 100%;
  overflow: hidden;
`