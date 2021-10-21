
import {useQuery, gql} from '@apollo/client'

export const EEWW_FORMS_QUERY = gql`
query EEWWForms($formSlugs: [ID]!) {
  formsBySlugForCurrentUser(formSlugs: $formSlugs) {
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

export default function useFormsCurrentUserQuery(formSlugs, apolloConfig) {
  const defaultConfig = {
    fetchPolicy: 'cache-first',
    variables: {formSlugs: formSlugs}
  }
  const config = Object.assign(defaultConfig, apolloConfig)
  return useQuery(EEWW_FORMS_QUERY, config)
}