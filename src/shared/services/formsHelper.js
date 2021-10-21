import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import dateHelper from 'shared/services/dateHelper'
import localeHelper from 'shared/services/localeHelper.js'
import oktaService from 'web/services/oktaService'
import exportConstants from 'shared/constants/exportConstants'

/**
 * Contains utility functions to assist working with forms and their fields.
 * @category Services
 * @module formsHelper
 */

export default {
  getFieldsMap,
  getFieldMutationObject,
  getCompletedFormSlugs,
  isFormComplete,
  mapAddressField,
  buildAddressString,
  getAddressApiFields,
  getValueMapFromGoogleAddress,
  transformAddressLabelToKey,
  exportFormFieldValuesForUserAsCSV
}

const fieldTypeToInputType = {
  'date': InputTypes.DATE,
  'number': InputTypes.NUMBER,
  'phone': InputTypes.PHONE,
  'private': InputTypes.PRIVATE,
  'select': InputTypes.SELECT,
  'text': InputTypes.TEXT,
  'address': InputTypes.ADDRESS
}

/**
 * Formats the form fields from the server to an easily accessible map
 * @param {array} serverData list of form fields from the server containing other attributes
 * @returns {object} map of field slug to relevant attributes
 */
function getFieldsMap(serverData) {
  let fieldsMap = {}
  for (const formField of serverData) {
    const {id, config, optional, slug} = formField
    let value = formField.value
    const type = fieldTypeToInputType[formField.type]
    if (formField.type === InputTypes.DATE && value) {
      value = dateHelper.convertAPIDateToDate(value)
    }
    if (formField.type === InputTypes.ADDRESS) {
      fieldsMap = mapAddressField(formField, fieldsMap)
    }
    else {
      fieldsMap[slug] = {id, config, optional, slug, type, value}
    }
  }
  return fieldsMap
}

/**
 * Returns an object formatted for the saveForms GQL mutation
 * @param {object} formField form_field object from server
 * @param {*} newValue new value from the client
 * @returns {object} mutation data ready for Apollo
 */
function getFieldMutationObject(formField, newValue) {
  if (formField.type === InputTypes.DATE) {
    newValue = dateHelper.getStringDate(newValue)
  }
  if (newValue !== undefined && newValue !== null) {
    newValue = String(newValue).trim()
  }
  return {
    id: formField.id,
    slug: formField.slug,
    value: newValue,
    dataType: formField.config.type_override || formField.type
  }
}

/**
 * Gets a list of slugs representing forms from the given list that are completed.
 * @param {array} forms formsBySlugForCurrentUser data from the server
 * @returns {array} array of slugs (strings) representing completed forms
 */
function getCompletedFormSlugs(forms) {
  const completedFormSlugs = []
  for (const form of forms) {
    if (isFormComplete(form)) {
      completedFormSlugs.push(form.slug)
    }
  }
  return completedFormSlugs
}

/**
 * Checks whether all fields are filled in the given form.
 * @param {object} form form data from the server
 * @returns {boolean}
 */
function isFormComplete(form) {
  return form.formFields
    .reduce(
      (complete, field) => complete && (field.value || field.formattedAddress || field.optional),
      true
    )
}

/*
 * ADDRESS-SPECIFIC FUNCTIONS
 */

/**
 * For an address, need to combine the several types into one
 * fieldsMap = {
 *  work-address: {
 *    full-address: '123',
 *    form-fields: [{formField1}, {formField2}]
 *   }
 * }
 */
function mapAddressField(formField, fieldsMap) {
  const {id, config, optional, slug, value, sourceTableField} = formField
  const type = fieldTypeToInputType[formField.type]
  // Transforms a label like "Work Address" to a key of "work-address"
  const label = transformAddressLabelToKey(config.label)

  if (!fieldsMap[label]) {
    fieldsMap[label] = {
      slug: label,
      config,
      type,
      optional: false,
      formFields: [],
    }
  }

  if (formField.slug.includes('formatted-address')) fieldsMap[label].formattedAddress = value
  if (formField.slug.includes('line-3')) fieldsMap[label].suite = value
  fieldsMap[label].formFields.push({id, config, optional, slug, type, value, sourceTableField})
  return fieldsMap
}

/**
 * Builds a full address if formatted-address is not saved for the address,
 * This is an assumption and should only be as a backup if a formatted address doesn't exist
 * @param {array} addressFields
 * @returns {string} full address
 */
function buildAddressString(addressFields) {
  const fullAddress = addressFields.reduce((acc, formField) => {
    if (formField.slug.includes('county-district') || formField.slug.includes('state-province-iso-alpha-2-code')) {
      return acc
    }
    else if (!formField.slug.includes('line-')) {
      acc += formField.value ? `, ${formField.value}` : ''
    }
    else {
      acc += formField.value ? ` ${formField.value}` : ''
    }
    return acc
  }, '')
  return fullAddress.trim()
}

/**
 * Combines Places API data with an address's form fields to build list of form fields to save
 * @param {array} formFields all form fields for a particular address
 * @param {object} valueMapFromAddress map of keys representing our address table fields populated with values from the Places API
 * @param {string} suiteValue input value for suite/apt no.
 * @returns array of formatted form fields to save
 */
function getAddressApiFields(formFields, valueMapFromAddress, suiteValue) {
  return formFields.map(formField => {
    const isAddressSaving = !!Object.keys(valueMapFromAddress).length
    let value = isAddressSaving ? valueMapFromAddress[formField.sourceTableField] : formField.value
    if (formField.sourceTableField === 'formatted_address') value = isAddressSaving ? valueMapFromAddress.formatted_address : formField.value
    if (formField.sourceTableField === 'line_3') value = isAddressSaving ? formField.value : suiteValue
    return {
      id: formField.id,
      slug: formField.slug,
      value: value || '',
      dataType: formField.config.type_override ? formField.config.type_override : formField.type
    }
  })
}

/**
 * Transforms a label like "Work Address" to a key of "work-address"
 * @param {string} label i.e. "Work Address"
 * @returns {string} i.e. "work-address"
 */
function transformAddressLabelToKey(label) {
  return label.split(' ').map(word => word.toLowerCase()).join('-')
}

// Used in the below function
const GOOGLE_TO_ADDRESS_MAP = {
  'street_number': ['line_1'],
  'street_address': ['line_1'],
  'route': ['line_1'],
  'floor': ['line_2'],
  'neighborhood': ['line_2'],
  'premise': ['line_3'],
  'subpremise': ['line_3'],
  'locality': ['city'],
  'sublocality': ['city', 'postal_code'],
  'postal_code': ['postal_code'],
  'administrative_area_level_2': ['county_district'],
  'administrative_area_level_1': ['state_province', 'state_province_iso_alpha_2_code'],
  'country': ['country_id']
}

/**
 * Maps the Google Places API return to the corresponding field on our address table
 * @param {object} address Google Places API returned place
 * @param {*} countries List of countries in our database
 * @returns map of keys representing our address table fields populated with values from the Places API
 */
function getValueMapFromGoogleAddress(address, countries) {
  const fieldMap = address.address_components.reduce((fieldsMap, addressPart) => {
    addressPart.types.forEach(type => {
      const correspondingFormField = GOOGLE_TO_ADDRESS_MAP[type]
      if (correspondingFormField) {
        correspondingFormField.forEach(field => {
          if (!fieldsMap[field]) fieldsMap[field] = ''
          if (field === 'country_id') {
            let foundCountry
            foundCountry = countries.find(country => country.iso_alpha_2_code === addressPart.short_name)
            if (!foundCountry) foundCountry = countries.find(country => country.name === addressPart.long_name)
            fieldsMap[field] = foundCountry.id
          }
          else if (field === 'state_province_iso_alpha_2_code') {
            fieldsMap[field] += addressPart.short_name
          }
          else {
            fieldsMap[field] += fieldsMap[field] === '' ? addressPart.long_name : ' ' + addressPart.long_name
          }
        })
      }
    })
    return fieldsMap
  }, {})
  fieldMap.formatted_address = address.formatted_address
  return fieldMap
}

/**
 * Handle csv export of forms field values for a user.
 * @param user_id the id of the user for which data is to be exported
 * @param [form_slugs] slugs of the forms to export.
 * @param filename the name of the downloadable file
 * @param aTag the a tag reference to "click" (optional)
 */
function exportFormFieldValuesForUserAsCSV(user_id, form_slugs, filename, aTag) {
  const formSlugsParam = 'form_slugs=' + form_slugs.join(',')
  const userParam = 'user_id=' + user_id
  const csvDelimiterParam = 'csv_delimiter=' + localeHelper.getCSVLineDelimiter(navigator.language)
  const filenameParam = 'filename=' + filename
  const tokenParam = 'token=' + encodeURIComponent(oktaService.getBearerToken())
  const params = formSlugsParam
          + '&' + userParam
          + '&' + csvDelimiterParam
          + '&' + filenameParam
          + '&' + tokenParam
  const link = aTag ? aTag.current : document.createElement('a')
  link.href = process.env.REACT_APP_API_HOST + exportConstants.FORM_FIELD_VALUES_EXPORT_URL + '?' + params
  link.click()
}
