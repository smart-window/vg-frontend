import { gql } from '@apollo/client'
import {documentFieldsFragment} from 'web/apollo/fragments/documentFragments'

// Update a single document
export const SAVE_USER_DOCUMENT = gql`
  mutation saveUserDocument(
    $documentId: ID!
    $s3Key: ID
    $originalFilename: String
    $originalMimeType: String
    $status: String
    $fileType: String
    $docusignTemplateId: String
  ) {
    saveUserDocument(
      documentId: $documentId
      s3Key: $s3Key
      originalFilename: $originalFilename
      originalMimeType: $originalMimeType
      status: $status
      fileType: $fileType
      docusignTemplateId: $docusignTemplateId
    ) {
      ...DocumentFields
    }
  },
  ${documentFieldsFragment}
`

// Update multiple Client documents
export const SAVE_USER_DOCUMENTS = gql`
  mutation saveUserDocuments($documents: [InputDocuments]!) {
    saveUserDocuments(documents: $documents) {
      ...DocumentFields
    }
  },
  ${documentFieldsFragment}
`

// Update multiple client documents
export const SAVE_CLIENT_DOCUMENTS = gql`
  mutation saveClientDocuments($documents: [InputDocuments]!) {
    saveClientDocuments(documents: $documents) {
      ...DocumentFields
    }
  },
  ${documentFieldsFragment}
`

// Create multiple user document records
export const CREATE_USER_DOCUMENTS = gql`
  mutation createUserDocuments($documents: [InputDocuments]!, $userId: ID!) {
    createUserDocuments(documents: $documents, userId: $userId) {
      ...DocumentFields
    }
  },
  ${documentFieldsFragment}
`

// Create multiple client document records
export const CREATE_CLIENT_DOCUMENTS = gql`
  mutation createClientDocuments($documents: [InputDocuments]!, $clientId: ID!) {
    createClientDocuments(documents: $documents, clientId: $clientId) {
      ...DocumentFields
    }
  },
  ${documentFieldsFragment}
`

export const DELETE_USER_S3_METADATA = gql`
  mutation DeleteUserS3Metadata($id: ID!, $status: String!) {
    deleteUserS3Metadata(id: $id, status: $status) {
      ...DocumentFields
    }
  },
  ${documentFieldsFragment}
`

export const SAVE_CLIENT_DOCUMENT = gql`
  mutation saveClientDocument(
    $documentId: ID!
    $s3Key: ID
    $originalFilename: String
    $originalMimeType: String
    $status: String
    $fileType: String
    $docusignTemplateId: String
  ) {
    saveClientDocument(
      documentId: $documentId
      s3Key: $s3Key
      originalFilename: $originalFilename
      originalMimeType: $originalMimeType
      status: $status
      fileType: $fileType
      docusignTemplateId: $docusignTemplateId
    ) {
      ...DocumentFields
    }
  },
  ${documentFieldsFragment}
`

export const DELETE_CLIENT_S3_METADATA = gql`
  mutation DeleteClientS3Metadata($id: ID!, $status: String!) {
    deleteClientS3Metadata(id: $id, status: $status) {
      ...DocumentFields
    }
  },
  ${documentFieldsFragment}
`

export const DELETE_USER_DOCUMENT = gql`
  mutation DeleteUserDocument($id: ID!) {
    deleteUserDocument(id: $id) {
      id
    }
  }
`

export const DELETE_CLIENT_DOCUMENT = gql`
  mutation DeleteClientDocument($id: ID!) {
    deleteClientDocument(id: $id) {
      id
    }
  }
`