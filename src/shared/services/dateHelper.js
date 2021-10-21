/**
 * Contains utility functions to assist working with dates.
 * @category Services
 * @module dateHelper
 */
export default {
  addDaysToDate,
  addSecondsToCurrentDate,
  formatBirthdate,
  getMonthAndYear,
  getDateStringWithMonthName,
  getDateStringForTimezone,
  getDateStringForMT,
  getTextStringFromNumericDateString,
  getISOStringDate,
  getStringDate,
  getTimeIntervalString,
  getTimeIntervalStringFromNow,
  getWeekDays,
  substractDaysFromDate,
  addDaysFromDate,
  getMonthStartDay,
  getMonthEndDay,
  getCurrentDateFromLastYear,
  getMultipleDays,
  getNumDaysAgo,
  convertAPIDateToDate,
  dateStringIsAPIFormat
}

const SECONDS_IN_MINUTE = 60
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60
const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24
const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24

/**
 * Returns a new date advanced by a given number of days
 * @param {Date} date
 * @param {days} integer
 * @returns {date} e.g. 'Wed Oct 14 2020 19:54:05 GMT-0600 (Mountain Daylight Time)'
 */
function addDaysToDate(date, days) {
  return new Date(date.setDate(date.getDate() + days))
}

/**
 * Set expiration date of Okta auth state to now plus the expiration time returned upon request.
 * @param {number} expiresIn - number of seconds to add to current date.
 * @returns {object} Date - Date object with added seconds.
*/
function addSecondsToCurrentDate(expiresIn) {
  const now = new Date()
  return now.setSeconds(now.getSeconds() + expiresIn)
}

/**
 * Format birthdate from the API response of YYYY-MM-DD to DD/MM/YYYY
 * @param {string} birthdate - birthdate string in YYYY-MM-DD format.
 * @returns {string} - birthdate string in DD/MM/YYYY format.
*/
function formatBirthdate(birthdate) {
  const splitDates = birthdate.split('-')
  return splitDates[2] + '/' + splitDates[1] + '/' + splitDates[0]
}

/**
 * Returns a date string in the format 'DD MMM YYYY at HH:MM ZZZ' based
 * on the given timezone and locale.
 *
 * TODO: revisit format when we implement locale - we are currently kind of forcing a
 *   standard format (see the below logic to rearrange month and day),
 *   but toLocaleString is actually able to give us the correct format for the user's locale.
 *
 * @param {Date} date object to convert to timezone string
 * @param {string} timeZoneDatabaseName e.g. 'America/Denver'
 * @param {string} locale default is 'en-US'
 * @returns {string} formatted date string e.g. '8 Nov 2020 at 04:20 EST'
 */
function getDateStringForTimezone(date, timeZoneDatabaseName, locale = 'en-US', hideTime=false) {
  let convertedDateString = date.toLocaleString(locale, {
    timeZone: timeZoneDatabaseName,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    hour12: false,
    minute: '2-digit',
    timeZoneName: 'short'
  })
  // strip commas from toLocaleString format
  convertedDateString = convertedDateString.replace(/,/g, '')

  // swap order of month and day (to match design)
  const dateElements = convertedDateString.split(' ')

  const month = dateElements[0]
  dateElements[0] = dateElements[1]
  dateElements[1] = month
  if (hideTime) {
    convertedDateString = dateElements.slice(0, 3).join(' ')
  }
  else {
    // add 'at' between year and time (design)
    const year = dateElements[2]
    dateElements[2] = year + ' at'
    convertedDateString = dateElements.join(' ')
  }

  return convertedDateString
}

/**
 * Returns a date string in the format 'DD MMM YYYY at HH:MM M(S||D)T'
 * @param {Date} date object to convert to MT string
 * @returns {string} converted MT date string e.g. '8 Oct 2020 at 03:45 MDT'
 */
function getDateStringForMT(date, hideTime = false) {
  return getDateStringForTimezone(date, 'America/Denver', 'en-US', hideTime)
}

/**
 * Takes a string like 2020-12-03 and converts it to a string like 3 December 2020
 * @param {string} numericString e.g. 2020-12-03
 * @returns text format for date e.g. 3 December 2020
 */
function getTextStringFromNumericDateString(numericString) {
  // Parsing here as parsing date strings with new Date() is strongly discouraged (MDN Date docs)
  const dateParts = numericString.split('-')
  // this will produce the format December 3, 2020
  let baseString = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]).toLocaleString('default', {
    day: 'numeric',
    year: 'numeric',
    month: 'long'
  })

  // strip comma
  baseString = baseString.replace(/,/g, '')
  // swap order of month and day (to match design)
  const dateElements = baseString.split(' ')
  return [dateElements[1], dateElements[0], dateElements[2]].join(' ')

}

/**
 * Get an array of Date objects, representing the week the given day falls under.
 * @param {object} selectedDate - a Date object representing the date selected on the calendar.
 * @param {number} indexOfWeekStart - an index representing the start of the week. 0 for Sunday, 1 for Monday
 * @returns {array} - array of Date objects holding each day of the week that was selected.
*/
function getWeekDays(selectedDate) {
  const week = []

  for (let i = 0; i <= 6; i++) {
    const first = selectedDate.getDate() - selectedDate.getDay() + i
    const day = getStringDate(new Date(selectedDate.setDate(first)))
    week.push(day)
  }
  return week
}

/**
 * Returns an array of dates within and including the start and end date
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {array} an array with dates
 */
function getMultipleDays(startDate, endDate) {
  const days = []
  let currentDate = startDate
  while (currentDate <= endDate) {
    days.push(getStringDate(new Date(currentDate)))
    currentDate = addDaysToDate(currentDate, 1)
  }
  return days
}

/**
 * Returns a string in the format yyyy-mm-dd, timezone is not considered
 * @param {Date} date
 * @returns {string} e.g. '2020-10-14'
 */
function getISOStringDate(date) {
  return date.toISOString().substr(0, 10)
}

/**
 * Returns a string in the format yyyy-mm-dd, timezone is considered
 * @param {Date} date
 * @returns {string} e.g. '2020-10-14'
 */
function getStringDate(date) {
  if (!date) return null
  let stringDate = date.getDate().toString()
  let stringMonth = (date.getMonth() + 1).toString()
  if (stringDate.length === 1) stringDate = '0' + stringDate
  if (stringMonth.length === 1) stringMonth = '0' + stringMonth
  const dateString = `${date.getFullYear()}-${stringMonth}-${stringDate}`
  return dateString
}

/**
 * Returns human-readable time interval from date-time range.
 * @param {Date} startDate start of range
 * @param {End} endDate end of range
 * @returns {string} e.g. '11h ago'
 */
function getTimeIntervalString(startDate, endDate) {
  if (!startDate || !endDate || (endDate < startDate)) {
    return null
  }
  const timeDifferenceInSeconds = Math.round((endDate - startDate) / 1000)
  const timeDifferenceInMinutes = Math.round(timeDifferenceInSeconds / 60)
  const timeDifferenceInHours = Math.round(timeDifferenceInMinutes / 60)
  const timeDifferenceInDays = Math.round(timeDifferenceInHours / 24)

  if (timeDifferenceInSeconds <= SECONDS_IN_MINUTE) {
    return timeDifferenceInSeconds + 's ago'
  }
  else if (timeDifferenceInSeconds <= SECONDS_IN_HOUR) {
    return timeDifferenceInMinutes + 'm ago'
  }
  else if (timeDifferenceInSeconds <= SECONDS_IN_DAY) {
    return timeDifferenceInHours + 'h ago'
  }
  else {
    return timeDifferenceInDays + 'd ago'
  }
}

/**
 * Returns human-readable time difference between given Date object and now.
 * @param {Date} startDate
 * @returns {string} e.g. '11h ago'
 */
function getTimeIntervalStringFromNow(startDate) {
  return getTimeIntervalString(startDate, new Date())
}

/**
 * Returns a new date minus a given number of days
 * @param {Date} date
 * @param {days} integer
 * @returns {date} e.g. 'Wed Oct 14 2020 19:54:05 GMT-0600 (Mountain Daylight Time)'
 */
function substractDaysFromDate(date, days) {
  return new Date(date.setDate(date.getDate() - days))
}

/**
 * Returns a new date plus a given number of days
 * @param {Date} date
 * @param {days} integer
 * @returns {date} e.g. 'Wed Oct 14 2020 19:54:05 GMT-0600 (Mountain Daylight Time)'
 */
function addDaysFromDate(date, days) {
  return new Date(date.setDate(date.getDate() + days))
}

/**
 * Returns month from Date according to localization
 * @param {Date} date
 * @returns {string} - month name (long)
*/
function getMonthAndYear(date, locale='default') {
  return new Date(date).toLocaleString(locale, { year: 'numeric', month: 'long' })
}

/**
 * Returns date string with year, long month name and numeric date
 * @param {Date} date
 * @param {string} monthFormat - format of month either 'short' or 'long'
 * @param {string} dayFormat - format of day either 'numeric' or '2-digit'
 * @param {string} locale - locale to format string to
 * @returns {string} - December 10, 2020
*/
function getDateStringWithMonthName(date, monthFormat='long', dayFormat='2-digit', locale='default') {
  return new Date(date).toLocaleString(locale, { year: 'numeric', month: monthFormat, day: dayFormat })
}

/**
 * Returns month start date
 * @param {Date} date - reference date to get the month start date
 * @returns {string} - month start date in string format "2020-11-01"
*/
function getMonthStartDay(date, toString=true) {
  if (!date) date = new Date()
  const dateCopy = new Date(date)
  const firstDay = new Date(dateCopy.getFullYear(), dateCopy.getMonth(), 1)
  return toString ? getStringDate(firstDay) : firstDay
}

/**
 * Returns month start date
 * @param {Date} date - reference date to get the month start date
 * @returns {string} - month start date in string format "2020-11-30"
*/
function getMonthEndDay(date) {
  if (!date) date = new Date()
  const dateCopy = new Date(date)
  const lastDay = new Date(dateCopy.getFullYear(), dateCopy.getMonth() + 1, 0)
  return getStringDate(lastDay)
}

/**
 * Returns the current date from last year
 * @returns {Date} date - the current date from last year
 */
function getCurrentDateFromLastYear() {
  const today = new Date()
  const lastYearToday = today.setFullYear(today.getFullYear() - 1)
  return lastYearToday
}

/**
 * Get the number of days the provided date differs from the current date (now).
 * @param {Date} date - the date to check
 * @returns {integer} - the number of days between provided date and now
 */
function getNumDaysAgo(date) {
  const dateInMs = new Date(date).getTime()
  const todayInMs = new Date().getTime()
  return Math.ceil((dateInMs - todayInMs) / MILLISECONDS_IN_DAY)
}

/**
 * Convert the API Date format YYYY-MM-DD to a date object
 * @param {Date} date - the date to check
 * @returns {integer} - the number of days between provided date and now
 */
function convertAPIDateToDate(date) {
  const splitDate = date.split('-')
  return new Date(splitDate[0], (+splitDate[1] - 1), splitDate[2])
}

/**
 * Returns true if given string is in the format 'YYYY-MM-DD'
 * @param {string} dateString
 */
function dateStringIsAPIFormat(dateString) {
  return typeof dateString === 'string' && (/^\d{4}-\d{2}-\d{2}$/.test(dateString))
}