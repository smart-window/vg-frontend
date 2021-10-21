import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import EmployeeOnboardingsTable from './EmployeeOnboardingsTable'
import { MockedProvider } from '@apollo/client/testing'
// import { getOnboardingTableMockData } from 'test/mockData/onboardingMock'

jest.mock('/web/modules/Grid/hooks/usePageSize', () => () => 5)

// mock analytics
window.gtag = () => {}

describe('Employee Training Report', () => {
  // let mocks

  // beforeEach(() => {
  //   mocks = [...getOnboardingTableMockData()]
  // })

  const defaultProps = {
    filters: [],
    setFilters: () => {},
  }

  it('animates a filter dropdown on filter button click', () => {
    render(
      <MockedProvider>
        <EmployeeOnboardingsTable {...defaultProps} />
      </MockedProvider>
    )
    const filterButton = screen.getByText('FILTERS')

    fireEvent.click(filterButton)

    expect(screen.getByText('Clear Filters')).toBeDefined()
  })

  // it('populates new data upon search', async () => {
  //   render(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <EmployeeOnboardingsTable {...defaultProps} />
  //     </MockedProvider>
  //   )
  //   // row with mock okta id is defined
  //   await waitFor(() => {
  //     expect(screen.getByText('Alicia Tillman')).toBeDefined()
  //   })

  //   const searchInput = screen.getByLabelText('search admin report')
  //   fireEvent.change(searchInput, { target: { value: 'foobar' } })

  //   await waitFor(() => {
  //     expect(screen.queryByText('Alicia Tillman')).toBeNull()
  //   })
  // })
})
