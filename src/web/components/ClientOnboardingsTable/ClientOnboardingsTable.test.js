import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ClientOnboardingsTable from './ClientOnboardingsTable'
import { MockedProvider } from '@apollo/client/testing'

jest.mock('/web/modules/Grid/hooks/usePageSize', () => () => 5)

// mock analytics
window.gtag = () => {}

describe('Client Training Report', () => {

  beforeEach(() => {
  })

  const defaultProps = {
    filters: [],
    setFilters: () => {},
  }

  it('animates a filter dropdown on filter button click', () => {
    render(
      <MockedProvider>
        <ClientOnboardingsTable {...defaultProps} />
      </MockedProvider>
    )
    const filterButton = screen.getByText('FILTERS')

    fireEvent.click(filterButton)

    expect(screen.getByText('Clear Filters')).toBeDefined()
  })
})
