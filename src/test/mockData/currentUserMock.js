import {USER_QUERY} from 'mobile/components/UserDetails/UserDetails'
import {EDIT_USER_LANGUAGE_MUTATION} from 'mobile/screens/Settings/Settings'

export const currentUserMockData = {
  request: {
    query: USER_QUERY,
  },
  result: {
    data: {
      currentUser: {
        firstName: 'Nancy',
        lastName: 'Drew',
        birthDate: '1960-10-05',
        nationality: {
          id: 1,
          isoCode: 'US'
        }
      }
    },
  },
}

export const erredCurrentUserMockData = {
  request: {
    query: USER_QUERY,
  },
  error: new Error('Server not found')
}

export const mutateCurrentUserLanguageMock = {
  request: {
    query: EDIT_USER_LANGUAGE_MUTATION,
  },
  result: {
    data: {
      currentUser: {
        firstName: 'Nancy',
        lastName: 'Drew',
        birthDate: '1960-10-05',
        nationality: {
          id: 1,
          isoCode: 'US'
        },
        settings: {
          language: 'es'
        }
      }
    }
  }
}