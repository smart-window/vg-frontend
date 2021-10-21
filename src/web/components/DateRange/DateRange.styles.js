import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const DivInputLabelWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  label {
    font-family: ${fonts.openSans};
    font-weight: 300;
    font-size: 1rem;
    line-height: 20px;
    color: ${colors.charcoal};
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
    color: ${colors.charcoal};
    ${props => props.displayMode === 'horizontal' && css `
      margin-left: 9px;
    `}
  }
  input {
    box-sizing: border-box;
    width: 112px;
    height: 24px;
    padding-right: 21px;
    margin-bottom: 0;
    margin-left: 6px;
    border: 1px solid ${colors.oktaBorder};
    background-color: ${colors.white};
    border-radius: 3px;
    outline: none;
    font-family: ${fonts.openSans};
    font-size: 0.8rem;
    line-height: 16px;
    color: ${colors.charcoal};
  }
`