import React from 'react'
import { render, screen } from '@testing-library/react'
import Stage from './Stage'
import { MockedProvider } from '@apollo/client/testing'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'

const stage = {
  __typename: 'Stage',
  id: '3',
  name: 'Do the the thing',
  percentComplete: 0.5,
  tasks: [
    {
      __typename: 'Task',
      completionType: 'check_off',
      id: '3',
      knowledgeArticles: [
        {
          __typename: 'KnowledgeArticle',
          url: 'https://google.com',
        },
      ],
      name: 'Ninja',
      stageId: '3',
      status: 'completed',
      taskAssignments: [],
    },
    {
      __typename: 'Task',
      completionType: 'check_off',
      id: '2',
      knowledgeArticles: [
        {
          __typename: 'KnowledgeArticle',
          url: 'https://google.com',
        },
      ],
      name: 'Termination',
      stageId: '2',
      status: 'not_started',
      taskAssignments: [],
    },
  ],
}

describe('Stage', () => {
  it('should display the name', () => {
    render(
      <MockedProvider>
        <Stage stage={stage} />
      </MockedProvider>
    )
    screen.getByText('Do the the thing')
  })
  it('should display the tasks of the given stage', () => {
    render(
      <MemoryRouter>
        <MockedProvider>
          <Stage stage={stage} isActive={true} />
        </MockedProvider>
      </MemoryRouter>
    )

    screen.getByText('Ninja')
    screen.getByText('Termination')
  })
})
