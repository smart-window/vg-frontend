import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import analyticsService from 'web/services/analyticsService'
import useDebounce from 'shared/hooks/useDebounce'
import AnimatedDropdown from 'web/components/AnimatedDropdown/AnimatedDropdown'
import ComboBox from 'web/modules/ComboBox/ComboBox'

import {
  FieldsetEmployeeOnboardingsFilterContainer,
  DivButtonsWrapper,
  ButtonClear,
  ArticleFilterReportContainer,
  InputSearch,
  ButtonFilter,
} from './EmployeeOnboardingsFilter.styles'

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
    csr_users {
      id
      full_name
    }
  }
`

EmployeeOnboardingsFilter.propTypes = {
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
EmployeeOnboardingsFilter.defaultProps = {
  onSearchChange: () => {},
}

/**
 * Form for filtering onboarding employees table.
 * @category Components - Web
 * @namespace OnboardingEmployeesFilter
 */
export default function EmployeeOnboardingsFilter({
  onClear,
  onFilterChange,
  onSearchChange,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClients, setSelectedClients] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [selectedPartners, setSelectedPartners] = useState([])
  const [selectedAssignments, setSelectedAssignments] = useState([])

  const { data } = useQuery(FILTER_OPTIONS_QUERY)
  let clientsForFilter,
    countriesForFilter,
    partnersForFilter,
    assignmentsForFilter
  if (data) {
    // map to expected format for <ComboBox>
    clientsForFilter = data.clients.map((client) => ({
      id: client.id,
      slug: client.name,
    }))
    countriesForFilter = data.countries.map((country) => ({
      id: country.id,
      slug: country.name,
    }))
    partnersForFilter = data.partners.map((partner) => ({
      id: partner.id,
      slug: partner.name,
    }))
    assignmentsForFilter = data.csr_users.map((csrUSer) => ({
      id: csrUSer.id,
      slug: csrUSer.full_name,
    }))
  }

  /**
   * Handles a change to the clients filter.
   * @param {string} newClients - the new clients on which to filter
   * @param {object} addedClient - the client added to filter, null if client removed
   */
  function handleClientsChange(newClients, addedClient) {
    setSelectedClients(newClients)
    const updatedFilters = getFiltersForApi({ clients: newClients })
    onFilterChange(updatedFilters)
    if (addedClient)
      analyticsService.logEvent(
        'EE Onboarding Employees',
        'Clicked',
        'FilterAdded_Client'
      )
  }

  /**
   * Handles a change to the countries filter.
   * @param {string} newCountries - the new countries on which to filter
   * @param {object} addedCountry - the country added to filter, null if country removed
   */
  function handleCountriesChange(newCountries, addedCountry) {
    setSelectedCountries(newCountries)
    const updatedFilters = getFiltersForApi({ countries: newCountries })
    onFilterChange(updatedFilters)
    if (addedCountry)
      analyticsService.logEvent(
        'EE Onboarding Employees',
        'Clicked',
        'FilterAdded_Country'
      )
  }

  /**
   * Handles employment type filter changes.
   * @param {string} newAssignmentTypes - the new employment types on which to filter
   * @param {object} addedAssignmentType - the employment types added to filter, is null if employment types removed
   */
  function handleAssignmentsChange(newAssignmentTypes, addedAssignmentType) {
    setSelectedAssignments(newAssignmentTypes)
    const updatedFilters = getFiltersForApi({
      assignments: newAssignmentTypes,
    })
    onFilterChange(updatedFilters)
    if (addedAssignmentType)
      analyticsService.logEvent(
        'EE Onboarding Employees',
        'Clicked',
        `FilterAdded_EmploymentType${addedAssignmentType.okta_group_slug}`
      )
  }

  /**
   * Handles partner filter changes.
   * @param {string} newPartners - the new partners on which to filter
   * @param {object} addedPartner - the partner added to filter, is null if partner removed
   */
  function handlePartnersChange(newPartners, addedPartner) {
    setSelectedPartners(newPartners)
    const updatedFilters = getFiltersForApi({ partners: newPartners })
    onFilterChange(updatedFilters)
    if (addedPartner)
      analyticsService.logEvent(
        'EE Onboarding Employees',
        'Clicked',
        `FilterAdded_Partner${addedPartner.name}`
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
    assignments = selectedAssignments,
  }) {
    const filters = []
    if (clients.length) {
      const selectedClientIds = clients.map((c) => c.id).join(',')
      filters.push({
        name: 'client_id',
        value: selectedClientIds,
      })
    }
    if (countries.length) {
      const selectedCountryIds = countries.map((c) => c.id).join(',')
      filters.push({
        name: 'country_id',
        value: selectedCountryIds,
      })
    }
    if (partners.length) {
      const selectedPartnerIds = partners.map((c) => c.id).join(',')
      filters.push({
        name: 'partner_id',
        value: selectedPartnerIds,
      })
    }
    if (assignments.length) {
      const csrUserIds = assignments.map((c) => c.id).join(',')
      filters.push({
        name: 'csr_user_id',
        value: csrUserIds,
      })
    }
    return filters
  }

  /** Clears all filters */
  function clearFilters() {
    analyticsService.logEvent(
      'EE Onboarding Employees',
      'Clicked',
      'Filter_ClearFilters'
    )
    setSelectedClients([])
    setSelectedCountries([])
    setSelectedAssignments([])
    setSelectedPartners([])
    onClear()
  }

  /** Called when clicking 'FILTERS' to invoke dropdown */
  function handleFiltersButtonClick() {
    analyticsService.logEvent(
      'EE Onboarding Employees',
      'Clicked',
      'Filter_ModalViewed'
    )
    setIsDropdownOpen(true)
  }

  /** debounced search input handler */
  const handleSearchChange = useDebounce(onSearchChange, 500)

  // true if any of the filter fields are filled out
  const areFieldsFilled = Boolean(
    selectedClients.length ||
      selectedCountries.length ||
      selectedAssignments.length ||
      selectedPartners.length
  )

  return (
    <>
      <ArticleFilterReportContainer>
        <InputSearch
          placeholder='Search'
          onChange={(e) => handleSearchChange(e.target.value)}
          role='search'
          aria-label='search admin report'
        />
        <ButtonFilter
          onClick={handleFiltersButtonClick}
          isFilterButtonActive={isDropdownOpen || areFieldsFilled}
          name='filter'>
          {areFieldsFilled ? 'FILTERED' : 'FILTERS'}
        </ButtonFilter>
      </ArticleFilterReportContainer>
      <AnimatedDropdown
        isDropdownOpen={isDropdownOpen}
        onClickOutside={() => setIsDropdownOpen(false)}>
        <FieldsetEmployeeOnboardingsFilterContainer>
          <ComboBox
            label={'client'}
            selectedOptions={selectedClients}
            handleOptionSelect={handleClientsChange}
            listItems={clientsForFilter}
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
            label={'partner'}
            selectedOptions={selectedPartners}
            handleOptionSelect={handlePartnersChange}
            listItems={partnersForFilter}
            allowSearching={true}
          />
          <ComboBox
            label={'assignments'}
            selectedOptions={selectedAssignments}
            handleOptionSelect={handleAssignmentsChange}
            listItems={assignmentsForFilter}
          />
          <DivButtonsWrapper>
            <ButtonClear
              type='reset'
              name='clear'
              disabled={!areFieldsFilled}
              onClick={clearFilters}>
              Clear Filters
            </ButtonClear>
          </DivButtonsWrapper>
        </FieldsetEmployeeOnboardingsFilterContainer>
      </AnimatedDropdown>
    </>
  )
}
