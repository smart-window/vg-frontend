import {useQuery, gql} from '@apollo/client'
import {documentFieldsFragment} from 'web/apollo/fragments/documentFragments'

export const GET_USER_DOCUMENTS_QUERY = gql`
  query UserDocuments($userId: ID!) {
    userDocuments(userId: $userId) {
      ...DocumentFields
    }
  },
  ${documentFieldsFragment}
`

export default function useGetUserDocumentsQuery(userId, apolloConfig) {
  const defaultConfig = {
    fetchPolicy: 'cache-first',
    variables: {userId}
  }
  const config = Object.assign(defaultConfig, apolloConfig)
  return useQuery(GET_USER_DOCUMENTS_QUERY, config)
}