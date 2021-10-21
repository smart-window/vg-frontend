import React from 'react'
import PropTypes from 'prop-types'

import formConstants from 'shared/constants/formConstants'
import useAllCountriesQuery from 'shared/hooks/queries/useAllCountriesQuery'
import DynamicFormFields from 'web/components/DynamicFormFields/DynamicFormFields'
import SectionHeading from '../SectionHeading/SectionHeading'

import {H2FormHeading, DivFormContents} from '../../wwSharedStyles'
import {DivContainer, H4SectionDescription} from './WelcomeWizardOtherInfo.styles'

WelcomeWizardOtherInfo.propTypes = {
  /** Forms that are complete */
  completedSectionSlugs: PropTypes.instanceOf(Set),
  /** EE's country of employment */
  countryName: PropTypes.string.isRequired,
  /** formsBySlug query response - a list of forms with fields/values */
  formsData: PropTypes.object.isRequired,
  /**
   * Callback to save field values on server
   * Single param should be a list of field objects, each having {id, slug, value, and dataType}
   */
  handleSaveFormValues: PropTypes.func.isRequired,
}

/**
 * The country-specific info page of the EE welcome wizard
 * @category Modules - Web
 * @subcategory WelcomeWizard
 * @namespace WelcomeWizardOtherInfo
 */
export default function WelcomeWizardOtherInfo({
  completedSectionSlugs,
  countryName,
  formsData,
  handleSaveFormValues,
}) {
  // Fetch countries for address fields
  const {data: {countries = []} = {}} = useAllCountriesQuery()

  /**
   * Render helper for dynamically rendering a section of CSF
   * @param {array} formSlug form.slug which should map to an item in props.formsData
   * @param {string} sectionTitle title of form section
   * @param {string} sectionDescription description for the section
   * @returns {array} jsx <section> with corresponding inputs/fields
   */
  function renderFormSection(formSlug, sectionTitle, sectionDescription) {
    const formData = formsData.find(form => form.slug === formSlug)
    const sectionIsComplete = completedSectionSlugs.has(formSlug)
    // create section UI
    return (
      <section>
        <SectionHeading title={sectionTitle} sectionIsComplete={sectionIsComplete} />
        <H4SectionDescription>{sectionDescription}</H4SectionDescription>
        <DynamicFormFields
          countries={countries}
          formFields={formData.formFields}
          handleSaveFieldValues={handleSaveFormValues}
        />
      </section>
    )
  }

  return (
    <DivContainer>
      <H2FormHeading>{`We also have some questions specific to ${countryName}:`}</H2FormHeading>
      <DivFormContents>
        {
          renderFormSection(
            formConstants.PERSONAL_INFO_FORM_SLUG,
            'PERSONAL INFORMATION',
            'Based on your country of employment, we have additional questions about your personal information.'
          )
        }
        {
          renderFormSection(
            formConstants.CONTACT_INFO_FORM_SLUG,
            'CONTACT INFORMATION',
            'We have a few additional questions about how to contact you.'
          )
        }
        {
          renderFormSection(
            formConstants.BANK_INFO_FORM_SLUG,
            'BANK INFORMATION',
            'We require your banking information in order to set up electronic payments for you.'
          )
        }
        {
          renderFormSection(
            formConstants.WORK_INFO_FORM_SLUG,
            'WORK INFORMATION',
            'Please answer some additional questions on your employment information.'
          )
        }
        {
          renderFormSection(
            formConstants.IDENTIFICATION_INFO_FORM_SLUG,
            'IDENTIFICATION INFORMATION',
            'We need to collect some identification information to process your employment.'
          )
        }
        {
          renderFormSection(
            formConstants.OTHER_INFO_FORM_SLUG,
            'OTHER INFORMATION',
            'Finally, we have some additional questions for you before you move on!'
          )
        }
      </DivFormContents>
    </DivContainer>
  )
}