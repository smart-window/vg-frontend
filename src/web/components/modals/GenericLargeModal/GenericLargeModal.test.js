import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import GenericLargeModal from './GenericLargeModal'

// mock analytics
window.gtag = () => {}

describe('Employee Training Report', () => {
  let onSubmit, onCancel, onErrorApply, error

  beforeEach(() => {
    onSubmit = jest.fn()
    onCancel = jest.fn()
    onErrorApply = jest.fn()
  })

  it('displays the passed in information', () => {
    render(
      <GenericLargeModal
        onSubmit={onSubmit}
        onCancel={onCancel}
        title={'Test Title'}
        subtitle={'Test subtitle'}
        icon={<img alt='123' />}
        applyButtonText='Add'
        error={error}
        onErrorApply={onErrorApply}
      >
        <div>Upload documents</div>
      </GenericLargeModal>
    )

    expect(screen.getByText('Test subtitle')).toBeDefined()
    expect(screen.getByText('Add')).toBeDefined()
    expect(screen.getByText('Upload documents')).toBeDefined()
  })

  it('displays the default information', () => {
    render(
      <GenericLargeModal
        onSubmit={onSubmit}
        onCancel={onCancel}
        title={'Test Title'}
        subtitle={'Test subtitle'}
        icon={<img alt='123' />}
        // applyButtonText='Add'
        error={error}
        onErrorApply={onErrorApply}
      >
        <div>Upload documents</div>
      </GenericLargeModal>
    )

    expect(screen.getByText('Apply')).toBeDefined()
    expect(screen.getByText('Cancel')).toBeDefined()
  })

  it('fires the onCancel handler when cancel is clicked', () => {
    render(
      <GenericLargeModal
        onSubmit={onSubmit}
        onCancel={onCancel}
        title={'Test Title'}
        subtitle={'Test subtitle'}
        icon={<img alt='123' />}
        error={error}
        onErrorApply={onErrorApply}
      >
        <div>Upload documents</div>
      </GenericLargeModal>
    )

    const cancelBtn = screen.getByText('Cancel')

    fireEvent.click(cancelBtn)

    expect(onCancel).toHaveBeenCalled()
  })

  it('fires the onCancel handler when X button is clicked', () => {
    render(
      <GenericLargeModal
        onSubmit={onSubmit}
        onCancel={onCancel}
        title={'Test Title'}
        subtitle={'Test subtitle'}
        icon={<img alt='123' />}
        error={error}
        onErrorApply={onErrorApply}
      >
        <div>Upload documents</div>
      </GenericLargeModal>
    )

    const xButton = screen.getAllByRole('button')

    fireEvent.click(xButton[0])

    expect(onCancel).toHaveBeenCalled()
  })

  it('fires the onSubmit handler when apply button is clicked', () => {
    render(
      <GenericLargeModal
        onSubmit={onSubmit}
        onCancel={onCancel}
        title={'Test Title'}
        subtitle={'Test subtitle'}
        icon={<img alt='123' />}
        error={error}
        onErrorApply={onErrorApply}
      >
        <div>Upload documents</div>
      </GenericLargeModal>
    )

    const applyBtn = screen.getByText('Apply')

    fireEvent.click(applyBtn)

    expect(onSubmit).toHaveBeenCalled()
  })

  it('displays an error state an error is passed in', () => {
    error = {
      errorTitle: 'This is the error title',
      message: 'This is the error message'
    }
    render(
      <GenericLargeModal
        onSubmit={onSubmit}
        onCancel={onCancel}
        title={'Test Title'}
        subtitle={'Test subtitle'}
        icon={<img alt='123' />}
        error={error}
        onErrorApply={onErrorApply}
      >
        <div>Upload documents</div>
      </GenericLargeModal>
    )

    expect(screen.getByText('This is the error title')).toBeDefined()

    const gotItBtn = screen.getByText('Got it')

    fireEvent.click(gotItBtn)

    expect(onErrorApply).toHaveBeenCalled()
  })
})
