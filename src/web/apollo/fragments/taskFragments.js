import { gql } from '@apollo/client'

/**
 * This file consists of all fragments created on the Task typename.
 * @category Apollo - Web
 */

/**
 * These are the fields used for tasks displayed on the process board.
 */
export const processBoardTaskFragment = gql`
  fragment ProcessBoardTask on Task {
    completionType
    id
    knowledgeArticles {
      url
    }
    name
    type
    stageId
    status
    dependentTasks {
      id
      name
      status
    }
    taskAssignments {
      id
      user {
        id
        fullName
      }
    }
  }
`

/**
 * These are the fields needed when updating the status of a task.
 */
export const statusUpdatedTaskFragment = gql`
  fragment StatusUpdatedTask on Task {
    id
    stageId
    status
  }
`
