import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import formsHelper from 'shared/services/formsHelper'
import VgInput from 'web/modules/VgInput/VgInput'
import {DivFieldsRow} from './DynamicFormFields.styles'

DynamicFormFields.propTypes = {
  /** List of countries from the server, used to for address fields */
  countries: PropTypes.arrayOf(PropTypes.object),
  /** formFields array from the server */
  formFields: PropTypes.arrayOf(
    PropTypes.shape({
      config: PropTypes.shape({
        label: PropTypes.string,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string
          })
        )
      }),
      slug: PropTypes.string.isRequired,
      type: PropTypes.string,
      value: PropTypes.string.isRequired,
      readOnly: PropTypes.bool
    })
  ),
  /** Called when a set of values is ready to be saved to the server */
  handleSaveFieldValues: PropTypes.func,
}
DynamicFormFields.defaultProps = {
  formFields: [],
  handleCompletionChange: () => {},
  handleSaveFieldValues: () => {}
}

/**
 * Renders a set of inputs from the given formFields data.
 * @param {*} param0
 * @returns
 */
export default function DynamicFormFields({
  countries,
  formFields,
  handleSaveFieldValues,
}) {

  // Rather than maintaining a separate state variable for all CSF, store field state in a map
  const [fieldSlugsToValue, setFieldSlugsToValue] = useState(getFieldSlugsToValue())

  /** Update field state map when input changes */
  useEffect(function updateStateMap() {
    setFieldSlugsToValue(getFieldSlugsToValue())
  }, [formFields])

  /**
   * Build a map of (field.slug : field.value) to store in state
   */
  function getFieldSlugsToValue() {
    const valuesMap = {}
    formFields.forEach(field => {
      if (field.type === InputTypes.ADDRESS) {
        const label = formsHelper.transformAddressLabelToKey(field.config.label)
        if (!valuesMap[label]) valuesMap[label] = {formattedAddress: '', suite: ''}
        if (field.slug.includes('formatted-address')) valuesMap[label].formattedAddress = field.value || ''
        if (field.slug.includes('line-3')) valuesMap[label].suite = field.value || ''
      }
      else {
        valuesMap[field.slug] = field.value
      }
    })
    return valuesMap
  }

  /**
   * Updates a field value in the state map
   */
  function handleValueChange(field, newValue) {
    // Update state/display with new value
    const stateMapClone = {...fieldSlugsToValue}
    stateMapClone[field.slug] = newValue
    setFieldSlugsToValue(stateMapClone)
  }

  /**
   * Updates an address field value in the state map
   * @param {object} field
   * @param {string} formattedAddress
   * @param {string} suite
   */
  function handleAddressValueChange(field, formattedAddress, suite) {
    // Update state/display with new value
    const stateMapClone = {...fieldSlugsToValue}
    if (formattedAddress) stateMapClone[field.slug].formattedAddress = formattedAddress
    stateMapClone[field.slug].suite = suite
    setFieldSlugsToValue(stateMapClone)
  }

  /**
   * Saves a field value back to the parent
   */
  function saveFieldValue(field, newValue) {
    // Don't hit the server if data hasn't changed
    if (newValue !== field.value) {
      const fieldMutationData = formsHelper.getFieldMutationObject(field, newValue)
      handleSaveFieldValues([fieldMutationData])
    }
  }

  /**
   * Condenses address form fields with Places API data and suite no. to save fields
   * @param {object} addressField the condensed field containing all address form fields
   * @param {object} place a place object returned from the Places API
   * @param {string} suite a suite no.
   */
  function saveAddressField(addressField, place, suite) {
    const addressMap = place ? formsHelper.getValueMapFromGoogleAddress(place, countries) : {}
    const buildAddressFields = formsHelper.getAddressApiFields(addressField.formFields, addressMap, suite)
    handleSaveFieldValues(buildAddressFields)
  }

  /*
   * RENDER
   */

  // TODO: make function to collapse address fields into one
  if (!formFields.length) return null
  const cleanedFormData = formFields.slice()
    .reduce((collapsedList, formField) => {
      if (formField.type === InputTypes.ADDRESS) {
        return formsHelper.mapAddressField(formField, collapsedList)
      }
      else if (!collapsedList[formField.slug]) {
        collapsedList[formField.slug] = formField
      }
      return collapsedList
    }, {})

  // split fields up into rows of 4
  const sectionFieldRows = []

  // sort data and convert to jsx/inputs
  Object.keys(cleanedFormData)
    .sort((key1, key2) => cleanedFormData[key1].config?.order - cleanedFormData[key2].config?.order)
    .reduce((fieldsRow, sortedFieldKey, index) => {
      const sortedField = cleanedFormData[sortedFieldKey]
      const currentValue = fieldSlugsToValue[sortedField.slug]
      let onChange = (value) => handleValueChange(sortedField, value)
      let onBlur = () => saveFieldValue(sortedField, currentValue)
      // TODO: all inputs are re-rendered when one input changes - could be a perf issue in the future
      if (currentValue && sortedField.type === InputTypes.ADDRESS) {
        currentValue.formattedAddress = sortedField.formattedAddress ? sortedField.formattedAddress : formsHelper.buildAddressString(sortedField.formFields)
        onChange = (place, suite) => handleAddressValueChange(sortedField, place, suite)
        onBlur = (place, suite) => saveAddressField(sortedField, place, suite)
      }
      const input = (
        <VgInput
          readOnly={sortedField.readOnly}
          key={'input-'+sortedField.slug}
          label={sortedField.config?.label}
          isOptional={sortedField.optional}
          type={sortedField.type}
          value={currentValue}
          options={sortedField.config?.options || []}
          onChange={onChange}
          onBlur={onBlur}
        />
      )

      if (sortedField.type === InputTypes.ADDRESS) {
        // Address inputs should take up half width
        if (fieldsRow.length > 2) {
          sectionFieldRows.push(<DivFieldsRow key={`row-${sectionFieldRows.length+1}`}>{fieldsRow}</DivFieldsRow>)
          // fragment used to increase count by 2
          fieldsRow = [input, <React.Fragment key={Math.random()}/>]
        }
        else {
          fieldsRow.push(input, <React.Fragment key={Math.random()}/>)
        }
      }
      else {
        fieldsRow.push(input)
        if (fieldsRow.length === 4) {
          // All other inputs are four to a row
          sectionFieldRows.push(<DivFieldsRow key={`row-${sectionFieldRows.length+1}`}>{fieldsRow}</DivFieldsRow>)
          fieldsRow = []
        }
      }

      if (index === Object.keys(cleanedFormData).length - 1 && fieldsRow.length) {
        // Put leftover inputs in own row
        sectionFieldRows.push(<DivFieldsRow key={`row-${sectionFieldRows.length+1}`}>{fieldsRow}</DivFieldsRow>)
      }
      return fieldsRow
    }, [])

  return (
    <div>
      {sectionFieldRows}
    </div>
  )
}