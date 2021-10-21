import 'react-native'
import React from 'react'
import TimeEntryDrawer from './TimeEntryDrawer.js'
import {fireEvent} from '@testing-library/react-native'
import renderWithSafeAreaProvider from 'test/mocks/safeAreaInsert.mock.js'
import {MockedProvider} from '@apollo/client/testing'
import {CREATE_TIME_ENTRY_MUTATION} from './TimeEntryDrawer'
import {act} from '@testing-library/react-hooks'

describe('TimeEntryDrawer', () => {
  let mocks

  beforeEach(() => {
    mocks = [
      {
        request: {
          query: CREATE_TIME_ENTRY_MUTATION,
        },
        result: {
          data: {}
        },
      },
    ]
  })

  it('Renders a time entry modal with a shortened height', () => {
    const { getByText, getByTestId } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TimeEntryDrawer
          timeTypes={[]}
          selectedDate={new Date()}
        />
      </MockedProvider>
    )

    expect(getByText('Add Time Entry')).toBeDefined()
    expect(getByTestId('AnimatedView')).toHaveStyle({height: 61})
  })

  it('Changes the modal on Add Time Entry button click', () => {
    const { getByText } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TimeEntryDrawer
          timeTypes={[]}
          selectedDate={new Date()}
        />
      </MockedProvider>
    )

    const addButton = getByText('Add Time Entry')

    fireEvent.press(addButton)

    expect(getByText('New Time Entry')).toBeDefined()
  })

  it('Changes the modal to Edit mode when editing a time entry', () => {
    const timeEntryForEdit = {
      __typename: 'TimeEntry',
      description: 'It’s Christmas!!',
      eventDate: '2020-12-25',
      id: '52',
      timePolicyId: '1',
      timeType: {
        __typename: 'TimeType',
        id: '3',
        slug: 'planned absence',
      },
      timeTypeId: '3',
      totalHours: 8,
      userId: '6',
    }
    let shouldExpandDrawer = false

    const { getByText, getByDisplayValue } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TimeEntryDrawer
          timeTypes={[]}
          selectedDate={new Date()}
          timeEntryForEdit={timeEntryForEdit}
          shouldExpandDrawer={true}
        />
      </MockedProvider>
    )

    /* eslint-disable no-unused-vars */
    shouldExpandDrawer = true

    act(() => {
      expect(getByText('Edit Time Entry')).toBeDefined()
      expect(getByDisplayValue('8')).toBeDefined()
    })
  })
})