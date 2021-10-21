import React, {useContext} from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import {mockedIsAuthenticatedValue} from 'test/mocks/okta.mock'
import {CurrentUserContext, CurrentUserProvider, CURRENT_USER_QUERY} from './CurrentUserProvider.web'
import { MockedProvider } from '@apollo/client/testing'

const mockPermissions = [
  { __typename: 'Permission', id: '1', slug: 'home' },
  { __typename: 'Permission', id: '2', slug: 'case-management'}
]

const currentUser = {
  permissions: mockPermissions,
  clientState: {foo: 'bar'}
}

export const currentUserMockData = {
  request: {
    query: CURRENT_USER_QUERY,
  },
  result: {
    data: currentUser,
  },
}

describe('CurrentUserProvider', () => {
  let hookRender

  // eslint-disable-next-line require-await
  beforeEach(async () => {
    mockedIsAuthenticatedValue.mockImplementation(() => true)

    const wrapper = ({children}) => (
      <MockedProvider mocks={[currentUserMockData]} addTypename={false}>
        <CurrentUserProvider>
          {children}
        </CurrentUserProvider>
      </MockedProvider>
    )
    const {result} = renderHook(
      () => useContext(CurrentUserContext),
      {wrapper}
    )
    hookRender = result
  })

  it('defaults permissions to an empty array', () => {
    expect(hookRender.current.permissions).toEqual([])
  })

  it('defaults clientState to an empty object', () => {
    expect(hookRender.current.clientState).toEqual({})
  })

  it('defaults currentUser to an empty object', () => {
    expect(hookRender.current.currentUser).toEqual({})
  })

  it('updates permissions and client state when setting user data', () => {
    act(() => {
      hookRender.current.setUserData(currentUser)
    })

    expect(hookRender.current.clientState.foo).toEqual('bar')
    expect(hookRender.current.permissions.length).toEqual(2)
  })

  it('clears permissions and client state when clearing user data', () => {
    act(() => {
      hookRender.current.setUserData(currentUser)
      hookRender.current.clearUserData()
    })

    expect(hookRender.current.permissions).toEqual([])
    expect(hookRender.current.clientState).toEqual({})
  })
})