import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useQuery, gql} from '@apollo/client'
import analyticsService from 'web/services/analyticsService'
import useDebounce from 'shared/hooks/useDebounce'
import AnimatedDropdown from 'web/components/AnimatedDropdown/AnimatedDropdown'
import ComboBox from 'web/modules/ComboBox/ComboBox'

import {
  FieldsetDocumentManagementFilterContainer,
  DivButtonsWrapper,
  ButtonClear,
  ArticleFilterReportContainer,
  InputSearch,
  ButtonFilter
} from './DocumentManagementFilter.styles'

export const FILTER_OPTIONS_QUERY = gql`
  query {
    clients {
      id
      name
    }
    countries {
      id
      name
    }
    partners {
      id
      name
    }
    documentTemplateCategories {
      id
      name
    }
  }
`

DocumentManagementFilter.propTypes = {
  /** Called when the user clicks 'Clear' */
  onClear: PropTypes.func,
  /**
   * Called when a filter changes.
   * Sends paramter in the following format:
   * {
   *   'filter1Name': ['val1', 'val2', 'val3'],
   *   'filter2Name': [...]
   * }
   */
  onFilterChange: PropTypes.func,
  /** Called 500ms after the user stops typing in the search input */
  onSearchChange: PropTypes.func,
}
DocumentManagementFilter.defaultProps = {
  onSearchChange: () => {}
}

const instructionsForFilter = [
  {
    id: 1,
    slug: 'upload',
    analyticsLabel: 'Upload'
  },
  {
    id: 2,
    slug: 'download',
    analyticsLabel: 'download'
  },
  {
    id: 3,
    slug: 'download/upload',
    analyticsLabel: 'Download/Upload'
  }
]

/**
 * Form for filtering Document Management table.
 * @category Components - Web
 * @namespace DocumentManagementFilter
 */
export default function DocumentManagementFilter({onClear, onFilterChange, onSearchChange}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClients, setSelectedClients] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [selectedPartners, setSelectedPartners] = useState([])
  const [selectedDocumentTemplateCategories, setSelectedDocumentTemplateCategories] = useState([])
  const [selectedInstructions, setSelectedInstructions] = useState([])

  const {data} = useQuery(FILTER_OPTIONS_QUERY)
  let clientsForFilter, countriesForFilter, partnersForFilter, documentTemplateCategoriesForFilter
  if (data) {
    // map to expected format for <ComboBox>
    const clientData = data.clients.map(client => ({id: client.id, slug: client.name}))
    clientsForFilter = clientData.filter(client => (client.slug !== null))
    countriesForFilter = data.countries.map(country => ({id: country.id, slug: country.name}))
    partnersForFilter = data.partners.map(partner => ({id: partner.id, slug: partner.name}))
    documentTemplateCategoriesForFilter = data.documentTemplateCategories.map(documentTemplateCategory => ({id: documentTemplateCategory.id, slug: documentTemplateCategory.name}))
  }

  /**
   * Handles a change to the clients filter.
   * @param {string} newClients - the new clients on which to filter
   * @param {object} addedClient - the client added to filter, null if client removed
   */
  function handleClientsChange(newClients, addedClient) {
    setSelectedClients(newClients)
    const updatedFilters = getFiltersForApi({clients: newClients})
    onFilterChange(updatedFilters)
    if (addedClient) analyticsService.logEvent('EE Document Management', 'Clicked', 'FilterAdded_Client')
  }

  /**
   * Handles a change to the countries filter.
   * @param {string} newCountries - the new countries on which to filter
   * @param {object} addedCountry - the country added to filter, null if country removed
   */
  function handleCountriesChange(newCountries, addedCountry) {
    setSelectedCountries(newCountries)
    const updatedFilters = getFiltersForApi({countries: newCountries})
    onFilterChange(updatedFilters)
    if (addedCountry) analyticsService.logEvent('EE Document Management', 'Clicked', 'FilterAdded_Country')
  }

  /**
   * Handles a change to the categories filter.
   * @param {string} newCategories - the new categories on which to filter
   * @param {object} addedCategory - the category added to filter, null if category removed
   */
  function handleCategoriesChange(newCategories, addedCategory) {
    setSelectedDocumentTemplateCategories(newCategories)
    const updatedFilters = getFiltersForApi({documentTemplateCategories: newCategories})
    onFilterChange(updatedFilters)
    if (addedCategory) analyticsService.logEvent('EE Document Management', 'Clicked', 'FilterAdded_DocumentTemplateCategory')
  }

  /**
   * Handles instruction filter changes.
   * @param {string} newInstructions - the new instructions on which to filter
   * @param {object} addedInstruction - the instructions added to filter, is null if instructions removed
   */
  function handleInstructionsChange(newInstructions, addedInstruction) {
    setSelectedInstructions(newInstructions)
    const updatedFilters = getFiltersForApi({instructions: newInstructions})
    onFilterChange(updatedFilters)
    if (addedInstruction) analyticsService.logEvent(
      'EE Document Management', 'Clicked',
      `FilterAdded_Instruction${addedInstruction.analyticsLabel}`
    )
  }

  /**
   * Handles partner filter changes.
   * @param {string} newPartners - the new partners on which to filter
   * @param {object} addedPartner - the partner added to filter, is null if partner removed
   */
  function handlePartnersChange(newPartners, addedPartner) {
    setSelectedPartners(newPartners)
    const updatedFilters = getFiltersForApi({partners: newPartners})
    onFilterChange(updatedFilters)
    if (addedPartner) analyticsService.logEvent(
      'EE Document Management', 'Clicked',
      `FilterAdded_Partner${addedPartner.analyticsLabel}`
    )
  }

  /**
   * Generates filter data for API based on current selections.
   * @param {object} filterOptions allows the caller to pass in new values for immmediate feedback, using existing state values as defaults.
   * @returns {object} array of filters in the format {name: 'filtername', value: 'comma,delimited,values'}
   */
  function getFiltersForApi({
    clients = selectedClients,
    countries = selectedCountries,
    partners = selectedPartners,
    instructions = selectedInstructions,
    documentTemplateCategories = selectedDocumentTemplateCategories
  }) {
    const filters = []
    if (clients.length) {
      const selectedClientIds = clients.map(c => c.id).join(',')
      filters.push({
        name: 'client_id',
        value: selectedClientIds
      })
    }
    if (countries.length) {
      const selectedCountryIds = countries.map(c => c.id).join(',')
      filters.push({
        name: 'country_id',
        value: selectedCountryIds
      })
    }
    if (partners.length) {
      const selectedPartnerIds = partners.map(c => c.id).join(',')
      filters.push({
        name: 'partner_id',
        value: selectedPartnerIds
      })
    }
    if (documentTemplateCategories.length) {
      const selectedDocumentTemplateCategoryIds = documentTemplateCategories.map(c => c.id).join(',')
      filters.push({
        name: 'document_template_category_id',
        value: selectedDocumentTemplateCategoryIds
      })
    }
    if (instructions.length) {
      const selectedInstructionSlugs = instructions.map(c => c.slug).join(',')
      filters.push({
        name: 'action',
        value: selectedInstructionSlugs
      })
    }
    return filters
  }

  /** Clears all filters */
  function clearFilters() {
    analyticsService.logEvent('EE Document Management', 'Clicked', 'Filter_ClearFilters')
    setSelectedClients([])
    setSelectedCountries([])
    setSelectedDocumentTemplateCategories([])
    setSelectedInstructions([])
    setSelectedPartners([])
    onClear()
  }

  /** Called when clicking 'FILTERS' to invoke dropdown */
  function handleFiltersButtonClick() {
    analyticsService.logEvent('EE Document Management', 'Clicked', 'Filter_ModalViewed')
    setIsDropdownOpen(true)
  }

  /** debounced search input handler */
  const handleSearchChange = useDebounce(onSearchChange, 500)

  // true if any of the filter fields are filled out
  const areFieldsFilled = Boolean(
    selectedClients.length ||
    selectedCountries.length ||
    selectedInstructions.length ||
    selectedPartners.length ||
    selectedDocumentTemplateCategories.length
  )

  return (
    <>
      <ArticleFilterReportContainer>
        <InputSearch
          placeholder='Search'
          onChange={e => handleSearchChange(e.target.value) }
          role='search'
          aria-label='search admin report'
        />
        <ButtonFilter
          onClick={handleFiltersButtonClick}
          isFilterButtonActive={isDropdownOpen || areFieldsFilled}
          name='filter'
        >
          {areFieldsFilled ? 'FILTERED' : 'FILTERS'}
        </ButtonFilter>
      </ArticleFilterReportContainer>
      <AnimatedDropdown
        isDropdownOpen={isDropdownOpen}
        onClickOutside={() => setIsDropdownOpen(false)}
      >
        <FieldsetDocumentManagementFilterContainer>
          <ComboBox
            label={'client'}
            selectedOptions={selectedClients}
            handleOptionSelect={handleClientsChange}
            listItems={clientsForFilter}
            allowSearching={true}
          />
          <ComboBox
            label={'partner'}
            selectedOptions={selectedPartners}
            handleOptionSelect={handlePartnersChange}
            listItems={partnersForFilter}
            allowSearching={true}
          />
          <ComboBox
            label={'country'}
            selectedOptions={selectedCountries}
            handleOptionSelect={handleCountriesChange}
            listItems={countriesForFilter}
            allowSearching={true}
          />
          <ComboBox
            label={'category'}
            selectedOptions={selectedDocumentTemplateCategories}
            handleOptionSelect={handleCategoriesChange}
            listItems={documentTemplateCategoriesForFilter}
            allowSearching={true}
          />
          <ComboBox
            label={'instructions'}
            selectedOptions={selectedInstructions}
            handleOptionSelect={handleInstructionsChange}
            listItems={instructionsForFilter}
          />
          <DivButtonsWrapper>
            <ButtonClear
              type='reset'
              name='clear'
              onClick={clearFilters}
            >
              Clear Filters
            </ButtonClear>
          </DivButtonsWrapper>
        </FieldsetDocumentManagementFilterContainer>
      </AnimatedDropdown>
    </>
  )
}
