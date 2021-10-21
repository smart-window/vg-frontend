import React from 'react'
import {fireEvent, waitFor} from '@testing-library/react-native'
import renderWithSafeAreaProvider from 'test/mocks/safeAreaInsert.mock.js'
import Dashboard from './Dashboard'
import mobilePageConstants from 'mobile/constants/mobilePageConstants'
import { getTimeEntriesChartMockData } from 'test/mockData/timeEntriesMock'
import {MockedProvider} from '@apollo/client/testing'

describe('Dashboard', () => {
  let navigation, mocks

  beforeEach(() => {
    navigation = {
      navigate: jest.fn()
    }
    mocks = getTimeEntriesChartMockData()
  })

  it('Renders the expected components and a chart', async () => {
    const { getByTestId, getByText, getByA11yLabel } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Dashboard/>
      </MockedProvider>
    )

    const profileComponent = getByTestId('Dashboard')
    expect(profileComponent).toContainElement(getByTestId('BackdropWrapper'))
    expect(profileComponent).toContainElement(getByTestId('PageHeader'))
    expect(profileComponent).toContainElement(getByTestId('Card'))

    const chart = await waitFor(() => getByA11yLabel('Time tracking chart'))

    expect(chart).toBeDefined()
    expect(getByText('total time worked')).toBeDefined()
  })

  it('Renders an empty state when no time entries are logged', async() => {
    const { getByText } = renderWithSafeAreaProvider(
      <MockedProvider mocks={[mocks[1]]} addTypename={false}>
        <Dashboard/>
      </MockedProvider>
    )

    const emptyStateButton = await waitFor(() => getByText('Make a Time Entry'))

    expect(emptyStateButton).toBeDefined()
    expect(getByText('Go To Time Tracking')).toBeDefined()
  })

  it('When no time entries are logged, and Go To Time Tracking is clicked, fire navigation', () => {
    const { getByText } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Dashboard navigation={navigation}/>
      </MockedProvider>
    )

    const timeTrackingButton = getByText('Go To Time Tracking')

    fireEvent.press(timeTrackingButton)

    expect(navigation.navigate).toHaveBeenCalledWith(mobilePageConstants.TIMETRACKING, undefined)
  })

  it('When time entries exist, and Go To Time Tracking is clicked, fire navigation with state', async () => {
    const { getByText } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Dashboard navigation={navigation}/>
      </MockedProvider>
    )
    const timeTrackingButton = await waitFor(() => getByText('View details for this week'))

    fireEvent.press(timeTrackingButton)

    expect(navigation.navigate).toHaveBeenCalledWith(
      mobilePageConstants.TIMETRACKING,
      expect.objectContaining({
        eightDaysAgo: expect.any(Number),
        today: expect.any(Number),
      })
    )
  })
})