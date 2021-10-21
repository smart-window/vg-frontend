import React from 'react'
import { object, func } from 'prop-types'
import {useQuery} from '@apollo/client'
import {DOCUMENT_TEMPLATE_QUERY} from 'web/apollo/queries/documentTemplateQueries'
import DocumentTemplateForm from '../DocumentTemplateForm/DocumentTemplateForm'

import {
  DivContainer
} from './DocumentTemplateDrawer.styles'

DocumentTemplateDrawer.propTypes = {
  /** Called when the user submits the form */
  onSubmit: func.isRequired,
  /** Called when the user clicks the cancel or x button */
  onCancel: func.isRequired,
  /** Called when the delete icon on an existing template is clicked */
  onDelete: func.isRequired,
  /** An instance of a document template */
  documentTemplate: object
}

DocumentTemplateDrawer.defaultProps = {}

/**
 * renders a drawer for editing an existing document template.
 * @category Components - Web
 * @namespace DocumentTemplateDrawer
 */
function DocumentTemplateDrawer({
  onSubmit,
  onCancel,
  onDelete,
  documentTemplateId
}) {
  const {data: {documentTemplate = {}} = {}} = useQuery(DOCUMENT_TEMPLATE_QUERY, {
    variables: {id: documentTemplateId},
    fetchPolicy: 'network-only',
    skip: !documentTemplateId
  })

  return (
    <DivContainer>
      <DocumentTemplateForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        onDelete={onDelete}
        showPreview={false}
        documentTemplate={documentTemplate}
      />
    </DivContainer>
  )
}

export default DocumentTemplateDrawer
