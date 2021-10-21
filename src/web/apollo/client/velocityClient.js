import apolloCacheConfig from 'web/config/apolloConfig'
import {ApolloClient, createHttpLink, split, from} from '@apollo/client'
import {onError} from 'apollo-link-error'
import {getMainDefinition} from '@apollo/client/utilities'
import * as AbsintheSocket from '@absinthe/socket'
import createAbsintheSocketLink from './createAbsintheSocketLink'
import {Socket as PhoenixSocket} from 'phoenix'
import {setContext} from '@apollo/client/link/context'
import oktaService from 'web/services/oktaService'
import {routes} from 'web/constants/routeConstants'
import logService from 'web/services/logService'

/**
 * Apollo client for web. Creates the HTTP and Absinthe Socket Links with
 * authentication and connects them to the client for web.
 * @category Apollo - Web
 * @module velocityClient
 *
 * TODO: this should be in /shared so we can get rid of the client code duplication in MobileApp.js
 */
function createClient(history) {
  /**
   *  HTTP Link
   */
  const API = process.env.REACT_APP_API_HOST
    ? process.env.REACT_APP_API_HOST + '/graphql'
    : 'http://localhost:4000/graphql'
  const httpLink = createHttpLink({
    uri: API
  })
  const WEBSOCKET_URI =
    process.env.REACT_APP_WEBSOCKET_URI || 'ws://localhost:4000/socket'

  /**
   * Absinth Socket Link
   */
  const phoenixSocket = new PhoenixSocket(WEBSOCKET_URI, {
    params: () => {
      return { token: oktaService.getBearerToken() }
    }
  })

  /**
   *  Error Link
   */
  const errorLink = onError(({ networkError, graphQLErrors, response }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        logService.handleError(message, path?.[0], locations?.[0]?.line, locations?.[0]?.column)
      })
    }
    if (networkError) {
      // On a 400 or 500 error, redirect user to a full screen error page
      if (parseInt(networkError.statusCode) >= 400) {
        history.push({
          pathname: routes.FULL_PAGE_ERROR,
          state: {
            statusCode: networkError.statusCode,
            errorMessage: networkError.message
          }
        })
      }
      logService.handleError(null, null, null, null, networkError)
    }
  })

  const absintheSocket = AbsintheSocket.create(phoenixSocket)
  const socketLink = createAbsintheSocketLink(absintheSocket)

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    socketLink,
    from([errorLink, httpLink])
  )

  /**
   * Auth Link
   */
  const authLink = setContext((_, { headers }) => {
    const bearerToken = oktaService.getBearerToken()
    return {
      headers: {
        ...headers,
        authorization: bearerToken
      }
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(splitLink),
    cache: apolloCacheConfig.inMemoryCache
  })

  return client
}

export default createClient
