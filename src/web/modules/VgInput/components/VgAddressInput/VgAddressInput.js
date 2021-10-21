import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import WarningIcon from 'assets/images/icons/warning.svg'
import MapIcon from 'assets/images/icons/mapPinGrey.svg'
import { StandaloneSearchBox } from '@react-google-maps/api'
import {
  DivContainer,
  Input,
  InputSuite,
  ImgMapIcon,
  DivSuiteInput,
  DivAddressInput,
  DivAddressInner
} from './VgAddressInput.styles'
import {
  Label,
  SpanAnimatedLabelText,
  SpanOptionalIndicator,
  ImgErrorIcon,
  SpanErrorMessage,
} from '../../VgInput.styles'

VgAddressInput.propTypes = {
  /** Boolean indicating if the address is optional */
  isOptional: PropTypes.bool,
  /** Function to save address on place selection or suite input blur */
  onBlur: PropTypes.func,
  /** Called when the address or suite value changes */
  onChange: PropTypes.func,
  /** Address input label */
  label: PropTypes.string,
  /** Value holding address components */
  value: PropTypes.shape({
    formattedAddress: PropTypes.string,
    suite: PropTypes.string
  }).isRequired
}

VgAddressInput.defaultProps = {
  onChange: () => {},
  onBlur: () => {}
}

/**
 * Our custom address suggestion dropdown that pings the Google Places API.
 * Uses the following component library for use of Google Autocomplete Searchbox
 *  https://tomchentw.github.io/react-google-maps/#standalonesearchbox
 * @category Modules - Web
 * @subcategory VgInput
 * @namespace VgAddressInput
 */
export default function VgAddressInput({
  isOptional,
  onBlur,
  onChange,
  label,
  value
}) {
  const [addressValue, setAddressValue] = useState(value?.formattedAddress || '')
  const [suiteValue, setSuiteValue] = useState(value?.suite || '')
  const [addressIsFocused, setAddressIsFocused] = useState(false)
  const [suiteIsFocused, setSuiteIsFocused] = useState(false)
  const [searchBox, setSearchBox] = useState()
  const [validationError, setValidationError] = useState(null)

  // avoid matching things like false
  const addressEmpty = addressValue === null || addressValue === undefined || addressValue === ''
  const suiteEmpty = suiteValue === null || suiteValue === undefined || suiteValue === ''

  // eslint-disable-next-line
  const addressLabelIsPlaceHolder = addressEmpty && !addressIsFocused
  const suiteLabelIsPlaceHolder = suiteEmpty && !suiteIsFocused

  useEffect(function addressUpdated() {
    if (value?.formattedAddress !== addressValue) setAddressValue(value?.formattedAddress)
  }, [value])

  /**
   * Calls props.onChange with the given option
   * @param {string} selectedOption one of props.options
   */
  function handleChange(e) {
    if (e.target.id.includes('address')) {
      setAddressValue(e.target.value)
      onChange(e.target.value, suiteValue)
      setValidationError('An address selection is required')
    }
    else {
      setSuiteValue(e.target.value || '')
      onChange(null, e.target.value)
    }
  }

  /** onFocus handler for all input types */
  function handleFocus(e) {
    e.target.id.includes('address') ? setAddressIsFocused(true) : setSuiteIsFocused(true)
  }

  /**
   * Calls props.onBlur for the suite
   * @param {object} e - event
   */
  function handleSuiteBlur(e) {
    onBlur(null, e.target.value)
    setSuiteIsFocused(false)
  }

  /**
   * Calls props.onBlur for the address
   * @param {object} e - event
   */
  function handleAddressBlur() {
    setAddressIsFocused(false)
  }

  /**
   * Called when user selects a place from the SearchBox
   * Sets state of input and parent and calls save
   */
  function handleOnPlacesChanged() {
    if (searchBox) {
      const places = searchBox.getPlaces()
      if (places.length === 1) {
        setAddressValue(places[0].formatted_address)
        onChange(places[0].formatted_address, suiteValue)
        onBlur(places[0], null)
        setValidationError(null)
      }
    }
  }

  return (
    // passing label to outer div allows parent components to style individual inputs
    <DivContainer>
      <DivAddressInput label={label} title={label}>
        <Label htmlFor={'vg-input-address'+label}>
          <SpanAnimatedLabelText useAsPlaceholder={addressLabelIsPlaceHolder}>
            {label}
          </SpanAnimatedLabelText>
        </Label>
        <DivAddressInner>
          <StandaloneSearchBox
            onLoad={setSearchBox}
            onPlacesChanged={handleOnPlacesChanged}
          >
            <Input
              placeholder=''
              id={'vg-input-address'+label}
              onBlur={handleAddressBlur}
              onFocus={handleFocus}
              onChange={handleChange}
              type='text'
              value={addressValue}
            />
          </StandaloneSearchBox>
          <ImgMapIcon src={MapIcon} alt='Select an Address indicator' />
        </DivAddressInner>
        {validationError && <ImgErrorIcon src={WarningIcon} alt='error'/>}
        {isOptional && addressEmpty && <SpanOptionalIndicator>(Optional)</SpanOptionalIndicator>}
        {validationError && <SpanErrorMessage>{validationError}</SpanErrorMessage>}
      </DivAddressInput>
      <DivSuiteInput label={'Ste./Apt. No.'} title={'Ste./Apt. No.'}>
        <Label htmlFor={'vg-input-suite'+label}>
          <SpanAnimatedLabelText useAsPlaceholder={suiteLabelIsPlaceHolder}>
            {'Ste./Apt. No.'}
          </SpanAnimatedLabelText>
        </Label>
        <InputSuite
          placeholder=''
          id={'vg-input-suite'+label}
          onBlur={handleSuiteBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          type='text'
          value={suiteValue}
        />
        {suiteEmpty && <SpanOptionalIndicator>(Optional)</SpanOptionalIndicator>}
      </DivSuiteInput>
    </DivContainer>
  )
}