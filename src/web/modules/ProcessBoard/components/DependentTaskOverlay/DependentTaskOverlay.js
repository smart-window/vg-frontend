import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { colors } from 'shared/constants/cssConstants'
import styled from 'styled-components'

DependentTaskOverlay.propTypes = {
  task: shape({
    dependentTasks: arrayOf(
      shape({
        id: string,
        name: string,
        status: string,
      })
    ),
  }),
}

/**
 * An overlay that renders over the task detail if a task has incomplete pre-requisites
 * @category Components - Web
 * @namespace DependentTaskOverlay
 */
function DependentTaskOverlay(props) {
  const { task } = props
  const hasIncompletePrerequisite = task.dependentTasks.some(
    (dependentTask) => dependentTask.status !== 'completed'
  )
  return (
    hasIncompletePrerequisite && (
      <DivContainer>
        You cannot complete this step until
        {task.dependentTasks.map((dependentTask) => (
          <LinkDependentTask key={dependentTask.id} to={dependentTask.id}>{dependentTask.name}</LinkDependentTask>
        ))}
        is marked as complete
      </DivContainer>
    )
  )
}

const DivContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(1px);
`

const LinkDependentTask = styled(Link)`
  margin: 0 4px;
  &,
  &:visited {
    color: ${colors.officialBlue};
  }
`

export default DependentTaskOverlay
