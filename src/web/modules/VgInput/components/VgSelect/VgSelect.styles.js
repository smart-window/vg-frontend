
import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'
import {sharedInputStyles} from '../../VgInput.styles'

export const SelectWrapper = styled.div`
.react-select__control {
  ${sharedInputStyles}
  min-height: unset;
  cursor: pointer;
  ${props => props.hasError && css`
    border-bottom-color: ${colors.uiAlertRed}
  `}
}
.react-select__value-container, .react-select__indicators {
  max-height: 100%;
  height: 100%;
  padding: 0;
}

.react-select__indicators {
  ${props => props.hasError && css`
    display: none;
  `}
}

.react-select__indicator-separator {
  display: none;
}
.react-select__single-value {
  top: unset;
  transform: unset;
}
.css-b8ldur-Input {
  max-height: 100%;
  margin: 0;
  padding-left: 2px;
}
.react-select__menu {
  margin-top: 2px;
  cursor: pointer;
  border: 1px solid ${colors.officialBlue};
  z-index: 2;
}
.react-select__option {
  cursor: pointer;
  font-family: ${fonts.openSans};
    font-size: .8rem;
    line-height: 16px;
    color: ${colors.charcoal};

  &:hover {
    background-color: ${colors.boneWhite}
  }
  &--is-selected, &--is-focused {
    background-color: unset;
  }
  &--is-selected {
    font-weight: 700;
  }
}
`