import React from 'react'
import PropTypes from 'prop-types'

import Select, {components} from 'react-select'
import DropdownArrowIcon from 'web/components/DynamicIcons/DropdownArrowIcon'

import { SelectWrapper } from './VgSelect.styles'

VgSelect.propTypes = {
  /** True if there is a validation error */
  hasError: PropTypes.bool,
  /** Called when the input value changes */
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  /** Provided value from parent. This should match one of the options.value */
  value: PropTypes.string
}

/**
 * Our custom select-like dropdown.
 * Uses the following component library, so could be extended with other features such as multi-select:
 *  https://react-select.com/home
 * As this is within the VgInput module, this component is not intended for use on its own.
 * @category Modules - Web
 * @subcategory VgInput
 * @namespace VgSelect
 */
export default function VgSelect({
  hasError,
  onChange,
  onBlur,
  options,
  onFocus,
  value
}) {
  const selectedOption = options.find(option => option.value === value)
  const valueObject = {value, label: selectedOption?.label}

  /**
   * Calls props.onChange with the given option
   * @param {string} selectedOption one of props.options
   */
  function handleChange(selectedOption) {
    onChange(selectedOption.value)
  }

  /**
   * Calls props.onBlur with the given option
   * @param {string} selectedOption one of props.options
   */
  function handleBlur() {
    onBlur(valueObject.value)
  }

  return (
    <SelectWrapper hasError={hasError}>
      <Select
        classNamePrefix='react-select'
        components={{DropdownIndicator}}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={onFocus}
        options={options}
        placeholder={''}
        value={valueObject}
      />
    </SelectWrapper>
  )
}

/**
 * Overrides the default dropdown arrow/icon from react-select.
 */
function DropdownIndicator(props) {
  return (
    <components.DropdownIndicator {...props}>
      <DropdownArrowIcon />
    </components.DropdownIndicator>
  )
}