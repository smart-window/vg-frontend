import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import useAllCountriesQuery from 'shared/hooks/queries/useAllCountriesQuery'
import VgInput from 'web/modules/VgInput/VgInput'
import {DivFieldsRow} from '../../employeeInformationSharedStyles'
import formsHelper from 'shared/services/formsHelper'
import DynamicFormFields from 'web/components/DynamicFormFields/DynamicFormFields'

const DivContainer = styled.div`
  height: 100%;
`

EmployeePersonalInformation.propTypes = {
  /** formFields array from the server */
  formFields: PropTypes.arrayOf(PropTypes.object),
  /**
   * Callback to save field values on server
   * Single param should be a list of field objects, each having {id, slug, value, and dataType}
   */
  handleSaveFormValues: PropTypes.func,
}
EmployeePersonalInformation.defaultProps = {
  formFields: []
}

const globalFieldSlugs = new Set([
  'legal-first-name',
  'legal-last-name',
  'full-name',
  'preferred-first-name',
  'nationality',
  'date-of-birth',
  'gender',
  'marital-status',
  'emergency-contact-name',
  'emergency-contact-relationship',
  'emergency-contact-phone',
])

/**
 * The 'personal info' section of the EE profile
 * @category Modules - Web
 * @subcategory EmployeeInformation
 * @namespace EmployeePersonalInformation
 */
export default function EmployeePersonalInformation({
  formFields,
  handleSaveFormValues,
}) {
  // Fetch countries for nationality
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

  const [emergencyContactName, setEmergencyContactName] = useState(fieldsMap['emergency-contact-name'].value)
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState(fieldsMap['emergency-contact-relationship'].value)
  const [emergencyContactPhone, setEmergencyContactPhone] = useState(fieldsMap['emergency-contact-phone'].value)

  const countrySpecificFields = formFields.filter(field => !globalFieldSlugs.has(field.slug))

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
        {emergencyContactNameInput}
      </DivFieldsRow>
      <DivFieldsRow>
        {emergencyContactRelationshipInput}
        {emergencyContactPhoneInput}
      </DivFieldsRow>
      <DynamicFormFields formFields={countrySpecificFields}/>
    </DivContainer>
  )
}
