import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import KnowledgeArticles from './KnowledgeArticles'

describe('KnowledgeArticles', () => {
  it('should hide articles initially', () => {
    render(<KnowledgeArticles knowledgeArticles={[{url: 'https://example.com'}]} />)

    expect(screen.queryByText('https://example.com')).toBeNull()
  })
  it('should display articles when the button is clicked on.', () => {
    render(<KnowledgeArticles knowledgeArticles={[{url: 'https://example.com'}]} />)
    const button = screen.getByLabelText('knowledge articles')

    fireEvent.click(button)

    screen.getByText('https://example.com')
  })
})