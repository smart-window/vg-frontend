import { useMutation } from '@apollo/client'
import {documentStatuses, documentFileTypes,
  getDocTypeForMimeType, documentTypes} from 'web/constants/documentConstants'
import filesHelper from 'web/services/filesHelper'
import {SAVE_USER_DOCUMENT, SAVE_CLIENT_DOCUMENT} from 'web/apollo/mutations/documentMutations'

/**
 * This hook allows one to easily upload or update already saved files.
 * @param documentType type of document being uploaded, i.e. 'client'
 * @param document original document reference
 * @param file potential file for upload
 * @returns void
 * @category Hooks - Web
 * @module useUploadFile
 */
export default function useUploadFile(documentType) {
  const [saveDocument] = useMutation(documentType === documentTypes.CLIENT ? SAVE_CLIENT_DOCUMENT : SAVE_USER_DOCUMENT)

  async function uploadFile(document, file) {
    let success = true
    const {s3Upload, type} = document
    if (file) {
      success = await filesHelper.uploadToS3(s3Upload.presignedUrl, file)
    }
    if (success) {
      if (type !== documentFileTypes.TEMPLATE) {
        handleDocumentSave(document, file)
      }
    }
  }

  function handleDocumentSave(document, file) {
    const {id, s3Upload, originalFilename, originalMimeType} = document

    saveDocument({
      variables: {
        documentId: id,
        s3Key: s3Upload.s3Key,
        originalFilename: file ? file.name : originalFilename,
        originalMimeType: file ? file.type : originalMimeType,
        status: documentStatuses.COMPLETEDSTATUS,
        fileType: getDocTypeForMimeType(file.type)
      }
    })
  }

  return uploadFile
}