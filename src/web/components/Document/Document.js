import React, { useRef, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'
import modalConstants from 'web/constants/modalConstants'
import useFileState from 'web/hooks/useFileState'
import documentConstants from 'web/constants/documentConstants'
import {getIconForDocType} from 'web/services/documentIconHelper.js'
import DownloadIcon from 'web/components/DynamicIcons/DownloadIcon'
import ProgressIndicator from 'web/components/ProgressIndicator/ProgressIndicator'
import CurvedUpOrDownloadIcon from 'web/components/DynamicIcons/CurvedUpOrDownloadIcon'
import DocusignButton from 'web/components/DocusignButton/DocusignButton'
import trashIcon from 'assets/images/icons/trashIcon.svg'
import DragDrop from 'web/components/DragDrop/DragDrop'
import filesHelper from 'web/services/filesHelper'
import VgInput from 'web/modules/VgInput/VgInput'

import {
  ArticleContainer,
  DivWidget,
  DivDocInfo,
  DivDocHeader,
  DivTitleInfo,
  H3UploadTitle,
  PDocInfo,
  DivDocInstructions,
  PSignedInstructions,
  DivIconsWrapper,
  DivDownloadComplete,
  InputFileHidden,
  ADownloadHidden
} from './Document.styles'

Document.propTypes = {
  /** If true, the user will be able to sign contracts through docusign */
  canSign: PropTypes.bool,
  /** The path to download the document */
  document: PropTypes.object.isRequired,
  /** Number of allowed uploads, defaults to 1 */
  allowedUploadCount: PropTypes.number,
  /**
   * Callback to parent on document change
   *   params: (document)
   */
  handleDocumentChange: PropTypes.func,
  /**
   * Callback to parent on document delete
   *   params: (document, file)
   */
  handleDocumentDelete: PropTypes.func
}

Document.defaultProps = {
  allowedUploadCount: 1,
  saveDocument: () => {},
  deleteFile: () => {},
  uploadFile: () => {},
  handleDocumentChange: () => {},
  handleDocumentDelete: () => {},
}

const {documentFileTypes, documentStatuses, documentActions} = documentConstants

/**
 * A reusable component to download and upload documents
 * @category Components - Web
 * @namespace Document
 */
export default function Document({
  canSign,
  document,
  allowedUploadCount,
  saveDocument,
  deleteFile,
  uploadFile,
  handleDocumentChange,
  handleDocumentDelete
}) {
  const {showModal} = useContext(GlobalModalContext)
  const aDownloadTag = useRef(null)
  const fileInputField = useRef(null)
  const [files, setFiles, isLoadingFile, setIsLoadingFile] = useFileState()

  const {name, downloadUrl, status, category,
    fileType, action, exampleFileUrl, originalFilename, documentTemplate} = document
  const isCompleted = status === documentStatuses.COMPLETEDSTATUS
  const downloadOnly = action === documentActions.DOWNLOADACTION
  const isContract = action === documentActions.SIGNACTION
  const actionisUpload = action === documentActions.UPLOADACTION
  const type = isContract ? documentFileTypes.CONTRACT : fileType || documentFileTypes.TEMPLATE
  const FileIcon = getIconForDocType(type)
  const requiredFileExtensions = documentConstants.docTypeToFileExtensions[type]

  /**
   * Displays the error modal on document upload error
   * @param {string} errorTitle title of error
   * @param {string} message message of error
   */
  function showErrorModal(errorTitle, message) {
    showModal(modalConstants.ERROR_MODAL, {
      errorTitle,
      message
    })
  }

  /** A function passed to this components children, facilitates click of the input element */
  function handleFileUpload() {
    if (fileInputField) fileInputField.current.click()
  }

  /**
   * Saves new files in state, or shows error modal if error in upload
   * @param {array} newFiles array of files returned from upload event
   */
  async function handleNewFileUpload(newFiles) {
    setIsLoadingFile(true)
    const errorObject = filesHelper.validateFilesForUpload(newFiles, allowedUploadCount, requiredFileExtensions)
    if (errorObject) {
      showErrorModal(errorObject.errorTitle, errorObject.message)
    }
    else {
      setFiles(newFiles)
      await uploadFile(document, newFiles[0])
      handleDocumentChange(document, newFiles[0])
    }
    setIsLoadingFile(false)
  }

  /**
   * Downloads an s3 path
   * @param {Event} e event, unused
   * @param {string} downloadPath s3 download path
   */
  async function handleFileDownload(e, downloadPath=downloadUrl) {
    if (downloadOnly && !isCompleted) {
      await saveDocument({
        variables: {
          documentId: document.id,
          status: documentStatuses.COMPLETEDSTATUS
        }
      })
      handleDocumentChange(document)
    }
    if (downloadPath) filesHelper.downloadFile(downloadPath, aDownloadTag)
  }

  /** Downloads a the first file in state */
  function handleUploadedFileDownload() {
    filesHelper.downloadBlob(files[0], files[0].name, aDownloadTag)
  }

  /**
   * Clears stored files in state and deletes the upload reference of a document
   */
  function handleDeleteUpload() {
    setFiles([])
    deleteFile(document)
    handleDocumentDelete(document)
    fileInputField.current.value = null
  }

  function showDeleteConfirmationModal() {
    showModal(modalConstants.CONFIRMATION_MODAL, {
      title: 'Confirm Document Deletion',
      message: `Are you sure you want to delete ${originalFilename}?`,
      submitButtonText: 'Delete Document',
      onSubmit: handleDeleteUpload
    })
  }

  // TODO: just for qa, remove before release
  const [docusignTemplateId, setDocusignTemplateId] = useState(document.docusignTemplateId)
  function updateDocTemplate() {
    saveDocument({
      variables: {
        documentId: document.id,
        docusignTemplateId: docusignTemplateId,
        status: documentStatuses.NOTSTARTEDSTATUS
      }
    })
  }

  /**
   * Builds document instructions per doc type and upload status
   * @returns JSX elements with corresponding instructions
   */
  function buildInstructions() {
    if (isContract) {
      return isCompleted ?
        <DivDownloadComplete><p>Signed!</p></DivDownloadComplete>
        : <PSignedInstructions>Not Signed</PSignedInstructions>
    }
    else if ((actionisUpload && (isCompleted || isLoadingFile)) || !documentTemplate?.id) {
      return (
        <DivIconsWrapper>
          {
            !!documentTemplate &&
            <span role='button' onClick={handleFileUpload}>
              <CurvedUpOrDownloadIcon isUpload={true}/>
            </span>
          }
          <img
            role='button'
            alt='Remove uploaded file'
            src={trashIcon}
            onClick={showDeleteConfirmationModal}
          />
        </DivIconsWrapper>
      )
    }
    else if (downloadOnly && isCompleted) {
      return (
        <DivDownloadComplete>
          <p>Downloaded</p>
          <span role='link' onClick={handleFileDownload}>Need to download again?</span>
        </DivDownloadComplete>
      )
    }
    else {
      return (
        <>
          <div>
            { (exampleFileUrl && actionisUpload) && <h3>Download, fill, sign, and upload</h3>}
            { downloadOnly ? <p>Download document</p>: <p>Drag here to upload or <span role='link' onClick={handleFileUpload}>browse your files</span></p> }
          </div>
          <span role='button' onClick={downloadOnly ? handleFileDownload : handleFileUpload}>
            <CurvedUpOrDownloadIcon isUpload={actionisUpload}/>
          </span>
        </>
      )
    }
  }

  /**
   * Builds the appropriate subcaption per doc type and upload status
   * @returns Subcaption for document component with required type or upload name
   */
  function buildSubcaption() {
    const displayFileName = originalFilename || (files[0] && files[0].name)
    let subcaption = type === documentFileTypes.TEMPLATE ? category : `${requiredFileExtensions.join(', ')} ·  ${category}`
    if (displayFileName) subcaption = (
      <>
        <span role='link' onClick={originalFilename ? handleFileDownload : handleUploadedFileDownload}>
          {displayFileName}
        </span>
        {` ·  ${category}`}
      </>
    )
    return <PDocInfo includeTopMargin={!displayFileName}>{subcaption}</PDocInfo>
  }

  const hasDocusignButton = isContract && (isCompleted || canSign)
  const documentUpload = (
    <>
      <ArticleContainer>
        <DivWidget hasUploadIndicator={!(isCompleted || downloadOnly)}>
          <DivDocInfo>
            <FileIcon />
            <DivDocHeader>
              <DivTitleInfo role='button' onClick={(e) => handleFileDownload(e, exampleFileUrl)}>
                <H3UploadTitle hasDownloadIndicator={exampleFileUrl}>{name}</H3UploadTitle>
                { exampleFileUrl && <DownloadIcon includeBottomLine={true}/>}
              </DivTitleInfo>
              {
                (isLoadingFile || isCompleted) && actionisUpload &&
                <ProgressIndicator progress={isCompleted ? 100 : 70} text={isCompleted ? 'Uploaded' : 'Uploading'} />
              }
              { buildSubcaption() }
            </DivDocHeader>
          </DivDocInfo>
          <DivDocInstructions>
            { buildInstructions() }
          </DivDocInstructions>
        </DivWidget>
        {
          hasDocusignButton &&
          <DocusignButton document={document}/>
        }
      </ArticleContainer>
      <InputFileHidden
        type='file'
        ref={fileInputField}
        accept={requiredFileExtensions.length ? requiredFileExtensions.join(', ') : null}
        onChange={(e) => handleNewFileUpload(e.target.files)}
      />
      {
        canSign && isContract &&
        <VgInput label='docusign template id' value={docusignTemplateId} onBlur={updateDocTemplate} onChange={setDocusignTemplateId}/>
      }
      <ADownloadHidden ref={aDownloadTag} />
    </>
  )

  return downloadOnly ? documentUpload :
    <DragDrop handleFileUpload={handleNewFileUpload}>{documentUpload}</DragDrop>
}