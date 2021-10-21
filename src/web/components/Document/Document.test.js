import React from 'react'
import { render, screen } from '@testing-library/react'
import {MockedProvider} from '@apollo/client/testing'
import '@testing-library/jest-dom/extend-expect'
import Document from './Document'

describe('Document', () => {
  let deleteUpload
  beforeEach(() => {
    deleteUpload = jest.fn()
  })

  it('The upload should render with the correct content when the document requires an upload and has an example file', () => {
    const mockDocument = {
      name: 'Intake Form 4A',
      category: 'Expenses Document',
      downloadUrl: null,
      exampleFileUrl: 'source-for-a-document-to-be-downloaded',
      action: 'upload',
      mimeType: 'text/csv',
      fileType: 'sheet',
      documentTemplate: {
        id: 1
      }
    }

    render(
      <MockedProvider>
        <Document
          document={mockDocument}
          deleteUpload={deleteUpload}
        />
      </MockedProvider>
    )

    expect(screen.getByText('Intake Form 4A')).toBeDefined()
    expect(screen.getByText('Download, fill, sign, and upload')).toBeDefined()
    expect(screen.getByText('browse your files')).toBeDefined()
    expect(screen.getByTitle('A Spreadsheet Type File Icon'))
  })

  it('The upload should render with the correct content when the document is download only', () => {
    const mockDocument = {
      name: 'Intake Doc 4A',
      category: 'Payroll Document',
      downloadUrl: 'source-for-a-document-to-be-downloaded',
      exampleFileUrl: null,
      action: 'download',
      mimeType: 'application/pdf',
      fileType: 'document',
      documentTemplate: {
        id: 1
      }
    }

    render(
      <MockedProvider>
        <Document
          document={mockDocument}
          deleteUpload={deleteUpload}
        />
      </MockedProvider>
    )

    expect(screen.getByText('Intake Doc 4A')).toBeDefined()
    expect(screen.getByText('Download document')).toBeDefined()
    expect(screen.getByTitle('A Document Type File Icon'))
  })

  it('The upload should render with the correct content when the upload is upload only', () => {
    const mockDocument = {
      name: 'Intake Image 4A',
      category: 'Payroll Document',
      downloadUrl: null,
      exampleFileUrl: null,
      action: 'upload',
      mimeType: 'image/png',
      fileType: 'image',
      documentTemplate: {
        id: 1
      }
    }

    render(
      <MockedProvider>
        <Document
          document={mockDocument}
          deleteUpload={deleteUpload}
        />
      </MockedProvider>
    )

    expect(screen.getByText('Intake Image 4A')).toBeDefined()
    expect(screen.getByText('browse your files')).toBeDefined()
    expect(screen.getByTitle('An Image Type File Icon'))
  })

  it('The upload should render with the correct content when the type is contract', () => {
    const mockDocument = {
      name: 'Employment Contract for User',
      category: 'Employment Contract',
      downloadUrl: 'source-for-a-document-to-be-downloaded',
      action: 'sign',
      documentTemplate: {
        id: 1
      }
    }

    render(
      <MockedProvider>
        <Document
          document={mockDocument}
          deleteUpload={deleteUpload}
        />
      </MockedProvider>
    )

    expect(screen.getByText('Employment Contract for User')).toBeDefined()
    expect(screen.getByText('Not Signed')).toBeDefined()
    expect(screen.getByTitle('A Contract Type Icon'))
  })
})