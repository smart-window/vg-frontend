import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useAllCountriesQuery from 'shared/hooks/queries/useAllCountriesQuery'
import formsHelper from 'shared/services/formsHelper'
import VgInput from 'web/modules/VgInput/VgInput'
import {H2FormHeading, DivFormContents, DivFieldsRow} from '../../wwSharedStyles'

export const DivContainer = styled.div`
  height: 100%;
`

WelcomeWizardBasicInfo.propTypes = {
  /** form fields data from the server */
  formFields: PropTypes.arrayOf(PropTypes.object),
  /**
   * Callback to save field values on server
   * Single param should be a list of field objects, each having {id, slug, value, and dataType}
   */
  handleSaveFormValues: PropTypes.func,
}
WelcomeWizardBasicInfo.defaultProps = {
  formFields: []
}

/**
 * The 'basic info' page of the EE welcome wizard
 * @category Modules - Web
 * @subcategory WelcomeWizard
 * @namespace WelcomeWizardBasicInfo
 */
export default function WelcomeWizardBasicInfo({
  formFields,
  handleSaveFormValues,
}) {
  // Fetch countries for nationality and address
  const {data: {countries = []} = {}} = useAllCountriesQuery()

  const fieldsMap = formsHelper.getFieldsMap(formFields)

  const [firstName, setFirstName] = useState(fieldsMap['legal-first-name'].value)
  const [lastName, setLastName] = useState(fieldsMap['legal-last-name'].value)
  const [, setFullName] = useState(fieldsMap['full-name'].value)
  const [preferredName, setPreferredName] = useState(fieldsMap['preferred-first-name'].value)
  const [nationality, setNationality] = useState(fieldsMap.nationality.value)

  const [birthDate, setBirthDate] = useState(fieldsMap['date-of-birth'].value)
  const [gender, setGender] = useState(fieldsMap.gender.value)
  const [maritalStatus, setMaritalStatus] = useState(fieldsMap['marital-status'].value)
  const [primaryPhone, setPrimaryPhone] = useState(fieldsMap['primary-phone'].value)

  const [businessEmail, setBusinessEmail] = useState(fieldsMap['business-email'].value)
  const [personalEmail, setPersonalEmail] = useState(fieldsMap['personal-email'].value)

  const [emergencyContactName, setEmergencyContactName] = useState(fieldsMap['emergency-contact-name'].value)
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState(fieldsMap['emergency-contact-relationship'].value)
  const [emergencyContactPhone, setEmergencyContactPhone] = useState(fieldsMap['emergency-contact-phone'].value)

  const fullWorkAddress = fieldsMap['work-address'].formattedAddress ?
    fieldsMap['work-address'].formattedAddress :
    formsHelper.buildAddressString(fieldsMap['work-address'].formFields)
  const [workAddress, setWorkAddress] = useState(fullWorkAddress)
  const [workSuiteAddress, setWorkSuiteAddress] = useState(fieldsMap['work-address'].suite)

  const fullPersonalAddress =fieldsMap['personal-address'].formattedAddress ?
    fieldsMap['personal-address'].formattedAddress :
    formsHelper.buildAddressString(fieldsMap['personal-address'].formFields)
  const [personalAddress, setPersonalAddress] = useState(fullPersonalAddress)
  const [personalSuiteAddress, setPersonalSuiteAddress] = useState(fieldsMap['personal-address'].suite)

  /**
   * Sets firstName + lastName, and uses the values to set fullName
   * @param {string} firstName first name
   * @param {string} lastName last name
   */
  function setNames(first, last) {
    setFirstName(first)
    setLastName(last)
    setFullName(first + ' ' + last)
  }

  /**
   * Sets firstName + lastName, and uses the values to set and save fullName
   * @param {string} firstName first name
   * @param {string} lastName last name
   */
  function onNameBlur(first, last) {
    const fullName = (first || '') + (last ? ' ' + last : '')
    saveFormValues([
      [fieldsMap['full-name'], fullName],
      [fieldsMap['legal-first-name'], first],
      [fieldsMap['legal-last-name'], last]
    ])
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
  function onAddressChange(field, place, suite) {
    if (field === 'work-address') {
      if (place) setWorkAddress(place)
      setWorkSuiteAddress(suite)
    }
    else {
      if (place) setPersonalAddress(place)
      setPersonalSuiteAddress(suite)
    }
  }

  /**
   * Condenses address form fields with Places API data and suite no. to save fields
   * @param {string} fieldValue the name of the address field
   * @param {object} place a place object returned from the Places API
   * @param {string} suite a suite no.
   */
  function handleSaveAddressValues(fieldValue, place, suite) {
    const addressField = fieldsMap[fieldValue]
    addressField.formattedAddress = place
    const addressMap = place ? formsHelper.getValueMapFromGoogleAddress(place, countries) : {}
    const buildAddressFields = formsHelper.getAddressApiFields(addressField.formFields, addressMap, suite)
    handleSaveFormValues(buildAddressFields)
  }

  // First Name
  const firstNameAttributes = fieldsMap['legal-first-name']
  const firstNameInput = (
    <VgInput
      label='Legal First Name'
      onChange={newFirstName => setNames(newFirstName, lastName)}
      onBlur={() => onNameBlur(firstName, lastName)}
      type={firstNameAttributes.type}
      value={firstName || ''}
    />
  )

  // Last Name
  const lastNameAttributes = fieldsMap['legal-last-name']
  const lastNameInput = (
    <VgInput
      label='Legal Last Name'
      isOptional={lastNameAttributes.optional}
      onChange={newLastName => setNames(firstName, newLastName)}
      onBlur={() => onNameBlur(firstName, lastName)}
      type={lastNameAttributes.type}
      value={lastName || ''}
    />
  )

  // Preferred First Name
  const preferredNameAttributes = fieldsMap['preferred-first-name']
  const preferredNameInput = (
    <VgInput
      label='Preferred First Name'
      isOptional={preferredNameAttributes.optional}
      onChange={setPreferredName}
      onBlur={() => saveFormValues([[preferredNameAttributes, preferredName]])}
      type={preferredNameAttributes.type}
      value={preferredName || ''}
    />
  )

  // Nationality
  const nationalityAttributes = fieldsMap.nationality
  const nationalityOptions = countries.map(country => ({label: country.name, value: country.id}))
  const nationalityInput = (
    <VgInput
      label='Nationality'
      isOptional={nationalityAttributes.optional}
      onChange={setNationality}
      onBlur={() => saveFormValues([[nationalityAttributes, nationality]])}
      type={nationalityAttributes.type}
      options={nationalityOptions}
      value={nationality}
    />
  )

  // Birth Date
  const birthDateAttributes = fieldsMap['date-of-birth']
  const birthDateInput = (
    <VgInput
      label='Date of Birth'
      isOptional={birthDateAttributes.optional}
      onBlur={() => saveFormValues([[birthDateAttributes, birthDate]])}
      onChange={setBirthDate}
      type={birthDateAttributes.type}
      value={birthDate}
    />
  )

  // Gender
  const genderAttributes = fieldsMap.gender
  const genders = ['Female', 'Male', 'Nonbinary', 'Other', 'Prefer not to say']
  const genderOptions = genders.map(gender => ({label: gender, value: gender}))
  const genderInput = (
    <VgInput
      label='Gender'
      isOptional={genderAttributes.optional}
      onChange={setGender}
      onBlur={() => saveFormValues([[genderAttributes, gender]])}
      options={genderOptions}
      type={genderAttributes.type}
      value={gender}
    />
  )

  // Marrital Status
  const maritalAttributes = fieldsMap['marital-status']
  const maritalStatuses = ['Single', 'Married', 'Common Law', 'Domestic Partnership']
  const maritalOptions = maritalStatuses.map(status => ({label: status, value: status}))
  const maritalInput = (
    <VgInput
      label='Marital Status'
      isOptional={maritalAttributes.optional}
      onChange={setMaritalStatus}
      onBlur={() => saveFormValues([[maritalAttributes, maritalStatus]])}
      options={maritalOptions}
      type={maritalAttributes.type}
      value={maritalStatus}
    />
  )

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
      onBlur={() => saveFormValues([[businessEmailAttributes, businessEmail]])}
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

  // Work Address
  const workAddressFormFields = fieldsMap['work-address']
  const workAddressInput = (
    <VgInput
      key={'input-'+workAddressFormFields.slug}
      type={workAddressFormFields.type}
      label={workAddressFormFields.config.label}
      onChange={(place, suite) => onAddressChange('work-address', place, suite)}
      onBlur={(place, suite) => handleSaveAddressValues('work-address', place, suite)}
      isOptional={false}
      value={{formattedAddress: workAddress, suite: workSuiteAddress}}
    />
  )

  // Personal Address
  const personalAddressFormFields = fieldsMap['personal-address']
  const personalAddressInput = (
    <VgInput
      key={'input-'+personalAddressFormFields.slug}
      type={workAddressFormFields.type}
      label={personalAddressFormFields.config.label}
      onChange={(place, suite) => onAddressChange('personal-address', place, suite)}
      onBlur={(place, suite) => handleSaveAddressValues('personal-address', place, suite)}
      isOptional={false}
      value={{formattedAddress: personalAddress, suite: personalSuiteAddress}}
    />
  )

  // Emergency Contact
  const emergencyContactNameAttributes = fieldsMap['emergency-contact-name']
  const emergencyContactNameInput = (
    <VgInput
      label='Emergency Contact Name'
      isOptional={emergencyContactNameAttributes.optional}
      onChange={setEmergencyContactName}
      onBlur={() => saveFormValues([[emergencyContactNameAttributes, emergencyContactName]])}
      type={emergencyContactNameAttributes.type}
      value={emergencyContactName || ''}
    />
  )
  const emergencyContactRelationshipAttributes = fieldsMap['emergency-contact-relationship']
  const emergencyContactTypes = ['Spouse', 'Partner', 'Parent', 'Child', 'Sibling', 'Friend', 'Other']
  const emergencyContactOptions = emergencyContactTypes.map(type => ({label: type, value: type}))
  const emergencyContactRelationshipInput = (
    <VgInput
      label='Emergency Contact Relationship'
      isOptional={emergencyContactRelationshipAttributes.optional}
      onChange={setEmergencyContactRelationship}
      onBlur={() => saveFormValues([[emergencyContactRelationshipAttributes, emergencyContactRelationship]])}
      options={emergencyContactOptions}
      type={emergencyContactRelationshipAttributes.type}
      value={emergencyContactRelationship || ''}
    />
  )
  const emergencyContactPhoneAttributes = fieldsMap['emergency-contact-phone']
  const emergencyContactPhoneInput = (
    <VgInput
      label='Emergency Contact Phone Number'
      isOptional={emergencyContactPhoneAttributes.optional}
      onChange={setEmergencyContactPhone}
      onBlur={() => saveFormValues([[emergencyContactPhoneAttributes, emergencyContactPhone]])}
      type={emergencyContactPhoneAttributes.type}
      value={emergencyContactPhone || ''}
    />
  )

  return (
    <DivContainer>
      <H2FormHeading>Please ensure the following information is correct:</H2FormHeading>
      <DivFormContents>
        <DivFieldsRow>
          {firstNameInput}
          {lastNameInput}
          {preferredNameInput}
          {nationalityInput}
        </DivFieldsRow>
        <DivFieldsRow>
          {birthDateInput}
          {genderInput}
          {maritalInput}
          {phoneInput}
        </DivFieldsRow>
        <DivFieldsRow>
          {businessEmailInput}
          {personalEmailInput}
        </DivFieldsRow>
        <DivFieldsRow type={'address'}>
          {workAddressInput}
        </DivFieldsRow>
        <DivFieldsRow type={'address'}>
          {personalAddressInput}
        </DivFieldsRow>
        <DivFieldsRow>
          {emergencyContactNameInput}
          {emergencyContactRelationshipInput}
          {emergencyContactPhoneInput}
        </DivFieldsRow>
      </DivFormContents>
    </DivContainer>
  )
}
