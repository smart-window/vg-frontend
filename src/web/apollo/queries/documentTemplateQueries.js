import { gql } from '@apollo/client'
import {paginatedDocumentTemplates} from 'web/apollo/fragments/documentTemplateFragments'

export const GET_DOCUMENT_TEMPLATES = gql`
  query DocumentTemplatesReport(
    $pageSize: Int!
    $sortColumn: String!
    $sortDirection: String!
    $lastId: ID
    $lastValue: String
    $searchBy: String
    $filterBy: [FilterBy]
  ) {
    documentTemplatesReport(
      pageSize: $pageSize
      sortColumn: $sortColumn
      sortDirection: $sortDirection
      lastId: $lastId
      lastValue: $lastValue
      searchBy: $searchBy
      filterBy: $filterBy
    ) {
      ...DocumentTemplatesFragment
    }
  }
  ${paginatedDocumentTemplates}
`

export const DOCUMENT_TEMPLATE_QUERY = gql`
  query documentTemplate($id: ID!){
    documentTemplate(id: $id) {
      id
      name
      fileType
      action
      partnerId
      clientId
      countryId
      documentTemplateCategoryId
      exampleFileUrl
      exampleFilename
      exampleFileMimeType
      required
      s3Upload {
        s3Key
        presignedUrl
        presignedDeleteUrl
      }
    }
  }
`

export const GET_DOCUMENT_TEMPLATE_CATEGORIES_BY_TYPE_QUERY = gql`
  query DocumentTemplateCategoriesByType($type: String!){
    documentTemplateCategoriesByType(type: $type) {
      id
      slug
    }
  }
`