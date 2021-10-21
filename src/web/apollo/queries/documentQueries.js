import { gql } from '@apollo/client'
import {documentFieldsFragment} from 'web/apollo/fragments/documentFragments'

export const GET_CURRENT_USER_DOCUMENTS_QUERY = gql`
  query CurrentUserDocuments {
    currentUserDocuments {
      ...DocumentFields
    }
  },
  ${documentFieldsFragment}
`

export const DOCUSIGN_SIGNING_URL_QUERY = gql`
  query DocusignSigningUrl($documentId: ID!, $redirectUri: String!) {
    docusignSigningUrl(
      documentId: $documentId,
      redirectUri: $redirectUri
    )
  }
`

export const DOCUSIGN_VIEW_URL_QUERY = gql`
  query DocusignRecipientViewUrl($documentId: ID!, $redirectUri: String!) {
    docusignRecipientViewUrl(
      documentId: $documentId,
      redirectUri: $redirectUri
    )
  }
`