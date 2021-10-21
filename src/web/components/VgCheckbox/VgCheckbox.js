import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {colors} from 'shared/constants/cssConstants'

import checkmarkIcon from 'assets/images/icons/checkmark.svg'
import checkmarkDisabledIcon from 'assets/images/icons/checkmark-disabled.svg'

VgCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

/**
 * A custom styled checkbox for web.
 * Inspired by: https://medium.com/@colebemis/building-a-checkbox-component-with-react-and-styled-components-8d3aa1d826dd
 * @category Components - Web
 * @namespace VgCheckbox
 */
export default function VgCheckbox({checked, onChange, disabled = false}) {
  return (
    <CheckboxContainer onClick={onChange} checked={checked} disabled={disabled} aria-checked={checked}>
      <HiddenCheckbox checked={checked} onChange={onChange}/>
      <StyledCheckbox checked={checked} disabled={disabled}>
        <img src={disabled ? checkmarkDisabledIcon : checkmarkIcon} alt='checkmark'/>
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

// Styles defined inline since that's where most of the logic lives
export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const StyledCheckbox = styled.div`
  display: flex;
    align-items: center;
    justify-content: center;
  height: 100%;
  width: 100%;
  background: ${props => {
    if (props.checked) {
      return (props.disabled ? colors.gray50 : colors.officialBlue)
    }
    else {
      return colors.white
    }
  }};
  border-radius: 3px;
  transition: all 150ms;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 1px 3px 0 ${colors.gray50};
  }
  img {
    visibility: ${props => props.checked ? 'visible' : 'hidden'};
    height: 60%;
    width: 60%;
    ${props => props.disabled && css`
      height: 100%;
      width: 100%;
    `}
  }
`

export const CheckboxContainer = styled.div`
  height: 15px;
  width: 15px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 3px;
  ${props => !props.checked && css`
    border: 1px solid ${colors.gray30};
  `}
`