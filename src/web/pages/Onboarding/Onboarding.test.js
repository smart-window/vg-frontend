import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Onboarding from './Onboarding'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom'

jest.mock('/web/modules/Grid/hooks/usePageSize', () => () => 5)

// mock analytics
window.gtag = () => {}

describe('Employees Onboarding', () => {

  it('animates a filter dropdown on filter button click', () => {
    render(
      <MemoryRouter initialEntries={['/onboarding']}>
        <MockedProvider>
          <Onboarding />
        </MockedProvider>
      </MemoryRouter>
    )
    const filterButton = screen.getByText('FILTERS')

    fireEvent.click(filterButton)

    expect(screen.getByText('Clear Filters')).toBeDefined()
  })

  it('renders the EmployeeOnboardingsTable component after tab selected', () => {
    render(
      <MemoryRouter initialEntries={['/onboarding']}>
        <MockedProvider>
          <Onboarding />
        </MockedProvider>
      </MemoryRouter>
    )
    const listViewButton = screen.getByText('Employees')

    fireEvent.click(listViewButton)

    expect(screen.getByTestId('div-employee-onboardings-table')).toBeDefined()
  })

  it('renders the ClientOnboardingsTable component after tab selected', () => {
    render(
      <MemoryRouter initialEntries={['/onboarding']}>
        <MockedProvider>
          <Onboarding />
        </MockedProvider>
      </MemoryRouter>
    )
    const listViewButton = screen.getByText('Clients')

    fireEvent.click(listViewButton)

    expect(screen.getByTestId('div-client-onboardings-table')).toBeDefined()
  })
})
