import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DragDrop from './DragDrop'

describe('DragDrop', () => {
  let handleNewFileUpload
  const event = {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    dataTransfer: {
      items: [{name: 'file.png', size: 500}]
    }
  }

  beforeEach(() => {
    handleNewFileUpload = jest.fn()
  })

  it('renders the a drag and drop component with child components', () => {
    render(
      <DragDrop handleFileUpload={handleNewFileUpload}>
        <div><p>upload here</p></div>
      </DragDrop>
    )

    expect(screen.getByText('upload here')).toBeDefined()
  })

  it('shows a drag over state and handles a drop event', async () => {
    render(
      <DragDrop handleFileUpload={handleNewFileUpload}>
        <div><p>upload here</p></div>
      </DragDrop>
    )

    fireEvent.dragEnter(screen.getByText('upload here'), event)

    await waitFor(() => {
      const dropText = screen.getByText('Drop File to Upload')
      fireEvent.drop(dropText, {
        dataTransfer: {
          files: [new File(['file'], 'name.png', { type: 'image/png' })],
          clearData: jest.fn()
        },
      })
      expect(handleNewFileUpload).toHaveBeenCalled()
    })
  })
})