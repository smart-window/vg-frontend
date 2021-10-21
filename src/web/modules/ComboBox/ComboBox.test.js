import React from 'react'
import { render, screen } from '@testing-library/react'
import ComboBox from './ComboBox'

describe('ComboBox', () => {
  let mockHandleOptionClick
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
    mockHandleOptionClick = jest.fn()
  })

  // TODO: tests around selecting/searching items

  it('renders a combobox without a label, input and checklist', () => {
    render(
      <ComboBox
        label={'birds'}
        selectedOptions={selectedItems}
        handleOptionSelect={mockHandleOptionClick}
        listItems={listItems}
        allowSearching={true}
      />
    )

    expect(screen.getByLabelText('birds-multiselect')).toBeDefined()
    expect(screen.getByText('Robin')).toBeDefined()
  })
})