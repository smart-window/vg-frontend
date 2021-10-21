import React from 'react'
import TimeOffRequestModal from './TimeOffRequestModal'
import {MockedProvider} from '@apollo/client/testing'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import {act} from '@testing-library/react-hooks'
import {getPtoTypesMock, getPolicyBalanceMock} from 'test/mockData/ptoMock'

const mockUser = {
  fullName: 'Jon Fishman',
  id: '1'
}

describe('Employee Training Report', () => {
  let mocks

  beforeEach(() => {
    mocks = [getPtoTypesMock(), getPolicyBalanceMock()]
  })

  it('Displays the user\'s name', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <TimeOffRequestModal user={mockUser}/>
      </MockedProvider>
    )
    expect(screen.getByText('Jon Fishman')).toBeDefined()
  })

  it('Can enter some notes', async() => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <TimeOffRequestModal user={mockUser}/>
      </MockedProvider>
    )
    await act(() => {
      const notesTextarea = screen.getByLabelText('Time Off Request Notes')
      fireEvent.change(notesTextarea, { target: { value: 'some notes here' } })
      expect(screen.getByText('some notes here')).toBeDefined()
    })
  })

  it('Can select a pto type and view available balance', async() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TimeOffRequestModal user={mockUser}/>
      </MockedProvider>
    )
    await act(async () => {
      const comboBox = screen.getByLabelText('Time Off Type')
      comboBox.click()
      await waitFor(() => {
        const timeOffTypeOption = screen.getByText('Vacation')
        timeOffTypeOption.click()
      })
      await waitFor(() => {
        // 4.2 is the balance for the Vacation type
        expect(screen.getByText('4.2')).toBeDefined()
      })
    })
  })
})