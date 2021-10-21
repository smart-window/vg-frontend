import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {useQuery, useMutation, gql} from '@apollo/client'
import {documentFileTypes, getDocTypeForMimeType} from 'web/constants/documentConstants'
import VgInput from 'web/modules/VgInput/VgInput'
import VgButton from 'web/components/VgButton/VgButton'
import Document from 'web/components/Document/Document'
import trashCan from 'assets/images/icons/trashIcon.svg'

import {
  DivFormContent,
  DivFormBody,
  DivFormActions,
  DivFormActionButtonContainer,
  DivDocumentTemplateFormContainer,
  DivFormSectionHeader,
  DivDocumentPreviewPlaceholder,
  DivDocumentPreview,
  DivFormInputOptions,
  DivFormInput,
  DivTemplateName,
  DivTemplateActions,
  ButtonDeleteTemplate
} from './DocumentTemplateForm.styles'

export const DROPDOWN_VALUES_QUERY = gql`
  query {
    countries {
      id
      name
    }

    clients {
      id
      name
    }

    partners {
      id
      name
    }

    documentTemplateCategories {
      id
      name
    }
  }
`

export const FILE_UPLOAD = gql`
  mutation {
    document_template_upload {
      s3Key
      presignedUrl
      presignedDeleteUrl
    }
  }
`

DocumentTemplateForm.propTypes = {
  /** Called when the user submits the form */
  onSubmit: PropTypes.func,
  /** Called when the user clicks the cancel or x button */
  onCancel: PropTypes.func,
  /** Called when the delete icon on an existing template is clicked */
  onDelete: PropTypes.func,
  /** Determines whether or not to show the preview */
  showPreview: PropTypes.bool,
  /** An instance of a document template */
  documentTemplate: PropTypes.object
}

DocumentTemplateForm.defaultProps = {
  showPreview: true,
  documentTemplate: {},
  onDelete: () => {}
}

export default function DocumentTemplateForm({
  onSubmit,
  onCancel,
  onDelete,
  showPreview,
  documentTemplate
}) {
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [action, setAction] = useState('')
  const [clientId, setClientId] = useState('')
  const [countryId, setCountryId] = useState('')
  const [partnerId, setPartnerId] = useState('')
  const [required, setRequired] = useState('')
  const [fileType, setFileType] = useState('')
  const [exampleFileUrl, setExampleFileUrl] = useState('')
  const [exampleFilename, setExampleFilename] = useState('')
  const [exampleFileMimeType, setExampleFileMimeType] = useState('')
  const [document, setDocument] = useState({})
  const [documentTemplateCategoryId, setDocumentTemplateCategoryId] = useState(
    ''
  )
  const [fileUpload] = useMutation(FILE_UPLOAD)

  useEffect(() => {
    buildDocument(documentTemplate)
  }, [documentTemplate])

  /**
   * Builds the document to be used for the <Document /> component
   * @param {object} documentTemplate - an optional document template
   */
  async function buildDocument(documentTemplate) {
    if (documentTemplate && documentTemplate?.exampleFileUrl) {
      const {name, exampleFilename, fileType, s3Upload} = documentTemplate
      setDocument({
        name: name,
        action: 'upload',
        category: exampleFilename,
        s3Upload,
        fileType,
        type: documentFileTypes.TEMPLATE
      })
    }
    else {
      const {data: { document_template_upload }} = await fileUpload()
      setDocument({
        s3Upload: document_template_upload,
        name: 'Document Template',
        category: 'any format',
        action: 'upload',
        fileType: documentFileTypes.TEMPLATE,
        type: documentFileTypes.TEMPLATE
      })
    }
  }

  useEffect(() => {
    if (documentTemplate) {
      const {
        id,
        name,
        action,
        clientId,
        countryId,
        partnerId,
        required,
        fileType,
        exampleFileUrl,
        exampleFilename,
        documentTemplateCategoryId,
        exampleFileMimeType
      } = documentTemplate

      setId(id)
      setDocumentTemplateCategoryId(documentTemplateCategoryId)
      setFileType(fileType)
      setRequired(required)
      setPartnerId(partnerId)
      setCountryId(countryId)
      setClientId(clientId)
      setAction(action)
      setName(name)
      setExampleFileUrl(exampleFileUrl)
      setExampleFilename(exampleFilename)
      setExampleFileMimeType(exampleFileMimeType)
    }
  }, [documentTemplate])

  /**
   * Handles passing the necessary params to the onSubmit prop function
   */
  function handleSubmitForm() {
    onSubmit({
      variables: {
        id,
        name,
        action,
        clientId,
        documentTemplateCategoryId,
        countryId,
        partnerId,
        required,
        fileType,
        exampleFileMimeType,
        exampleFileUrl,
        exampleFilename
      },
    })
  }

  /**
   * Handles passing the necessary params to the onDelete prop function
   */
  function handleDeleteTemplate() {
    onDelete({
      variables: {
        id
      }
    })
  }

  /**
   * Handles triggering for form submit onBlur for existing templates
   */
  function handleOnBlur() {
    if (documentTemplate && documentTemplate?.id) {
      handleSubmitForm()
    }
  }

  /**
   * Handles updating the form when a new file is uploaded
   * This callback is passed into the <Document /> component
   *
   * @param {object} document - the document
   * @param {object} file - the file that was uploaded
   */
  function handleDocumentChange(document, file) {
    const {s3Upload: {s3Key}} = document
    const {name, type} = file

    const fileType = getDocTypeForMimeType(type)

    setExampleFileUrl(s3Key)
    setExampleFilename(name)
    setExampleFileMimeType(type)
    setFileType(fileType)

    if (id) {
      handleSubmitForm()
    }
  }

  const {data: {countries = [], clients = [], partners = [], documentTemplateCategories = []} = {}} = useQuery(DROPDOWN_VALUES_QUERY, {fetchPolicy: 'cache-first'})
  const countryOptions = countries.map(country => ({label: country.name, value: country.id}))
  const clientOptions = clients.map(client => ({label: client.name, value: client.id}))
  const partnerOptions = partners.map(partner => ({label: partner.name, value: partner.id}))
  const documentTemplateCategoryOptions = documentTemplateCategories.map(documentTemplateCategory => ({label: documentTemplateCategory.name, value: documentTemplateCategory.id}))
  const requiredOptions = [{label: 'Yes', value: true}, {label: 'No', value: false}]
  const fileTypeOptions = [{label: 'Image (.jpg, .png)', value: 'image'}, {label: 'Sheet', value: 'sheet'}, {label: 'Document', value: 'document'}, {label: 'Contract', value: 'contract'}]
  const actionOptions = [{label: 'download', value: 'download'}, {label: 'upload', value: 'upload'}, {label: 'download/upload', value: 'download/upload'}]

  return (
    <DivFormContent>
      <DivFormBody>
        <DivDocumentTemplateFormContainer>
          <DivTemplateName>
            <VgInput
              label='Document Template Name'
              isOptional={false}
              onChange={setName}
              onBlur={handleOnBlur}
              type='text'
              value={name}
            />
            {id && (
              <DivTemplateActions>
                <ButtonDeleteTemplate
                  onClick={handleDeleteTemplate}
                >
                  <img src={trashCan} alt='delete template' />
                </ButtonDeleteTemplate>
              </DivTemplateActions>
            )}
          </DivTemplateName>
          <Document
            document={document}
            handleDocumentChange={handleDocumentChange}
          />
          <DivFormSectionHeader>
            TEMPLATE RULES
          </DivFormSectionHeader>

          <DivFormInputOptions>
            <DivFormInput>
              <VgInput
                label='File Type'
                isOptional={true}
                onChange={setFileType}
                onBlur={handleOnBlur}
                options={fileTypeOptions}
                type='select'
                value={fileType}
              />
            </DivFormInput>
            <DivFormInput>
              <VgInput
                label='Document Category'
                isOptional={false}
                onChange={setDocumentTemplateCategoryId}
                onBlur={handleOnBlur}
                options={documentTemplateCategoryOptions}
                type='select'
                value={documentTemplateCategoryId}
              />
            </DivFormInput>
            <DivFormInput>
              <VgInput
                label='Required For Onboarding'
                isOptional={false}
                onChange={setRequired}
                onBlur={handleOnBlur}
                options={requiredOptions}
                type='select'
                value={required}
              />
            </DivFormInput>
            <DivFormInput>
              <VgInput
                label='Completion Instructions'
                isOptional={false}
                onChange={setAction}
                onBlur={handleOnBlur}
                options={actionOptions}
                type='select'
                value={action}
              />
            </DivFormInput>
          </DivFormInputOptions>

          <DivFormSectionHeader>
            TEMPLATE USE
          </DivFormSectionHeader>

          <DivFormInputOptions>
            <DivFormInput>
              <VgInput
                label='Partner Company'
                isOptional={true}
                onChange={setPartnerId}
                onBlur={handleOnBlur}
                options={partnerOptions}
                type='select'
                value={partnerId}
              />
            </DivFormInput>
            <DivFormInput>
              <VgInput
                label='Client Company'
                isOptional={true}
                onChange={setClientId}
                onBlur={handleOnBlur}
                options={clientOptions}
                type='select'
                value={clientId}
              />
            </DivFormInput>
            <DivFormInput>
              <VgInput
                label='Country'
                isOptional={false}
                onChange={setCountryId}
                onBlur={handleOnBlur}
                options={countryOptions}
                type='select'
                value={countryId}
              />
            </DivFormInput>
          </DivFormInputOptions>
        </DivDocumentTemplateFormContainer>
        {showPreview && (
          <DivDocumentPreview>
            <DivDocumentPreviewPlaceholder>
              Preview will appear here for uploaded document
            </DivDocumentPreviewPlaceholder>
          </DivDocumentPreview>
        )}
      </DivFormBody>
      {!id && (
        <DivFormActions>
          <DivFormActionButtonContainer>
            <VgButton
              onClick={onCancel}
              text='Cancel'
              type={'cancel'}
              invertColors={true}
              shape={'rectangle'}
              arrowDirection={null}
            />
          </DivFormActionButtonContainer>
          <DivFormActionButtonContainer>
            <VgButton
              isDisabled={false}
              onClick={handleSubmitForm}
              text={id ? 'Update Template' : 'Create Template'}
              type='submit'
              shape={'rectangle'}
              arrowDirection={null}
            />
          </DivFormActionButtonContainer>
        </DivFormActions>
      )}
    </DivFormContent>
  )
}