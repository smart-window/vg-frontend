import {useQuery, gql} from '@apollo/client'
import {documentFieldsFragment} from 'web/apollo/fragments/documentFragments'

export const GET_CLIENT_DOCUMENTS_QUERY = gql`
  query ClientDocuments($clientId: ID!) {
    clientDocuments(clientId: $clientId) {
      ...DocumentFields
    }
  },
  ${documentFieldsFragment}
`

export default function useGetClientDocumentsQuery(clientId, apolloConfig) {
  const defaultConfig = {
    fetchPolicy: 'cache-first',
    variables: {clientId}
  }

  const config = Object.assign(defaultConfig, apolloConfig)
  return useQuery(GET_CLIENT_DOCUMENTS_QUERY, config)
}