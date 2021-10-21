import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import {CurrentUserProvider} from 'mobile/providers/CurrentUserProvider.mobile'
import Login from './Login'
import { useAuthRequest, useAutoDiscovery } from 'expo-auth-session'

describe('Login', () => {
  const promptAsync = jest.fn()
  useAutoDiscovery.mockImplementation(() => {
    return jest.fn()
  })
  useAuthRequest.mockImplementation(() => {
    return [
      {},
      {},
      promptAsync
    ]
  })

  it('Renders a background image and a white Velocity Global logo', () => {
    const { getByTestId, getByLabelText } = render(
      <CurrentUserProvider>
        <Login />
      </CurrentUserProvider>
    )
    const velocityGlobalLogo = getByLabelText('Velocity Global full logo')

    expect(velocityGlobalLogo).toBeDefined()
    expect(getByTestId('ImageBackdrop')).toBeDefined()
  })

  it('Renders a sign in button and a powered by Okta indicator', () => {
    const { getByText } = render(<Login/>)

    expect(getByText('Sign In')).toBeDefined()
    expect(getByText('Powered by Okta')).toBeDefined()
  })

  it('Signs a user in on the sign in button click', () => {
    const { getByText } = render(
      <CurrentUserProvider>
        <Login />
      </CurrentUserProvider>
    )

    const signInButton = getByText('Sign In')
    fireEvent.press(signInButton)

    expect(promptAsync).toHaveBeenCalled()
  })

  it('Displays an error message on sign in failure', async () => {
    useAuthRequest.mockImplementation(() => {
      return [
        {},
        {type: 'error'},
        promptAsync
      ]
    })
    const { getByText } = render(<Login/>)

    const signInButton = getByText('Sign In')

    fireEvent.press(signInButton)

    const error = await waitFor(() => getByText('Something went wrong, please try again'))
    expect(error).toBeDefined()
  })
})