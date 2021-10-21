import React from 'react'
import { render, screen } from '@testing-library/react'
import TaskAssignments from './TaskAssignments'

describe('TaskAssignments', () => {
  it('should show the initials of each task assignment user', () => {
    render(
      <TaskAssignments
        taskAssignments={[
          { id: '1', user: { fullName: 'John Doe' } },
          { id: '2', user: { fullName: 'T Pain' } }
        ]}
      />
    )

    screen.getByText('TP')
    screen.getByText('JD')
  })
})
