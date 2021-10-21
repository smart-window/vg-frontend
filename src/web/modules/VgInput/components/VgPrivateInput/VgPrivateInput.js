import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {sharedInputStyles} from '../../VgInput.styles'

VgPrivateInput.propTypes = {
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
VgPrivateInput.defaultProps = {
  value: ''
}

const Input = styled.input`
  ${sharedInputStyles}
`

/**
 * This component is similar to <input type='password'/>
 * It contains custom input masking for more control and to avoid autofill issues.
 * @category Modules - Web
 * @subcategory VgInput
 * @namespace VgPrivateInput
 */
export default function VgPrivateInput({
  hasError,
  inputId,
  onBlur,
  onChange,
  onFocus,
  value
}) {

  const [privateValue, setPrivateValue] = useState(value)
  const [isCensored, setIsCensored] = useState(true)

  /** Update state if parent changes value prop */
  useEffect(function valueChanged() {
    setPrivateValue(value)
  }, [value])

  // display dot characters to censor actual input
  const displayedValue = isCensored ? '•'.repeat(privateValue.length) : privateValue

  /** Censors the input value on blur */
  function handleBlur(e) {
    setIsCensored(true)
    onBlur(e)
  }

  /** Stores private value as the user types */
  function handleChange(e) {
    const newValue = e.target.value
    setPrivateValue(newValue)
    onChange(e)
  }

  /** Uncensors the input value on focus */
  function handleFocus() {
    setIsCensored(false)
    onFocus()
  }

  return (
    <Input
      hasError={hasError}
      id={inputId}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onChange={handleChange}
      type='text'
      value={displayedValue}
    />
  )
}