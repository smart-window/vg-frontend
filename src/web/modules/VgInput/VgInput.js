import React, {useState} from 'react'
import PropTypes from 'prop-types'

import InputTypes from './constants/InputTypes'
import VgSelect from './components/VgSelect/VgSelect'
import VgPhoneInput from './components/VgPhoneInput/VgPhoneInput'
import VgNumberInput from './components/VgNumberInput/VgNumberInput'
import VgPrivateInput from './components/VgPrivateInput/VgPrivateInput'
import VgDatePicker from 'web/components/VgDatePicker/VgDatePicker'
import VgAddressInput from 'web/modules/VgInput/components/VgAddressInput/VgAddressInput.js'

import WarningIcon from 'assets/images/icons/warning.svg'
import {
  DivInputWrapper,
  ImgErrorIcon,
  Input,
  Label,
  SpanAnimatedLabelText,
  SpanErrorMessage,
  SpanOptionalIndicator,
  Textarea,
} from './VgInput.styles'

VgInput.propTypes = {
  /** If true, adds an 'optional' text decorator below the input */
  isOptional: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  /** Label text - also passed to parent div for fine-grained styling */
  label: PropTypes.string.isRequired,
  /** Called when the input value changes */
  onChange: PropTypes.func,
  /** Called when the input blurs */
  onBlur: PropTypes.func,
  /** If type === InputTypes.SELECT, use this to pass string options */
  options: PropTypes.arrayOf(PropTypes.object),
  /**
   * Indicates what kind of input is rendered.
   * Except with DATE and SELECT, this maps to HTML <input type={..}>
  */
  type: PropTypes.oneOf([
    InputTypes.ADDRESS,
    InputTypes.DATE,
    InputTypes.NUMBER,
    InputTypes.PHONE,
    InputTypes.PRIVATE,
    InputTypes.SELECT,
    InputTypes.TEXT
  ]),
  /** Provided value from parent. If type === InputTypes.SELECT, ensure this matches one of the options. */
  value: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number
  ]),
  /** Indicates if input is readOnly or not, only on TEXT input */
  readOnly: PropTypes.bool
}
VgInput.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  type: InputTypes.TEXT,
  readOnly: false
}

/**
 * The main input form control for the application.
 * Leverages different sub-components depending on what 'type' is passed.
 * This input is designed to be controlled by a parent that stores 'value' in state.
 *
 * TODO: given the requirement, be able to control input height with prop.. there are nuances with the font sizes and animation
 *
 * @category Modules - Web
 * @subcategory VgInput
 * @namespace VgInput
 */
export default function VgInput({
  isOptional,
  label,
  onChange,
  onBlur,
  options,
  type,
  value,
  readOnly,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [validationError, setValidationError] = useState(null)
  // cast to boolean if receiving string from server
  isOptional = Boolean(isOptional)

  // avoid matching things like false
  const valueEmpty = value === null || value === undefined || (typeof value === 'string' && value.trim() === '')

  // eslint-disable-next-line
  const labelIsPlaceHolder = valueEmpty && !isFocused

  const inputId = 'vg-input-'+label
  /** onBlur handler for all input types */
  function handleBlur(event) {
    if (typeof event?.target?.value == 'string' && type !== InputTypes.DATE) {
      // trim input on blur
      // the corresponding backend will need to trim the value too as this won't be reflected for another render
      onChange(event.target.value.trim())
    }
    validate()
    setIsFocused(false)
    onBlur(event)
  }

  /** Handles the default <input onChange{}/> function to pass actual value back to parent */
  function handleDefaultOnChange(e) {
    onChange(e.target.value)
    if (e.target.value) {
      // remove validation error as user starts typing
      setValidationError(null)
    }
  }

  /** Handles custom onChange where value is passed directly */
  function handleCustomOnChange(value) {
    onChange(value)
    if (value) {
      // remove validation error as user starts typing
      setValidationError(null)
    }
  }

  /** onFocus handler for all input types */
  function handleFocus() {
    setIsFocused(true)
  }

  function validate() {
    if (valueEmpty && !isOptional) {
      setValidationError('This field is required')
    }
    else {
      setValidationError(null)
    }
  }

  let innerInput
  switch (type) {
    case InputTypes.BOOLEAN:
      // using strings here as it's much easier to detect when the field is filled
      const booleanOptions = [{label: 'Yes', value: 'true'}, {label: 'No', value: 'false'}]
      let convertedValue = value
      if (value === true || value === false) {
        convertedValue = value.toString()
      }
      innerInput = (
        <VgSelect
          hasError={!!validationError}
          onBlur={handleBlur}
          onChange={handleCustomOnChange}
          onFocus={handleFocus}
          options={booleanOptions}
          value={convertedValue}
        />
      )
      break
    case InputTypes.DATE:
      innerInput = (
        <VgDatePicker
          hasError={!!validationError}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onDateChange={handleCustomOnChange}
          selectedDate={value || null}
        />
      )
      break
    case InputTypes.SELECT:
      innerInput = (
        <VgSelect
          hasError={!!validationError}
          onBlur={handleBlur}
          onChange={handleCustomOnChange}
          onFocus={handleFocus}
          options={options}
          value={value}
        />
      )
      break
    case InputTypes.PHONE:
      innerInput = (
        <VgPhoneInput
          hasError={!!validationError}
          onBlur={handleBlur}
          onChange={handleDefaultOnChange}
          onFocus={handleFocus}
          value={value || ''}
          inputId={inputId}
        />
      )
      break
    case InputTypes.PRIVATE:
      innerInput = (
        <VgPrivateInput
          hasError={!!validationError}
          onBlur={handleBlur}
          onChange={handleDefaultOnChange}
          onFocus={handleFocus}
          value={value || ''}
          inputId={inputId}
        />
      )
      break
    case InputTypes.NUMBER:
      innerInput = (
        <VgNumberInput
          hasError={!!validationError}
          onBlur={handleBlur}
          onChange={handleDefaultOnChange}
          onFocus={handleFocus}
          value={value || ''}
          inputId={inputId}
        />
      )
      break
    case InputTypes.ADDRESS:
      // The address is returned as it holds it's own labels
      return (
        <VgAddressInput
          label={label}
          isOptional={isOptional}
          value={value}
          options={[]}
          onChange={onChange}
          onBlur={onBlur}
        />
      )
    case InputTypes.TEXTAREA:
      innerInput = (
        <Textarea
          onBlur={handleBlur}
          onChange={handleDefaultOnChange}
          onFocus={handleFocus}
          value={value || ''}
          id={inputId}
        />
      )
      break
    case InputTypes.TEXT:
    default:
      innerInput = (
        <Input
          readOnly={readOnly}
          tabIndex={readOnly ? 0 : -1}
          type={type}
          hasError={!!validationError}
          onBlur={handleBlur}
          onChange={handleDefaultOnChange}
          onFocus={handleFocus}
          id={inputId}
          value={value || ''}
          data-lpignore='true'
        />
      )
  }

  return (
    // passing label to outer div allows parent components to style individual inputs
    <DivInputWrapper label={label} title={label} hasError={!!validationError} key={'inputwrapper-'+label} {...props}>
      <Label htmlFor={inputId}>
        <SpanAnimatedLabelText type={type} useAsPlaceholder={labelIsPlaceHolder}>
          {label}
        </SpanAnimatedLabelText>
      </Label>
      {innerInput}
      {validationError && <ImgErrorIcon src={WarningIcon} alt='error' type={type}/>}
      {isOptional && valueEmpty && <SpanOptionalIndicator>(Optional)</SpanOptionalIndicator>}
      {validationError && <SpanErrorMessage>{validationError}</SpanErrorMessage>}
    </DivInputWrapper>
  )
}
