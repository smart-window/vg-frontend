
import {useQuery, gql} from '@apollo/client'

export const FORMS_QUERY = gql`
  query Forms(
    $formSlugs: [ID]!,
    $userId: ID!
  ) {
    formsBySlugForUser(formSlugs: $formSlugs, userId: $userId) {
      id
      slug
      formFields {
        id
        slug
        optional
        config
        type
        value
        sourceTableField
      }
    }
  }
`

export default function useFormsGenericUserQuery(formSlugs, userId, apolloConfig) {
  const defaultConfig = {
    fetchPolicy: 'cache-first',
    variables: {
      formSlugs,
      userId
    }
  }
  const config = Object.assign(defaultConfig, apolloConfig)
  return useQuery(FORMS_QUERY, config)
}