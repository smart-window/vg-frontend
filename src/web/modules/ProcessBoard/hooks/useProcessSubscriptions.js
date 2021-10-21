import { gql } from '@apollo/client'
import { useEffect } from 'react'
import { statusUpdatedTaskFragment } from 'web/apollo/fragments/taskFragments'
import { getUpdatedPercentComplete } from '../ProcessBoard.helpers'

const TASK_UPDATED = gql`
  subscription taskUpdated($processId: ID!) {
    taskUpdated(processId: $processId) {
      ...StatusUpdatedTask
    }
  }
  ${statusUpdatedTaskFragment}
`

/**
 * Takes a subscribe to more functions from the process query and subscribes
 * to taskUpdated event
 * @param {function} subscribeToMore
 * @category Hooks - Web
 * @module useProcessSubscriptions
 */
export function useProcessSubscriptions(subscribeToMore, processId) {
  useEffect(() => {
    if (processId) {
      subscribeToMore({
        document: TASK_UPDATED,
        variables: { processId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev
          const newTask = subscriptionData.data.taskUpdated
          const currentStage = prev.process.stages.find(
            (stage) => stage.id === newTask.stageId
          )
          const updatedStage = {
            ...currentStage,
            percentComplete: getUpdatedPercentComplete(currentStage, newTask)
          }
          return {
            ...prev,
            process: {
              ...prev.process,
              stages: prev.process.stages.map((stage) =>
                stage.id === updatedStage.id ? updatedStage : stage
              )
            }
          }
        }
      })
    }
  }, [subscribeToMore, processId])
}
