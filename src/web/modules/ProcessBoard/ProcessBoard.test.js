import React from 'react'
import { render, screen } from '@testing-library/react'
import ProcessBoard from './ProcessBoard'
import { MockedProvider } from '@apollo/client/testing'
import { processMock } from 'test/mockData/processMock'
import { MemoryRouter, Route } from 'react-router-dom'

const Wrapper = ({ children }) => (
  <MemoryRouter initialEntries={['/onboarding/employee/1']}>
    <MockedProvider mocks={[processMock()]}>
      <Route path='/onboarding/:tab(employee|client)/:processId/(task)?/:taskId?'>{children}</Route>
    </MockedProvider>
  </MemoryRouter>
)

describe('ProcessBoard', () => {
  it('displays process stages', async () => {
    render(
      <Wrapper>
        <ProcessBoard />
      </Wrapper>
    )

    await screen.findByText('Do the the thing')
    screen.getByText('You are getting it')
    screen.getByText('Finished')
  })
})
