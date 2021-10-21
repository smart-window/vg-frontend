import React from 'react'
import {fireEvent, waitFor} from '@testing-library/react-native'
import renderWithSafeAreaProvider from 'test/mocks/safeAreaInsert.mock.js'
import {MockedProvider} from '@apollo/client/testing'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {CurrentUserContext} from 'mobile/providers/CurrentUserProvider.mobile'
import storageConstants from 'shared/constants/storageConstants'
import {act} from '@testing-library/react-hooks'
import Settings from './Settings'
import {currentUserMockData, mutateCurrentUserLanguageMock} from 'test/mockData/currentUserMock'

describe('Settings', () => {
  let mocks

  beforeEach(() => {
    mocks = [currentUserMockData, mutateCurrentUserLanguageMock]
  })

  it('Renders the Backdrop, Nav and PageHeader, and two Card components', () => {
    const { getByTestId, getAllByTestId } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Settings/>
      </MockedProvider>
    )

    const profileComponent = getByTestId('Settings')
    const cardComponents = getAllByTestId('Card')
    expect(profileComponent).toContainElement(getByTestId('BackdropWrapper'))
    expect(profileComponent).toContainElement(getByTestId('PageHeader'))
    expect(profileComponent).toContainElement(cardComponents[0])
    expect(profileComponent).toContainElement(cardComponents[1])
  })

  it('Renders a PageHeaderComponent with a title of Settings', () => {
    const { getByText } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Settings/>
      </MockedProvider>
    )

    expect(getByText('Settings')).toBeDefined()
  })

  it('Renders a Card component with a Card Header', () => {
    const {
      getByTestId,
      getByText
    } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Settings/>
      </MockedProvider>
    )

    const profileComponent = getByTestId('Settings')

    expect(profileComponent).toContainElement(getByTestId('CardHeader'))
    expect(getByText('Language Settings')).toBeDefined()
  })

  it('Renders a Card component that contains the Sign Out button', () => {
    const { getByText } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Settings/>
      </MockedProvider>
    )

    expect(getByText('Sign Out')).toBeDefined()
  })

  it('Renders the first Card Component with a border top radius', () => {
    const borderTopStyle = {
      borderTopLeftRadius: 18,
      borderTopRightRadius: 18
    }
    const {
      getAllByTestId
    } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Settings/>
      </MockedProvider>
    )

    const card = getAllByTestId('Card')[0]
    expect(card).toHaveStyle(borderTopStyle)
  })

  it('Renders the first Card Component with a flex grow', () => {
    const fillSpaceStyle = {
      flexGrow: 1
    }
    const {
      getAllByTestId
    } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Settings/>
      </MockedProvider>
    )

    const card = getAllByTestId('Card')[0]
    expect(card).toHaveStyle(fillSpaceStyle)
  })

  it('Renders the second Card Component with a border bottom radius', () => {
    const borderBottomStyle = {
      borderBottomLeftRadius: 32,
      borderBottomRightRadius: 32
    }

    const {
      getAllByTestId
    } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Settings/>
      </MockedProvider>
    )

    const card = getAllByTestId('Card')[1]
    expect(card).toHaveStyle(borderBottomStyle)
  })

  it('Renders the second Card Component with a top margin', () => {
    const marginTopStyle = {
      marginTop: 12
    }
    const {
      getAllByTestId
    } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Settings/>
      </MockedProvider>
    )

    const card = getAllByTestId('Card')[1]
    expect(card).toHaveStyle(marginTopStyle)
  })

  it('Causes the user to log out on press of the Sign Out button', async () => {
    AsyncStorage.setItem(storageConstants.MOBILE_OKTA_AUTH, {})
    const signOutAsync = jest.fn()

    const {
      getByText,
    } = renderWithSafeAreaProvider(
      <CurrentUserContext.Provider value={{userIdToken: 123, signOutAsync: signOutAsync}}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Settings />
        </MockedProvider>
      </CurrentUserContext.Provider>
    )

    await act(async() => {
      const signOutButton = getByText('Sign Out')

      fireEvent.press(signOutButton)

      await Promise.resolve()

      expect(signOutAsync).toHaveBeenCalled()
    })
  })

  it('Causes the user to log out on press of the Sign Out button', async () => {
    const signOutAsync = jest.fn(() => {throw new Error('error')})

    const {
      getByText,
    } = renderWithSafeAreaProvider(
      <CurrentUserContext.Provider value={{userIdToken: 123, signOutAsync: signOutAsync}}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Settings />
        </MockedProvider>
      </CurrentUserContext.Provider>
    )

    const signOutButton = getByText('Sign Out')

    fireEvent.press(signOutButton)

    const error = await waitFor(() => getByText('Log out error'))
    expect(error).toBeDefined()
  })

  it('Changes the users language', async () => {
    // TODO: set up translations mock and figure out how to build a test around a debounce
    const cacheUserLanguage = jest.fn()

    const {
      getByLabelText,
      getByText,
      getByTestId
    } = renderWithSafeAreaProvider(
      <CurrentUserContext.Provider value={{userIdToken: 123, cacheUserLanguage: cacheUserLanguage}}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Settings />
        </MockedProvider>
      </CurrentUserContext.Provider>
    )

    const languageSelection = getByLabelText('Change language')

    fireEvent.press(languageSelection)

    const esOption = await waitFor(() => getByTestId('RadioButton-es'))

    fireEvent.press(esOption)

    const spanishTranslation = await waitFor(() => getByText('Español'))

    expect(spanishTranslation).toBeDefined()
  })
})