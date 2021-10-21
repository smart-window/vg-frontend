import styled from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'
import {Button} from 'web/components/VgButton/VgButton.styles'
import {DivInputLabelWrapper as ComboBoxWrapper} from 'web/modules/ComboBox/ComboBox.styles'
import {DivInputLabelWrapper as DaterRangeWrapper, DivDateInputWrapper} from 'web/components/DateRange/DateRange.styles'
import {DivHeaderCellLabel} from 'web/modules/Grid/components/GridHeader/GridHeader.styles'
import {DivInputWrapper as NotesInputWrapper} from 'web/modules/VgInput/VgInput.styles'
import {SectionGridContainer} from 'web/modules/Grid/Grid.styles'

export const DivModalContents = styled.div`
  min-width: 700px;
  margin-top: 33px;
  font-family: ${fonts.openSans};
  label {
    font-weight: 300;
    line-height: 20px;
    font-size: 1.2rem;
  }
  ${ComboBoxWrapper} {
    margin-top: 18px;
    margin-left: 51px;
    height: 30px;
    align-items: center;
    input {
      margin-left: 18px;
      width: 201px;
      height: 30px;
      margin-bottom: 0;
    }
  }
  ${DaterRangeWrapper} {
    height: 30px;
    align-items: center;
    margin-top: 12px;
    margin-left: 42px;
    & > label {
      margin-right: 12px;
    }
  }
  ${DivDateInputWrapper} {
    height: 30px;
    margin-bottom: 0;
    label {
      font-size: 1rem;
    }
    input {
      height: 30px;
      width: 201px;
    }
  }
  h4 {
    margin-top: 30px;
    font-weight: 400;
    font-size: 1rem;
    font-family: ${fonts.helvetica};
  }
  ${SectionGridContainer} {
    margin-top: 6px;
  }
  ${DivHeaderCellLabel} {
    font-size: 0.8rem;
  }
  ${NotesInputWrapper} {
    width: 60%;
  }
  ${Button} {
    width: 254px;
  }
`

export const DivEmployeeName = styled.div`
  display: flex;
  margin-left: 30px;
  font-size: 1.2rem;
  color: ${colors.charcoal};
  p {
    margin-left: 30px;
    font-weight: 400;
    line-height: 20px;
  }
`

export const DivDetailsEmptyState = styled.div`
  display: flex;
    align-items: center;
    justify-content: center;
  padding: 35px 0;
  font-weight: 400;
  font-style: italic;
  font-size: 1rem;
  color: ${colors.gray50};
`

export const DivDivider = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.officialBlue};
  border-bottom: 1px solid ${colors.officialBlue};
  height: 1px;
  margin-top: 15px;
`

export const DivNotesAndDaysAvailable = styled.div`
  display: flex;
`

export const DivDaysAvailable = styled.div`
  display: flex;
  margin-left: auto;
  margin-top: 15px;
  font-family: ${fonts.openSans};
    color: ${colors.charcoal};
    font-weight: 300;
    font-size: 1rem;
  height: fit-content;

  span:last-child {
    width: 48px;
    text-align: end;
  }
`