import { MockedProvider } from '@apollo/client/testing'
import React from 'react'
import {postCommentMock } from 'test/mockData/discussionMock'
import OnboardingPostComment from './OnboardingPostComment'
const { render, screen } = require('@testing-library/react')

describe('OnboardingPostComment', () => {
  it('renders', () => {
    render(
      <MockedProvider mocks={[postCommentMock()]} addTypename={false}>
        <OnboardingPostComment taskId={4} taskName='Do the the thing'/>
      </MockedProvider>
    )
    expect(screen.getAllByText('Post a Comment:')).toBeDefined()
    expect(screen.getByText('Do the the thing')).toBeDefined()
    expect(screen.getByPlaceholderText('Enter comment')).toBeDefined()
    expect(screen.findByText('Post', {selector: 'span'})).toBeDefined()
  })
})