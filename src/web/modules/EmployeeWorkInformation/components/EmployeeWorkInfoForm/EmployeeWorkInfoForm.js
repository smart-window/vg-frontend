import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DynamicFormFields from 'web/components/DynamicFormFields/DynamicFormFields'

const DivContainer = styled.div`
  height: 100%;
`

EmployeeWorkInfoForm.propTypes = {
  /** formFields array from the server */
  formFields: PropTypes.arrayOf(PropTypes.object),
  /**
   * Callback to save field values on server
   * Single param should be a list of field objects, each having {id, slug, value, and dataType}
   */
  handleSaveFormValues: PropTypes.func,
  /** List of fetched countries */
  countries: PropTypes.func,
}

/**
 * A subcomponent of the EmployeeWorkInformation, handles showing the user's Work Address and CSF
 * @category Modules - Web
 * @subcategory EmployeeWorkInformation
 * @namespace EmployeeWorkInfoForm
 */
export default function EmployeeWorkInfoForm({formFields, handleSaveFormValues, countries}) {
  return (
    <DivContainer>
      <DynamicFormFields
        countries={countries}
        formFields={formFields}
        handleSaveFieldValues={handleSaveFormValues}
      />
    </DivContainer>
  )
}