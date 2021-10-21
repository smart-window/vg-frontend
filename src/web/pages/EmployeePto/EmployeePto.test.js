import React from 'react'
import EmployeePto from './EmployeePto'
import { GlobalModalProvider } from 'shared/providers/GlobalModalProvider'
import GlobalModal from 'web/components/modals/GlobalModal/GlobalModal'
import {MockedProvider} from '@apollo/client/testing'
import { render, screen, waitFor } from '@testing-library/react'

it('Loads the correct page sections', () => {
  render(<EmployeePto/>)
  expect(screen.getByText('New Time Off Request')).toBeDefined()
  expect(screen.getByText('Time Off Information')).toBeDefined()
})

it('displays the time off request modal on create button click', async () => {
  render(
    <MockedProvider>
      <GlobalModalProvider>
        <GlobalModal/>
        <EmployeePto/>
      </GlobalModalProvider>
    </MockedProvider>
  )
  const newRequestButton = screen.getByText('New Time Off Request')
  newRequestButton.click()
  await waitFor( () => {
    expect(screen.getByText('Submit Time Off Request')).toBeDefined()
  })

})