import styled from 'styled-components'
import {SectionContainer} from 'web/components/ExpandableSection/ExpandableSection.styles'
import {DivHeaderContainer, DivHeaderCellLabel} from 'web/modules/Grid/components/GridHeader/GridHeader.styles'
import {DivRow} from 'web/modules/Grid/Grid.styles'

export const DivContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;

  ${SectionContainer} {
    margin-top: 36px;
  }

  ${DivHeaderContainer} {
    height: 24px;
  }

  ${DivHeaderCellLabel} {
    font-size: 0.8rem;
  }

  ${DivRow} {
    height: 24px;
  }
`