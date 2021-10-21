import React, {useContext, useEffect} from 'react'
import PropTypes from 'prop-types'
import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'
import { GlobalLoaderContext } from 'shared/providers/GlobalLoaderProvider'
import { useQuery, useMutation } from '@apollo/client'
import {GET_DOCUMENT_TEMPLATE_CATEGORIES_BY_TYPE_QUERY} from 'web/apollo/queries/documentTemplateQueries'
import { SAVE_USER_DOCUMENT, SAVE_CLIENT_DOCUMENT } from 'web/apollo/mutations/documentMutations'
import useDeleteFile from 'web/hooks/useDeleteFile'
import useUploadFile from 'web/hooks/useUploadFile'
import Document from '../Document/Document'
import ExpandableSection from 'web/components/ExpandableSection/ExpandableSection'
import DownloadAllButton from 'web/components/DownloadAllButton/DownloadAllButton'
import AddButton from 'web/components/AddButton/AddButton'
import ScrollFade from 'web/components/ScrollFade/ScrollFade'
import blurredTablePng from 'assets/images/blurred-documents-page.png'
import LightBulbIcon from 'web/components/DynamicIcons/LightBulbIcon'
import modalConstants from 'web/constants/modalConstants'
import {documentTypes} from 'web/constants/documentConstants'
import useBulkUpload from 'web/hooks/useBulkUpload.js'

import {
  DivContainer,
  DivEmptyState,
  DivEmptyStateInstructions,
  DivSectionContainer,
  DivDocumentContainer
} from './DocumentsPage.styles'

DocumentsPage.propTypes = {
  /** The User or Client that the documents pertain to */
  entityId: PropTypes.object.isRequired,
  /** The fetched documents data */
  documents: PropTypes.object.isRequired,
  /** The type of documents displaying, one of documentTypes */
  type: PropTypes.string.isRequired,
}

/**
 * A page containing a list of documents sorted by categories
 * @category Components - Web
 * @namespace DocumentsPage
 */
export default function DocumentsPage({entityId, documents, type}) {
  const bulkUpload = useBulkUpload(type)
  const {showModal} = useContext(GlobalModalContext)
  const {setIsLoading} = useContext(GlobalLoaderContext)
  const [saveDocument] = useMutation(type === documentTypes.CLIENT ? SAVE_CLIENT_DOCUMENT : SAVE_USER_DOCUMENT)
  const deleteFile = useDeleteFile(type)
  const uploadFile = useUploadFile(type)

  const {data: {documentTemplateCategoriesByType = []} = {}} = useQuery(GET_DOCUMENT_TEMPLATE_CATEGORIES_BY_TYPE_QUERY,
    {
      variables: {
        type
      }
    })

  // clear loader on mount
  useEffect(() => setIsLoading(false), [])

  const sortedDocuments = documentTemplateCategoriesByType.reduce((acc, section) => {
    acc[section.slug] = []
    return acc
  }, {})

  documents.reduce((totalDocuments, document) => {
    totalDocuments[document.category] && totalDocuments[document.category].push(document)
    return totalDocuments
  }, sortedDocuments)

  const sectionComponents = [...documentTemplateCategoriesByType]
    .reduce((jsx, section) => {
      if (!!sortedDocuments[section.slug].length) {
        const downloadableDocuments = sortedDocuments[section.slug].filter(documents => !!documents.originalFilename || !!documents.originalMimeType)

        jsx.push(
          <DivSectionContainer key={section.slug}>
            {!!downloadableDocuments.length && <DownloadAllButton documents={downloadableDocuments} />}
            <ExpandableSection localStorageId={section.id} title={section.slug} isCollapsable={true} startsExpanded={true}>
              <DivDocumentContainer>
                <ScrollFade>
                  {
                    sortedDocuments[section.slug].map(document => {
                      return (
                        <Document
                          key={document.id}
                          document={document}
                          saveDocument={saveDocument}
                          deleteFile={deleteFile}
                          uploadFile={uploadFile}
                        />
                      )
                    })
                  }
                </ScrollFade>
              </DivDocumentContainer>
            </ExpandableSection>
          </DivSectionContainer>
        )
      }
      return jsx
    }, [])

  /** Displays modal to upload ad-hoc documents */
  function showAddDocumentsModal() {
    showModal(modalConstants.ADD_DOCUMENT_MODAL, {
      type,
      handleUploadDocuments: async docs => {
        setIsLoading(true)
        await bulkUpload(docs, entityId)
        setIsLoading(false)
      },
    })
  }

  return (
    <DivContainer>
      {
        !documents.length ?
          <DivEmptyState>
            <img src={blurredTablePng} alt='blurred empty documents table' />
            <DivEmptyStateInstructions>
              <LightBulbIcon />
              <p>Oops! No data found.</p>
            </DivEmptyStateInstructions>
          </DivEmptyState>
          :
          <div>
            {sectionComponents}
          </div>
      }

      <AddButton
        onClick={showAddDocumentsModal}
        text={'Add Documents'}
      />
    </DivContainer>
  )
}
