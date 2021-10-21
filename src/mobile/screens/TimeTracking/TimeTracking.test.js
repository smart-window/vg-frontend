import React from 'react'
import {fireEvent, waitFor} from '@testing-library/react-native'
import renderWithSafeAreaProvider from 'test/mocks/safeAreaInsert.mock.js'
import {MockedProvider} from '@apollo/client/testing'
import TimeTracking from './TimeTracking'
import {getTimeEntriesMockData} from 'test/mockData/timeEntriesMock'
import {GlobalModalProvider} from 'shared/providers/GlobalModalProvider'
import GlobalModal from 'mobile/components/GlobalModal/GlobalModal'

// Note: Any testing of a calendar day click must test on the first day of the current month.
describe('TimeTracking', () => {
  let mocks, navigation, route

  beforeEach(() => {
    mocks = getTimeEntriesMockData()
    navigation = {
      navigate: jest.fn()
    }
    route = {
      params: {}
    }
  })

  it('Renders the Backdrop, Nav and PageHeader, and one Card components', () => {
    const { getByTestId } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TimeTracking navigation={navigation} route={route} />
      </MockedProvider>
    )

    const timeTrackingComponent = getByTestId('TimeTracking')
    expect(timeTrackingComponent).toContainElement(getByTestId('BackdropWrapper'))
    expect(timeTrackingComponent).toContainElement(getByTestId('PageHeader'))
    expect(timeTrackingComponent).toContainElement(getByTestId('Card'))
  })

  it('Renders a calendar component', () => {
    const { getAllByA11yRole } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TimeTracking navigation={navigation} route={route} />
      </MockedProvider>
    )

    const calendarButtons = getAllByA11yRole('button')
    const todaysDate = calendarButtons.find(button => button.props.accessibilityLabel.includes('today'))
    expect(todaysDate).toBeDefined()
  })

  it('Displays time entries on day press', () => {
    const monthName = new Date().toLocaleString('default', { month: 'long' })
    const year = new Date().toLocaleString('default', { year: 'numeric' })

    const { getAllByText, getByText } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TimeTracking navigation={navigation} route={route} />
      </MockedProvider>
    )

    const dayWithEvents = getAllByText('1')
    fireEvent.press(dayWithEvents[0])

    expect(getByText(`${monthName.toUpperCase()} 01, ${year}`)).toBeDefined()
  })

  it('Deletes a time entry', async() => {
    const { getByText, getAllByText, getByTestId } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <GlobalModalProvider>
          <GlobalModal/>
          <TimeTracking navigation={navigation} route={route}/>
        </GlobalModalProvider>
      </MockedProvider>
    )

    let dayWithEvents = getAllByText('1')
    fireEvent.press(dayWithEvents[0])

    await waitFor(() => {
      const deleteQuickAction = getByTestId('deleteEntry')
      fireEvent.press(deleteQuickAction)
    })

    await waitFor(() => {
      const deleteButton = getByText('Delete Entry')
      fireEvent.press(deleteButton)
    })

    await waitFor(() => {
      dayWithEvents = getByText('9')
      fireEvent.press(dayWithEvents)
      expect(getByText('No entries yet. Add one!')).toBeDefined()
    })
  })
})