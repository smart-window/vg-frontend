import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DropdownModal from './DropdownModal'

let mockOnClose
beforeEach(() => {
  mockOnClose = jest.fn()
})

it('calls closeModal() when clicking (x)', () => {
  render(<DropdownModal closeModal={mockOnClose}>mock contents</DropdownModal>)
  fireEvent.click(screen.getByLabelText('Close Modal'))
  expect(mockOnClose).toHaveBeenCalled()
})

it('calls closeModal() when clicking outside', () => {
  render(<DropdownModal closeModal={mockOnClose}>mock contents</DropdownModal>)
  fireEvent.click(document.body)
  expect(mockOnClose).toHaveBeenCalled()
})