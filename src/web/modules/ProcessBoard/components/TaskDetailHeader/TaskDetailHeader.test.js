import { render, screen } from '@testing-library/react'
import TaskDetailHeader from './TaskDetailHeader'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

const completeTask = {
  id: '1',
  name: 'Complete Task',
  status: 'completed',
}
const incompleteTask = {
  id: '2',
  name: 'Incomplete Task',
  status: 'not_started',
}

describe('TaskDetailHeader', () => {
  it('should show task name', () => {
    const task = {
      name: 'Current Task',
      dependentTasks: []
    }

    render(
      <MemoryRouter>
        <TaskDetailHeader task={task} />
      </MemoryRouter>
    )

    screen.getByText('Current Task')
  })

  it('should render links to all dependent tasks', () => {
    const task = {
      name: 'Current Task',
      dependentTasks: [incompleteTask, completeTask],
    }

    render(
      <MemoryRouter>
        <TaskDetailHeader task={task} />
      </MemoryRouter>
    )

    screen.getByText('Complete Task', { selector: 'a' })
    screen.getByText('Incomplete Task', { selector: 'a' })
  })
})
