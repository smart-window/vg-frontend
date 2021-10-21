import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import DiscussionFilter from './DiscussionFilter'

// mock analytics
window.gtag = () => {}

describe('DiscussionFilter', () => {
  it('animates the filter dropdown upon button click', async () => {
    render(
      <DiscussionFilter />
    )
    const filterButton =await screen.getByText('FILTERS')

    fireEvent.click(filterButton)

    expect(screen.getByText('Clear Filters')).toBeDefined()
  })

  it('renders visibility options', async () => {
    render(
      <DiscussionFilter />
    )
    const filterButton =await screen.getByText('FILTERS')

    fireEvent.click(filterButton)

    const visibilityFilter = screen.getByLabelText('visibility-multiselect', {selector: 'input'})
    fireEvent.click(visibilityFilter)
    expect(screen.getByText('All Users')).toBeDefined()
  })
})