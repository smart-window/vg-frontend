import React, {useContext, useState, useEffect, useCallback} from 'react'
import {Platform, AppState} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { setContext } from '@apollo/client/link/context'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {useTranslation} from 'react-i18next'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery, gql
} from '@apollo/client'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from 'styled-components/native'

import {colors} from 'shared/constants/cssConstants'
import {CurrentUserContext} from 'mobile/providers/CurrentUserProvider.mobile'

import Nav from 'mobile/components/Nav/Nav'
import GlobalLoader from 'mobile/components/GlobalLoader/GlobalLoader'
import GlobalModal from 'mobile/components/GlobalModal/GlobalModal'
import Login from 'mobile/screens/Login/Login'
// import Profile from 'mobile/screens/Profile/Profile'
import Settings from 'mobile/screens/Settings/Settings'
import Dashboard from 'mobile/screens/Dashboard/Dashboard'
import mobilePageConstants from 'mobile/constants/mobilePageConstants'
import TimeTracking from 'mobile/screens/TimeTracking/TimeTracking'

if (Platform.OS === 'android') { // only android needs polyfill
  require('intl') // import intl object
  require('intl/locale-data/jsonp/en-IN') // load the required locale details
}
let prevAppState

/**
 * The App that facilitates setting the context for user authentication and information and handles navigation.
 * @category Components - Mobile
 * @namespace MobileApp
 */
export default function MobileApp() {
  const Stack = createStackNavigator()
  const [authLoaded, setAuthLoaded] = useState(false) // Handles async authentication check
  const [client, setClient] = useState(new ApolloClient({cache: new InMemoryCache()})) // Default client without linking
  const [refreshInterval, setRefreshInterval] = useState(null)
  const currentUserContext = useContext(CurrentUserContext)
  const { i18n } = useTranslation()

  /** Handles a call to check if the refresh token is valid or needs to be renewed. If not valid, sign user out. */
  const checkRefreshToken = useCallback(
    async function checkRefreshToken() {
      const authState = await currentUserContext.updateRefreshToken()
      if (!authState) {
        currentUserContext.signOutAsync()
      }
    },
    []
  )

  useEffect(function getStoredLanguageOnMount() {
    // Check if user has stored a language, and if so use that (allows us to get language independent of user)
    currentUserContext.getUserLanguage()
      .then(language => {
        if (i18n.language !== language) i18n.changeLanguage(language)
      })
  }, [])

  useEffect(function didUpdate() {
    // Fires when a user's logged in token changes.
    // On change, the Apollo Client updates and an interval for checking refresh token starts
    if (currentUserContext.userIdToken) {
      setClient(getApolloClient(currentUserContext.userIdToken))
      startRefreshInterval()
    }
    else if (refreshInterval) {
      clearInterval(refreshInterval)
    }
    setAuthLoaded(true)
  }, [currentUserContext.userIdToken])

  useEffect(function didUpdate() {
    // When the app state goes from the background to an active state, check if refresh token needs to be renewed
    if (AppState) {
      AppState.addEventListener('change', () => {
        if (prevAppState === 'background' && AppState.currentState === 'active') {
          checkRefreshToken()
        }
        prevAppState = AppState.currentState
      })
    }
  }, [AppState])

  /** Checks if the user's token needs to be refreshed every 5 minutes */
  function startRefreshInterval() {
    if (refreshInterval) {
      clearInterval(refreshInterval)
    }
    const newRefreshInterval = setInterval(() => {
      checkRefreshToken()
    }, 300000)

    setRefreshInterval(newRefreshInterval)
  }

  /**
   * Return the authentication information in local storage upon successful login.
   * @param {string} idToken - The fetched idToken of the user's Okta authState
   * @returns {ApolloClient} - The new Apollo client instance with a link
   */
  function getApolloClient(idToken) {
    // no fallback to localhost since that doesn't work with physical devices
    const API = process.env.REACT_APP_API_HOST + '/graphql'
    const httpLink = createHttpLink({
      uri: API,
    })
    // Initialize headers for GraphQL requests
    const authLink = setContext((_, { headers }) => {
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${idToken}`,
        },
      }
    })
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink)
    })
  }

  if (!authLoaded) {
    return null
  }

  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <GlobalModal/>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {
              currentUserContext.userIdToken ?
                <Stack.Screen name={mobilePageConstants.MAIN} component={MainTabbedView} />
                :
                <Stack.Screen name={mobilePageConstants.LOGIN} component={Login} />
            }
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  )
}

// TODO: use react-navigation safe area pattern to be able to move BackdropWrapper here
// https://reactnavigation.org/docs/handling-safe-area/
const ViewTabbedWrapper = styled.View`
  flex: 1;
  background-color: ${colors.white};
  height: 100%;
  width: 100%;
`

export const USER_QUERY = gql`
    query {
      currentUser {
        firstName
        lastName
        birthDate
        nationality {
          id
          isoCode
        }
        settings {
          language
        }
      }
    }
  `

/**
 * A helper component for the core app tab nav.
 */
function MainTabbedView() {
  // TODO: move auth check here and redirect to Login if unauthenticated
  const Tab = createBottomTabNavigator()
  const { i18n } = useTranslation()
  const {data} = useQuery(USER_QUERY)

  useEffect(function updateUserLanguage() {
    // Fetch current user data and change language if needed
    if (data && data.currentUser.settings.language && data.currentUser.settings.language !== i18n.language) {
      i18n.changeLanguage(data.currentUser.settings.language)
    }
  }, [data])

  return (
    <ViewTabbedWrapper>
      <GlobalLoader/>
      <Tab.Navigator sceneContainerStyle={{backgroundColor: colors.white}} tabBar={Nav}>
        <Tab.Screen key={mobilePageConstants.DASHBOARD} name={mobilePageConstants.DASHBOARD} component={Dashboard} />
        {/* <Tab.Screen key={mobilePageConstants.PROFILE} name={mobilePageConstants.PROFILE} component={Profile} /> */}
        <Tab.Screen key={mobilePageConstants.TIMETRACKING} name={mobilePageConstants.TIMETRACKING} component={TimeTracking} />
        <Tab.Screen key={mobilePageConstants.SETTINGS} name={mobilePageConstants.SETTINGS} component={Settings} />
      </Tab.Navigator>
    </ViewTabbedWrapper>
  )
}