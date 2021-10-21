import React from 'react'
import { render, screen } from '@testing-library/react'
import OnboardingDetail from './OnboardingDetail'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter, Route } from 'react-router-dom'
import { processMock } from 'test/mockData/processMock'

describe('OnboardingDetail', () => {
  it('renders the tabs and a process', async () => {
    render(
      <MemoryRouter initialEntries={['/onboarding/employee/1']}>
        <MockedProvider mocks={[processMock()]}>
          <Route path='/onboarding/:tab(employee|client)/:processId/(task)?/:taskId?'>
            <OnboardingDetail />
          </Route>
        </MockedProvider>
      </MemoryRouter>
    )
    const processStage = await screen.findByText('Do the the thing')

    expect(processStage).toBeDefined()
    expect(screen.getByText('Clients')).toBeDefined()
    expect(screen.getByText('Employees')).toBeDefined()
  })
})
