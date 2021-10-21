import React from 'react'
import { render, screen } from '@testing-library/react'
import EmployeeMap from './EmployeeMap'
import { MockedProvider } from '@apollo/client/testing'
import { getEmployeeMapMockData } from 'test/mockData/employeeMapMock'
import 'test/mocks/react-google-maps.mock.js'
import 'test/mocks/google-window-object.mock.js'

jest.mock('/web/modules/Grid/hooks/usePageSize', () => () => 5)

// mock analytics
window.gtag = () => {}

describe('Employee Map', () => {
  let mocks

  beforeEach(() => {
    mocks = [...getEmployeeMapMockData()]
  })

  const defaultProps = {
    setSelectedTab: () => {},
    setFilters: () => {}
  }

  it('renders the map component', () => {
    render(
      <MockedProvider mocks={mocks}>
        <EmployeeMap {...defaultProps} />
      </MockedProvider>
    )

    expect(screen.getByTestId('div-employees-container')).toBeDefined()
  })
})
