import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import analyticsService from 'web/services/analyticsService'
import useDebounce from 'shared/hooks/useDebounce'
import AnimatedDropdown from 'web/components/AnimatedDropdown/AnimatedDropdown'
import ComboBox from 'web/modules/ComboBox/ComboBox'

import {
  FieldsetClientCompaniesFilterContainer,
  DivButtonsWrapper,
  ButtonClear,
  ClientsFilterReportContainer,
  InputSearch,
  ButtonFilter,
} from './ClientCompaniesFilter.styles'

export const FILTER_OPTIONS_QUERY = gql`
  query {
    countries {
      id
      name
    }
    regions {
      id
      name
    }
    partners {
      id
      name
    }
  }
`

ClientCompaniesFilter.propTypes = {
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
ClientCompaniesFilter.defaultProps = {
  onSearchChange: () => {},
}

/**
 * Form for filtering client companies table.
 * @category Components - Web
 * @namespace ClientCompaniesFilter
 */
export default function ClientCompaniesFilter({
  onClear,
  onFilterChange,
  onSearchChange,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [openFilter, setOpenFilter] = useState('')
  const [selectedRegions, setSelectedRegions] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [selectedPartners, setSelectedPartners] = useState([])

  const { data } = useQuery(FILTER_OPTIONS_QUERY)
  let regionsForFilter,
    countriesForFilter,
    partnersForFilter
  if (data) {
    // map to expected format for <ComboBox>
    countriesForFilter = data.countries.map((country) => ({
      id: country.id,
      slug: country.name,
    }))
    regionsForFilter = data.regions.map((region) => ({
      id: region.id,
      slug: region.name,
    }))
    partnersForFilter = data.partners.map((partner) => ({
      id: partner.id,
      slug: partner.name,
    }))
  }

  /**
   * Handles a change to the clients filter.
   * @param {string} newRegions - the new clients on which to filter
   * @param {object} addedRegion - the client added to filter, null if client removed
   */
  function handleRegionsChange(newRegions, addedRegion) {
    setSelectedRegions(newRegions)
    const updatedFilters = getFiltersForApi({ regions: newRegions })
    onFilterChange(updatedFilters)
    if (addedRegion)
      analyticsService.logEvent(
        'EE Client Companies',
        'Clicked',
        'FilterAdded_Region'
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
        'EE Client Companies',
        'Clicked',
        'FilterAdded_Country'
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
        'EE Client Companies',
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
    regions = selectedRegions,
    countries = selectedCountries,
    partners = selectedPartners,
  }) {
    const filters = []
    if (regions.length) {
      const selectedRegionIds = regions.map((c) => c.id).join(',')
      filters.push({
        name: 'region_id',
        value: selectedRegionIds,
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
    return filters
  }

  /** Clears all filters */
  function clearFilters() {
    analyticsService.logEvent(
      'EE Client Companies',
      'Clicked',
      'Filter_ClearFilters'
    )
    setSelectedRegions([])
    setSelectedCountries([])
    setSelectedPartners([])
    onClear()
  }

  /** Called when clicking 'FILTERS' to invoke dropdown */
  function handleFiltersButtonClick() {
    analyticsService.logEvent(
      'EE Client Companies',
      'Clicked',
      'Filter_ModalViewed'
    )
    setIsDropdownOpen(true)
  }

  /** debounced search input handler */
  const handleSearchChange = useDebounce(onSearchChange, 500)

  // true if any of the filter fields are filled out
  const areFieldsFilled = Boolean(selectedRegions.length || selectedCountries.length || selectedPartners.length)

  return (
    <>
      <ClientsFilterReportContainer>
        <InputSearch
          placeholder='Search'
          onChange={(e) => handleSearchChange(e.target.value)}
          role='search'
          aria-label='search client companies'
        />
        <ButtonFilter
          onClick={handleFiltersButtonClick}
          isFilterButtonActive={isDropdownOpen || areFieldsFilled}
          name='filter'>
          {areFieldsFilled ? 'FILTERED' : 'FILTERS'}
        </ButtonFilter>
      </ClientsFilterReportContainer>
      <AnimatedDropdown
        isDropdownOpen={isDropdownOpen}
        onClickOutside={() => setIsDropdownOpen(false)}>
        <FieldsetClientCompaniesFilterContainer>
          <ComboBox
            label={'partner'}
            selectedOptions={selectedPartners}
            handleOptionSelect={handlePartnersChange}
            listItems={partnersForFilter}
            isOpen={openFilter === 'partner'}
            controlChecklistOpen={setOpenFilter}
            allowSearching={true}
          />
          <ComboBox
            label={'operating countries'}
            selectedOptions={selectedCountries}
            handleOptionSelect={handleCountriesChange}
            listItems={countriesForFilter}
            isOpen={openFilter === 'operating countries'}
            controlChecklistOpen={setOpenFilter}
            allowSearching={true}
          />
          <ComboBox
            label={'region'}
            selectedOptions={selectedRegions}
            handleOptionSelect={handleRegionsChange}
            listItems={regionsForFilter}
            isOpen={openFilter === 'region'}
            controlChecklistOpen={setOpenFilter}
            allowSearching={true}
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
        </FieldsetClientCompaniesFilterContainer>
      </AnimatedDropdown>
    </>
  )
}
