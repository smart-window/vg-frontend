import { ApolloLink } from '@apollo/client/link/core'
import { send, toObservable, unobserveOrCancel } from '@absinthe/socket'
import { compose } from 'flow-static-land/lib/Fun'
import { print } from 'graphql'

/**
 * This code has been extracted from the @absinth/socket-apollo-link package
 * in order make it compatible with apollo client v3. When that package gets
 * updated this file should be removed in favor of using that package.
 *
 * Creates a terminating ApolloLink to request operations using given
 * AbsintheSocket instance
 * @param {PhoenixSocket} absintheSocket
 * @param {function} onError
 * @param {function} onStart
 * @returns {ApolloLink}
 * @category Apollo - Web
 * @module createAbsintheSocketLink
 *
 * TODO: move this to /shared so we can use it on mobile
 */
export default function createAbsintheSocketLink(
  absintheSocket,
  onError,
  onStart
) {
  return new ApolloLink(
    compose(
      notifierToObservable(absintheSocket, onError, onStart),
      (request) => send(absintheSocket, request),
      getRequest
    )
  )
}

function unobserveOrCancelIfNeeded(absintheSocket, notifier, observer) {
  if (notifier && observer) {
    unobserveOrCancel(absintheSocket, notifier, observer)
  }
}

function notifierToObservable(absintheSocket, onError, onStart) {
  return function (notifier) {
    return toObservable(absintheSocket, notifier, {
      onError,
      onStart,
      unsubscribe: unobserveOrCancelIfNeeded
    })
  }
}

function getRequest({ query, variables }) {
  return {
    operation: print(query),
    variables
  }
}
