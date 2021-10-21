import { v4 as uuidv4 } from 'uuid'
import {useApolloClient } from '@apollo/client'
import {documentActions, documentTypes,
  getDocTypeForMimeType, documentStatuses} from 'web/constants/documentConstants'
import filesHelper from 'web/services/filesHelper'
import {CREATE_USER_DOCUMENTS, CREATE_CLIENT_DOCUMENTS} from 'web/apollo/mutations/documentMutations'
import {documentFieldsFragment} from 'web/apollo/fragments/documentFragments'

/**
 * This hook returns a function that creates multiple ad-hoc documents in our DB and uploads their files to S3.
 * @returns function bulkUpload - see below for docs
 * @category Hooks - Web
 * @module useUploadFile
 */
export default function useBulkUpload(documentType) {
  const apolloClient = useApolloClient()

  /**
   * @param {array} documents array of pseudo-document records with the following attributes:
   *  - name (string)
   *  - documentTemplateCategoryId (number)
   *  - file (File object)
   * @param {number} userId id of user to associate to new docs
   * @returns {array} newly created document records
   */
  async function bulkUserUpload(documents, userId) {
    const s3KeyToFile = new Map()
    const createDocumentsMutationData = documents.map(doc => {
      const {name, documentTemplateCategoryId, file} = doc
      const s3Key = uuidv4()
      s3KeyToFile.set(s3Key, file)
      return {
        action: documentActions.NOACTION,
        s3Key,
        name,
        documentTemplateCategoryId,
        originalFilename: file.name,
        originalMimeType: file.type,
        fileType: getDocTypeForMimeType(file.type),
        status: documentStatuses.COMPLETEDSTATUS
      }
    })

    // send document records to the server
    const {data: {createUserDocuments = []} = {}} = await apolloClient.mutate({
      mutation: CREATE_USER_DOCUMENTS,
      variables: {
        documents: createDocumentsMutationData,
        userId
      },
      update: updateUserDocumentsCache
    })

    // upload files to s3
    for (const createdDoc of createUserDocuments) {
      const correspondingFile = s3KeyToFile.get(createdDoc.s3Upload.s3Key)
      await filesHelper.uploadToS3(createdDoc.s3Upload.presignedUrl, correspondingFile)
    }
    return createUserDocuments
  }

  /**
   * @param {array} documents array of pseudo-document records with the following attributes:
   *  - name (string)
   *  - documentTemplateCategoryId (number)
   *  - file (File object)
   * @param {number} clientId id of client to associate to new docs
   * @returns {array} newly created document records
   */
  async function bulkClientUpload(documents, clientId) {
    const s3KeyToFile = new Map()
    const createDocumentsMutationData = documents.map(doc => {
      const {name, documentTemplateCategoryId, file} = doc
      const s3Key = uuidv4()
      s3KeyToFile.set(s3Key, file)
      return {
        action: 'upload', // TODO: is this the correct action?
        s3Key,
        name,
        documentTemplateCategoryId,
        originalFilename: file.name,
        originalMimeType: file.type,
        fileType: getDocTypeForMimeType(file.type)
      }
    })
    // send document records to the server
    const {data: {createClientDocuments = []} = {}} = await apolloClient.mutate({
      mutation: CREATE_CLIENT_DOCUMENTS,
      variables: {
        documents: createDocumentsMutationData,
        clientId
      },
      update: updateClientDocumentsCache
    })
    // upload files to s3
    for (const createdDoc of createClientDocuments) {
      const correspondingFile = s3KeyToFile.get(createdDoc.s3Upload.s3Key)
      await filesHelper.uploadToS3(createdDoc.s3Upload.presignedUrl, correspondingFile)
    }
    return createClientDocuments
  }

  return documentType === documentTypes.EMPLOYEE ? bulkUserUpload : bulkClientUpload
}

/** Apollo cache update to immediately update display */
function updateUserDocumentsCache(cache, { data: { createUserDocuments } }) {
  cache.modify({
    fields: {
      userDocuments(existingDocuments = []) {
        const newDocumentRefs = []
        for (const newDoc of createUserDocuments) {
          const newDocRef = cache.writeFragment({
            data: newDoc,
            fragment: documentFieldsFragment
          })
          newDocumentRefs.push(newDocRef)
        }
        return [...existingDocuments, ...newDocumentRefs]
      }
    }
  })
}

/** Apollo cache update to immediately update display */
function updateClientDocumentsCache(cache, { data: { createClientDocuments } }) {
  cache.modify({
    fields: {
      clientDocuments(existingDocuments = []) {
        const newDocumentRefs = []
        for (const newDoc of createClientDocuments) {
          const newDocRef = cache.writeFragment({
            data: newDoc,
            fragment: documentFieldsFragment
          })
          newDocumentRefs.push(newDocRef)
        }
        return [...existingDocuments, ...newDocumentRefs]
      }
    }
  })
}