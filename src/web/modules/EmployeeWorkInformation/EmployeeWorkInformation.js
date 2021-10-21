import React from 'react'
import PropTypes from 'prop-types'
import ExpandableSection from 'web/components/ExpandableSection/ExpandableSection'

import useFormsGenericUserQuery from 'shared/hooks/queries/useFormsGenericUserQuery'
import useAllCountriesQuery from 'shared/hooks/queries/useAllCountriesQuery'
import formConstants from 'shared/constants/formConstants'
import {DivContainer} from './EmployeeWorkInformation.styles'
import EmployeeContract from './components/EmployeeContract/EmployeeContract'

EmployeeWorkInformation.propTypes = {
  /** employee record from server, needs embedded user record */
  employee: PropTypes.object.isRequired,
  /** Used for the parent to track when saveFormValuesForUser() is in progress */
  setSavingFields: PropTypes.func
}

const ee_form_slugs = [
  formConstants.PROFILE_WORK_INFO_FORM_SLUG,
]

/**
 * A user's profile page containing work info
 * @category Components - Web
 * @namespace EmployeeWorkInformation
 */
export default function EmployeeWorkInformation({employee}) {
  const {employments=[]} = employee
  const {data: {countries = []} = {}} = useAllCountriesQuery()

  const {data: {formsBySlugForUser: forms = []} = {}} = useFormsGenericUserQuery(
    ee_form_slugs,
    employee?.user?.id
  )

  const workInfoForm = forms.find(form => form.slug === formConstants.PROFILE_WORK_INFO_FORM_SLUG)

  const contractSections = employments.map(employment => {
    return (
      <EmployeeContract
        employment={employment}
        countries={countries}
        workForm={workInfoForm}
      />
    )
  })

  return (
    <DivContainer>
      <ExpandableSection title='Work Information'>
        {contractSections}
      </ExpandableSection>
    </DivContainer>
  )
}
