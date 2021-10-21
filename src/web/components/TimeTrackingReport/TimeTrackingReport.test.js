import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import TimeTrackingReport from './TimeTrackingReport'
import {MockedProvider} from '@apollo/client/testing'
import { getTimeTypesMockData, getTimeEntriesReportMockData } from 'test/mockData/timeEntriesMock'

jest.mock('/web/modules/Grid/hooks/usePageSize', () => () => 5)

// mock analytics
window.gtag = () => {}

describe('Time Tracking Report', () => {
  let mocks

  beforeEach(() => {
    mocks = [...getTimeTypesMockData(), ...getTimeEntriesReportMockData()]
  })

  it('renders a time tracking report with an empty state', async() => {
    render(
      <MockedProvider mocks={getTimeTypesMockData()} addTypename={false}>
        <TimeTrackingReport/>
      </MockedProvider>
    )
    await waitFor(() => {
      expect(screen.getByText('Oops! No data found.')).toBeDefined()
    })
  })

  describe('filtering', () => {
    it('animates a filter dropdown on filter button click', () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TimeTrackingReport/>
        </MockedProvider>
      )
      const filterButton = screen.getByText('FILTERS')

      fireEvent.click(filterButton)

      expect(screen.getByText('Clear Filters')).toBeDefined()
    })

    it('renders a date picker dropdown on date input click', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TimeTrackingReport/>
        </MockedProvider>
      )
      const filterButton = screen.getByText('FILTERS')

      fireEvent.click(filterButton)

      const fromDateInput = screen.getAllByRole('textbox', { type: 'text' })[1] // Order of inputs matters here

      fireEvent.click(fromDateInput)

      await waitFor(() => {
        expect(screen.getByText('Mo')).toBeDefined()
      })
    })

    it('renders a date selected', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TimeTrackingReport/>
        </MockedProvider>
      )
      const filterButton = screen.getByText('FILTERS')

      fireEvent.click(filterButton)

      const fromDateInput = screen.getAllByRole('textbox', { type: 'text' })[1] // Order of inputs matters here

      fireEvent.click(fromDateInput)

      await waitFor(() => {
        const firstDayOfTheMonth = screen.getAllByText('1')[0]
        fireEvent.click(firstDayOfTheMonth)
      })

      await waitFor(() => {
        const date = new Date()
        const displayMonth = date.toLocaleString('en-US', {month: 'short'})
        const currentYear = date.getFullYear()
        expect(screen.getByDisplayValue(`01 ${displayMonth} ${currentYear}`))
      })
    })

    it('changes filter button text when filters are applied', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TimeTrackingReport/>
        </MockedProvider>
      )
      const filterButton = screen.getByText('FILTERS')

      fireEvent.click(filterButton)

      fireEvent.click(screen.getByLabelText('category-multiselect'))
      const { getByText } = within(screen.getByTestId('combobox-wrapper-category'))

      await waitFor(() => {
        const timeCategory = getByText('Work Time')
        fireEvent.click(timeCategory)
      })

      const changedFilterButton = screen.getByText('FILTERED')
      expect(changedFilterButton).toBeDefined()
    })

    it('renders a client, country and categories dropdown', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TimeTrackingReport/>
        </MockedProvider>
      )
      const filterButton = screen.getByText('FILTERS')

      fireEvent.click(filterButton)

      fireEvent.click(screen.getByLabelText('client-multiselect'))

      await waitFor(() => {
        const clientInList = screen.getByText('Velocity Global')
        expect(clientInList).toBeDefined()
      })

      fireEvent.click(screen.getByLabelText('country-multiselect'))

      await waitFor(() => {
        const countryInList = screen.getByText('Brazil')
        expect(countryInList).toBeDefined()
      })

      fireEvent.click(screen.getByLabelText('category-multiselect'))

      await waitFor(() => {
        const { getByText } = within(screen.getByTestId('combobox-wrapper-category'))
        const timeTypeInList = getByText('Work Time')
        expect(timeTypeInList).toBeDefined()
      })
    })

    it('selects and deselects multiple options from a filter dropdown', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TimeTrackingReport/>
        </MockedProvider>
      )
      const filterButton = screen.getByText('FILTERS')

      fireEvent.click(filterButton)

      fireEvent.click(screen.getByLabelText('category-multiselect'))
      const { getByText } = within(screen.getByTestId('combobox-wrapper-category'))

      await waitFor(() => {
        const clientInList = getByText('Work Time')
        expect(clientInList).toBeDefined()
      })

      fireEvent.click(getByText('Work Time'))
      fireEvent.click(getByText('Break Time'))

      let checkedCheckboxes = screen.getAllByRole('checkbox', {checked: true})
      expect(checkedCheckboxes.length).toEqual(2)

      fireEvent.click(getByText('Work Time'))

      checkedCheckboxes = screen.getAllByRole('checkbox', {checked: true})

      expect(checkedCheckboxes.length).toEqual(1)
    })
  })

  describe('search', () => {
    it('populates new data upon search', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TimeTrackingReport />
        </MockedProvider>
      )

      // row with mock okta id is defined
      await waitFor(() => {
        expect(screen.getAllByText('Test User')).toBeDefined()
      })

      const searchInput = screen.getByLabelText('search time tracking report')
      fireEvent.change(searchInput, { target: { value: 'foobar' } })

      await waitFor(() => {
        expect(screen.queryByText('Test User')).toBeNull()
      })
    })
  })

  describe('export', () => {
    it('prepares selected records for export', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TimeTrackingReport />
        </MockedProvider>
      )
      // ensure data is populated
      await waitFor(() => {
        expect(screen.getAllByText('Test User')).toBeDefined()
      })

      const reportTable = screen.getByRole('table')
      const allCheckboxes = within(reportTable).getAllByRole('checkbox')
      // click checkboxes for first 2 records (first checkbox is 'select all')
      fireEvent.click(allCheckboxes[1])
      fireEvent.click(allCheckboxes[2])
      await waitFor(() => {
        expect(screen.getByText('2 records selected.')).toBeDefined()
      })
    })
  })

  describe('selectAll', () => {
    it('selects all when clicking the header checkbox', () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <TimeTrackingReport />
        </MockedProvider>
      )

      const selectAllCheckbox = screen.getAllByRole('checkbox')[0]
      fireEvent.click(selectAllCheckbox)
      const allCheckBoxes = screen.getAllByRole('checkbox')
      for (const checkbox of allCheckBoxes) {
        expect(checkbox.checked).toEqual(true)
      }
    })
  })
})
