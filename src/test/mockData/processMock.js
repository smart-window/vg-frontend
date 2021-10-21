import { PROCESS_QUERY } from 'web/modules/ProcessBoard/ProcessBoard'
import { TASK_UPDATE_STATUS_MUTATION } from 'web/modules/ProcessBoard/components/Task/Task'

export const processMock = () => ({
  request: {
    query: PROCESS_QUERY,
    variables: {
      id: '1'
    }
  },
  result: {
    data: {
      process: {
        __typename: 'Process',
        id: '1',
        name: null,
        services: [],
        stages: [
          {
            __typename: 'Stage',
            id: '3',
            name: 'Do the the thing',
            percentComplete: 1.0,
            tasks: [
              {
                __typename: 'Task',
                completionType: 'check_off',
                id: '3',
                knowledgeArticles: [
                  {
                    __typename: 'KnowledgeArticle',
                    url: 'https://google.com'
                  }
                ],
                name: 'Ninja',
                type: 'email_template',
                stageId: '3',
                status: 'completed',
                taskAssignments: [],
                dependentTasks: []
              }
            ]
          },
          {
            __typename: 'Stage',
            id: '2',
            name: 'You are getting it',
            percentComplete: 1.0,
            tasks: [
              {
                __typename: 'Task',
                completionType: 'check_off',
                id: '2',
                knowledgeArticles: [
                  {
                    __typename: 'KnowledgeArticle',
                    url: 'https://google.com'
                  }
                ],
                name: 'Termination',
                type: 'email_template',
                stageId: '2',
                status: 'completed',
                taskAssignments: [],
                dependentTasks: []
              }
            ]
          },
          {
            __typename: 'Stage',
            id: '1',
            name: 'Finished',
            percentComplete: 1.0,
            tasks: [
              {
                __typename: 'Task',
                completionType: 'check_off',
                id: '1',
                knowledgeArticles: [
                  {
                    __typename: 'KnowledgeArticle',
                    url: 'https://google.com'
                  }
                ],
                name: 'Dingo',
                type: 'email_template',
                stageId: '1',
                status: 'not_started',
                taskAssignments: [
                  {
                    __typename: 'TaskAssignment',
                    id: '1',
                    user: { __typename: 'User', fullName: 'John Doe', id: '1'}
                  }
                ],
                dependentTasks: []
              }
            ]
          }
        ]
      }
    }
  }
})

export const updateTaskStatusMock = (status) => ({
  request: {
    query: TASK_UPDATE_STATUS_MUTATION,
    variables: {
      taskId: '1',
      status
    }
  },
  newData: jest.fn(() => ({
    id: '1',
    stageId: '1',
    status
  }))
})
