import {
  getDisplayStatus,
  getFlatTasks,
  getUpdatedPercentComplete
} from './ProcessBoard.helpers'

describe('getUpdatedPercentComplete', () => {
  it('should increase percent complete when a task is completed', () => {
    const stage = {
      percentComplete: 0.5,
      tasks: [
        { id: '1', status: 'completed' },
        { id: '2', status: 'completed' },
        { id: '3', status: 'in_progress' },
        { id: '4', status: 'not_started' }
      ]
    }

    const newTask = { id: '3', status: 'completed' }

    expect(getUpdatedPercentComplete(stage, newTask)).toBe(0.75)
  })

  it('should decrease percent complete when a task goes from completed to in_progress', () => {
    const stage = {
      percentComplete: 0.5,
      tasks: [
        { id: '1', status: 'completed' },
        { id: '2', status: 'completed' },
        { id: '3', status: 'in_progress' },
        { id: '4', status: 'not_started' }
      ]
    }

    const newTask = { id: '2', status: 'in_progress' }

    expect(getUpdatedPercentComplete(stage, newTask)).toBe(0.25)
  })

  it('should return the unchanged percent complete when a task updates from not_started to in_progress', () => {
    const stage = {
      percentComplete: 0.5,
      tasks: [
        { id: '1', status: 'completed' },
        { id: '2', status: 'completed' },
        { id: '3', status: 'in_progress' },
        { id: '4', status: 'not_started' }
      ]
    }

    const newTask = { id: '4', status: 'in_progress' }

    expect(getUpdatedPercentComplete(stage, newTask)).toBe(0.5)
  })
})

describe('getDisplayStatus', () => {
  it('should remove underscores from the status and replace them with spaces', () => {
    expect(getDisplayStatus('in_progress')).toBe('in progress')
    expect(getDisplayStatus('not_started')).toBe('not started')
  })

  it('should do nothing if the status has no underscores', () => {
    expect(getDisplayStatus('completed')).toBe('completed')
  })
})

describe('getFlatTasks', () => {
  it('should return all the tasks from multiple stages into one single array', () => {
    const stages = [
      {
        percentComplete: 0.5,
        tasks: [
          { id: '1', status: 'completed' },
          { id: '2', status: 'completed' },
          { id: '3', status: 'in_progress' },
          { id: '4', status: 'not_started' }
        ]
      },
      {
        percentComplete: 0.75,
        tasks: [
          { id: '5', status: 'completed' },
          { id: '6', status: 'completed' },
          { id: '7', status: 'completed' },
          { id: '8', status: 'not_started' }
        ]
      }
    ]
    expect(getFlatTasks(stages)).toEqual([
      { id: '1', status: 'completed' },
      { id: '2', status: 'completed' },
      { id: '3', status: 'in_progress' },
      { id: '4', status: 'not_started' },
      { id: '5', status: 'completed' },
      { id: '6', status: 'completed' },
      { id: '7', status: 'completed' },
      { id: '8', status: 'not_started' }
    ])
  })
})
