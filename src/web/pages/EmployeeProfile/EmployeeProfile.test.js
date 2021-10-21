
import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { renderWithRouter, mockedParamsValue, mockedCurrentLocationValue } from 'test/mocks/router.mock'
import { MockedProvider } from '@apollo/client/testing'
import EmployeeProfile from './EmployeeProfile'
import {getEmployeeMockData} from 'test/mockData/employeeMock.js'
import { routes } from 'web/constants/routeConstants'

jest.mock('web/components/PegaContainer/PegaContainer', () => () => (<div/>))

beforeEach(() => {
  mockedParamsValue.mockImplementation(() => ({employeeId: 1}))
  mockedCurrentLocationValue.mockImplementation(() => ({pathname: routes.SUPPORTED_EMPLOYEE.replace(':employeeId', '637')}))
})

describe('EmployeeProfile', () => {

  it('Renders the back button', async () => {
    const mockHistoryPush = jest.fn()
    await act(async () => {
      renderWithRouter(
        <MockedProvider addTypename={false}>
          <EmployeeProfile />
        </MockedProvider>,
        mockHistoryPush
      )

      await waitFor(() => {
        const backButton = screen.getByAltText('back button')
        expect(backButton).toBeDefined()
      })
    })
  })

  it('Renders the user\'s name', async () => {
    const mockHistoryPush = jest.fn()
    await act(async () => {
      renderWithRouter(
        <MockedProvider addTypename={false} mocks={getEmployeeMockData()}>
          <EmployeeProfile />
        </MockedProvider>,
        mockHistoryPush
      )

      await waitFor(() => {
        const userName = screen.getByText('Darth Vader')
        expect(userName).toBeDefined()
      })
    })
  })
})