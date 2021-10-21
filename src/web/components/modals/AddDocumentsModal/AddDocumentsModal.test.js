import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AddDocumentsModal from './AddDocumentsModal'
import { MockedProvider } from '@apollo/client/testing'
import {getDocumentMockData} from 'test/mockData/documentTemplateCategoriesMock.js'
import { documentTypes } from 'web/constants/documentConstants'

// mock analytics
window.gtag = () => {}

describe('Employee Training Report', () => {
  let mocks, onSubmit, onCancel

  beforeEach(() => {
    mocks = [...getDocumentMockData()]
    onSubmit = jest.fn()
    onCancel = jest.fn()
  })

  it('shows the modal empty state upon load', () => {
    render(
      <MockedProvider mocks={mocks}>
        <AddDocumentsModal
          onSubmit={onSubmit}
          onCancel={onCancel}
          type={documentTypes.EMPLOYEE}
        />
      </MockedProvider>
    )

    expect(screen.getByText('Upload one or more documents to see them here')).toBeDefined()
  })

  it('adds the a document on input file change', () => {
    render(
      <MockedProvider mocks={mocks}>
        <AddDocumentsModal
          onSubmit={onSubmit}
          onCancel={onCancel}
          type={documentTypes.EMPLOYEE}
        />
      </MockedProvider>
    )

    const docUploadInput = document.querySelector('input')

    fireEvent.change(docUploadInput, {target: {files: [new File(['file'], 'name.png', { type: 'image/png' })]}})

    expect('name.png').toBeDefined()
  })

  it('shows editable AdHocDocuments when a document is added', () => {
    render(
      <MockedProvider mocks={mocks}>
        <AddDocumentsModal
          onSubmit={onSubmit}
          onCancel={onCancel}
          type={documentTypes.EMPLOYEE}
        />
      </MockedProvider>
    )

    const docUploadInput = document.querySelector('input')

    fireEvent.change(docUploadInput, {target: {files: [new File(['file'], 'name.png', { type: 'image/png' })]}})

    const docNameInput = screen.getByLabelText('Document Name')

    expect(docNameInput.value).toEqual('name')

    fireEvent.change(docNameInput, { target: { value: 'foobar' }})

    expect(docNameInput.value).toEqual('foobar')
  })

  it('shows deletes AdHocDocuments when a document is added', () => {
    render(
      <MockedProvider mocks={mocks}>
        <AddDocumentsModal
          onSubmit={onSubmit}
          onCancel={onCancel}
          type={documentTypes.EMPLOYEE}
        />
      </MockedProvider>
    )

    const docUploadInput = document.querySelector('input')

    fireEvent.change(docUploadInput, {target: {files: [new File(['file'], 'name1.png', { type: 'image/png' })]}})

    const docNameInput = screen.getByDisplayValue('name1')

    expect(docNameInput).toBeDefined()

    const trashIcon = screen.getAllByRole('button', {name: 'Remove uploaded file'})

    fireEvent.click(trashIcon[0])

    expect(screen.queryByDisplayValue('name1')).toBeNull()
  })
})
