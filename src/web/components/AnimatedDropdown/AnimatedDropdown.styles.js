import styled, {css} from 'styled-components'

export const AsideAnimatedContainer = styled.aside`
  position: absolute;
    right: 18px;
    top: 53px;
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease-out;
  ${props => props.isDropdownOpen && css`
    opacity: 1;
    transition: unset;
    pointer-events: unset;
  `}
`
