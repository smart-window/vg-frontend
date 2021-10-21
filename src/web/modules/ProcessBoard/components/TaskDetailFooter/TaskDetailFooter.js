import { gql, useMutation } from '@apollo/client'
import { shape, string } from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { statusUpdatedTaskFragment } from 'web/apollo/fragments/taskFragments'
import { getUpdatedPercentComplete } from '../../ProcessBoard.helpers'
import styled from 'styled-components'
import { colors, fonts } from 'shared/constants/cssConstants'
import ChevronArrowIcon from 'web/components/DynamicIcons/ChevronArrowIcon'

const taskShape = shape({
  id: string,
  name: string,
})

TaskDetailFooter.propTypes = {
  task: shape({
    id: string,
    status: string,
  }),
  nextTask: taskShape,
  prevTask: taskShape,
}

function TaskDetailFooter(props) {
  const { task, nextTask, prevTask, stage } = props
  const isCompleted = task.status === 'completed'

  const [updateStatus, { loading }] = useMutation(TASK_UPDATE_STATUS_MUTATION, {
    update: (cache, { data: { updateTaskStatus } }) => {
      cache.modify({
        id: cache.identify(stage),
        fields: {
          percentComplete: () =>
            getUpdatedPercentComplete(stage, updateTaskStatus),
        },
      })
    },
  })

  /**
   * Saves the given status for the current task
   * @param {string} status
   */
  function saveStatus(status) {
    updateStatus({ variables: { taskId: task.id, status } })
  }

  return (
    <DivContainer>
      <DivNavigationLinkContainer>
        {prevTask && (
          <Link to={prevTask.id}>
            <ChevronArrowIcon height={24} width={11} />
            {prevTask.name}
          </Link>
        )}
      </DivNavigationLinkContainer>
      <DivButtonContainer>
        <ButtonCompletTask
          aria-label='update task status'
          disabled={loading}
          onClick={() => saveStatus(isCompleted ? 'not_started' : 'completed')}
        >
          Mark Step as {isCompleted ? 'Incomplete' : 'Complete'}
        </ButtonCompletTask>
      </DivButtonContainer>
      <DivNavigationLinkContainer>
        {nextTask && (
          <Link to={nextTask.id}>
            {nextTask.name}
            <ChevronArrowIcon height={24} width={11} />
          </Link>
        )}
      </DivNavigationLinkContainer>
    </DivContainer>
  )
}

export const TASK_UPDATE_STATUS_MUTATION = gql`
  mutation updateTaskStatus($status: String!, $taskId: ID!) {
    updateTaskStatus(status: $status, taskId: $taskId) {
      ...StatusUpdatedTask
    }
  }
  ${statusUpdatedTaskFragment}
`

const DivContainer = styled.div`
  flex: 0 0 content;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const DivNavigationLinkContainer = styled.div`
  flex: 1 1 0px;
  & > a {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: ${colors.officialBlue};
    text-decoration: none;
  }
  &:last-child > a {
    justify-content: flex-end;
  }
  &:last-child svg {
    margin-left: 8px;
  }
  &:first-child svg {
    margin-right: 8px;
    transform: rotate(180deg);
  }
`

const DivButtonContainer = styled.div`
  flex: 1 1 0px;
  text-align: center;
`
const ButtonCompletTask = styled.button`
  padding: 8px 16px;
  background: ${colors.white};
  color: ${colors.officialBlue};
  font-size: 1rem;
  font-family: ${fonts.openSans};
  border-radius: 6px;
  border: 1px solid ${colors.officialBlue};
`

export default TaskDetailFooter
