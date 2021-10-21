import { render, screen } from '@testing-library/react'
import DependentTaskOverlay from './DependentTaskOverlay'
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

describe('DependentTaskOverlay', () => {
  it('should show overlay if a dependent task is incomplete', () => {
    const task = {
      dependentTasks: [incompleteTask],
    }

    render(
      <MemoryRouter>
        <DependentTaskOverlay task={task} />
      </MemoryRouter>
    )

    screen.getByText('You cannot complete this step until', { exact: false })
  })

  it('should not render if dependent tasks are complete', () => {
    const task = {
      dependentTasks: [completeTask],
    }

    render(
      <MemoryRouter>
        <DependentTaskOverlay task={task} />
      </MemoryRouter>
    )

    expect(screen.queryByText('You cannot complete this step until', { exact: false })).toBe(null)
  })

  it('should render links to all dependent tasks if a dependent task is incomplete', () => {
    const task = {
      dependentTasks: [incompleteTask, completeTask],
    }

    render(
      <MemoryRouter>
        <DependentTaskOverlay task={task} />
      </MemoryRouter>
    )

    screen.getByText('Complete Task', { selector: 'a' })
    screen.getByText('Incomplete Task', { selector: 'a' })
  })
})
