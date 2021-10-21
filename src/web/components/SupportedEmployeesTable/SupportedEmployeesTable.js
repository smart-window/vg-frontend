import React, { useEffect, useContext, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import analyticsService from 'web/services/analyticsService'

import { GlobalLoaderContext } from 'shared/providers/GlobalLoaderProvider'
import SupportedEmployeesFilter from 'web/components/SupportedEmployeesFilter/SupportedEmployeesFilter'
import Grid from 'web/modules/Grid/Grid'
import stringFormatter from 'shared/services/stringFormatter'
import {
  DivSupportedEmployeesTable,
  DivFilterContainer,
  DivHeaderContainer,
  DivRecordsContainer,
  DivContainer,
  DivSidebar
} from './SupportedEmployeesTable.styles'
import ReportEmptyState from '../ReportEmptyState/ReportEmptyState'
import EmployeeProfileCard from '../EmployeeProfileCard/EmployeeProfileCard'
import usePageSize from 'web/modules/Grid/hooks/usePageSize'

const supportedEmployeesGridColumnConfig = [
  { fieldName: 'id', title: 'Employee ID', columnWidth: '14%', sortable: false },
  { fieldName: 'fullName', title: 'Employee Name', columnWidth: '16%', sortable: true },
  { fieldName: 'partnerName', title: 'Partner', columnWidth: '16%', sortable: true },
  { fieldName: 'clientName', title: 'Client', columnWidth: '16%', sortable: true },
  { fieldName: 'regionName', title: 'Region', columnWidth: '12%', sortable: true },
  { fieldName: 'countryName', title: 'Country', columnWidth: '10%', sortable: true },
  { fieldName: 'employmentType', title: 'Employment Type', columnWidth: '16%', sortable: true },
]

SupportedEmployeesTable.fragments = {
  paginatedEmployees: gql`
    fragment SupportedEmployeesReportFragment on PaginatedEmployeesReport {
      row_count
      employeeReportItems {
        id
        fullName
        partnerName
        clientName
        regionName
        countryName
        employmentType
        ...EmployeeProfileCardFragment
      }
    }
    ${EmployeeProfileCard.fragments.EmployeeReportItem}
  `
}

export const EMPLOYEE_REPORT_QUERY = gql`
  query PaginatedEmployeesReport(
    $pageSize: Int!
    $sortColumn: String!
    $sortDirection: String!
    $lastId: ID
    $lastValue: String
    $searchBy: String
    $filterBy: [FilterBy]
  ) {
    paginatedEmployeesReport(
      pageSize: $pageSize
      sortColumn: $sortColumn
      sortDirection: $sortDirection
      lastId: $lastId
      lastValue: $lastValue
      searchBy: $searchBy
      filterBy: $filterBy
    ) {
      ...SupportedEmployeesReportFragment
    }
  }
  ${SupportedEmployeesTable.fragments.paginatedEmployees}
`

SupportedEmployeesTable.propTypes = {
  /** An array of filters */
  filters: PropTypes.array,
  /** A function called to set filters for the supported employees table */
  setFilters: PropTypes.func
}

/**
 * Renders supported employees table
 * @category Components - Web
 * @namespace SupportedEmployeesTable
 */
export default function SupportedEmployeesTable({
  filters,
  setFilters
}) {
  const { setIsLoading } = useContext(GlobalLoaderContext)

  useEffect(
    function didMount() {
      setIsLoading(false)
    },
    [setIsLoading]
  )

  const gridRef = useRef()
  const pageSize = usePageSize(gridRef)
  const [pageNumber, setPageNumber] = useState(1)
  const [sortColumn, setSortColumn] = useState('fullName')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedRows] = useState(null)

  const {
    fetchMore: fetchMoreEmployees,
    loading,
    data: { paginatedEmployeesReport = {} } = {}
  } = useQuery(EMPLOYEE_REPORT_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      pageSize: pageSize * pageNumber,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      filterBy: filters,
      searchBy: searchTerm
    }
  })

  const { employeeReportItems: employees = [], row_count = 0 } = paginatedEmployeesReport

  /**
   * Use Apollo's fetchMore() function to update useQuery().data with the next page, if more records exist.
   * Merge logic for this query can be found in web/config/apolloConfig
   */
  async function handleScrollEnd() {
    if (employees.length < row_count) {
      const lastEmployee = employees[employees.length - 1]
      // update # of records fetched so far so we can get all pages on a sort change
      setPageNumber(pageNumber + 1)
      await fetchMoreEmployees({
        variables: {
          pageSize,
          lastId: +lastEmployee.id,
          lastValue: lastEmployee[sortColumn]
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
    analyticsService.logEvent(
      'Supported Employees',
      'Clicked',
      `Sort_${stringFormatter.removeSpaces(columnData.title)}`
    )
  }

  /**
   * Callback for handling a search on the report
   * @param {string} searchTerm e.g. 'search term'
   */
  function handleSearchChange(searchTerm) {
    setSearchTerm(searchTerm)
    if (searchTerm !== '')
      analyticsService.logEvent(
        'Supported Employees',
        'Clicked',
        'Search_EnterSearch'
      )
  }

  // TODO: empty state needs to be within <Grid> with blurred mock data, as opposed to a static image
  const useEmptyState = !loading && !employees.length
  const emptyMessage = 'No data found on Employee report'
  const numRecords = `${row_count} records.`

  return (
    <DivContainer>
      <DivSupportedEmployeesTable data-testid='div-supported-employees-table'>
        <DivHeaderContainer>
          <DivRecordsContainer>
            <p>{numRecords}</p>
          </DivRecordsContainer>
          <DivFilterContainer>
            <SupportedEmployeesFilter
              onClear={setFilters}
              onSearchChange={handleSearchChange}
              onFilterChange={setFilters}
            />
          </DivFilterContainer>
        </DivHeaderContainer>
        {useEmptyState ? (
          <ReportEmptyState emptyMessage={emptyMessage} />
        ) : (
          <Grid
            containerRef={gridRef}
            columnConfig={supportedEmployeesGridColumnConfig}
            defaultSortFieldname={'dueDate'}
            handleSortChange={handleSortChange}
            onScrollEnd={handleScrollEnd}
            onRowClick={(ee) => setSelectedEmployee(prev => prev?.id === ee.id ? null : ee)}
            selectedRowId={selectedEmployee?.id}
            rowData={employees}
            selectedRows={selectedRows || new Set()}
          />
        )}
      </DivSupportedEmployeesTable>
      <DivSidebar open={!!selectedEmployee}>
        <EmployeeProfileCard employee={selectedEmployee} />
      </DivSidebar>
    </DivContainer>
  )
}
