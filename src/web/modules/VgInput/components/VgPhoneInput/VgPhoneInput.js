import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {sharedInputStyles} from '../../VgInput.styles'

VgPhoneInput.propTypes = {
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
VgPhoneInput.defaultProps = {
  onChange: () => {},
  value: ''
}

const Input = styled.input`
  ${sharedInputStyles}
`

/**
 * This component represents a styled <input type='tel'/>
 * Input is restricted to [0-9], '-', '+', '(', and ')'.
 * @category Modules - Web
 * @subcategory VgInput
 * @namespace VgPhoneInput
 */
export default function VgPhoneInput({
  hasError,
  inputId,
  onBlur,
  onChange,
  onFocus,
  value
}) {

  const sanitizedValue = value.replace(/[^0-9-+()]/g, '')

  /** Strips disallowed characters as the user types */
  function handleChange(e) {
    const newValue = e.target.value.replace(/[^0-9-+()]/g, '')
    e.target.value = newValue
    onChange(e)
  }

  return (
    <Input
      hasError={hasError}
      type='tel'
      value={sanitizedValue}
      onBlur={onBlur}
      onChange={handleChange}
      onFocus={onFocus}
      id={inputId}
    />
  )
}