import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'

import Document from 'web/components/Document/Document'
import DownloadAllButton from 'web/components/DownloadAllButton/DownloadAllButton'

import SectionHeading from '../SectionHeading/SectionHeading'
import {H2FormHeading, DivFormContents} from '../../wwSharedStyles'
import {DivContainer, DivDocumentsSection} from './WelcomeWizardDocumentInfo.styles'
import {SAVE_USER_DOCUMENT} from 'web/apollo/mutations/documentMutations'
import {documentStatuses} from 'web/constants/documentConstants'
import useDeleteFile from 'web/hooks/useDeleteFile'
import useUploadFile from 'web/hooks/useUploadFile'

WelcomeWizardDocumentInfo.propTypes = {
  /** array of all documents the user must take action on */
  currentUserDocuments: PropTypes.array.isRequired
}

/**
 * The document upload page of the EE welcome wizard
 * @category Modules - Web
 * @subcategory WelcomeWizard
 * @namespace WelcomeWizardDocumentInfo
 */
export default function WelcomeWizardDocumentInfo({uploadDocs, downloadDocs}) {
  const [saveDocument] = useMutation(SAVE_USER_DOCUMENT)
  const deleteFile = useDeleteFile('employee')
  const uploadFile = useUploadFile('employee')
  /**
   * Saves downloaded document status as completed
   * @param {object} document document being downloaded
   */
  function onDocumentDownload(document) {
    if (document.status !== documentStatuses.COMPLETEDSTATUS) {
      saveDocument({
        variables: {
          documentId: document.id,
          status: documentStatuses.COMPLETEDSTATUS
        }
      })
    }
  }

  /**
   * Builds a document upload display section with document upload components
   * @param {string} sectionTitle form section title
   * @param {array} documentData array of documents to display in section
   * @param {boolean} hasDownloadAll bool indicating if section should have download all option
   * @returns JSX containing all document components per form section
   */
  function createDocumentSection(sectionTitle, documentData, hasDownloadAll) {
    const documentComponents = documentData.map((document) => {
      return (
        <Document
          key={'document-'+document.id}
          document={document}
          saveDocument={saveDocument}
          deleteFile={deleteFile}
          uploadFile={uploadFile}
        />
      )
    })
    return (
      <DivDocumentsSection key={sectionTitle}>
        <SectionHeading title={sectionTitle}>
          {hasDownloadAll && <DownloadAllButton documents={downloadDocs} onDocumentDownload={onDocumentDownload}/>}
        </SectionHeading>
        {documentComponents}
      </DivDocumentsSection>
    )
  }

  return (
    <DivContainer>
      <H2FormHeading>We have a few important documents for you:</H2FormHeading>
      <DivFormContents>
        { createDocumentSection('UPLOAD THE FOLLOWING DOCUMENTS', uploadDocs) }
        { createDocumentSection('DOWNLOAD THESE DOCUMENTS FOR YOUR RECORDS', downloadDocs, true) }
      </DivFormContents>
    </DivContainer>
  )
}