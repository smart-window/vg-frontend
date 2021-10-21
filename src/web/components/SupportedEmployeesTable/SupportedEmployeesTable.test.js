import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SupportedEmployeesTable from './SupportedEmployeesTable'
import { MockedProvider } from '@apollo/client/testing'
import { getSupportedEmployeesTableMockData } from 'test/mockData/supportedEmployeesMock'
import { renderWithRouter } from 'test/mocks/router.mock'

jest.mock('/web/modules/Grid/hooks/usePageSize', () => () => 5)

// mock analytics
window.gtag = () => {}

describe('Employee Training Report', () => {
  let mocks

  beforeEach(() => {
    mocks = [...getSupportedEmployeesTableMockData()]
  })

  const defaultProps = {
    filters: [],
    setFilters: () => {}
  }

  it('animates a filter dropdown on filter button click', () => {
    render(
      <MockedProvider>
        <SupportedEmployeesTable {...defaultProps} />
      </MockedProvider>
    )
    const filterButton = screen.getByText('FILTERS')

    fireEvent.click(filterButton)

    expect(screen.getByText('Clear Filters')).toBeDefined()
  })

  it('populates new data upon search', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SupportedEmployeesTable {...defaultProps} />
      </MockedProvider>
    )
    // row with mock okta id is defined
    await waitFor(() => {
      expect(screen.getByText('First1 Last1')).toBeDefined()
    })

    const searchInput = screen.getByLabelText('search admin report')
    fireEvent.change(searchInput, { target: { value: 'foobar' } })

    await waitFor(() => {
      expect(screen.queryByText('First1 Last1')).toBeNull()
    })
  })

  it('Opens the profile card when clicking on a user', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SupportedEmployeesTable {...defaultProps} />
      </MockedProvider>
    )

    await waitFor(() => {
      const userRow = screen.getByText('First1 Last1')
      fireEvent.click(userRow)
    })

    await waitFor(() => {
      expect(screen.queryByText('Supported Employee')).toBeDefined()
    })
  })

  it('Navigates to the detailed profile when clicking \'view full profile\'', async () => {
    const mockHistoryPush = jest.fn()
    renderWithRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SupportedEmployeesTable {...defaultProps} />
      </MockedProvider>,
      mockHistoryPush
    )

    await waitFor(() => {
      const userRow = screen.getByText('First1 Last1')
      fireEvent.click(userRow)
    })

    await waitFor(() => {
      const viewFullProfileButton = screen.queryByText('View Full Profile')
      fireEvent.click(viewFullProfileButton)
    })

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/supported-employees/7')
    })
  })
})
