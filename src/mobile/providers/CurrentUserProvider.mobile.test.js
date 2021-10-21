import React, {useContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {mockAuthState} from 'test/mockData/authState.js'
import {CurrentUserContext, CurrentUserProvider} from './CurrentUserProvider.mobile'
import * as WebBrowser from 'expo-web-browser'
import jwt_decode from 'jwt-decode'
import * as ReactNative from 'react-native'
import { renderHook, act } from '@testing-library/react-hooks'
import storageConstants from 'shared/constants/storageConstants'
import * as AuthSession from 'expo-auth-session'
import oktaConfig from 'shared/config/oktaConfig'

jest.mock('expo-web-browser')
jest.mock('jwt-decode')

describe('CurrentUserProvider', () => {
  let hookRender
  const baseUrl = oktaConfig.issuer

  // eslint-disable-next-line require-await
  beforeEach(async () => {
    const wrapper = ({children}) => (
      <CurrentUserProvider>
        {children}
      </CurrentUserProvider>
    )
    const {result} = renderHook(
      () => useContext(CurrentUserContext),
      {wrapper}
    )
    hookRender = result
  })

  describe('persistUserInfo', () => {
    it('should take in new user info and set that info in storage', async () => {
      const currentUser = {currentUser: {first_name: 'Nancy'}}
      await act(async() => {
        await hookRender.current.setUserInfo(currentUser)
      })

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(storageConstants.USER_INFO, JSON.stringify(currentUser))
    })
  })

  describe('cacheAuthAsync', () => {
    it('should take in an Okta authState and set item in storage', () => {

      act(() => {
        hookRender.current.cacheAuthAsync(mockAuthState)
      })

      const stringifiedMockAuthSate = JSON.stringify(mockAuthState)
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(storageConstants.MOBILE_OKTA_AUTH, stringifiedMockAuthSate)
    })
  })

  describe('getUserInfo', () => {
    it('should fetch to the Okta userinfo endpoint with the an access token', async() => {
      const currentUser = {currentUser: {first_name: 'Nancy'}}
      global.fetch = jest.fn(() => ({
        json: () => (currentUser)
      }))

      await act(async () => {
        await AsyncStorage.setItem(storageConstants.MOBILE_OKTA_AUTH, JSON.stringify(mockAuthState))
        await hookRender.current.getUserInfo()
      })

      expect(global.fetch).toHaveBeenCalledWith(`${baseUrl}/v1/userinfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${mockAuthState.accessToken}`
        }
      })
    })
  })

  describe('getCachedAuthAsync', () => {
    it('should return the authState', async() => {
      let cachedAuthState

      await act(async () => {
        await AsyncStorage.setItem(storageConstants.MOBILE_OKTA_AUTH, JSON.stringify(mockAuthState))
        cachedAuthState = await hookRender.current.getCachedAuthAsync()
      })

      expect(cachedAuthState).toEqual(mockAuthState)
    })
  })

  describe('postToken', () => {
    it('should fetch to the Okta post token endpoint', async () => {
      const now = new Date()
      const issuedAtTime = new Date(now.getTime() - 15*60000).valueOf() / 1000
      const decodedToken = {iat: issuedAtTime}

      const authStateCopy = Object.assign(mockAuthState, {iat: Date.now()})
      jwt_decode.mockImplementation(() => decodedToken)

      global.fetch = jest.fn(() => ({
        json: () => mockAuthState
      }))

      AuthSession.exchangeCodeAsync.mockImplementation(() => mockAuthState)

      const request = {redirectUri: 'https://redirect_url.com', codeVerifier: 123}
      const response = {params: {code: 123}}

      await act(async () => {
        await AsyncStorage.setItem(storageConstants.MOBILE_OKTA_AUTH, JSON.stringify(authStateCopy))
        await hookRender.current.postToken(request, response, {})
        const storedOktaAuth = await AsyncStorage.getItem(storageConstants.MOBILE_OKTA_AUTH)
        expect(JSON.parse(storedOktaAuth)).toEqual(mockAuthState)
      })
    })
  })

  describe('signOutAsync', () => {
    it('should open a web browser to sign out on android and clear stored okta cache', async () => {
      const now = new Date()
      const issuedAtTime = new Date(now.getTime() - 15*60000).valueOf() / 1000
      const decodedToken = {iat: issuedAtTime}

      const authStateCopy = Object.assign(mockAuthState, {iat: Date.now()})
      jwt_decode.mockImplementation(() => decodedToken)

      ReactNative.Platform.OS = 'android'
      const mockUrl = 'https://mockurl.com'
      const requirements = `?id_token_hint=${authStateCopy.idToken}&post_logout_redirect_uri=${mockUrl}`

      await act(async () => {
        await AsyncStorage.setItem(storageConstants.MOBILE_OKTA_AUTH, JSON.stringify(authStateCopy))
        await AsyncStorage.setItem(storageConstants.REDIRECT_URI, mockUrl)
        await hookRender.current.setUserIdToken('123')
        await hookRender.current.signOutAsync()

        expect(WebBrowser.openBrowserAsync).toHaveBeenCalledWith(baseUrl +'/v1/logout' + requirements)

        const storedOktaAuth = await AsyncStorage.getItem(storageConstants.MOBILE_OKTA_AUTH)
        expect(storedOktaAuth).toBeNull()
      })
    })
  })

  describe('updateRefreshToken', () => {
    it('should return current auth state if token expiry is not expired', async () => {
      const now = new Date()
      const issuedAtTime = new Date(now.getTime() - 15*60000).valueOf() / 1000
      const decodedToken = {iat: issuedAtTime}

      jwt_decode.mockImplementation(() => decodedToken)

      await act(async () => {
        await AsyncStorage.setItem(storageConstants.MOBILE_OKTA_AUTH, JSON.stringify(mockAuthState))
        const authState = await hookRender.current.updateRefreshToken()

        expect(AuthSession.refreshAsync).not.toHaveBeenCalled()
        expect(authState).toEqual(mockAuthState)
      })
    })

    it('should call refreshAsync when token expiry is 30 minutes past issued at ', async () => {
      const now = new Date()
      const issuedAtTime = new Date(now.getTime() + 500 * -6000).valueOf() / 1000
      const decodedToken = {iat: issuedAtTime}
      const newAuthState = {...mockAuthState, ...{accessToken: '1234'}}

      jwt_decode.mockImplementation(() => decodedToken)
      AuthSession.refreshAsync.mockImplementation(() => newAuthState)

      await act(async () => {
        await AsyncStorage.setItem(storageConstants.MOBILE_OKTA_AUTH, JSON.stringify(mockAuthState))
        const authState = await hookRender.current.updateRefreshToken()

        expect(authState).toEqual(newAuthState)
      })
    })
  })

  it('should return null if refresh errs', async () => {
    const now = new Date()
    const issuedAtTime = new Date(now.getTime() + 500 * -6000).valueOf() / 1000
    const decodedToken = {iat: issuedAtTime}

    jwt_decode.mockImplementation(() => decodedToken)
    AuthSession.refreshAsync.mockImplementation(() => {throw new Error('error')})

    await act(async () => {
      await AsyncStorage.setItem(storageConstants.MOBILE_OKTA_AUTH, JSON.stringify(mockAuthState))
      const authState = await hookRender.current.updateRefreshToken()

      expect(authState).toEqual(null)
    })
  })
})