import React, {useState, useContext} from 'react'
import {useQuery, gql} from '@apollo/client'
import {CurrentUserContext} from 'web/providers/CurrentUserProvider.web'

import StorageConstants from 'shared/constants/storageConstants'
import {sectionConstants} from './constants/WelcomeWizardConstants'
import formConstants from 'shared/constants/formConstants'
import useFormsCurrentUserQuery from 'shared/hooks/queries/useFormsCurrentUserQuery'
import useFormsCurrentUserMutation from 'shared/hooks/mutations/useFormsCurrentUserMutation'
import formsHelper from 'shared/services/formsHelper'
import OnboardingSidebar from './components/OnboardingSidebar/OnboardingSidebar'
import WelcomeWizardBasicInfo from './components/WelcomeWizardBasicInfo/WelcomeWizardBasicInfo'
import WelcomeWizardOtherInfo from './components/WelcomeWizardOtherInfo/WelcomeWizardOtherInfo'
import WelcomeWizardDocumentInfo from './components/WelcomeWizardDocumentInfo/WelcomeWizardDocumentInfo'
import WelcomeWizardContracts from './components/WelcomeWizardContracts/WelcomeWizardContracts'
import WelcomeWizardConfirmation from './components/WelcomeWizardConfirmation/WelcomeWizardConfirmation'
import VgButton from 'web/components/VgButton/VgButton'
import {GET_CURRENT_USER_DOCUMENTS_QUERY} from 'web/apollo/queries/documentQueries'
import {documentActions, documentStatuses} from 'web/constants/documentConstants'
import {DivButtonsRow} from './wwSharedStyles'

import {
  DivCurrentPage,
  DivOnboardingContainer,
  DivOnboardingContents,
  H1Welcome,
  DivToolTip
} from './WelcomeWizard.styles'

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      firstName
      preferredFirstName
      workAddressCountryName
    }
  }
`

const NUMBER_OF_PAGES = 5
const TOTAL_SECTIONS_COUNT = 10
const documentSectionsSlugs = [
  {slug: sectionConstants.UPLOAD_DOCUMENTS_SLUG, action: documentActions.UPLOADACTION},
  {slug: sectionConstants.DOWNLOAD_DOCUMENTS_SLUG, action: documentActions.DOWNLOADACTION},
  {slug: sectionConstants.CONTRACTS_DOCUMENTS_SLUG, action: documentActions.SIGNACTION}
]

/**
 * Welcome wizard for new employees - currently built for EEs, but can be extened in the future
 * @category Modules - Web
 * @subcategory WelcomeWizard
 * @namespace WelcomeWizard
 */
export default function WelcomeWizard() {
  const currentUserContext = useContext(CurrentUserContext)
  const localStoragePage = localStorage.getItem(StorageConstants.EEWW_PAGE_NUMBER) || '1'
  const [currentPageNumber, setCurrentPageNumber] = useState(+localStoragePage)
  const [showToolTip, setShowToolTip] = useState(false)
  const isLastPage = currentPageNumber === NUMBER_OF_PAGES
  const isFirstPage = currentPageNumber === 1

  const {data: {currentUser = {}} = {}} = useQuery(CURRENT_USER_QUERY, {fetchPolicy: 'network-only'})
  const firstNameDisplay = currentUser.preferredFirstName || currentUser.firstName || ''

  const {data: {formsBySlugForCurrentUser: forms = []} = {}} = useFormsCurrentUserQuery(
    [
      formConstants.BASIC_INFO_FORM_SLUG,
      formConstants.PERSONAL_INFO_FORM_SLUG,
      formConstants.CONTACT_INFO_FORM_SLUG,
      formConstants.BANK_INFO_FORM_SLUG,
      formConstants.WORK_INFO_FORM_SLUG,
      formConstants.IDENTIFICATION_INFO_FORM_SLUG,
      formConstants.OTHER_INFO_FORM_SLUG
    ],
  )

  const basicInfoForm = forms.find(form => form.slug === formConstants.BASIC_INFO_FORM_SLUG)
  const basicInfoFormFields = basicInfoForm?.formFields || []

  const [saveFormValuesForCurrentUser] = useFormsCurrentUserMutation()

  const { data: {currentUserDocuments = []} = {}} = useQuery(GET_CURRENT_USER_DOCUMENTS_QUERY, {
    fetchPolicy: 'cache-first',
  })

  // Categorize docs by 'action' for sub-components
  const uploadDocuments = [],
    downloadDocuments = [],
    signDocuments = []
  for (const document of currentUserDocuments) {
    switch (document.action) {
      case documentActions.UPLOADACTION:
        uploadDocuments.push(document)
        break
      case documentActions.DOWNLOADACTION:
        downloadDocuments.push(document)
        break
      case documentActions.NOACTION:
        downloadDocuments.push(document)
        break
      case documentActions.SIGNACTION:
        signDocuments.push(document)
        break
      default:
    }
  }

  // Get completion states
  const completedFormSlugs = formsHelper.getCompletedFormSlugs(forms)
  const completedDocSections = getCompletedDocumentSections(currentUserDocuments)
  const completedSectionSlugs = new Set([...completedFormSlugs, ...completedDocSections])
  const isNextButtonActive = (currentPageNumber !== 4 || completedSectionSlugs.size === TOTAL_SECTIONS_COUNT)

  /**
   * Sets the current page of the Wizard in both state and localStorage.
   * @param {number} pageNumber
   */
  function updateCurrentPageNumber(pageNumber) {
    localStorage.setItem(StorageConstants.EEWW_PAGE_NUMBER, pageNumber)
    setCurrentPageNumber(pageNumber)
  }

  /**
   *
   * @param {array} fieldData array of objects for changed fields.
   *   Each object should include {id, slug, value, dataType, and formSlug}
   */
  function handleValuesChange(fieldData) {
    saveFormValuesForCurrentUser({
      variables: {
        fieldValues: fieldData
      }
    })
  }

  /**
   * Sets appropriate initial completion/validation states for each document form.
   */
  function getCompletedDocumentSections(currentUserDocuments) {
    const completedSections = []
    documentSectionsSlugs.forEach(section => {
      const isCompleted = !(currentUserDocuments.find(
        document => document.action === section.action && document.status !== documentStatuses.COMPLETEDSTATUS
      ))
      if (isCompleted) completedSections.push(section.slug)
    })
    return completedSections
  }

  // send list of forms with no fields to sidebar
  const emptyFormSlugs = forms
    .filter(form => !form.formFields.length)
    .map(form => form.slug)

  const pageNumberToJsxContents = {
    // Wait to render page until we have field data (to init state properly)
    1: !!basicInfoFormFields.length && (
      <WelcomeWizardBasicInfo
        formFields={basicInfoFormFields}
        handleSaveFormValues={handleValuesChange}
      />
    ),
    2: !!forms.length && (
      <WelcomeWizardOtherInfo
        completedSectionSlugs={completedSectionSlugs}
        formsData={forms}
        countryName={currentUser.workAddressCountryName}
        handleSaveFormValues={handleValuesChange}
      />
    ),
    3: <WelcomeWizardDocumentInfo uploadDocs={uploadDocuments} downloadDocs={downloadDocuments}/>,
    4: <WelcomeWizardContracts docsToSign={signDocuments} />,
    5: <WelcomeWizardConfirmation />
  }

  /** Toggles info tool tip on page before confirmation if all forms are incomplete */
  function toggleToolTip() {
    if (!isNextButtonActive) setShowToolTip(true)
  }

  /**
   * Increments page number.
   * If client has completed all sections of the Welcome Wizard, clicking the Next button on the contract page will
   * additionally complete the onboarding experience by changing the client_state to have a completed ee_onboarding_status
   */
  function handleNextSelection() {
    if (currentPageNumber === NUMBER_OF_PAGES - 1) {
      const userClientState = currentUserContext.currentUser.clientState || {}
      const combinedClientState = {...userClientState, ...{ee_onboarding_status: 'completed'}}
      currentUserContext.updateClientState(combinedClientState)
    }
    updateCurrentPageNumber(currentPageNumber + 1)
  }

  return (
    <DivOnboardingContainer>
      <OnboardingSidebar
        currentStepId={currentPageNumber}
        completedSectionSlugs={completedSectionSlugs}
        emptyFormSlugs={new Set(emptyFormSlugs)}
      />
      <DivOnboardingContents>
        <H1Welcome>{firstNameDisplay && `Welcome to Velocity Global, ${firstNameDisplay}!`}</H1Welcome>
        <DivCurrentPage>
          {pageNumberToJsxContents[currentPageNumber]}
        </DivCurrentPage>
        <DivButtonsRow isFirstPage={isFirstPage} isLastPage={isLastPage}>
          {
            // Don't show the back arrow on the last confirmation page
            !isFirstPage && !isLastPage &&
            <VgButton text='Back' arrowDirection='left' shape='oval' useGradient={true} onClick={() => updateCurrentPageNumber(currentPageNumber - 1)}/>
          }
          {
            !isLastPage &&
            <VgButton
              text='Next' arrowDirection='right' shape='oval' useGradient={true} isActive={isNextButtonActive}
              onMouseEnter={toggleToolTip}
              onMouseLeave={() => setShowToolTip(false)}
              onClick={handleNextSelection}
            />
          }
          <DivToolTip role='tooltip' showToolTip={showToolTip}>
            <p>Please complete all required fields on all previous steps before completing your Welcome Experience</p>
          </DivToolTip>
        </DivButtonsRow>
      </DivOnboardingContents>
    </DivOnboardingContainer>
  )
}