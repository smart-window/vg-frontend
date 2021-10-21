import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TaskAssignments from '../TaskAssignments/TaskAssignments'
import { colors } from 'shared/constants/cssConstants'
import { NavLink } from 'react-router-dom'
import CheckmarkIcon from 'web/components/DynamicIcons/CheckmarkIcon'

Task.propTypes = {
  task: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
}

/**
 * A card that shows the name status and knowledge articles of a given task
 * @category Components - Web
 * @namespace Task
 */
function Task(props) {
  const { isProfileOpen, task } = props
  const isCompleted = task.status === 'completed'

  return (
    <NavLinkTaskContainer
      to={task.id}
      activeStyle={{ background: colors.boneWhite }}
    >
      <CheckmarkIcon
        height={10}
        width={11}
        fillColor={isCompleted ? colors.officialBlue : 'transparent'}
      />
      {(
        <DivTaskHeader hideText={isProfileOpen} isCompleted={isCompleted}>
          {task.name}
        </DivTaskHeader>
      )}
      {task.taskAssignments?.length > 0 && (
        <TaskAssignments taskAssignments={task.taskAssignments} />
      )}
    </NavLinkTaskContainer>
  )
}

const NavLinkTaskContainer = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 6px;
  text-decoration: none;
  height: 38px;
  box-sizing: border-box;
  color: ${colors.charcoal};
  &:hover {
    background: ${colors.boneWhite};
  }
  & > svg {
    margin: 0 8px 0 21px;
  }
`

const DivTaskHeader = styled.div`
transition: width 0.5s ease-in;
width: ${p => p.hideText ? 0 : 200}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 16px;
  font-size: 0.8rem;
  margin-right: 8px;
  text-decoration: ${(p) => (p.isCompleted ? 'line-through' : 'none')};
`

export default Task
