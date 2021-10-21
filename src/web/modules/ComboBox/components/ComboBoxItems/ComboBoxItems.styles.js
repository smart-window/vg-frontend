import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'
import {AsideAnimatedContainer} from 'web/components/AnimatedDropdown/AnimatedDropdown.styles'
import {CheckboxContainer} from 'web/components/VgCheckbox/VgCheckbox'

export const DivComboBoxItems = styled.div`
  ${AsideAnimatedContainer} {
    top: ${props => props.top}px;
    right: 0px;
    z-index: 1;
  }
`

export const DivChecklist = styled.div`
  width: ${props => props.listWidth}px;
  overflow: auto;
  border: 1px solid ${colors.officialBlue};
  box-sizing: border-box;
  border-radius: 3px;
  padding: 0;
  background-color: ${colors.white};
`

export const DivSearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 33px;
  padding: 0 9px;
  background-color: ${colors.gray10};
`

export const ButtonSearch = styled.button`
  position: absolute;
  top: 7px;
  right: 8px;
  display: ${props => props.isVisible ? 'block' : 'none'};
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  img {
    height: 9px;
    width: 9px;
    pointer-events: none;
  }
`

export const InputSearch = styled.input`
  font-family: ${fonts.openSans};
  font-size: 0.8rem;
  line-height: 16px;
  box-sizing: border-box;
  padding-left: 9px;
  width: 100%;
  height: 21px;
  border-radius: 17px;
  border: none;
  outline: none;
`

export const UlGenericList = styled.ul`
  margin-top: 3px;
  padding: 0;

  li p {
    max-width: calc(100% - 21px);
    margin-left: 6px;
    font-family: ${fonts.openSans};
    font-size: 0.8rem;
    line-height: 16px;
    color: ${colors.charcoal};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

export const LiListItem = styled.li`
  display: flex;
    align-items: center;
  padding: 6px 0 6px 16px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.boneWhite};
  }
  ${props => props.isSingleSelect && props.isSelected && css`
    font-weight: 600;
    font-size: 55px;
  `}
  ${CheckboxContainer} {
    height: 15px;
    width: 15px;
  }
`