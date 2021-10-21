import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'
import {DivChecklist} from 'web/modules/ComboBox/components/ComboBoxItems/ComboBoxItems.styles'

export const FieldsetEmployeeTrainingFilterContainer = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-sizing: border-box;
  width: 310px;
  padding: 30px 18px 27px 18px;
  background-color: ${colors.white};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
  border-radius: 9px;
  ${DivChecklist} {
    max-height: 200px;
    min-height: 65px;
  }
`

export const DivInputLabelWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  label {
    font-family: ${fonts.openSans};
    font-weight: 300;
    font-size: 1rem;
    line-height: 20px;
    color: ${colors.black};
  }
`

export const DivDateInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 15px;
`

export const DivDateInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  label {
    font-family: ${fonts.openSans};
    font-style: italic;
    font-size: 0.8rem;
    line-height: 16px;
    color: ${colors.gray30};
  }
  input {
    box-sizing: border-box;
    width: 152px;
    height: 24px;
    padding-right: 21px;
    margin-bottom: 0;
    margin-left: 6px;
    cursor: pointer;
    border: 1px solid ${colors.oktaBorder};
    background-color: ${colors.white};
    border-radius: 3px;
    outline: none;
    font-family: ${fonts.openSans};
    font-size: 0.8rem;
    line-height: 16px;
    color: ${colors.charcoal};
  }
  img {
    position: absolute;
    top: 4px;
    right: 6px;
    pointer-events: none;
  }
`

export const DivButtonsWrapper = styled.div`
  display: flex;
    justify-content: space-between;
    flex-direction: column;
  width: 100%;
  height: 36px;
  margin-top: 27px;
`

export const ButtonFilterAction = styled.button`
  width: 48%;
  height: 100%;
  border-radius: 15px;
  border: none;
  background-color: ${colors.white};
  color: ${colors.officialBlue};
  cursor: pointer;
  &[type=submit] {
    background-color: ${colors.officialBlue};
    color: ${colors.white};
  }
  &:disabled {
    opacity: 0.7;
    cursor: inherit;
  }
  &:focus {
    outline: none;
  }
`

export const ArticleFilterReportContainer = styled.article`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 30px;
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
  border-radius: 15px;
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
  background: #FFFFFF;
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
  ${props => props.isFilterButtonActive && css`
    color: ${colors.white};
    background-color: ${colors.officialBlue};
  `}
  &:focus {
    outline: none;
  }
`
