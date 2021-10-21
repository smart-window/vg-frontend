import { gql } from '@apollo/client'

/**
 * This file consists of all fragments created on the Document typename.
 * @category Apollo - Web
 */

/**
 * These are the fields needed for updating document uploads and metadata.
 */
export const documentFieldsFragment = gql`
 fragment DocumentFields on Document {
   id
   name
   status
   mimeType
   fileType
   docusignTemplateId
   downloadUrl
   category
   action
   exampleFileUrl
   originalFilename
   originalMimeType
   url
   s3Upload {
     presignedUrl
     presignedDeleteUrl
     s3Key
   }
   documentTemplate {
     id
   }
 }
`
