import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SupportedEmployees from './SupportedEmployees'
import { MockedProvider } from '@apollo/client/testing'
import 'test/mocks/react-google-maps.mock.js'
import 'test/mocks/google-window-object.mock.js'

jest.mock('/web/modules/Grid/hooks/usePageSize', () => () => 5)

// mock analytics
window.gtag = () => {}

describe('Supported Employees', () => {
  it('initially renders the EmployeeMap component', () => {
    render(
      <MockedProvider>
        <SupportedEmployees />
      </MockedProvider>
    )

    expect(screen.getByTestId('div-employees-container')).toBeDefined()
  })

  it('renders the SupportedEmployeesTable component after tab selected', () => {
    render(
      <MockedProvider>
        <SupportedEmployees />
      </MockedProvider>
    )
    const listViewButton = screen.getByText('List View')

    fireEvent.click(listViewButton)

    expect(screen.getByTestId('div-supported-employees-table')).toBeDefined()
  })
})
