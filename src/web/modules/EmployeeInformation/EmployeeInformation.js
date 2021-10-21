import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import formConstants from 'shared/constants/formConstants'
import useFormsGenericUserQuery from 'shared/hooks/queries/useFormsGenericUserQuery'
import useAllCountriesQuery from 'shared/hooks/queries/useAllCountriesQuery'
import useFormsGenericUserMutation from 'shared/hooks/mutations/useFormsGenericUserMutation'
import DynamicFormFields from 'web/components/DynamicFormFields/DynamicFormFields'
import ExpandableSection from 'web/components/ExpandableSection/ExpandableSection'
import EmployeeContactInformation from './components/EmployeeContactInformation/EmployeeContactInformation'
import EmployeePersonalInformation from './components/EmployeePersonalInformation/EmployeePersonalInformation'
import DownloadIcon from 'web/components/DynamicIcons/DownloadIcon'
import formsHelper from 'shared/services/formsHelper'
import {eeProfilelocalStorageIds} from 'web/components/ExpandableSection/SectionLocalStorageIds'

import {
  DivContainer,
  DivDownloadContainer,
  ADownloadProfile
} from './EmployeeInformation.styles'

const ee_form_slugs = [
  formConstants.PROFILE_PERSONAL_INFO_FORM_SLUG,
  formConstants.PROFILE_CONTACT_INFO_FORM_SLUG,
  formConstants.BANK_INFO_FORM_SLUG,
  formConstants.WORK_INFO_FORM_SLUG,
  formConstants.IDENTIFICATION_INFO_FORM_SLUG,
  formConstants.OTHER_INFO_FORM_SLUG
]

EmployeeInformation.propTypes = {
  /** employee record from server, needs embedded user record */
  employee: PropTypes.object.isRequired,
  /** Used for the parent to track when saveFormValuesForUser() is in progress */
  setSavingFields: PropTypes.func
}

/**
 * A user's profile page containing personal and work info
 * @category Components - Web
 * @namespace UserProfile
 */
export default function EmployeeInformation({employee, setSavingFields}) {
  const aDownloadProfileTag = useRef(null)
  // Fetch countries for address fields
  const {data: {countries = []} = {}} = useAllCountriesQuery()
  const [saveFormValuesForUser] = useFormsGenericUserMutation({
    onCompleted: () => setSavingFields(false)
  })
  const {data: {formsBySlugForUser: forms = []} = {}} = useFormsGenericUserQuery(
    ee_form_slugs,
    employee?.user?.id
  )

  const personalInfoForm = forms.find(form => form.slug === formConstants.PROFILE_PERSONAL_INFO_FORM_SLUG)
  const contactInfoForm = forms.find(form => form.slug === formConstants.PROFILE_CONTACT_INFO_FORM_SLUG)
  const bankInfoForm = forms.find(form => form.slug === formConstants.BANK_INFO_FORM_SLUG)
  const identificationInfoForm = forms.find(form => form.slug === formConstants.IDENTIFICATION_INFO_FORM_SLUG)
  const otherInfoForm = forms.find(form => form.slug === formConstants.OTHER_INFO_FORM_SLUG)
  /**
   *
   * @param {array} fieldData array of objects for changed fields.
   *   Each object should include {id, slug, value, dataType, and formSlug}
   */
  function handleSaveFormValues(fieldData) {
    setSavingFields(true)
    saveFormValuesForUser({
      variables: {
        fieldValues: fieldData,
        userId: employee?.user?.id
      }
    })
  }

  /**
   * Handle csv export of profile data.
   */
  function handleExportProfile() {
    // TODO: multiple employments?
    const employment = employee?.employments ? employee.employments[0] : null
    const filename = employee?.user?.lastName + '_' + employee?.user?.firstName + '_' + employment?.job?.client?.name + '_' + employment?.country?.name + '.csv'
    formsHelper.exportFormFieldValuesForUserAsCSV(employee?.user?.id, ee_form_slugs, filename, aDownloadProfileTag)
  }

  return (
    <DivContainer>
      <DivDownloadContainer onClick={handleExportProfile}>
        <p>Download Profile</p>
        <DownloadIcon/>
        <ADownloadProfile data-testid='profile-download-tag' key={'download-profile-ref'} ref={aDownloadProfileTag}/>
      </DivDownloadContainer>
      <ExpandableSection title={'Personal Information'}>
        {
          personalInfoForm?.formFields &&
          <EmployeePersonalInformation
            formFields={personalInfoForm.formFields}
            handleSaveFormValues={handleSaveFormValues}
          />
        }
      </ExpandableSection>
      <ExpandableSection title={'Contact Information'}>
        {
          contactInfoForm?.formFields &&
          <EmployeeContactInformation
            formFields={contactInfoForm.formFields}
            handleSaveFormValues={handleSaveFormValues}
          />
        }
      </ExpandableSection>
      <ExpandableSection localStorageId={eeProfilelocalStorageIds.PROFILE_BANK} title={'Bank Information'} isCollapsable={true}>
        <DynamicFormFields
          countries={countries}
          formFields={bankInfoForm?.formFields}
          handleSaveFieldValues={handleSaveFormValues}
        />
      </ExpandableSection>
      <ExpandableSection localStorageId={eeProfilelocalStorageIds.PROFILE_IDENTIFICATION} title={'Identification Information'} isCollapsable={true}>
        <DynamicFormFields
          countries={countries}
          formFields={identificationInfoForm?.formFields}
          handleSaveFieldValues={handleSaveFormValues}
        />
      </ExpandableSection>
      <ExpandableSection localStorageId={eeProfilelocalStorageIds.PROFILE_OTHER} title={'Other Information'} isCollapsable={true}>
        <DynamicFormFields
          countries={countries}
          formFields={otherInfoForm?.formFields}
          handleSaveFieldValues={handleSaveFormValues}
        />
      </ExpandableSection>
    </DivContainer>
  )
}
