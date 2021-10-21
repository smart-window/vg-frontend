import React from 'react'
import { render, screen } from '@testing-library/react'
import { getInitials } from 'shared/services/stringFormatter'
import CommentUserAvatar from './CommentUserAvatar'

describe('CommentUserAvatar', () => {
  it('renders', () => {
    const fullName = 'Test User'

    render(
      <CommentUserAvatar fullName={fullName} avatarUrl='' />
    )

    screen.getByText(fullName)
    screen.getByText(getInitials(fullName))
  })
})