import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useQuery, gql} from '@apollo/client'
import analyticsService from 'web/services/analyticsService'
import dateHelper from 'shared/services/dateHelper'
import useDebounce from 'shared/hooks/useDebounce'
import AnimatedDropdown from 'web/components/AnimatedDropdown/AnimatedDropdown'
import VgDatePicker from 'web/components/VgDatePicker/VgDatePicker'
import ComboBox from 'web/modules/ComboBox/ComboBox'

import calendarIcon from 'assets/images/icons/calendar.svg'
import {
  FieldsetEmployeeTrainingFilterContainer,
  DivInputLabelWrapper,
  DivDateInputWrapper,
  DivButtonsWrapper,
  ButtonClear,
  ArticleFilterReportContainer,
  InputSearch,
  ButtonFilter
} from './EmployeeTrainingFilter.styles'

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
  }
`

EmployeeTrainingFilter.propTypes = {
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
EmployeeTrainingFilter.defaultProps = {
  onSearchChange: () => {}
}

const statusesForFilter = [
  {
    id: 1,
    slug: 'not_started',
    analyticsLabel: 'NotStarted'
  },
  {
    id: 2,
    slug: 'in_progress',
    analyticsLabel: 'InProgress'
  },
  {
    id: 3,
    slug: 'completed',
    analyticsLabel: 'Completed'
  },
  {
    id: 4,
    slug: 'overdue',
    analyticsLabel: 'Overdue'
  }
]

/**
 * Form for filtering time tracking report.
 * @category Components - Web
 * @namespace EmployeeTrainingFilter
 */
export default function EmployeeTrainingFilter({onClear, onFilterChange, onSearchChange}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedDueDate, setSelectedDueDate] = useState(null)
  const [selectedCompletedDate, setSelectedCompletedDate] = useState(null)
  const [selectedClients, setSelectedClients] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [selectedStatuses, setSelectedStatuses] = useState([])

  const {data} = useQuery(FILTER_OPTIONS_QUERY)
  let clientsForFilter, countriesForFilter
  if (data) {
    // map to expected format for <ComboBox>
    clientsForFilter = data.clients.map(client => ({id: client.id, slug: client.name}))
    countriesForFilter = data.countries.map(country => ({id: country.id, slug: country.name}))
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
    if (addedClient) analyticsService.logEvent('EE Employment Training', 'Clicked', 'FilterAdded_Client')
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
    if (addedCountry) analyticsService.logEvent('EE Employment Training', 'Clicked', 'FilterAdded_Country')
  }

  /**
   * Handles due date changes.
   * @param {date} newDueDate - the new due date on which to filter
   */
  function handleDueDateChange(newDueDate) {
    setSelectedDueDate(newDueDate)
    const updatedFilters = getFiltersForApi({dueDate: newDueDate})
    onFilterChange(updatedFilters)
    if (newDueDate) analyticsService.logEvent('EE Employment Training', 'Clicked', 'FilterAdded_DueDate')
  }

  /**
   * Handles completed date changes.
   * @param {date} newCompletedDate - the new completed date on which to filter
   */
  function handleCompletedDateChange(newCompletedDate) {
    setSelectedCompletedDate(newCompletedDate)
    const updatedFilters = getFiltersForApi({completedDate: newCompletedDate})
    onFilterChange(updatedFilters)
    if (newCompletedDate) analyticsService.logEvent('EE Employment Training', 'Clicked', 'FilterAdded_CompletionDate')
  }

  /**
   * Handles status filter changes.
   * @param {date} newStatuses - the new statuses on which to filter
   * @param {object} addedStatus - the status added to filter, is null if status removed
   */
  function handleStatusesChange(newStatuses, addedStatus) {
    setSelectedStatuses(newStatuses)
    const updatedFilters = getFiltersForApi({statuses: newStatuses})
    onFilterChange(updatedFilters)
    if (addedStatus) analyticsService.logEvent(
      'EE Employment Training', 'Clicked',
      `FilterAdded_Status${addedStatus.analyticsLabel}`
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
    statuses = selectedStatuses,
    dueDate = selectedDueDate,
    completedDate = selectedCompletedDate
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
    if (statuses.length) {
      const selectedStatusesSlugs = statuses.map(c => c.slug).join(',')
      filters.push({
        name: 'status',
        value: selectedStatusesSlugs
      })
    }
    if (dueDate) {
      const dueDateStr = dateHelper.getStringDate(dueDate)
      filters.push({
        name: 'due_date',
        value: ':' + dueDateStr
      })
    }
    if (completedDate) {
      const completedDateStr = dateHelper.getStringDate(completedDate)
      filters.push({
        name: 'completed_date',
        value: ':' + completedDateStr
      })
    }
    return filters
  }

  /** Clears all filters */
  function clearFilters() {
    analyticsService.logEvent('EE Employment Training', 'Clicked', 'Filter_ClearFilters')
    setSelectedDueDate(null)
    setSelectedCompletedDate(null)
    setSelectedClients([])
    setSelectedCountries([])
    setSelectedStatuses([])
    onClear()
  }

  /** Called when clicking 'FILTERS' to invoke dropdown */
  function handleFiltersButtonClick() {
    analyticsService.logEvent('EE Employment Training', 'Clicked', 'Filter_ModalViewed')
    setIsDropdownOpen(true)
  }

  /** debounced search input handler */
  const handleSearchChange = useDebounce(onSearchChange, 500)

  // true if any of the filter fields are filled out
  const areFieldsFilled = Boolean(
    selectedDueDate ||
    selectedCompletedDate ||
    selectedClients.length ||
    selectedCountries.length ||
    selectedStatuses.length
  )

  return (
    <>
      <ArticleFilterReportContainer>
        <InputSearch
          placeholder='Search'
          onChange={e => handleSearchChange(e.target.value) }
          role='search'
          aria-label='search training report'
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
        <FieldsetEmployeeTrainingFilterContainer>
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
          <DivInputLabelWrapper>
            <label>Due Date</label>
            <DivDateInputWrapper>
              <VgDatePicker
                selectedDate={selectedDueDate}
                onDateChange={handleDueDateChange}
              />
              {
                !selectedDueDate &&
                <img
                  src={calendarIcon}
                  alt='Select a maximum due date'
                />
              }
            </DivDateInputWrapper>
          </DivInputLabelWrapper>
          <DivInputLabelWrapper>
            <label>Completion Date</label>
            <DivDateInputWrapper>
              <VgDatePicker
                selectedDate={selectedCompletedDate}
                onDateChange={handleCompletedDateChange}
              />
              {
                !selectedCompletedDate &&
                <img
                  src={calendarIcon}
                  alt='Select the maximum completion date'
                />
              }
            </DivDateInputWrapper>
          </DivInputLabelWrapper>
          <ComboBox
            label={'status'}
            selectedOptions={selectedStatuses}
            handleOptionSelect={handleStatusesChange}
            listItems={statusesForFilter}
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
        </FieldsetEmployeeTrainingFilterContainer>
      </AnimatedDropdown>
    </>
  )
}
