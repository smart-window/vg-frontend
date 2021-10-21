import { useMutation } from '@apollo/client'
import filesHelper from 'web/services/filesHelper'
import {DELETE_USER_S3_METADATA, DELETE_CLIENT_S3_METADATA,
  DELETE_USER_DOCUMENT, DELETE_CLIENT_DOCUMENT} from 'web/apollo/mutations/documentMutations'
import {documentStatuses, documentTypes} from 'web/constants/documentConstants'

/**
 * This hook allows one to easily delete already saved files.
 * @param documentType type of document being deleted, i.e. 'client'
 * @param document original document reference
 * @returns void
 * @category Hooks - Web
 * @module useDeleteFile
 */
const typeToMutationMap = {
  deleteUpload: {
    [documentTypes.CLIENT]: DELETE_CLIENT_S3_METADATA,
    [documentTypes.EMPLOYEE]: DELETE_USER_S3_METADATA
  },
  delete: {
    [documentTypes.CLIENT]: DELETE_CLIENT_DOCUMENT,
    [documentTypes.EMPLOYEE]: DELETE_USER_DOCUMENT
  }
}

const typeToUpdateCacheMap = {
  [documentTypes.CLIENT]: updateClientDocumentsCache,
  [documentTypes.EMPLOYEE]: updateUserDocumentsCache
}

export default function useDeleteFile(documentType) {
  const [deleteUpload] = useMutation(typeToMutationMap.deleteUpload[documentType])
  const [deleteDocument] = useMutation(typeToMutationMap.delete[documentType], {
    update: typeToUpdateCacheMap[documentType]
  })

  async function deleteFile(document) {
    const {id, s3Upload, documentTemplate} = document
    const success = await filesHelper.deleteFromS3(s3Upload.presignedDeleteUrl)
    if (success && documentTemplate?.id) {
      deleteUpload({
        variables: {
          id,
          status: documentStatuses.NOTSTARTEDSTATUS
        }
      })
    }
    else if (success) {
      deleteDocument({
        variables: {
          id
        }
      })
    }
  }
  return deleteFile
}

/** Apollo cache update to immediately update display on user document delete */
function updateUserDocumentsCache(cache, { data: { deleteUserDocument } }) {
  cache.modify({
    fields: {
      userDocuments(existingDocuments = []) {
        const updatedDocuments = existingDocuments.filter((r) => {
          const id = r.__ref.split(':')[1]
          return id !== deleteUserDocument.id
        })
        return [...updatedDocuments]
      },
      currentUserDocuments(existingDocuments = []) {
        const updatedDocuments = existingDocuments.filter((r) => {
          const id = r.__ref.split(':')[1]
          return id !== deleteUserDocument.id
        })
        return [...updatedDocuments]
      }
    }
  })
}

/** Apollo cache update to immediately update display on client document delete */
function updateClientDocumentsCache(cache, { data: { deleteClientDocument } }) {
  cache.modify({
    fields: {
      clientDocuments(existingDocuments = []) {
        const updatedDocuments = existingDocuments.filter((r) => {
          const id = r.__ref.split(':')[1]
          return id !== deleteClientDocument.id
        })
        return [...updatedDocuments]
      }
    }
  })
}