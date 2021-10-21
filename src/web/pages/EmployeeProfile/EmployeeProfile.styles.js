import styled from 'styled-components'
import {DivPegaContainer} from 'web/components/PegaContainer/PegaContainer.styles'
import {DivContainer as DivTabsContainer} from 'web/components/TabControl/TabControl.styles'
import {DivLocalLoader} from 'web/components/LocalLoader/LocalLoader'
import {colors, fonts} from 'shared/constants/cssConstants'

export const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-left: 18px;
  background-color: ${colors.white};

  ${DivPegaContainer} {
    height: 100%;
    width: 100%;
  }
  ${DivTabsContainer} {
    justify-content: flex-start;
  }
  ${DivLocalLoader} {
    margin-left: 24px;
  }
`

export const DivProfileHeader = styled.header`
  height: 24px;
  margin-top: 21px;
  display: flex;
    flex-direction: row;
    align-items: center;
  font: ${fonts.helvetica};
  img {
    cursor: pointer;
  }
`

export const SpanUserName = styled.span`
  font-size: 1.2rem;
  color: ${colors.charcoal};
  margin-left: 9px;
`

export const SpanUserTitle = styled.span`
  font-size: 1rem;
  color: ${colors.gray50};
  margin-left: 24px;
`

export const SectionContentContainer = styled.section`
 width: 100%;
 height: calc(100% - 74px);
`