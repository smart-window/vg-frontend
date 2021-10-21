/**
 * Contains utility functions to format strings.
 * @category Services
 * @module stringFormatter
 */
export default {
  capitalizeEveryWord,
  addZeroesToDecimal,
  removeSpaces
}

/**
 * Returns a string where all words are start with a capital letter
 * @param {string} str string to capitalize e.g. capitalize this
 * @returns {string} capitalized string e.g. Capitalize This
 */
function capitalizeEveryWord(str) {
  const splitStr = str ? str.split(/[\s_]+/) : ['']
  for (let i = 0; i < splitStr.length; i++) {
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  // Directly return the joined string
  return splitStr.join(' ')
}

/**
 * Adds zeros to a number if needed
 * @param {string} str - string number to add zeroes to
 * @returns {string} formatted with decimals
 */
function addZeroesToDecimal(str) {
  // Convert input string to a number and store as a variable.
  const shouldUseCommas = str.includes(',')
  str = str.replace(/,/g, '.')
  let value = parseFloat(str)
  // Split the input string into two arrays containing integers/decimals
  const res = str.split('.')
  // If there is no decimal point or only one decimal place found.
  if (res.length === 1 || res[1].length < 3) {
    // Set the number to two decimal places
    value = value.toFixed(2)
  }
  // Return updated or original number.
  return shouldUseCommas ? value.replace(/\./g, ',') : value
}

/**
 * Removes all spaces from a string
 * @param {string} str - string number to remove spaces from
 * @returns {string} formatted string without spaces
 */
function removeSpaces(str) {
  return str.replace(/\s/g, '')
}

/**
 * returns the initials of a given full name
 * @param {string} fullName
 * @returns {string}
 */
export function getInitials(fullName) {
  const [first, last] = fullName.split(' ')
  return first?.charAt(0) + last?.charAt(0)
}
