/**
 * Helper functions to be used by components in the ProcessBoard
 *
 * @category Modules - Web
 * @subcategory ProcessBoard
 * @module ProcessHelpers
 */

/**
 * takes a status removes underscores.
 * @param {string} status
 */
export function getDisplayStatus(status) {
  return status.replace('_', ' ')
}

/**
 * returns a flat list of all the tasks in the given stages
 * @param {array} stages
 * @returns array
 */
export function getFlatTasks(stages) {
  let tasks = []
  stages.forEach(stage => {
    tasks = [...tasks, ...stage.tasks]
  })
  return tasks
}

/**
 * Updates the percentcomplete of a stage given a newTask is updated
 * @param {object} stage
 * @param {object} newTask
 */
export function getUpdatedPercentComplete(stage, newTask) {
  const totalTasks = stage.tasks.length
  const completedTasks = stage.tasks.reduce(
    (totalComplete, task) =>
      taskIsCompleted(task, newTask) ? ++totalComplete : totalComplete,
    0
  )

  return completedTasks / totalTasks
}

function taskIsCompleted(task, newTask) {
  return newTask.id === task.id
    ? newTask.status === 'completed'
    : task.status === 'completed'
}

export const tempMockData = {
  clientAccountManager: 'Guy Strong',
  salesAssociate: 'Anna Farrah',
  user: {
    fullName: 'Preston Garvey',
    clientName: 'Cyber X',
    contractId: '00-900-1214452',
    partnerName: 'Global Partners in Hiring LLC',
    countryName: 'Great Britain',
    startDate: '12 Aug 2021',
  },
  services: [
    {
      id: '1',
      name: 'Benefits',
      enabled: true,
    },
    {
      id: '1',
      name: 'Immigration',
      enabled: false,
    },
  ],
  assignments: [
    {
      id: '1',
      user: {
        fullName: 'Alaina Botsford',
        id: '1',
      },
    },
    {
      id: '2',
      user: {
        fullName: 'Malcom Medio',
        id: '1',
      },
    },
    {
      id: '3',
      user: {
        fullName: 'Peter Cohn',
        id: '1',
      },
    },
    {
      id: '4',
      user: {
        fullName: 'Yu Lee',
        id: '1',
      },
    },
  ],
  percentComplete: 0.74,
}