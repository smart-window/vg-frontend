import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ComboBoxItems from './ComboBoxItems'

describe('ComboBoxItems', () => {
  let mockCloseDropdown, mockHandleOptionClick, mockRef
  const listItems = [
    {id: 1, slug: 'Robin'},
    {id: 2, slug: 'Bluebird'},
    {id: 3, slug: 'Starling'},
    {id: 4, slug: 'House Finch'},
    {id: 5, slug: 'Junco'},
    {id: 6, slug: 'Blackbird'},
  ]
  const selectedItems = [
    { id: 1, slug: 'Robin'},
    {id: 2, slug: 'Bluebird'}
  ]

  beforeEach(() => {
    mockCloseDropdown = jest.fn()
    mockHandleOptionClick = jest.fn()
    mockRef = {
      current: {
        getBoundingClientRect: () => {
          return {
            width: 100,
            height: 100
          }
        }
      }
    }
  })

  it('renders a checklist without a search', () => {
    render(
      <ComboBoxItems
        isOpen={true}
        closeDropdown={mockCloseDropdown}
        listItems={listItems}
        parentRef={mockRef}
        allowSearching={false}
        selectedOptions={selectedItems}
        handleOptionSelect={mockHandleOptionClick}
      />
    )

    expect(screen.getByText('Robin'))
    expect(screen.queryByPlaceholderText('Search')).toBeNull()
  })

  it('renders a checklist with a search that filters options and clears options on clear', async () => {
    render(
      <ComboBoxItems
        isOpen={true}
        closeDropdown={mockCloseDropdown}
        listItems={listItems}
        parentRef={mockRef}
        allowSearching={true}
        selectedOptions={selectedItems}
        handleOptionSelect={mockHandleOptionClick}
      />
    )

    expect(screen.getByText('Junco'))
    expect(screen.getByText('Starling'))

    const searchInput = screen.getByPlaceholderText('Search')

    fireEvent.change(searchInput, { target: { value: 'star' }})

    await waitFor(() => {
      expect(screen.queryByText('Junco')).toBeNull()
      expect(screen.getByText('Starling')).toBeDefined()
    })

    const clearSearchButton = screen.getByRole('button', { type: 'reset' })

    fireEvent.click(clearSearchButton)

    expect(screen.getByText('Junco'))
    expect(screen.getByText('Starling'))
  })
})