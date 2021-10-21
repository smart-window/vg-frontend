import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import storageConstants from 'shared/constants/storageConstants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as AuthSession from 'expo-auth-session'
import jwt_decode from 'jwt-decode'
import * as WebBrowser from 'expo-web-browser'
import {Platform} from 'react-native'
import oktaConfig from 'shared/config/oktaConfig'
import analyticsService from 'mobile/services/analyticsServiceMobile'

// TODO: potentially combine with CurrentUserProvider.web
export const CurrentUserContext = React.createContext({
  userIdToken: null,
  userInfo: {},
  setUserIdToken: () => {},
  setUserInfo: () => {},
  cacheAuthAsync: () => {},
  getUserInfo: () => {},
  getCachedAuthAsync: () => {},
  removeCachedAuthAsync: () => {},
  cacheUserLanguage: () => {},
  getUserLanguage: () => {}
})

CurrentUserProvider.propTypes = {
  /** Component/s to display inside BackdropWrapper */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

/**
 * Provider for top-level User Context.
 * Persists current user's permissions and info through AsyncStorage.
 * @category Providers - Mobile
 * @module CurrentUserProvider
 */
export function CurrentUserProvider({ children }) {
  const [userInfo, setUserInfo] = useState('{}')
  const [userIdToken, setUserIdToken] = useState(null)

  useEffect(function didMount() {
    /** Checks Async Storage for user's authState and user's information. */
    async function checkUserStorage() {
      const authState = await updateRefreshToken()
      if (authState) {
        await cacheAuthAsync(authState)
        const decodedUserSub = jwt_decode(authState.accessToken).uid
        analyticsService.initUser(decodedUserSub)
      }
      else {
        await removeCachedAuthAsync()
      }
    }

    checkUserStorage()
  }, [])

  /**
   * Saves new user info to AsyncStorage.
   * @param {object} newUserInfo updated
   */
  async function persistUserInfo(newUserInfo) {
    if (newUserInfo) {
      await AsyncStorage.setItem(storageConstants.USER_INFO, JSON.stringify(newUserInfo))
      setUserInfo(newUserInfo)
    }
    else {
      await AsyncStorage.removeItem(storageConstants.USER_INFO)
      setUserInfo({})
    }
  }

  /**
   * Set the authentication information in local storage upon successful login.
   * @param {object} authState - The fetched data of Okta's authState
   */
  async function cacheAuthAsync(authState) {
    await AsyncStorage.setItem(storageConstants.MOBILE_OKTA_AUTH, JSON.stringify(authState))
    const storedUserInfo = await AsyncStorage.getItem(storageConstants.USER_INFO)
    if (storedUserInfo) {
      const persistedUserInfoJSON = JSON.parse(storedUserInfo)
      persistUserInfo(persistedUserInfoJSON)
    }
    else {
      await getUserInfo()
    }
    setUserIdToken(authState.idToken)
  }

  /**
   * Remove the cached authentication state and user information in async storage.
   */
  async function removeCachedAuthAsync() {
    await AsyncStorage.removeItem(storageConstants.MOBILE_OKTA_AUTH)
    setUserIdToken(null)
    persistUserInfo()
  }

  /**
   * Get the current user's information from Okta.
   * @returns {object} Current user's information from Okta
   */
  async function getUserInfo() {
    const tokensFromStorage = await AsyncStorage.getItem(storageConstants.MOBILE_OKTA_AUTH)
    const accessToken = JSON.parse(tokensFromStorage).accessToken
    const response = await fetch(`${oktaConfig.issuer}/v1/userinfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const userInfo = await response.json()
    analyticsService.initUser(userInfo.sub)
    persistUserInfo(userInfo)
  }

  /**
   * Get the user's Okta authState from Async Storage.
   * @returns {object} Current user's Okta authState or null
   */
  async function getCachedAuthAsync() {
    const value = await AsyncStorage.getItem(storageConstants.MOBILE_OKTA_AUTH)
    const authState = JSON.parse(value)
    return authState
  }

  /**
   * Gets a user's Okta Auth State by using the authorization code requested from sign in.
   * @param {string} request - The auth session request made to get authorization code.
   * @param {string} response - The auth session response returned with the authorization code.
   * @param {string} discovery - A discovery document with endpoints for authentication
   */
  async function postToken(request, response, discovery) {
    AsyncStorage.setItem(storageConstants.REDIRECT_URI, request.redirectUri)
    const authState = await AuthSession.exchangeCodeAsync(
      {
        code: response.params.code,
        clientId: oktaConfig.mobileClientId,
        redirectUri: request.redirectUri,
        extraParams: {
          code_verifier: request.codeVerifier,
        },
      },
      discovery
    )
    await cacheAuthAsync(authState)
  }

  /**
   * Fetch new access and id token for users when refresh required
   * Code reference: https://jamesirish.io/blog/auth0-pkce-flow-using-expo-authsession
   */
  async function updateRefreshToken() {
    const authState = await getCachedAuthAsync()
    if (authState) {
      try {
        const decodedAccessToken = jwt_decode(authState.accessToken)
        if (decodedAccessToken.iat) {
          const issuedAtMs = decodedAccessToken.iat * 1000
          const thirtyMinutesInMs = 30 * 60 * 1000
          // If token is 30 minutes from issued at, fetch new token
          if (authState.refreshToken && Date.now() > issuedAtMs + thirtyMinutesInMs) {
            const discovery = await AuthSession.fetchDiscoveryAsync(
              oktaConfig.issuer
            )
            const refreshResponse = await AuthSession.refreshAsync(
              {
                clientId: oktaConfig.mobileClientId,
                refreshToken: authState.refreshToken,
              },
              discovery
            )
            cacheAuthAsync(refreshResponse)
            setUserIdToken(refreshResponse.idToken)
            return refreshResponse
          }
          else {
            return authState
          }
        }
      }
      catch (error) {
        return null
      }
    }
  }

  /** Handles user sign out. */
  async function signOutAsync() {
    if (userIdToken) {
      try {
        if (Platform.OS !== 'ios') {
          const tokensFromStorage = await getCachedAuthAsync()
          const redirect_uri = await AsyncStorage.getItem(storageConstants.REDIRECT_URI)
          const idToken = tokensFromStorage.idToken
          const requirements = `?id_token_hint=${idToken}&post_logout_redirect_uri=${redirect_uri}`
          WebBrowser.openBrowserAsync(oktaConfig.issuer +'/v1/logout' + requirements)
        }
        analyticsService.initUser()
        await removeCachedAuthAsync()
      }
      catch (error) {
        throw new Error(error.message)
      }
    }
  }

  async function cacheUserLanguage(language) {
    await AsyncStorage.setItem(storageConstants.USER_LANGUAGE, JSON.stringify(language))
  }

  async function getUserLanguage() {
    const storedUserLanguage = await AsyncStorage.getItem(storageConstants.USER_LANGUAGE)
    const userLanguage = JSON.parse(storedUserLanguage)
    return userLanguage
  }

  return (
    <CurrentUserContext.Provider
      value={{
        userIdToken,
        userInfo,
        setUserIdToken: (idToken) => {setUserIdToken(idToken)},
        setUserInfo: persistUserInfo,
        cacheAuthAsync,
        getUserInfo,
        getCachedAuthAsync,
        removeCachedAuthAsync,
        postToken,
        updateRefreshToken,
        signOutAsync,
        cacheUserLanguage,
        getUserLanguage
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
}