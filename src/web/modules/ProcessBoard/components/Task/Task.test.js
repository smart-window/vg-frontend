import React from 'react'
import { render, screen } from '@testing-library/react'
import Task from './Task'
import { MemoryRouter } from 'react-router-dom'

const taskNotStarted = {
  __typename: 'Task',
  completionType: 'check_off',
  id: '1',
  knowledgeArticles: [
    {
      __typename: 'KnowledgeArticle',
      url: 'https://google.com'
    }
  ],
  name: 'Ninja',
  stageId: '3',
  status: 'not_started',
  taskAssignments: []
}

describe('Task', () => {
  it('display the task name', () => {
    render(<MemoryRouter><Task task={taskNotStarted}/></MemoryRouter>)

    screen.getByText('Ninja')
  })
})
