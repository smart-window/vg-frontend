import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import DocumentsPage from './DocumentsPage'
import { MockedProvider } from '@apollo/client/testing'
import {getDocumentMockData} from 'test/mockData/documentTemplateCategoriesMock.js'
import { documentTypes } from 'web/constants/documentConstants'
// import {getDocumentTemplateCategoriesMock} from 'test/mockData/documentTemplateCategoriesMock.js'

describe('Documents Page', () => {
  const documents = [
    {
      __typename: 'Document',
      id: '10',
      name: 'image-upload-test',
      status: 'not_started',
      mimeType: 'image/jpeg',
      fileType: 'image',
      docusignTemplateId: null,
      downloadUrl: 'https://example-download-url.com',
      category: 'Time Tracking Documents',
      action: 'upload',
      exampleFileUrl: null,
      originalFilename: null,
      originalMimeType: null,
      url: 'https://example-display-url.com',
      s3Upload: {
        __typename: 'S3Upload',
        presignedUrl: 'https://example-upload-url.com',
        presignedDeleteUrl: 'https://example-delete-url.com',
        s3Key: 'a-long-s3-key'
      }
    }
  ]

  it('should show the empty state when no documents data is found', () => {
    render(
      <MockedProvider mocks={getDocumentMockData()}>
        <DocumentsPage documents={[]} type={documentTypes.EMPLOYEE}/>
      </MockedProvider>
    )

    expect(screen.getByText('Add Documents')).toBeDefined()
    expect(screen.getByText('Oops! No data found.')).toBeDefined()
  })

  it('should sort the documents by category and show the correct categories', async () => {
    render(
      <MockedProvider mocks={getDocumentMockData()}>
        <DocumentsPage documents={documents} type={documentTypes.EMPLOYEE}/>
      </MockedProvider>
    )
    await waitFor(() => {
      expect(screen.getByText('Time Tracking Documents')).toBeDefined()
      expect(screen.getByText('image-upload-test')).toBeDefined()
    })
  })
})