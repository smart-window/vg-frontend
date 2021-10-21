import {measurements} from 'shared/constants/cssConstants'
import oktaService from 'web/services/oktaService'
import localeHelper from 'shared/services/localeHelper.js'

/**
 * Helper functions to be used by components that import <Grid>
 *
 * @category Modules - Web
 * @subcategory Grid
 * @module GridHelpers
 */

/**
 * Calculates the page size (in number of records) based on the grid current height and row/header height.
 * @param {object} gridContainerRef react ref to the <Grid> outer <section>
 * @returns {number} integer representing the number of records/rows that can fit in the current grid area
 */
function getPageSize(gridContainerRef) {
  if (gridContainerRef.current) {
    // subtract grid header size
    const availableRowsHeight = gridContainerRef.current.clientHeight - measurements.reportGridRowHeight
    // add 3px row border-bottom
    const actualRowHeight = measurements.reportGridRowHeight + 3
    return Math.ceil(availableRowsHeight / actualRowHeight)
  }
}

/**
 * Handle csv export of data. No selected rows means that all rows
 * matching the current criteria (filter and search) will be downloaded
 * using the current sort field. Otherwise only those rows selected
 * will be downloaded using the current sort field.
 * @param {object} options - the export csv options
 *   rowData: {object[]} - the row data (optional)
 *   selectedRows: {number Set or []} - indices into rowData (optional unless rowData provided)
 *   sortColumn: {string} - column on which to sort (required)
 *   sortDirection: {string} - direction of sort (required)
 *   searchTerm: {string} - search string (optional)
 *   filters: {object[]} - filters to apply (optional)
 *   filenamePrefix: {string} - prefix to use for download filename (required)
 *   urlPath: {string} - url path to use
 */
function exportDataAsCSV(options) {
  let idsParam = null
  if (options.selectedRows && options.selectedRows.size) {
    idsParam = [...options.selectedRows].reduce((acc, recordId) => acc !== '' ? acc + ',' + recordId : '' + recordId, '')
    idsParam = 'ids=' + encodeURIComponent(idsParam)
  }
  const csvDelimeterType = 'csv_delimiter=' + localeHelper.getCSVLineDelimiter(navigator.language)
  const sortColumnParam = 'sort_column=' + encodeURIComponent(options.sortColumn)
  const sortDirectionParam = 'sort_direction=' + encodeURIComponent(options.sortDirection)
  // NOTE: if ids selected searchBy and filterBy can be left out
  const searchByParam = !idsParam && options.searchTerm ? ('search_by=' + encodeURIComponent(options.searchTerm)) : null
  const filterByParam = (options.filters && options.filters.length) ? 'filter_by=' + options.filters.reduce((filterBy, filter) => { return filterBy + (filterBy ? ';' : '') + filter.name + '|' + filter.value }, '') : null
  const now = new Date()
  const filename = 'filename=' + options.filenamePrefix + '_' + encodeURIComponent(now.toLocaleDateString(navigator.language, { month: '2-digit', day: '2-digit', year: 'numeric' }).replaceAll('/', '-') + '.csv')
  const token = 'token=' + encodeURIComponent(oktaService.getBearerToken())
  const params = sortColumnParam
          + '&' + sortDirectionParam
          + (filterByParam ? '&' + filterByParam : '')
          + (searchByParam ? '&' + searchByParam : '')
          + (idsParam ? '&' + idsParam : '')
          + '&' + filename
          + '&' + csvDelimeterType
          + '&' + token
  const a = document.createElement('a')
  a.href = process.env.REACT_APP_API_HOST + options.urlPath + '?' + params
  a.click()
}

export default {
  getPageSize,
  exportDataAsCSV
}
