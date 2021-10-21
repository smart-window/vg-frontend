import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const DivInputLabelWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: fit-content;
  label {
    text-align: right;
    font-family: ${fonts.openSans};
    font-weight: 300;
    font-size: 1rem;
    line-height: 20px;
    color: ${colors.charcoal};
  }
`

export const InputFilterCategories = styled.input`
  width: 152px;
  height: 24px;
  box-sizing: border-box;
  margin-left: 9px;
  margin-bottom: 27px;
  padding-left: 6px;
  border: 1px solid ${colors.oktaBorder};
  background: ${colors.white};
  border-radius: 3px;
  outline: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: ${fonts.openSans};
  font-size: 0.8rem;
  line-height: 16px;
  color: ${colors.charcoal};
  cursor: pointer;
  ${props => props.isOpen && css`
    border-color: ${colors.officialBlue};
  `}
`