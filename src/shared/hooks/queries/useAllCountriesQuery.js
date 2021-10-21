
import {useQuery, gql} from '@apollo/client'

export const COUNTRIES_QUERY = gql`
  query {
    countries {
      id
      name
      iso_alpha_2_code
    }
  }
`

export default function useAllCountriesQuery(apolloConfig) {
  const defaultConfig = {
    fetchPolicy: 'cache-first',
  }
  const config = Object.assign(defaultConfig, apolloConfig)
  return useQuery(COUNTRIES_QUERY, config)
}