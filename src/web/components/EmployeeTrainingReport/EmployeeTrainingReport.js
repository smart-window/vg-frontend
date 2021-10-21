import React, {useEffect, useContext, useRef, useState} from 'react'
import {useQuery, gql} from '@apollo/client'
import analyticsService from 'web/services/analyticsService'

import {GlobalLoaderContext} from 'shared/providers/GlobalLoaderProvider'
import EmployeeTrainingFilter from 'web/components/EmployeeTrainingFilter/EmployeeTrainingFilter'
import Grid from 'web/modules/Grid/Grid'
import GridHelpers from 'web/modules/Grid/Grid.helpers'
import DownloadIcon from 'web/components/DynamicIcons/DownloadIcon'
import LightBulbIcon from 'web/components/DynamicIcons/LightBulbIcon'
import stringFormatter from 'shared/services/stringFormatter'
import exportConstants from 'shared/constants/exportConstants'

import blurredTable from 'assets/images/blurred-table.png'
import {
  DivEmployeeTrainingReport,
  DivFilterContainer,
  DivHeaderContainer,
  DivRecordsContainer,
  DivGrayHeader,
  SectionEmptyState,
  DivEmptyStateInstructions,
  DivDownloadContainer
} from './EmployeeTrainingReport.styles'
import usePageSize from 'web/modules/Grid/hooks/usePageSize'

const employeeTrainingGridColumnConfig = [
  {fieldName: 'userFullName', title: 'Employee Name', columnWidth: '14%', sortable: true},
  {fieldName: 'partner', title: 'Partner', columnWidth: '14%', sortable: true},
  {fieldName: 'userClientName', title: 'Client', columnWidth: '14%', sortable: true},
  {fieldName: 'userWorkAddressCountryName', title: 'Country', columnWidth: '14%', sortable: true},
  {fieldName: 'trainingName', title: 'Module Name', columnWidth: '14%', sortable: true},
  {fieldName: 'status', title: 'Status', columnWidth: '10%', sortable: true, valueMap: { completed: 'Completed', in_progress: 'In Progress', not_started: 'Not Started', overdue: 'Overdue' }},
  {fieldName: 'dueDate', title: 'Due Date', columnWidth: '10%', sortable: true},
  {fieldName: 'completedDate', title: 'Completion Date', columnWidth: '10%', sortable: true},
]

export const TRAINING_REPORT_QUERY = gql`
  query TrainingEntries(
    $pageSize: Int!
    $sortColumn: String!
    $sortDirection: String!
    $lastId: ID
    $lastValue: String
    $searchBy: String
    $filterBy: [FilterBy]
  ) {
    employeeTrainingsReport(
      pageSize: $pageSize
      sortColumn: $sortColumn
      sortDirection: $sortDirection
      lastId: $lastId
      lastValue: $lastValue
      searchBy: $searchBy
      filterBy: $filterBy
    ) {
      row_count
      employee_training_report_items {
        id
        dueDate
        status
        completedDate
        trainingName
        userFullName
        userLastName
        userClientName
        userWorkAddressCountryName
      }
    }
  }
`

/**
 * Renders employee training report
 * @category Components - Web
 * @namespace EmployeeTrainingReport
 */
export default function EmployeeTrainingReport() {
  const {setIsLoading} = useContext(GlobalLoaderContext)

  useEffect(function didMount() {
    setIsLoading(false)
  }, [setIsLoading])

  const gridRef = useRef()
  let pageSize = usePageSize(gridRef)
  if (!pageSize) {
    // this seems to avoid the sporadic "data not found" message
    // even when data exists
    pageSize = 50
  }

  const [pageNumber, setPageNumber] = useState(1)
  const [sortColumn, setSortColumn] = useState('dueDate')
  const [sortDirection, setSortDirection] = useState('desc')
  const [searchTerm, setSearchTerm] = useState(null)
  const [filters, setFilters] = useState([])
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [selectAllChecked, setSelectAllChecked] = useState(false)

  const {
    fetchMore: fetchMoreTrainings,
    loading,
    data: {employeeTrainingsReport = {}} = {}
  } = useQuery(TRAINING_REPORT_QUERY, {
    fetchPolicy: 'cache-first',
    variables: {
      pageSize: pageNumber * pageSize,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      filterBy: filters,
      searchBy: searchTerm
    }
  })
  const {employee_training_report_items = [], row_count = 0} = employeeTrainingsReport

  /**
   * Use Apollo's fetchMore() function to update useQuery().data with the next page, if more records exist.
   * Merge logic for this query can be found in web/config/apolloConfig
   */
  async function handleScrollEnd() {
    if (employee_training_report_items.length < row_count) {
      const lastTrainingEntry = employee_training_report_items[employee_training_report_items.length - 1]
      // update # of records fetched so far so we can get all pages on a sort change
      setPageNumber(pageNumber + 1)
      await fetchMoreTrainings({
        variables: {
          pageSize,
          lastId: +lastTrainingEntry.id,
          lastValue: sortColumn === 'userFullName' ? lastTrainingEntry.userLastName : lastTrainingEntry[sortColumn]
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
    analyticsService.logEvent('EE Employment Training', 'Clicked', `Sort_${stringFormatter.removeSpaces(columnData.title)}`)
  }

  /**
   * Callback for handling a search on the report
   * @param {string} searchTerm e.g. 'search term'
   */
  function handleSearchChange(searchTerm) {
    setSearchTerm(searchTerm)
    setSelectAllChecked(false)
    setSelectedRows(new Set())
    if (searchTerm !== '') analyticsService.logEvent('EE Employment Training', 'Clicked', 'Search_EnterSearch')
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
    analyticsService.logEvent('EE Employment Training', 'Clicked', `Export_CSV`)
    GridHelpers.exportDataAsCSV({
      selectedRows: selectAllChecked ? null : selectedRows,
      rowData: employee_training_report_items,
      sortColumn,
      sortDirection,
      searchTerm,
      filters,
      filenamePrefix: 'Training_Export',
      urlPath: exportConstants.TRAININGS_EXPORT_URL
    })
  }

  // TODO: empty state needs to be within <Grid> with blurred mock data, as opposed to a static image
  const useEmptyState = !loading && !employee_training_report_items.length
  const emptyMessage = 'No data found on Trainings report'
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
      columnConfig={employeeTrainingGridColumnConfig}
      defaultSortFieldname={'dueDate'}
      handleSortChange={handleSortChange}
      hasSelectAll={true}
      onScrollEnd={handleScrollEnd}
      onSelectedRowsChange={setSelectedRows}
      rowData={employee_training_report_items}
      selectAllChecked={selectAllChecked}
      setSelectAllChecked={setSelectAllChecked}
      selectedRows={selectedRows || new Set()}
    />
  )

  let numRecords = `${row_count} records.`
  if (selectedRows.size || selectAllChecked) {
    const rowsToUse = selectAllChecked ? row_count : selectedRows.size
    numRecords = rowsToUse + (rowsToUse === 1 ? ' record selected.' : ' records selected.')
  }

  return (
    <DivEmployeeTrainingReport>
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
          <EmployeeTrainingFilter
            onClear={handleFilterChange}
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
          />
        </DivFilterContainer>
      </DivHeaderContainer>
      {tableContents}
    </DivEmployeeTrainingReport>
  )
}
