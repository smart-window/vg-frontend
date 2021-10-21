import stringFormatter from 'shared/services/stringFormatter'
/**
 * Contains utility functions to manipulate time entry data.
 * @category Services
 * @module timeEntriesHelper
 */
export default {
  collapseTimeEntriesByDate,
  collapseTimeEntriesForChart,
  addWeekendEntries
}

/**
 * Returns an object of time entries by date with aggregated hours by time type
 * Specifically for use in calendar component
 * @param {object} timeEntries returned entries from graphQL request
 * @returns {object} e.g.{
 *  '2020-10-10': {
 *    totals: { "work time": 8, "break time": 1, "planned absence": 0},
 *    marked: true}}
 */
function collapseTimeEntriesByDate(timeEntries) {
  const cleanedEntries = {}

  timeEntries.forEach(entry => {
    const dateString = entry.eventDate.split('T')[0]
    if (!cleanedEntries[dateString]) cleanedEntries[dateString] = { totals: {} }
    const timeType = stringFormatter.capitalizeEveryWord(entry.timeType.slug)
    if (!cleanedEntries[dateString].totals[timeType]) cleanedEntries[dateString].totals[timeType] = []
    cleanedEntries[dateString].totals[timeType].push(
      {
        [timeType]: entry.totalHours,
        id: entry.id
      }
    )
    cleanedEntries[dateString].marked = true
  })

  return cleanedEntries
}

/**
 * Returns an object of time entries by time type with aggregated hours by date
 * Specifically for use in the time chart component
 * @param {array} timeEntries - array of time entry objects within the weekly range
 * @param {array} daysOfTheWeek - array of date strings indicating
 */
function collapseTimeEntriesForChart(timeEntries, daysOfTheWeek) {
  const cleanedEntries = {}

  timeEntries.forEach(entry => {
    const timeType = entry.timeType.slug
    const dateString = entry.eventDate
    if (!cleanedEntries[timeType]) {
      const daysAsObject = {}
      daysOfTheWeek.forEach(day => {
        daysAsObject[day] = 0
      })
      cleanedEntries[timeType] = daysAsObject
    }
    cleanedEntries[timeType][dateString] += entry.totalHours
  })

  return cleanedEntries
}

/**
 * Returns an object of time entries with weekend hour calculations
 * Specifically for use in the time chart component, weekends are a gray bar that fill up to a 12 hour time slot
 * @param {array} timeEntries - array of time entry objects within the weekly range
 * @param {array} daysOfTheWeek - array of date strings indicating
 */
function addWeekendEntries(timeEntries, daysOfTheWeek) {
  const weekends = {}

  daysOfTheWeek.forEach(day => {
    const splitDay = day.split('-')
    const date = new Date(splitDay[0], splitDay[1] - 1, splitDay[2])
    // TODO: get weekend days from fetched time policy
    const isDateWeekend = date.getDay() === 0 || date.getDay() === 6
    if (isDateWeekend) {
      const timeLogged = Object.keys(timeEntries).reduce((sum, timeType) => {
        sum += timeEntries[timeType][day] || 0
        return sum
      }, 0)
      weekends[day] = 12 - timeLogged
    }
  })

  timeEntries.weekends = weekends
  return timeEntries
}