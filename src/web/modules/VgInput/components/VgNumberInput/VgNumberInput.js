import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {sharedInputStyles} from '../../VgInput.styles'

VgNumberInput.propTypes = {
  /** true if there's a validation error */
  hasError: PropTypes.bool,
  /** used to link to html <label> */
  inputId: PropTypes.string,
  onBlur: PropTypes.func,
  /** Called when the input value changes */
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  /** used to set value for input */
  value: PropTypes.string
}
VgNumberInput.defaultProps = {
  onChange: () => {},
  value: ''
}

const Input = styled.input`
  ${sharedInputStyles}
`

const invalidChars = [
  '-',
  '+',
  'e',
  '.'
]

/**
 * This component represents a styled <input type='number'/>
 * Input is restricted to [0-9]
 * @category Modules - Web
 * @subcategory VgInput
 * @namespace VgNumberInput
 */
export default function VgNumberInput({
  hasError,
  inputId,
  onBlur,
  onChange,
  onFocus,
  value
}) {

  /** Prevents the user from typing non-numeric characters */
  function handleKeyDown(e) {
    if (invalidChars.includes(e.key)) {
      e.preventDefault()
    }
  }

  return (
    <Input
      hasError={hasError}
      type='number'
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      id={inputId}
    />
  )
}