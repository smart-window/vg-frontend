import { arrayOf, shape, string } from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { colors, fonts } from 'shared/constants/cssConstants'
import styled from 'styled-components'

TaskDetailHeader.propTypes = {
  task: shape({
    dependentTasks: arrayOf(
      shape({
        id: string,
        name: string,
      })
    ),
  }),
}

function TaskDetailHeader(props) {
  const { task } = props
  return (
    <DivHeadingContainer>
      <DivTaskName>{task.name}</DivTaskName>
      {task.dependentTasks.length > 0 && (
        <DivDependantTasks>
          Pre-requisite:
          {task.dependentTasks.map((dependentTask) => (
            <LinkDependentTask key={dependentTask.id} to={dependentTask.id}>
              {dependentTask.name}
            </LinkDependentTask>
          ))}
        </DivDependantTasks>
      )}
    </DivHeadingContainer>
  )
}

const DivHeadingContainer = styled.div`
  flex: 0 0 content;
  font-family: ${fonts.openSans};
`
const DivTaskName = styled.div`
  font-size: 1.2rem;
  line-height: 25px;
  margin-bottom: 4px;
`

const DivDependantTasks = styled.div`
  font-style: italic;
  font-size: 0.8rem;
  color: ${colors.transparentText};
`

const LinkDependentTask = styled(Link)`
  margin: 0 4px;
  &,
  &:visited {
    color: ${colors.officialBlue};
  }
`

export default TaskDetailHeader
