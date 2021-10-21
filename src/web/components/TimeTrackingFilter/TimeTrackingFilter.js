import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useQuery, gql} from '@apollo/client'
import analyticsService from 'web/services/analyticsService'
import dateHelper from 'shared/services/dateHelper'
import stringFormatter from 'shared/services/stringFormatter'
import useDebounce from 'shared/hooks/useDebounce'
import AnimatedDropdown from 'web/components/AnimatedDropdown/AnimatedDropdown'
import ComboBox from 'web/modules/ComboBox/ComboBox'
import DateRange from 'web/components/DateRange/DateRange'

import {
  FieldsetTimeTrackingFilterContainer,
  DivButtonsWrapper,
  ButtonClear,
  ArticleFilterReportContainer,
  InputSearch,
  ButtonFilter
} from './TimeTrackingFilter.styles'

export const FILTER_OPTIONS_QUERY = gql`
  query {
    timeTypes {
      id
      slug
    }
    clients {
      id
      name
    }
    countries {
      id
      name
    }
  }
`

TimeTrackingFilter.propTypes = {
  /** Called when the user clicks 'Clear Filters' */
  onClear: PropTypes.func,
  /**
   * Called when user changes a filter field/value.
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
TimeTrackingFilter.defaultProps = {
  onFilterChange: () => {},
  onSearchChange: () => {}
}

/**
 * Form for filtering time tracking report.
 * @category Components - Web
 * @namespace TimeTrackingFilter
 */
export default function TimeTrackingFilter({onClear, onFilterChange, onSearchChange}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const [selectedFromDate, setSelectedFromDate] = useState(null)
  const [selectedToDate, setSelectedToDate] = useState(null)
  const [selectedClients, setSelectedClients] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  const {data} = useQuery(FILTER_OPTIONS_QUERY)
  let clientsForFilter, countriesForFilter, timeTypesForFilter
  if (data) {
    // map to expected format for <ComboBox>
    clientsForFilter = data.clients.map(client => ({id: client.id, slug: client.name}))
    countriesForFilter = data.countries.map(country => ({id: country.id, slug: country.name}))
    timeTypesForFilter = data.timeTypes
  }

  /**
   * Generates filter data for API based on current selections.
   * @param {object} filterOptions allows the caller to pass in new values for immmediate feedback, using existing state values as defaults.
   * @returns {object} array of filters in the format {name: 'filtername', value: 'comma,delimited,values'}
   */
  function getFiltersForApi({
    clients = selectedClients,
    countries = selectedCountries,
    categories = selectedCategories,
    fromDate = selectedFromDate,
    toDate = selectedToDate
  }) {
    const filters = []
    if (clients.length) {
      const selectedClientIds = clients.map(c => c.id).join(',')
      filters.push({
        name: 'client',
        value: selectedClientIds
      })
    }
    if (countries.length) {
      const selectedCountryIds = countries.map(c => c.id).join(',')
      filters.push({
        name: 'country',
        value: selectedCountryIds
      })
    }
    if (categories.length) {
      const selectedCategorySlugs = categories.map(c => c.slug).join(',')
      filters.push({
        name: 'time_type_slug',
        value: selectedCategorySlugs
      })
    }
    if (fromDate || toDate) {
      const fromDateStr = fromDate ? dateHelper.getStringDate(fromDate) : ''
      const toDateStr = toDate ? dateHelper.getStringDate(toDate) : ''
      filters.push({
        name: 'event_date',
        value: fromDateStr + ':' + toDateStr
      })
    }
    return filters
  }

  /** Clears all filters */
  function clearFilters() {
    analyticsService.logEvent('Time Tracking', 'Clicked', 'Filter_ClearFilters')
    setSelectedFromDate(null)
    setSelectedToDate(null)
    setSelectedClients([])
    setSelectedCountries([])
    setSelectedCategories([])
    onClear()
  }

  /** Called when clicking 'FILTERS' to invoke dropdown */
  function handleFiltersButtonClick() {
    analyticsService.logEvent('Time Tracking', 'Clicked', 'Filter_ModalViewed')
    setIsDropdownOpen(true)
  }

  /**
    FILTER INPUT HANDLERS
     - the following handlers update state based on the new input value,
       and pass the updated filters back to the parent for an immediate data update.
     - new values are passed into getFiltersForApi to avoid waiting for another render (after setting state)
  */
  function handleFromDateChange(newFromDate) {
    setSelectedFromDate(newFromDate)
    const updatedFilters = getFiltersForApi({fromDate: newFromDate})
    onFilterChange(updatedFilters)
    if (newFromDate) analyticsService.logEvent('Time Tracking', 'Clicked', 'FilterAdded_DateRangeFrom')
  }

  function handleToDateChange(newToDate) {
    setSelectedToDate(newToDate)
    const updatedFilters = getFiltersForApi({toDate: newToDate})
    onFilterChange(updatedFilters)
    if (newToDate) analyticsService.logEvent('Time Tracking', 'Clicked', 'FilterAdded_DateRangeTo')
  }

  function handleClientsChange(newClients, addedClient) {
    setSelectedClients(newClients)
    const updatedFilters = getFiltersForApi({clients: newClients})
    onFilterChange(updatedFilters)
    if (addedClient) analyticsService.logEvent('Time Tracking', 'Clicked', 'FilterAdded_Client')
  }

  function handleCountriesChange(newCountries, addedCountry) {
    setSelectedCountries(newCountries)
    const updatedFilters = getFiltersForApi({countries: newCountries})
    onFilterChange(updatedFilters)
    if (addedCountry) analyticsService.logEvent('Time Tracking', 'Clicked', 'FilterAdded_Country')
  }

  function handleTimeTypesChange(newTimeTypes, addedTimeType) {
    setSelectedCategories(newTimeTypes)
    const updatedFilters = getFiltersForApi({categories: newTimeTypes})
    onFilterChange(updatedFilters)
    if (addedTimeType) analyticsService.logEvent(
      'Time Tracking', 'Clicked',
      `FilterAdded_Category${stringFormatter.removeSpaces(stringFormatter.capitalizeEveryWord(addedTimeType.slug))}`
    )
  }

  /** debounced search input handler */
  const handleSearchChange = useDebounce(onSearchChange, 500)

  // true if any of the filter fields are filled out
  const areFieldsFilled = Boolean(
    selectedFromDate ||
    selectedToDate ||
    selectedClients.length ||
    selectedCountries.length ||
    selectedCategories.length
  )

  return (
    <>
      <ArticleFilterReportContainer>
        <InputSearch
          placeholder='Search'
          onChange={e => handleSearchChange(e.target.value) }
          role='search'
          aria-label='search time tracking report'
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
        <FieldsetTimeTrackingFilterContainer>
          <DateRange
            fromDate={selectedFromDate}
            toDate={selectedToDate}
            handleFromDateChange={handleFromDateChange}
            handleToDateChange={handleToDateChange}
          />
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
            label={'category'}
            selectedOptions={selectedCategories}
            handleOptionSelect={handleTimeTypesChange}
            listItems={timeTypesForFilter}
          />
          <DivButtonsWrapper>
            <ButtonClear
              type='reset'
              name='clear'
              disabled={!areFieldsFilled}
              onClick={clearFilters}
            >
              Clear Filters
            </ButtonClear>
          </DivButtonsWrapper>
        </FieldsetTimeTrackingFilterContainer>
      </AnimatedDropdown>
    </>
  )
}
