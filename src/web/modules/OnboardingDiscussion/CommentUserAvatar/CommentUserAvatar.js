import { string } from 'prop-types'
import React from 'react'
import { colors } from 'shared/constants/cssConstants'
import { getInitials } from 'shared/services/stringFormatter'
import styled from 'styled-components'

CommentUserAvatar.propTypes = {
  /** user full name */
  fullName: string,
  /** user avartar url */
  avatarUrl: string
}

/**
 * Renders the avatar and full name of a user who posted the comment.
 * @category Components - Web
 * @namespace OnboardingDiscussion
 */
function CommentUserAvatar({fullName, avatarUrl}) {
  return (
    <DivAvatarContainer>
      <DivAvatarImg title={fullName} avatarUrl={avatarUrl}>{!avatarUrl && getInitials(fullName)}</DivAvatarImg>
      {fullName}
    </DivAvatarContainer>
  )
}

const DivAvatarImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  border-radius: 50%;
  font-size: 1.125rem;
  background: ${(p) =>
    p.avatarUrl ? `url("${p.avatarUrl}")` : colors.officialBlue};
  background-size: cover;
  border: 1px solid ${colors.officialBlue};
  width: 36px;
  height: 36px;
  margin-right:12px;

`
const DivAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.officialBlue};
  font-size: 1.125rem;
  font-weight: 600;
`

export default CommentUserAvatar