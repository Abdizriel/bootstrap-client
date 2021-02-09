import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  from as fromLink,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { setContext } from '@apollo/client/link/context'
import isNil from 'lodash/isNil'

import config from 'config'

const OPTS = {
  uri: config.graphqlUrl,
}

const httpLink = new BatchHttpLink(OPTS)

/**
 * Apollo Error link
 * To reauthenticate
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.log(`[GraphQL error]: ${err}`)
    }
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const authMiddleware = setContext(async (_req, { headers }) => {
  // Add tokken grabber
  const token = null

  return {
    headers: {
      ...headers,
      authorization: !isNil(token) ? token : '',
    },
  }
})

const stripTypenamesFromVariablesLink = new ApolloLink((operation, forward) => {
  if (operation.variables.hasOwnProperty('file')) return forward(operation)

  if (operation.variables) {
    const omitTypename = (key: string, value: any) =>
      key === '__typename' ? undefined : value
    // eslint-disable-next-line no-param-reassign
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename,
    )
  }
  return forward(operation)
})

const client = new ApolloClient({
  link: fromLink([
    errorLink,
    authMiddleware,
    stripTypenamesFromVariablesLink,
    httpLink,
  ]),
  cache: new InMemoryCache(),
  assumeImmutableResults: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
})

export default client
