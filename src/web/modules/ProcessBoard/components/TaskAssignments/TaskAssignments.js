import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import styled from 'styled-components'
import UserAvatar from 'web/components/UserAvatar/UserAvatar'

TaskAssignments.propTypes = {
  taskAssignments: arrayOf(
    shape({
      id: string,
      user: shape({
        fullName: string,
        avatarUrl: string,
      }),
    })
  ).isRequired,
}

/**
 * Shows a row of task assignments in the form of user initials
 * @category Components - Web
 * @namespace TaskAssignments
 */
function TaskAssignments(props) {
  const { taskAssignments } = props
  return (
    <DivContainer>
      {taskAssignments.map((assignment) => (
        <UserAvatar
          key={assignment.id}
          user={assignment.user}
        />
      ))}
    </DivContainer>
  )
}

const DivContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  margin-left: auto;

  & > *:not(:first-child) {
    margin-left: -12px;
  }
`

export default TaskAssignments
