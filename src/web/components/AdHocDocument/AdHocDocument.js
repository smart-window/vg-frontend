import React from 'react'
import PropTypes from 'prop-types'
import documentConstants from 'web/constants/documentConstants'
import trashIcon from 'assets/images/icons/trashIcon.svg'
import VgInput from 'web/modules/VgInput/VgInput'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import {getIconForDocType} from 'web/services/documentIconHelper.js'

import {
  ArticleContainer,
  DivWidget,
  DivIconsWrapper,
  FormForDocument,
  DivInputWrapper
} from './AdHocDocument.styles'

AdHocDocument.propTypes = {
  /** The file that will be uploaded as a document */
  document: PropTypes.object.isRequired,
  /** Fetched document template categories */
  documentTemplateCategories: PropTypes.array.isRequired,
  /**
   * Callback to parent on document change
   *   params: (document)
   */
  handleDocumentChange: PropTypes.func,
  /**
   * Callback to parent on document delete
   *   params: (document)
   */
  handleDocumentDelete: PropTypes.func
}

AdHocDocument.defaultProps = {
  handleDocumentChange: () => {},
  handleDocumentDelete: () => {}
}

const {
  getDocTypeForMimeType
} = documentConstants

/**
 * A reusable component to download and upload documents
 * @category Components - Web
 * @namespace DocumentToUpload
 */
export default function AdHocDocument({
  document,
  documentTemplateCategories,
  handleDocumentChange,
  handleDocumentDelete
}) {
  const {name, documentTemplateCategoryId, file} = document
  const type = getDocTypeForMimeType(file.type)
  const FileIcon = getIconForDocType(type)
  const documentCategoryOptions = documentTemplateCategories.map(category => {
    return {
      value: category.id,
      label: category.slug
    }
  })

  /**
   * Changes an attribute on the document object
   * @param {string} attribute attribute that should be changed
   * @param {string} value new value for document attribute
   */
  function onAttributeChange(attribute, value) {
    const newDocument = {...document}
    newDocument[attribute] = value
    handleDocumentChange(newDocument)
  }

  return (
    <ArticleContainer>
      <DivWidget>
        <FileIcon />
        <FormForDocument autocomplete='off'>
          <DivInputWrapper>
            <VgInput value={file.name} label='File Name' />
          </DivInputWrapper>
          <VgInput
            value={name}
            label='Document Name'
            onChange={(value) => {onAttributeChange('name', value)}}
          />
          <DivInputWrapper>
            <VgInput
              onChange={(value) => {onAttributeChange('documentTemplateCategoryId', value)}}
              type={InputTypes.SELECT}
              value={documentTemplateCategoryId || ''}
              label='Document Category'
              options={documentCategoryOptions}
            />
          </DivInputWrapper>
        </FormForDocument>
        <DivIconsWrapper>
          <img
            role='button'
            alt='Remove uploaded file'
            src={trashIcon}
            onClick={handleDocumentDelete}
          />
        </DivIconsWrapper>
      </DivWidget>
    </ArticleContainer>
  )
}