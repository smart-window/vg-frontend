import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ClientCompaniesTable from './ClientCompaniesTable'
import { MockedProvider } from '@apollo/client/testing'
import { getClientCompaniesTableMockData } from 'test/mockData/clientCompaniesMock'
import { renderWithRouter } from 'test/mocks/router.mock'

jest.mock('/web/modules/Grid/hooks/usePageSize', () => () => 5)

// mock analytics
window.gtag = () => {}

describe('Client Companies Table', () => {
  let mocks

  beforeEach(() => {
    mocks = [...getClientCompaniesTableMockData()]
  })

  const defaultProps = {
    filters: [],
    setFilters: () => {}
  }

  it('animates a filter dropdown on filter button click', () => {
    render(
      <MockedProvider>
        <ClientCompaniesTable {...defaultProps} />
      </MockedProvider>
    )
    const filterButton = screen.getByText('FILTERS')

    fireEvent.click(filterButton)

    expect(screen.getByText('Clear Filters')).toBeDefined()
  })

  it('populates new data upon search', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ClientCompaniesTable {...defaultProps} />
      </MockedProvider>
    )
    // row with mock okta id is defined
    await waitFor(() => {
      expect(screen.getByText('Client 1')).toBeDefined()
    })

    const searchInput = screen.getByLabelText('search client companies')
    fireEvent.change(searchInput, { target: { value: 'foobar' } })

    await waitFor(() => {
      expect(screen.queryByText('Client 1')).toBeNull()
    })
  })

  it('Opens the profile card when clicking on a client', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ClientCompaniesTable {...defaultProps} />
      </MockedProvider>
    )

    await waitFor(() => {
      const userRow = screen.getByText('Client 1')
      fireEvent.click(userRow)
    })

    await waitFor(() => {
      expect(screen.queryByText('Client Company')).toBeDefined()
    })
  })

  it('Navigates to the detailed profile when clicking \'view full profile\'', async () => {
    const mockHistoryPush = jest.fn()
    renderWithRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ClientCompaniesTable {...defaultProps} />
      </MockedProvider>,
      mockHistoryPush
    )

    await waitFor(() => {
      const userRow = screen.getByText('Client 1')
      fireEvent.click(userRow)
    })

    await waitFor(() => {
      const viewFullProfileButton = screen.queryByText('View Full Profile')
      fireEvent.click(viewFullProfileButton)
    })

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith('/companies/client/1/client-info')
    })
  })

})
