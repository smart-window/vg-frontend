import React, {useEffect, useContext, useRef, useState} from 'react'
import {useQuery, gql} from '@apollo/client'
import analyticsService from 'web/services/analyticsService'
import stringFormatter from 'shared/services/stringFormatter'

import {timeEntriesPageFragment} from 'web/apollo/fragments/timeEntryFragments'
import {GlobalLoaderContext} from 'shared/providers/GlobalLoaderProvider'
import TimeTrackingFilter from 'web/components/TimeTrackingFilter/TimeTrackingFilter.js'
import Grid from 'web/modules/Grid/Grid'
import GridHelpers from 'web/modules/Grid/Grid.helpers'
import DownloadIcon from 'web/components/DynamicIcons/DownloadIcon'
import LightBulbIcon from 'web/components/DynamicIcons/LightBulbIcon'
import exportConstants from 'shared/constants/exportConstants'

import blurredTable from 'assets/images/blurred-table.png'
import {
  DivTimeTrackingReport,
  DivFilterContainer,
  DivHeaderContainer,
  DivRecordsContainer,
  DivGrayHeader,
  SectionEmptyState,
  DivEmptyStateInstructions,
  DivDownloadContainer
} from './TimeTrackingReport.styles'
import useTimeEntriesSubscriptions from './hooks/useTimeEntriesSubscriptions'
import usePageSize from 'web/modules/Grid/hooks/usePageSize'

const timeTrackingGridColumnConfig = [
  {fieldName: 'userFullName', title: 'Employee Name', columnWidth: '15%', sortable: true},
  {fieldName: 'userClientName', title: 'Client', columnWidth: '17%', sortable: true},
  // {fieldName: 'region', title: 'Region', columnWidth: '8%', sortable: true},
  {fieldName: 'userWorkAddressCountryName', title: 'Country', columnWidth: '10%', sortable: true},
  {fieldName: 'eventDate', title: 'Time Entry Date', columnWidth: '13%', sortable: true},
  {fieldName: 'totalHours', title: 'Hours', columnWidth: '7%', sortable: true},
  {fieldName: 'timeTypeSlug', title: 'Time Category', columnWidth: '12%', sortable: true},
  {fieldName: 'description', title: 'Description', columnWidth: '26%'},
]

export const TIME_ENTRIES_PAGED_QUERY = gql`
  query TimeEntries(
    $pageSize: Int!
    $sortColumn: String!
    $sortDirection: String!
    $lastId: ID
    $lastValue: String
    $filterBy: [FilterBy]
    $searchBy: String
  ) {
    timeEntriesReport(
      pageSize: $pageSize
      sortColumn: $sortColumn
      sortDirection: $sortDirection
      lastId: $lastId
      lastValue: $lastValue
      filterBy: $filterBy
      searchBy: $searchBy
    ) {
      row_count
      time_entry_report_items {
        ...TimeEntriesPageTimeEntry
      }
    }
  }
  ${timeEntriesPageFragment}
`

/**
 * Renders time tracking report
 * @category Components - Web
 * @namespace TimeTrackingReport
 */
export default function TimeTrackingReport() {
  const {setIsLoading} = useContext(GlobalLoaderContext)

  useEffect(function didMount() {
    setIsLoading(false)
  }, [setIsLoading])

  const gridRef = useRef()
  let pageSize = usePageSize(gridRef)
  if (!pageSize) {
    // this seems to avoid the sporadic "Data not found" condition
    // even when data exists
    pageSize = 50
  }

  const [pageNumber, setPageNumber] = useState(1)
  const [sortColumn, setSortColumn] = useState('eventDate')
  const [sortDirection, setSortDirection] = useState('desc')
  const [searchTerm, setSearchTerm] = useState(null)
  const [filters, setFilters] = useState([])
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [selectAllChecked, setSelectAllChecked] = useState(false)

  const {
    fetchMore: fetchMoreTimeEntries,
    subscribeToMore,
    data: {timeEntriesReport = {}} = {},
    loading
  } = useQuery(TIME_ENTRIES_PAGED_QUERY, {
    fetchPolicy: 'cache-first',
    variables: {
      pageSize: pageNumber * pageSize,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      filterBy: filters,
      searchBy: searchTerm
    }
  })
  const {time_entry_report_items = [], row_count = 0} = timeEntriesReport

  useTimeEntriesSubscriptions(subscribeToMore)

  /**
   * Use Apollo's fetchMore() function to update useQuery().data with the next page, if more records exist.
   * Merge logic for this query can be found in web/config/apolloConfig
   */
  async function handleScrollEnd() {
    if (time_entry_report_items.length < row_count) {
      const lastTimeEntry = time_entry_report_items[time_entry_report_items.length - 1]
      // update # of records fetched so far so we can get all pages on a sort change
      setPageNumber(pageNumber + 1)
      await fetchMoreTimeEntries({
        variables: {
          pageSize,
          lastId: +lastTimeEntry.id,
          lastValue: sortColumn === 'userFullName' ? lastTimeEntry.userLastName : lastTimeEntry[sortColumn]
        }
      })
    }
  }

  /**
   * Callback for <Grid>'s handleSortChange
   * @param {object} columnData passed in objects in column config
   * @param {string} fieldDirection e.g. 'asc'
   */
  function handleSortChange(columnData, fieldDirection) {
    setSortColumn(columnData.fieldName)
    setSortDirection(fieldDirection)
    analyticsService.logEvent('Time Tracking', 'Clicked', `Sort_${stringFormatter.removeSpaces(columnData.title)}`)
  }

  /**
   * Callback for handling a search on the report
   * @param {string} searchTerm e.g. 'search term'
   */
  function handleSearchChange(searchTerm) {
    setSearchTerm(searchTerm)
    setSelectAllChecked(false)
    setSelectedRows(new Set())
    if (searchTerm !== '') analyticsService.logEvent('Time Tracking', 'Clicked', 'Search_EnterSearch')
  }

  /**
   * Callback for handling a filter set on the report
   * @param {array} filters
   */
  function handleFilterChange(filters) {
    setSelectAllChecked(false)
    setSelectedRows(new Set())
    setFilters(filters)
  }

  /**
   * Handle csv export of data.
   */
  function handleExportCSV() {
    analyticsService.logEvent('Time Tracking', 'Clicked', `Export_CSV`)
    GridHelpers.exportDataAsCSV({
      selectedRows: selectAllChecked ? null : selectedRows,
      rowData: time_entry_report_items,
      sortColumn,
      sortDirection,
      searchTerm,
      filters,
      filenamePrefix: 'TimeTracking_Export',
      urlPath: exportConstants.TIME_ENTRIES_EXPORT_URL
    })
  }

  // TODO: empty state needs to be within <Grid> with blurred mock data, as opposed to a static image
  const useEmptyState = !loading && !time_entry_report_items.length
  const emptyMessage = 'No data found on Time Tracking report'
  const tableContents = useEmptyState ? (
    <SectionEmptyState>
      <DivGrayHeader />
      <DivEmptyStateInstructions>
        <LightBulbIcon />
        <p><span>Oops! No data found.</span></p>
      </DivEmptyStateInstructions>
      <img src={blurredTable} alt={emptyMessage} />
    </SectionEmptyState>
  ) : (
    <Grid
      containerRef={gridRef}
      columnConfig={timeTrackingGridColumnConfig}
      defaultSortFieldname={'eventDate'}
      handleSortChange={handleSortChange}
      hasSelectAll={true}
      onScrollEnd={handleScrollEnd}
      onSelectedRowsChange={setSelectedRows}
      rowData={time_entry_report_items}
      selectAllChecked={selectAllChecked}
      setSelectAllChecked={setSelectAllChecked}
      selectedRows={selectedRows}
    />
  )

  let numRecords = `${row_count} records.`
  if (selectedRows.size || selectAllChecked) {
    const rowsToUse = selectAllChecked ? 'All' : selectedRows.size
    numRecords = rowsToUse + (rowsToUse === 1 ? ' record selected.' : ' records selected.')
  }

  return (
    <DivTimeTrackingReport>
      <DivHeaderContainer>
        <DivRecordsContainer>
          <p>{numRecords}</p>
          {row_count > 0 &&
            <DivDownloadContainer onClick={handleExportCSV}>
              <p>Download now</p>
              <DownloadIcon/>
            </DivDownloadContainer>
          }
        </DivRecordsContainer>
        <DivFilterContainer>
          <TimeTrackingFilter
            onClear={handleFilterChange}
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
          />
        </DivFilterContainer>
      </DivHeaderContainer>
      {tableContents}
    </DivTimeTrackingReport>
  )
}
