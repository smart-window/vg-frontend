import React from 'react'
import PropTypes from 'prop-types'

import formConstants from 'shared/constants/formConstants'
import {sectionConstants} from '../../constants/WelcomeWizardConstants'
import VelocityGlobalLogo from 'web/components/DynamicIcons/VelocityGlobalLogo'
import VelocityGlobalWords from 'assets/images/velocityGlobalLogoWords.svg'
import checkmark from 'assets/images/icons/checkmark.svg'
import { colors } from 'shared/constants/cssConstants'

import {
  AsideProgressIndicator,
  DivLogoOverlay,
  ArticleHeaderContainer,
  UlProgressContainer,
  LiStepContainer,
  UlSubstepsContainer
} from './OnboardingSidebar.styles'

/*
  TODO: replace mock data with fetched steps from onboarding process or service
*/
const progressSteps = [
  {id: 1, order: 1, name: 'Review your information', slug: formConstants.BASIC_INFO_FORM_SLUG, substeps: []},
  {id: 2, order: 2, name: 'Answer a few questions', substeps: [
    {id: 1, order: 1, name: 'Personal Information', slug: formConstants.PERSONAL_INFO_FORM_SLUG},
    {id: 2, order: 2, name: 'Contact Information', slug: formConstants.CONTACT_INFO_FORM_SLUG},
    {id: 3, order: 3, name: 'Bank Information', slug: formConstants.BANK_INFO_FORM_SLUG},
    {id: 4, order: 4, name: 'Work Information', slug: formConstants.WORK_INFO_FORM_SLUG},
    {id: 5, order: 5, name: 'Identification Information', slug: formConstants.IDENTIFICATION_INFO_FORM_SLUG},
    {id: 6, order: 6, name: 'Other Information', slug: formConstants.OTHER_INFO_FORM_SLUG},
  ]},
  {id: 3, order: 3, name: 'Manage your documents', substeps: [
    {id: 1, order: 7, name: 'Required Uploads', slug: sectionConstants.UPLOAD_DOCUMENTS_SLUG},
    {id: 3, order: 9, name: 'Download for your Records', slug: sectionConstants.DOWNLOAD_DOCUMENTS_SLUG},
  ]},
  {id: 4, order: 4, name: 'Sign your contract', slug: sectionConstants.CONTRACTS_DOCUMENTS_SLUG, substeps: []},
]

OnboardingSidebar.propTypes = {
  /** set of forms with all fields complete */
  completedSectionSlugs: PropTypes.instanceOf(Set).isRequired,
  /** the current step number/id */
  currentStepId: PropTypes.number.isRequired,
  /** set of forms that have no fields (and should be hidden) */
  emptyFormSlugs: PropTypes.instanceOf(Set)
}

/**
 * Sidebar for onboarding workflows indicating progress - currently hardcoded for EE onboarding
 * @category Components - Web
 * @namespace OnboardingSidebar
 */
export default function OnboardingSidebar({completedSectionSlugs, currentStepId, emptyFormSlugs}) {

  /**
   * Returns whether the step is completed based on completedSectionSlugs and progressSteps
   * @param {object} step - one of the steps in progressSteps above
   */
  function getIsCompleted(step) {
    if (step.substeps && step.substeps.length) {
      return step.substeps.reduce((isComplete, substep) => isComplete && completedSectionSlugs.has(substep.slug), true)
    }
    else {
      return completedSectionSlugs.has(step.slug)
    }
  }

  const progressDisplay = progressSteps
    .filter(step => !(emptyFormSlugs.has(step.slug)) )
    .map(step => {
      const isSelected = currentStepId === step.id
      const isCompleted = getIsCompleted(step)
      return (
        <LiStepContainer
          isSelected={isSelected}
          key={'item-'+step.id}
        >
          <div>
            { isCompleted ?
              <img src={checkmark} alt='Step Completed' /> :
              <figure><figcaption>{step.order}</figcaption></figure>
            }
            <p>{step.name}</p>
          </div>
          {
            isSelected &&
            <UlSubstepsContainer>
              { createSubstepsList(step.substeps) }
            </UlSubstepsContainer>
          }
        </LiStepContainer>
      )
    })

  /**
   * Creates list of substeps
   * @param {Array} substeps - array of substeps to build list from
   * @returns {Array} - array of jsx elements to build list UI
   */
  function createSubstepsList(substeps) {
    return substeps
      .filter(substep => !(emptyFormSlugs.has(substep.slug)) )
      .map(substep => {
        const isCompleted = getIsCompleted(substep)
        return (
          <LiStepContainer
            key={'subitem-'+substep.id}
          >
            <div>
              { isCompleted && <img src={checkmark} alt='Step Completed' /> }
              <p>{substep.name}</p>
            </div>
          </LiStepContainer>
        )
      })
  }

  return (
    <AsideProgressIndicator>
      <DivLogoOverlay>
        <VelocityGlobalLogo
          fillColor={colors.officialBlue}
        />
      </DivLogoOverlay>
      <ArticleHeaderContainer>
        <VelocityGlobalLogo
          width={88}
          height={81}
        />
        <img src={VelocityGlobalWords} alt='Velocity Global Logo' />
        <p>White-glove service at unparalleled speed.</p>
      </ArticleHeaderContainer>
      <UlProgressContainer>
        {progressDisplay}
      </UlProgressContainer>
    </AsideProgressIndicator>
  )

}