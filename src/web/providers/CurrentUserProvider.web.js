import React, { useEffect, useState } from 'react'
import { useOktaAuth } from '@okta/okta-react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      id
      preferredFirstName
      firstName
      lastName
      fullName
      clientState
      permissions {
        id
        slug
      }
    }
  }
`

const SET_CLIENT_STATE_QUERY = gql`
  mutation SetClientState($clientState: Json!) {
    setClientState(clientState: $clientState) {
      id
      firstName
      lastName
      clientState
    }
  }
`

export const CurrentUserContext = React.createContext({
  clientState: {},
  permissions: [],
  currentUser: {},
  setUserData: () => {},
  clearUserData: () => {},
  updateClientState: () => {}
})

/**
 * Provider for top-level User Context.
 * Fetches current user's data and sets on context state
 * @category Providers - Web
 * @module CurrentUserProvider
 */
export function CurrentUserProvider(props) {
  const { authState } = useOktaAuth()
  const [userDataLoading, setUserDataLoading] = useState(true)
  const [clientState, setClientState] = useState({})
  const [permissions, setPermissions] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  // TODO this works, but has overlap with the Home.js componenet

  const [getPermissions] = useLazyQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: ({ currentUser }) => {
      // TODO: if they have no permissions they get into a bad state
      setUserDataLoading(false)
      setUserData(currentUser)
    },
    onError: (error) => {
      // TODO: if this request fails what should we do?
    }
  })

  const [saveClientState] = useMutation(SET_CLIENT_STATE_QUERY)

  useEffect(() => {
    if (authState?.isAuthenticated === false) return
    // get permissions when authState?.isAuthenticated changes to true
    getPermissions()
  }, [authState?.isAuthenticated])

  /**
   * Updates the context state with the latest data.
   * @param {object} user should have permissions and clientState set
   */
  function setUserData(user) {
    setCurrentUser(user)
    setPermissions(user?.permissions || {})
    setClientState(user?.clientState || {})
  }

  /** Clears all user data from the context */
  function clearUserData() {
    setPermissions([])
    setCurrentUser({})
    setClientState({})
  }

  /**
   * Updates context with new client state and stores on the backend.
   * @param {object} newClientState JSON-safe state for the current user
   */
  function updateClientState(newClientState) {
    setClientState(newClientState)
    const currentUserClone = {...currentUser}
    currentUserClone.clientState = newClientState
    setCurrentUser(currentUserClone)
    saveClientState({
      variables: {
        clientState: JSON.stringify(newClientState)
      }
    })
  }

  return (
    <CurrentUserContext.Provider
      value={{
        clientState,
        currentUser,
        permissions,
        userDataLoading,
        clearUserData,
        setUserData,
        updateClientState
      }}
    >
      {props.children}
    </CurrentUserContext.Provider>
  )
}
