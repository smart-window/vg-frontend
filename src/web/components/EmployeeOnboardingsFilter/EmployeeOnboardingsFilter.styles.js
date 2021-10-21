import styled, { css } from 'styled-components'
import { colors, fonts } from 'shared/constants/cssConstants'
import { DivChecklist } from 'web/modules/ComboBox/components/ComboBoxItems/ComboBoxItems.styles'

export const FieldsetEmployeeOnboardingsFilterContainer = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-sizing: border-box;
  width: 320px;
  padding: 32px 16px;
  background-color: ${colors.white};
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  ${DivChecklist} {
    max-height: 200px;
    min-height: 64px;
  }
`

export const DivButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 40px;
  margin-top: 28px;
`

export const ArticleFilterReportContainer = styled.article`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 32px;
  filter: drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.2));
`

export const InputSearch = styled.input`
  height: 100%;
  width: 210px;
  padding-left: 18px;
  border: 1px solid ${colors.officialBlue};
  box-sizing: border-box;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  font-family: ${fonts.openSans};
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 16px;
  outline: none;
`

export const ButtonClear = styled.button`
  align-self: flex-end;
  width: 48%;
  height: 100%;
  border-radius: 16px;
  border: none;
  background-color: ${colors.white};
  color: ${colors.officialBlue};
  cursor: pointer;
  &:disabled {
    opacity: 0.7;
    cursor: inherit;
  }
  &:focus {
    outline: none;
  }
`

export const ButtonFilter = styled.button`
  height: 100%;
  background: #ffffff;
  border: 1px solid ${colors.officialBlue};
  box-sizing: border-box;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  padding: 0 9px;
  color: ${colors.officialBlue};
  font-family: ${fonts.openSans};
  font-size: 0.8rem;
  line-height: 16px;
  text-align: center;
  border-left: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  ${(props) =>
    props.isFilterButtonActive &&
    css`
      color: ${colors.white};
      background-color: ${colors.officialBlue};
    `}
  &:focus {
    outline: none;
  }
`