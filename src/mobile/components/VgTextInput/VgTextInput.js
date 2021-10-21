import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ErrorTriangle from 'mobile/icons/StaticIcons/ErrorTriangle.js'
import {
  TextInputWithValidation,
  TextNotValid,
  ViewInputContainer,
  ViewNotValidIcon,
} from './VgTextInput.styles'

VgTextInput.propTypes = {
  /** Default value for input */
  defaultValue: PropTypes.string,
  /** String indicating what keyboard type input should use */
  keyboardType: PropTypes.string,
  /** Regex indicating a pattern the input's text should follow */
  pattern: PropTypes.objectOf(PropTypes.instanceOf(RegExp)),
  /** On text change handler */
  onChangeText: PropTypes.func,
  /** String indicating input error message */
  messageOnError: PropTypes.string,
  /** On blur handler */
  onBlur: PropTypes.func,
  /** Function that formats the text in the input on blur */
  onBlurTextFormatter: PropTypes.func,
}

/**
 * A repeating input component with input validation.
 * @category Components - Mobile
 * @namespace VgTextInput
 */
export default function VgTextInput(props) {
  const {
    defaultValue,
    keyboardType,
    pattern,
    onChangeText,
    messageOnError,
    onBlur,
    onBlurTextFormatter
  } = props
  const [inputValue, setInputValue] = useState(defaultValue || '')
  const [errorMessage, setErrorMessage] = useState('')
  const [inputHeight, setInputHeight] = useState('')

  useEffect(function didUpdate() {
    setInputValue(defaultValue)
  }, [defaultValue])

  useEffect(function didUpdate() {
    setErrorMessage(messageOnError)
  }, [messageOnError])

  /**
   * Calls passed in text handler and sets returned formatted text in state
   * @param {string} text
   */
  function handleOnTextChange(text) {
    if (!pattern || pattern.test(text)) {
      if (onChangeText) onChangeText(text)
      setInputValue(text)
    }
  }

  /**
   * Calls passed in on blur handler and sets returned formatted text in state
   */
  function handleBlurChange() {
    // Validate text after blur
    const formattedText = onBlurTextFormatter ? onBlurTextFormatter(inputValue) : inputValue
    if (onBlur) onBlur(formattedText)
    setInputValue(formattedText)
  }

  const isValid = errorMessage === ''

  return (
    <ViewInputContainer>
      <TextInputWithValidation
        isValid={isValid}
        keyboardType={keyboardType}
        value={inputValue}
        onChangeText={handleOnTextChange}
        onBlur={handleBlurChange}
        onLayout={(event) => setInputHeight(event.nativeEvent.layout.height)}
      />
      {
        !isValid &&
        <ViewNotValidIcon inputHeight={inputHeight}>
          <ErrorTriangle />
        </ViewNotValidIcon>
      }
      {!isValid && <TextNotValid>{errorMessage}</TextNotValid>}
    </ViewInputContainer>
  )
}