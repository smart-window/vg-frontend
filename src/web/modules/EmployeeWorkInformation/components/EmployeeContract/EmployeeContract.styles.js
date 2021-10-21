import { fonts } from 'shared/constants/cssConstants'
import styled from 'styled-components'
import {SectionContainer} from 'web/components/ExpandableSection/ExpandableSection.styles'
import {H3SectionHeading} from 'web/modules/WelcomeWizard/components/SectionHeading/SectionHeading.styles'
import {DivHeaderContainer, DivHeaderCellLabel} from 'web/modules/Grid/components/GridHeader/GridHeader.styles'
import {DivRow} from 'web/modules/Grid/Grid.styles'
import {DivInputWrapper} from 'web/modules/VgInput/VgInput.styles'
import {CheckboxContainer} from 'web/components/VgCheckbox/VgCheckbox'

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

export const ArticleContract = styled.article`
  padding: 12px 6px 200px 0;

  ${H3SectionHeading} {
    margin-bottom: 24px;  
  }
`

export const DivClientTeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 159px;
  overflow-y: hidden;
  h3 {
    font-family: ${fonts.helvetica};
    font-size: 1rem;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0px;
    margin-bottom: 9px;
  }
`

export const HrSeparator = styled.hr`
  width: 100%;
  height: 1px;
  margin-bottom: 12px;
  background-color: #E6EBEF;
  border: none;
`

export const DivLeaveWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-top: 21px;
  padding-left: 33px;
`

export const DivLeaveInputs = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  ${DivInputWrapper} {
    width: 215px;
    margin-left: 15px;
    &:first-child {
      margin-left: 0;
    }
  }
  ${CheckboxContainer} {
    width: 18px;
    height: 18px;
  }
`
export const DivCheckboxWrapper = styled.div`
  display: flex;
  margin-top: 23px;
  margin-left: 15px;
  p {
    margin-left: 6px;
    font-family: ${fonts.openSans};
    font-size: 1rem;
    font-weight: 400;
    line-height: 20px;
  }
`