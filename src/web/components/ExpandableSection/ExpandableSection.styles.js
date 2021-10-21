import styled from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const SectionContainer = styled.section`
  width: 100%;
`

export const HeaderTab = styled.header`
  display: flex;
    justify-content: space-between;
    align-items: center;
  width: 100%;
  height: 30px;
  padding: 3px 12px 0 12px;
  box-sizing: border-box;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: ${colors.coolGray};
  h3 {
    font-family: ${fonts.helvetica};
    font-size: 1.2rem;
    line-height: 24px;
    color: ${colors.charcoal};
  }
`

export const ButtonDropdownArrow = styled.button`
  border: none;
  background: none;
  transform: ${props => props.isExpanded ? 'rotate(0deg)' : 'rotate(90deg)'};
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  svg {
    width: 15px;
    height: 15px;
  }
`

export const DivAnimatedContainer = styled.div`
  height: ${props => props.isExpanded ? '100%' : 0};
  opacity: ${props => props.isExpanded ? 1 : 0};
  overflow-y: ${props => props.isExpanded ? 'unset' : 'hidden'}; // Allow overflow when fully expanded
  transition: height 0.15s ease-in, opacity 0.15s ease-in, overflow-y 0.15s ease-in;
`