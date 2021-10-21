import React from 'react'
import renderWithSafeAreaProvider from 'test/mocks/safeAreaInsert.mock.js'
import Profile from './Profile'

import { MockedProvider } from '@apollo/client/testing'
import { currentUserMockData } from 'test/mockData/currentUserMock'

describe('Profile', () => {
  let mocks

  beforeEach(() => {
    mocks = [currentUserMockData]
  })

  it('Renders the Backdrop, Nav and UserDetails components', () => {
    const { getByTestId } = renderWithSafeAreaProvider(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Profile/>
      </MockedProvider>
    )

    expect(getByTestId('BackdropWrapper')).toBeDefined()
    expect(getByTestId('UserDetails')).toBeDefined()
  })
})