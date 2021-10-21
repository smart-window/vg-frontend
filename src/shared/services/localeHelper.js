/**
 * Contains utility functions to assist working with locales.
 * @category Services
 * @module localeHelper
 */
export default {
  getSeparator,
  getCSVLineDelimiter
}

/**
 * Calculates a user's group or decimal delimiter by locale, i.e. in "fr-FR" the number 1000.1 should be formatted to 1 000,1
 * @param {string} separatorType - desired type of separator, can be "group" or "decimal"
 * @param {string} locale - if undefined, uses browser's current locale, otherwise can be "fr-FR", "en-US"
 * @returns separator type by locale
 */
function getSeparator(separatorType, locale) {
  const numberWithGroupAndDecimalSeparator = 1000.1
  return Intl.NumberFormat(locale)
    .formatToParts(numberWithGroupAndDecimalSeparator)
    .find(part => part.type === separatorType)
    .value
}

/**
 * Returns an appropriate line delimiter for user's locale
 * @param {string} locale - if undefined, uses browser's current locale, otherwise can be "fr-FR", "en-US"
 * @returns separator type by locale
*/
function getCSVLineDelimiter(locale) {
  const decimalFormat = getSeparator('decimal', locale)
  if (decimalFormat === ',') {
    return ';'
  }
  return ','
}