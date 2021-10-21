import React, {useState, useRef} from 'react'
import {PropTypes} from 'prop-types'
import { useQuery } from '@apollo/client'
import CurvedUpOrDownloadIcon from 'web/components/DynamicIcons/CurvedUpOrDownloadIcon'
import blurredEmptyStatePng from 'assets/images/blurred-add-documents.png'
import LightBulbIcon from 'web/components/DynamicIcons/LightBulbIcon'
import GenericLargeModal from 'web/components/modals/GenericLargeModal/GenericLargeModal'
import DragDrop from 'web/components/DragDrop/DragDrop'
import AdHocDocument from 'web/components/AdHocDocument/AdHocDocument'
import filesHelper from 'web/services/filesHelper'
import {GET_DOCUMENT_TEMPLATE_CATEGORIES_BY_TYPE_QUERY} from 'web/apollo/queries/documentTemplateQueries'
import ScrollFade from 'web/components/ScrollFade/ScrollFade'

import {
  DivModalInside,
  ArticleDragArea,
  DivDragContents,
  DivIconWrapper,
  SpanBold,
  SpanUnderline,
  DivEmptyState,
  InputFileHidden,
  DivDocsContainer,
  PErrorText
} from './AddDocumentsModal.styles'

AddDocumentsModal.propTypes = {
  /** document type, i.e. 'client' */
  type: PropTypes.string.isRequired,
  /** called with selected files when the user clicks submit */
  handleUploadDocuments: PropTypes.func,
}

const MAX_FILE_SIZES_SUM_IN_BYTES = 100000000 // 100MB

/**
 * A modal to allow ad hoc documents to be created.
 * @category Components - Web
 * @namespace AddDocumentsModal
 */
export default function AddDocumentsModal({
  type,
  handleUploadDocuments
}) {
  const [documents, setDocuments] = useState([])
  const {data: {documentTemplateCategoriesByType = []} = {}} = useQuery(GET_DOCUMENT_TEMPLATE_CATEGORIES_BY_TYPE_QUERY,
    {
      variables: {
        type
      }
    })
  const [error, setError] = useState(null)
  const [totalFileSize, setTotalFileSize] = useState(0)
  const fileInputField = useRef(null)
  const isAddButtonActive = doDocumentsHaveAllInfo()

  /**
   * Saves a new document in state when the document is modified
   * @param {object} document modified document
   * @param {number} index index of document in state
   */
  function onDocumentChange(document, index) {
    const newDocs = [...documents]
    newDocs.splice(index, 1, document)
    setDocuments(newDocs)
  }

  /**
   * Deletes a document in state
   * @param {number} index index of document in state
   */
  function onDocumentDelete(index) {
    const newDocs = [...documents]
    const docToDelete = newDocs.splice(index, 1)
    setDocuments(newDocs)
    setTotalFileSize(totalFileSize - docToDelete[0].file.size)
  }

  /** Fires a click on the hidden input to trigger browser file chooser */
  function onUploadFileClick() {
    if (fileInputField) fileInputField.current.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    )
  }

  /**
   * Validates files for upload and saves them in state
   * @param {FileList} newFiles collection of files user chose to upload
   */
  function handleNewFileUpload(newFiles) {
    const errorObject = filesHelper.validateFilesForUpload(newFiles)
    const filesExceedMaxSize = handleFileSizeSummation(newFiles)
    if (errorObject || filesExceedMaxSize) {
      setError(errorObject || filesExceedMaxSize)
    }
    else {
      const formattedDocs = formatNewFilesAsDocuments(newFiles)
      const docsToSave = [...documents, ...formattedDocs]
      setDocuments(docsToSave)
    }
    fileInputField.current.value = null
  }

  /**
   * Formats the selected files to upload into a state object
   * @param {FileList} newFiles collection of files user chose to upload
   * @returns array of file objects, i.e.: {name: 'name', documentTemplateCategoryId: null, file: File}
   */
  function formatNewFilesAsDocuments(newFiles) {
    const formattedFiles = []
    for (let i = 0; i < newFiles.length; i++) {
      formattedFiles.push(
        {
          name: filesHelper.getFileNameWithoutExtension(newFiles[i].name),
          documentTemplateCategoryId: null,
          file: newFiles[i]
        }
      )
    }
    return formattedFiles
  }

  /**
   * Calculates the total size of uploaded files and determines if error should display
   * @param {FileList} newFiles list of files to add
   * @returns errorObject
   */
  function handleFileSizeSummation(newFiles) {
    let sumOfNewFiles = 0
    for (let i = 0; i < newFiles.length; i++) {
      sumOfNewFiles += newFiles[i].size
    }
    if (totalFileSize + sumOfNewFiles > MAX_FILE_SIZES_SUM_IN_BYTES) {
      return {
        errorTitle: 'Document Upload Size Limit Exceeded',
        message: `The last document you uploaded exceeded the maximum upload file size and could not be added.`
      }
    }
    setTotalFileSize(totalFileSize + sumOfNewFiles)
  }

  /** Determines if all documents contain required information required to save */
  function doDocumentsHaveAllInfo() {
    const fileWithoutInfo = documents.find(file => !file.name || !file.documentTemplateCategoryId)
    return !!(!fileWithoutInfo || !documents.length)
  }

  const documentsForUpload = documents.map((document, index) => {
    return (
      <AdHocDocument
        key={index}
        document={document}
        documentTemplateCategories={documentTemplateCategoriesByType}
        handleDocumentChange={(document) => onDocumentChange(document, index)}
        handleDocumentDelete={() => onDocumentDelete(index)}
      />
    )
  })

  return (
    <GenericLargeModal
      title={'ADD AD-HOC DOCUMENTS'}
      subtitle={`${type.toUpperCase()} DOCUMENTS`}
      icon={<DocsIcon />}
      applyButtonText='Add Documents'
      onSubmit={() => handleUploadDocuments(documents)}
      isApplyActive={isAddButtonActive}
      error={error}
      onErrorApply={() => setError(null)}
    >
      <DivModalInside>
        {
          !error &&
          <ArticleDragArea>
            <DragDrop handleFileUpload={handleNewFileUpload}>
              <DivDragContents>
                <div>
                  <p><SpanBold>Upload one or more documents</SpanBold></p>
                  <p>Drag here to upload or <SpanUnderline role='link' onClick={onUploadFileClick}>browse your files</SpanUnderline></p>
                </div>
                <DivIconWrapper onClick={onUploadFileClick}>
                  <CurvedUpOrDownloadIcon isUpload={true}/>
                </DivIconWrapper>
              </DivDragContents>
            </DragDrop>
          </ArticleDragArea>
        }
        {
          !documents.length && !error &&
            <DivEmptyState>
              <img src={blurredEmptyStatePng} alt='Blurred documents indicating no documents uploaded' />
              <div>
                <LightBulbIcon />
                <p>Upload one or more documents to see them here</p>
              </div>
            </DivEmptyState>
        }
        { !!documents.length && !error &&
            <DivDocsContainer>
              <ScrollFade>
                {documentsForUpload}
              </ScrollFade>
            </DivDocsContainer>
        }
        {
          error &&
          <PErrorText>{error.message}</PErrorText>
        }
        <InputFileHidden
          type='file'
          ref={fileInputField}
          onChange={(e) => handleNewFileUpload(e.target.files)}
          multiple='multiple'
        />
      </DivModalInside>
    </GenericLargeModal>
  )
}

function DocsIcon() {
  return (
    <svg width='34' height='34' viewBox='0 0 34 34' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path fillRule='evenodd' clipRule='evenodd' d='M3.30566 29.8511V5.66026L9.24287 0.472168H27.3036L27.5409 0.554321L27.7782 0.67755L27.9775 0.840828L28.1351 1.04621L28.2148 1.25159L28.2946 1.49702L28.3334 1.78353V2.36107L29.3915 2.36105L29.6813 2.44385L29.9733 2.6105L30.2223 2.77507L30.4713 3.02244L30.6367 3.26982L30.7612 3.51719L30.8041 3.807V31.5355V31.9782L30.6367 32.2867L30.4274 32.6179L30.2181 32.9067L29.9262 33.1541L29.6363 33.3611L29.3444 33.5277L29.0546 33.5681L6.65315 33.5681L6.36122 33.5277L6.11219 33.3611L5.82025 33.1541L5.57122 32.9067L5.36195 32.6179L5.19454 32.2867L5.11083 31.6388L5.11083 31.1666H4.57272L4.33546 31.1245L4.0982 31.0434L3.86094 30.9202L3.66156 30.7548L3.50405 30.5494L3.42429 30.3441L3.34454 30.0966L3.30566 29.8511Z' fill='white'/>
      <path fillRule='evenodd' clipRule='evenodd' d='M27.552 0L27.7154 0.0263487L28.027 0.135029L28.2711 0.256367L28.3593 0.312055L28.5645 0.472828L28.6477 0.555174L28.8098 0.757404L28.8835 0.883044L28.9757 1.11256L29.0794 1.44471L29.1024 1.62509L29.1078 1.62548L29.4113 1.67812L29.6954 1.75901L29.8094 1.80684L30.1241 1.98713L30.4467 2.21155L30.7552 2.53115L30.9486 2.82629L31.0706 3.06795L31.119 3.22005L31.1664 3.57642L31.161 31.7509L31.1189 32.033L31.0835 32.1572L30.9244 32.5105L30.7012 32.8607L30.496 33.1428L30.4129 33.2322L30.0933 33.4998L29.7653 33.7301L29.4792 33.8929L29.2943 33.9556L28.9387 34L6.21338 33.9951L5.92723 33.9557C5.87555 33.9486 5.82544 33.9337 5.77856 33.9118L5.71089 33.8737L5.45534 33.7031L5.10459 33.4467L4.80707 33.1428L4.56006 32.7923L4.36155 32.3815L4.2647 32.0295L4.2247 31.7474C4.21879 31.7057 4.21821 31.6644 4.22247 31.6244L3.93241 31.5242L3.68831 31.4028L3.59761 31.3452L3.39248 31.1824L3.31166 31.102L3.14961 30.8998L3.07586 30.7741L2.98325 30.5434L2.88178 30.2219L2.83508 29.8988V6.12078C2.82247 5.98286 2.86677 5.8379 2.98335 5.7224L8.58107 0.176583C8.65612 0.0903211 8.76015 0.0292845 8.87829 0.00814551L8.88482 0.00756864C8.90937 0.00357516 8.93406 0.00142653 8.95867 0.00104268L8.97047 0H27.552ZM9.48338 1.01115L9.48429 5.02735L9.45777 5.18992L9.34848 5.49645L9.22643 5.73812L9.13113 5.86914L8.92689 6.06737L8.66403 6.26987L8.4589 6.39121L8.35661 6.43751L8.02604 6.53769L7.66685 6.5846H3.86058L3.85403 29.8173L3.87461 29.9812L3.9461 30.1964L4.00021 30.3305L4.07919 30.4296L4.20329 30.5277L4.32484 30.5929L4.49445 30.6544L4.65149 30.6885L27.2208 30.6958L27.3904 30.6728L27.5652 30.6213L27.7612 30.5226L27.8792 30.4296L27.9592 30.3295L28.0027 30.2248L28.0654 30.059L28.0987 29.8988L28.1036 1.86681L28.0852 1.67519L28.0133 1.46081L27.9582 1.32562L27.8802 1.22855L27.7541 1.13047L27.6327 1.0657L27.47 1.01115H9.48338ZM29.1176 29.9802L29.1241 2.65275L29.1861 2.66276L29.3459 2.71087L29.5829 2.84542L29.7985 2.98869L29.9641 3.16671L30.0617 3.33044L30.1151 3.44194L30.1462 3.64967L30.1408 31.6774L30.1172 31.8118L30.0175 32.0448L29.8495 32.2982L29.6987 32.5035L29.4595 32.706L29.2088 32.8823L29.0557 32.9666L28.8672 32.9938L6.28438 32.9888L6.1931 32.9737L6.04146 32.8734L5.76674 32.679L5.58724 32.4915L5.43553 32.2716L5.31331 32.0165L5.26567 31.8206L5.25053 31.6925L27.3079 31.6996L27.6391 31.6508L27.9577 31.5525L28.2711 31.4028L28.3618 31.3452L28.5669 31.1824L28.6477 31.102L28.8098 30.8998L28.8835 30.7741L28.9656 30.5719L29.0582 30.2997L29.1176 29.9802ZM4.57762 5.57446L8.45762 1.73106L8.45865 4.94552L8.40312 5.11063L8.34993 5.20943L8.24156 5.31718L8.07862 5.44252L7.98788 5.49255L7.7894 5.55773L7.59177 5.57889L4.57762 5.57446Z' fill='#54BAE3'/>
    </svg>
  )
}