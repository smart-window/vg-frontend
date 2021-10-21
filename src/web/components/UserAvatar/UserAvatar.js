import { shape, string } from 'prop-types'
import React from 'react'
import { colors } from 'shared/constants/cssConstants'
import { getInitials } from 'shared/services/stringFormatter'
import styled from 'styled-components'
import UserIcon from '../DynamicIcons/UserIcon'

UserAvatar.propTypes = {
  user: shape({
    fullName: string,
    avatarUrl: string,
  }),
}

UserAvatar.defaultProps = {
  user: {},
}

/**
 * a component a user avatar image, a user's initials, or a user icon if no user is passed in.
 * @category Components - Web
 * @module UserAvatar
 */
function UserAvatar(props) {
  const { user } = props

  const userDisplay = user.fullName ? (
    getInitials(user.fullName)
  ) : (
    <UserIcon fillColor={colors.officialBlue} lineColor={colors.white} />
  )
  return (
    <DivTaskAssignment title={user.fullName} avatarUrl={user.avatarUrl}>
      {!user.avatarUrl && userDisplay}
    </DivTaskAssignment>
  )
}

const DivTaskAssignment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  border-radius: 50%;
  font-size: 0.8rem;
  background: ${(p) =>
    p.avatarUrl ? `url("${p.avatarUrl}")` : colors.officialBlue};
  background-size: cover;
  border: 1px solid ${colors.officialBlue};
  width: 24px;
  height: 24px;
`

export default UserAvatar
