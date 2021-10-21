import React from 'react'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import EmployeeTrainingReport from './EmployeeTrainingReport'
import {MockedProvider} from '@apollo/client/testing'
import { getEmployeeTrainingReportMockData } from 'test/mockData/employeeTrainingsMock'

jest.mock('/web/modules/Grid/hooks/usePageSize', () => () => 5)

// mock analytics
window.gtag = () => {}

describe('Employee Training Report', () => {
  let mocks

  beforeEach(() => {
    mocks = [...getEmployeeTrainingReportMockData()]
  })

  it('animates a filter dropdown on filter button click', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EmployeeTrainingReport/>
      </MockedProvider>
    )
    const filterButton = screen.getByText('FILTERS')

    fireEvent.click(filterButton)

    expect(screen.getByText('Clear Filters')).toBeDefined()
  })

  it('renders a date picker dropdown on date input click', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EmployeeTrainingReport/>
      </MockedProvider>
    )
    const filterButton = screen.getByText('FILTERS')

    fireEvent.click(filterButton)

    const dueDateInput = screen.getAllByRole('textbox', { type: 'text' })[4] // Order of inputs matters here

    fireEvent.click(dueDateInput)

    await waitFor(() => {
      expect(screen.getByText('Mo')).toBeDefined()
    })
  })

  it('renders a date selected', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EmployeeTrainingReport/>
      </MockedProvider>
    )
    const filterButton = screen.getByText('FILTERS')

    fireEvent.click(filterButton)

    const dueDateInput = screen.getAllByRole('textbox', { type: 'text' })[4] // Order of inputs matters here

    fireEvent.click(dueDateInput)

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

  it('populates new data upon search', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EmployeeTrainingReport/>
      </MockedProvider>
    )
    // row with mock okta id is defined
    await waitFor(() => {
      expect(screen.getAllByText('Training One')).toBeDefined()
    })

    const searchInput = screen.getByLabelText('search training report')
    fireEvent.change(searchInput, { target: { value: 'foobar' } })

    await waitFor(() => {
      expect(screen.queryByText('Training One')).toBeNull()
    })
  })

  it('prepares selected records for export', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EmployeeTrainingReport/>
      </MockedProvider>
    )
    // ensure data is populated
    await waitFor(() => {
      expect(screen.getAllByText('Training One')).toBeDefined()
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
