import { gql } from '@apollo/client'
import {documentTemplateFieldsFragment} from 'web/apollo/fragments/documentTemplateFragments'

export const UPSERT_DOCUMENT_TEMPLATE = gql`
  mutation CreateDocumentTemplate(
    $id: ID
    $name: String
    $fileType: String
    $action: String
    $clientId: ID
    $partnerId: ID
    $countryId: ID
    $documentTemplateCategoryId: ID!
    $required: Boolean
    $exampleFileUrl: ID
    $exampleFilename: String
    $exampleFileMimeType: String
  ) {
    documentTemplate(
      id: $id
      name: $name
      fileType: $fileType
      action: $action
      clientId: $clientId
      partnerId: $partnerId
      countryId: $countryId
      documentTemplateCategoryId: $documentTemplateCategoryId
      required: $required
      exampleFileUrl: $exampleFileUrl
      exampleFilename: $exampleFilename
      exampleFileMimeType: $exampleFileMimeType
    ) {
      ...DocumentTemplateFields
    }
  }
  ${documentTemplateFieldsFragment}
`

export const DELETE_DOCUMENT_TEMPLATE = gql`
  mutation DeleteDocumentTemplate($id: ID!) {
    deleteDocumentTemplate(id: $id) {
      id
    }
  }
`
