import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'
import {DivContainer as DivTabsContainer} from 'web/components/TabControl/TabControl.styles'
import {DivAddButtonContainer} from 'web/components/AddButton/AddButton'
import {DivInputWrapper} from 'web/modules/VgInput/VgInput.styles'
import {SectionContainer} from 'web/components/ExpandableSection/ExpandableSection.styles'

export const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 27px;
  background-color: ${colors.white};

  ${DivTabsContainer} {
    justify-content: flex-start;
  }

  ${SectionContainer} {
    ${props => props.title='Time off Information' && css `
      margin-top: 36px;
      min-height: 345px; // give space for calendar given it has overflow: hidden
    `}
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

export const DivRequestsHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  margin-bottom: 6px;

  h3 {
    font-size: 1rem;
    align-self: flex-end;
    font-weight: 600;
  }
  ${DivAddButtonContainer} {
    margin-left: auto;
    font-size: 1.2rem;
    padding: 0 12px;
  }
`

export const DivRequestsEmptyState = styled.div`
  display: flex;
    align-items: center;
    justify-content: center;
  padding: 18px 0;
  font-weight: 400;
  font-style: italic;
  font-size: 1.2rem;
  color: ${colors.gray50};
`

export const H4Subsection = styled.h4`
  color: ${colors.officialBlue};
  border-bottom: 1px solid ${colors.officialBlue};
  width: 100%;
  font-size: 1rem;
  line-height: 20px;
  margin-top: 12px;
  padding-left: 3px;
`

export const DivInformationFields = styled.div`
  margin-top: 12px;
  display: flex;
  margin-left: 3px;
  ${DivInputWrapper} {
    width: 219px;
    &:last-of-type {
      margin-left: 24px;
    }
  }
`