import React from 'react'
import {render, waitFor} from '@testing-library/react-native'
import {act} from '@testing-library/react-hooks'
import {UserDetails} from './UserDetails'
import {MockedProvider} from '@apollo/client/testing'
import {currentUserMockData, erredCurrentUserMockData} from 'test/mockData/currentUserMock'

describe('UserDetails', () => {
  let mocks

  beforeEach(() => {
    mocks = [currentUserMockData]
  })

  it('Renders a user profile image', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserDetails />
      </MockedProvider>
    )

    expect(getByTestId('ImageProfile')).toBeDefined()
  })

  it('Renders the Card, CardHead, and DualButtons and four InputFields components', async () => {
    const { getByTestId, getAllByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserDetails />
      </MockedProvider>
    )

    const userFirstNameInput = await waitFor(() => getAllByTestId('InputField'))
    expect(userFirstNameInput).toHaveLength(4)
    const userDetailsComponent = getByTestId('UserDetails')
    expect(userDetailsComponent).toContainElement(getByTestId('Card'))
    expect(userDetailsComponent).toContainElement(getByTestId('CardHeader'))
    expect(userDetailsComponent).toContainElement(getByTestId('DualButtons'))
  })

  it('Renders loading indicator when query is fetching', () => {
    const {
      getByTestId
    } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserDetails />
      </MockedProvider>
    )
    act(() => {
      expect(getByTestId('loading-gif')).toBeDefined()
    })
  })

  it('Renders the current user information after query fetch', async () => {
    const {
      getByDisplayValue,
      getByText
    } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserDetails />
      </MockedProvider>
    )

    await act(async () => {
      const userFirstNameInput = await waitFor(() => getByDisplayValue('Nancy'))
      const userFirstNameInputField = getByText('First Name')

      expect(userFirstNameInput).toBeDefined()
      expect(userFirstNameInputField).toBeDefined()
    })
  })

  it('Renders an error message when the query errors', async () => {
    const errorMocks = [erredCurrentUserMockData]
    const {
      getByText
    } = render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <UserDetails />
      </MockedProvider>
    )

    const error = await waitFor(() => getByText('Error fetching user data'))

    expect(error).toBeDefined()
  })
})