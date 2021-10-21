import React, {useState, useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'
import modalConstants from 'web/constants/modalConstants'
import useAllCountriesQuery from 'shared/hooks/queries/useAllCountriesQuery'
import formsHelper from 'shared/services/formsHelper'
import VgInput from 'web/modules/VgInput/VgInput'
import {DivFieldsRow} from '../../employeeInformationSharedStyles'

const DivContainer = styled.div`
  height: 100%;
`

EmployeeContactInformation.propTypes = {
  /** formFields array from the server */
  formFields: PropTypes.arrayOf(PropTypes.object),
  /**
   * Callback to save field values on server
   * Single param should be a list of field objects, each having {id, slug, value, and dataType}
   */
  handleSaveFormValues: PropTypes.func,
}
EmployeeContactInformation.defaultProps = {
  formFields: []
}

/**
 * The 'contact info' section of the EE profile
 * @category Modules - Web
 * @subcategory EmployeeInformation
 * @namespace EmployeePersonalInformation
 */
export default function EmployeeContactInformation({
  formFields,
  handleSaveFormValues,
}) {
  // Fetch countries for address fields
  const {data: {countries = []} = {}} = useAllCountriesQuery()
  const fieldsMap = formsHelper.getFieldsMap(formFields)

  const [primaryPhone, setPrimaryPhone] = useState(fieldsMap['primary-phone'].value)
  const [businessEmail, setBusinessEmail] = useState(fieldsMap['business-email'].value)
  const [personalEmail, setPersonalEmail] = useState(fieldsMap['personal-email'].value)

  const fullPersonalAddress =fieldsMap['personal-address'].formattedAddress ?
    fieldsMap['personal-address'].formattedAddress :
    formsHelper.buildAddressString(fieldsMap['personal-address'].formFields)
  const [personalAddress, setPersonalAddress] = useState(fullPersonalAddress)
  const [personalSuiteAddress, setPersonalSuiteAddress] = useState(fieldsMap['personal-address'].suite)

  const {showModal} = useContext(GlobalModalContext)

  /** Gates business email changes with a confirmation modal, reverting on cancel */
  function confirmBusinessEmailChange() {
    const businessEmailAttributes = fieldsMap['business-email']
    if (businessEmailAttributes.value !== businessEmail) {
      showModal(modalConstants.CONFIRMATION_MODAL, {
        title: 'Confirm Data Changes',
        message: 'Are you sure you want to change this user\'s business email? This will update their login credentials.',
        submitButtonText: 'Confirm Changes',
        onSubmit: () => saveFormValues([[businessEmailAttributes, businessEmail]]),
        onClose: () => setBusinessEmail(businessEmailAttributes.value)
      })
    }
  }

  /**
   * Saves a form field's value
   * @param {array} fieldValues array with values of [{formField}, newFieldValue]
   */
  function saveFormValues(fieldValues) {
    const actuallyChangedValues = []
    for (const fieldValue of fieldValues) {
      const [field, newFieldValue] = fieldValue
      if (field.value !== newFieldValue) {
        const fieldMutationData = formsHelper.getFieldMutationObject(field, newFieldValue)
        actuallyChangedValues.push(fieldMutationData)
      }
    }
    if (actuallyChangedValues.length) {
      handleSaveFormValues(actuallyChangedValues)
    }
  }

  /**
   * Sets address parts in state
   * @param {object} place a Google Maps API place, can be null
   * @param {string} suite a suite number, can be null
   */
  function onAddressChange(place, suite) {
    if (place) setPersonalAddress(place)
    setPersonalSuiteAddress(suite)
  }

  /**
   * Condenses address form fields with Places API data and suite no. to save fields
   * @param {object} place a place object returned from the Places API
   * @param {string} suite a suite no.
   */
  function handleSaveAddressValues(place, suite) {
    const addressField = fieldsMap['personal-address']
    addressField.formattedAddress = place
    const addressMap = place ? formsHelper.getValueMapFromGoogleAddress(place, countries) : {}
    const buildAddressFields = formsHelper.getAddressApiFields(addressField.formFields, addressMap, suite)
    handleSaveFormValues(buildAddressFields)
  }

  // Phone
  const phoneAttributes = fieldsMap['primary-phone']
  const phoneInput = (
    <VgInput
      label='Primary Phone Number'
      isOptional={phoneAttributes.optional}
      onChange={setPrimaryPhone}
      onBlur={() => saveFormValues([[phoneAttributes, primaryPhone]])}
      type={phoneAttributes.type}
      value={primaryPhone || ''}
    />
  )

  // Business Email
  const businessEmailAttributes = fieldsMap['business-email']
  const businessEmailInput = (
    <VgInput
      label='Business Email Address'
      isOptional={businessEmailAttributes.optional}
      onChange={setBusinessEmail}
      onBlur={confirmBusinessEmailChange}
      type={businessEmailAttributes.type}
      value={businessEmail || ''}
    />
  )

  // Personal Email
  const personalEmailAttributes = fieldsMap['personal-email']
  const personalEmailInput = (
    <VgInput
      label='Personal Email Address'
      isOptional={personalEmailAttributes.optional}
      onChange={setPersonalEmail}
      onBlur={() => saveFormValues([[personalEmailAttributes, personalEmail]])}
      type={personalEmailAttributes.type}
      value={personalEmail || ''}
    />
  )

  // Personal Address
  const personalAddressFormFields = fieldsMap['personal-address']
  const personalAddressInput = (
    <VgInput
      key={'input-'+personalAddressFormFields.slug}
      type={personalAddressFormFields.type}
      label={personalAddressFormFields.config.label}
      onChange={(place, suite) => onAddressChange(place, suite)}
      onBlur={(place, suite) => handleSaveAddressValues(place, suite)}
      isOptional={false}
      value={{formattedAddress: personalAddress, suite: personalSuiteAddress}}
    />
  )

  return (
    <DivContainer>
      <DivFieldsRow>
        {phoneInput}
        {businessEmailInput}
        {personalEmailInput}
      </DivFieldsRow>
      <DivFieldsRow type={'address'}>
        {personalAddressInput}
      </DivFieldsRow>
    </DivContainer>
  )
}