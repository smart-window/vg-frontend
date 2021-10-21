import React, { useState } from 'react'
import PropTypes from 'prop-types'
import analyticsService from 'web/services/analyticsService'
import useDebounce from 'shared/hooks/useDebounce'
import AnimatedDropdown from 'web/components/AnimatedDropdown/AnimatedDropdown'
import ComboBox from 'web/modules/ComboBox/ComboBox'

import {
  FieldsetOnboardingDiscussionFilterContainer,
  DivButtonsWrapper,
  ButtonClear,
  ArticleFilterReportContainer,
  InputSearch,
  ButtonFilter,
} from './DiscussionFilter.styles'
import { visibilityTypeToLabel } from 'shared/constants/visibilityConstants'

DiscussionFilter.propTypes = {
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
DiscussionFilter.defaultProps = {
  onSearchChange: () => {},
}

export default function DiscussionFilter({
  onFilterChange,
  onSearchChange,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedVisibilities, setSelectedVisibilities] = useState([])

  /**
   * Handles partner filter changes.
   * @param {string} newVisibilities - the new visibilities on which to filter
   * @param {object} addedVisibility - the visibility added to filter, is null if visibility removed
   */
  function handleVisibilitiesChange(newVisibilities, addedVisibility) {
    setSelectedVisibilities(newVisibilities)
    const updatedFilters = getFiltersForApi({ visibilities: newVisibilities })
    onFilterChange(updatedFilters)
    if (addedVisibility)
      analyticsService.logEvent(
        'Onboarding Discussions',
        'Clicked',
        'FilterAdded_Visibility'
      )
  }

  /**
   * Generates filter data for API based on current selections.
   * @param {object} filterOptions allows the caller to pass in new values for immmediate feedback, using existing state values as defaults.
   * @returns {object} array of filters in the format {name: 'filtername', value: 'comma,delimited,values'}
   */
  function getFiltersForApi({ visibilities = selectedVisibilities }) {
    const filters = []
    if (visibilities.length) {
      const selectedVisibilityIds = visibilities.map((c) => c.id).join(',')
      filters.push({
        name: 'visibilities',
        value: selectedVisibilityIds,
      })
    }
    return filters
  }

  /** Clears all filters */
  function clearFilters() {
    analyticsService.logEvent(
      'Onboarding Discussions',
      'Clicked',
      'Filter_ClearFilters'
    )
    setSelectedVisibilities([])
    onFilterChange([])
  }

  /** Called when clicking 'FILTERS' to invoke dropdown */
  function handleFiltersButtonClick() {
    analyticsService.logEvent(
      'Onboarding Discussions',
      'Clicked',
      'Filter_ModalViewed'
    )
    setIsDropdownOpen(true)
  }

  /** debounced search input handler */
  const handleSearchChange = useDebounce(onSearchChange, 500)

  // true if any of the filter fields are filled out
  const areFieldsFilled = Boolean(selectedVisibilities.length)

  return (
    <>
      <ArticleFilterReportContainer>
        <InputSearch
          placeholder='Search'
          onChange={(e) => handleSearchChange(e.target.value)}
          role='search'
          aria-label='search onboarding comments'
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
        <FieldsetOnboardingDiscussionFilterContainer>
          <ComboBox
            label={'visibility'}
            selectedOptions={selectedVisibilities}
            handleOptionSelect={handleVisibilitiesChange}
            listItems={Object.keys(visibilityTypeToLabel).map((key) => ({
              id: key,
              slug: visibilityTypeToLabel[key],
            }))}
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
        </FieldsetOnboardingDiscussionFilterContainer>
      </AnimatedDropdown>
    </>
  )
}
