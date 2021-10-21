import { gql } from '@apollo/client'

/**
 * This file consists of all fragments created on the DocumentTemplate typename.
 * @category Apollo - Web
 */

export const documentTemplateFieldsFragment = gql`
  fragment DocumentTemplateFields on DocumentTemplate {
    id
    name
    exampleFileMimeType
    action
    instructions
    exampleFileUrl
    documentTemplateCategory {
      id
      name
    }
    client {
      id
      name
    }
    country {
      id
      name
    }
  }
`

export const paginatedDocumentTemplates = gql`
  fragment DocumentTemplatesFragment on PaginatedDocumentTemplatesReport {
    row_count
    documentTemplates {
      id
      name
      fileType
      action
      partnerName
      partnerId
      clientName
      clientId
      countryIsoThree
      countryName
      countryId
      documentTemplateCategoryName
      documentTemplateCategoryId
      exampleFileUrl
      exampleFilename
      exampleFileMimeType
      required
      requiredString
    }
  }
`