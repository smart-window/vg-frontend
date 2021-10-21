/**
 * Contains utility functions to validate inputs.
 * @category Services
 * @module inputValidationHelper
 */
export default {
  regexValidNumberWithMaxTwoDecimals
}

/**
 * Returns a regex checking for only numbers and a max of two decimal points
 * @returns {regex}
 */
function regexValidNumberWithMaxTwoDecimals() {
  return /^(\d+)?([.,]?\d{0,2})?$/
}