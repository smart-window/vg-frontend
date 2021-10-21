import React, { useEffect, useContext, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import analyticsService from 'web/services/analyticsService'
import ProgressIndicator from 'web/components/ProgressIndicator/ProgressIndicator'
import { GlobalLoaderContext } from 'shared/providers/GlobalLoaderProvider'
import Grid from 'web/modules/Grid/Grid'
import stringFormatter from 'shared/services/stringFormatter'
import {
  DivEmployeeOnboardingsTable,
  DivFilterContainer,
  DivHeaderContainer,
  DivRecordsContainer,
  DivContainer,
} from './EmployeeOnboardingsTable.styles'
import ReportEmptyState from '../ReportEmptyState/ReportEmptyState'
import usePageSize from 'web/modules/Grid/hooks/usePageSize'
import EmployeeOnboardingsFilter from '../EmployeeOnboardingsFilter/EmployeeOnboardingsFilter'
import VgCheckbox from 'web/components/VgCheckbox/VgCheckbox'
import { onboardingEmployeeFragment } from 'web/apollo/fragments/onboardingFragments'
import { useHistory } from 'react-router'
import { routes } from 'web/constants/routeConstants'

const onboardingEmployeesGridColumnConfig = [
  {
    fieldName: 'contractId',
    title: 'Contract ID',
    columnWidth: '10%',
    sortable: false,
  },
  {
    fieldName: 'fullName',
    title: 'Employee Name',
    columnWidth: '12%',
    sortable: true,
  },
  {
    fieldName: 'partnerName',
    title: 'Partner',
    columnWidth: '10%',
    sortable: true,
  },
  {
    fieldName: 'clientName',
    title: 'Client',
    columnWidth: '10%',
    sortable: true,
  },
  {
    fieldName: 'regionName',
    title: 'Region',
    columnWidth: '8%',
    sortable: true,
  },
  {
    fieldName: 'countryName',
    title: 'Country',
    columnWidth: '8%',
    sortable: true,
  },
  {
    fieldName: 'percentComplete',
    title: 'Progress',
    columnWidth: '10%',
    sortable: true,
    renderer: (row) => <ProgressIndicator progress={row.percentComplete} />,
  },
  {
    fieldName: 'signatureStatus',
    title: 'Signature Status',
    columnWidth: '12%',
    sortable: true,
  },
  {
    fieldName: 'immigration',
    title: 'Imm.',
    columnWidth: '6%',
    sortable: true,
    renderer: (row) => (
      <VgCheckbox disabled onChange={() => {}} checked={row.immigration} />
    ),
  },
  {
    fieldName: 'benefits',
    title: 'Bene.',
    columnWidth: '6%',
    sortable: true,
    renderer: (row) => (
      <VgCheckbox disabled onChange={() => {}} checked={row.benefits} />
    ),
  },
  {
    fieldName: 'anticipatedStartDate',
    title: 'Anticipated Start',
    columnWidth: '10%',
    sortable: true,
  },
]

export const ONBOARDING_EMPLOYEE_REPORT_QUERY = gql`
  query EmployeeOnboardings(
    $pageSize: Int!
    $sortColumn: String!
    $sortDirection: String!
    $lastId: ID
    $lastValue: String
    $searchBy: String
    $filterBy: [FilterBy]
  ) {
    employee_onboardings(
      pageSize: $pageSize
      sortColumn: $sortColumn
      sortDirection: $sortDirection
      lastId: $lastId
      lastValue: $lastValue
      searchBy: $searchBy
      filterBy: $filterBy
    ) {
      ...OnboardingEmployeesTableFragment
    }
  }
  ${onboardingEmployeeFragment}
`

EmployeeOnboardingsTable.propTypes = {
  /** An array of filters */
  filters: PropTypes.array,
  /** A function called to set filters for the onboarding employees table */
  setFilters: PropTypes.func,
}

/**
 * Renders onboarding employees table
 * @category Components - Web
 * @namespace OnboardingEmployeesTable
 */
export default function EmployeeOnboardingsTable({ filters, setFilters }) {
  const { setIsLoading } = useContext(GlobalLoaderContext)

  useEffect(
    function didMount() {
      setIsLoading(false)
    },
    [setIsLoading]
  )

  const history = useHistory()

  const gridRef = useRef()
  const pageSize = usePageSize(gridRef)
  const [pageNumber, setPageNumber] = useState(1)
  const [sortColumn, setSortColumn] = useState('fullName')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState(null)
  const [selectedRows] = useState(null)
  const [employees, setEmployees] = useState([])
  const {
    fetchMore: fetchMoreEmployees,
    loading,
    data: { employee_onboardings: employeeOnboardings = {} } = {},
  } = useQuery(ONBOARDING_EMPLOYEE_REPORT_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      pageSize: pageSize * pageNumber,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      filterBy: filters,
      searchBy: searchTerm,
    },
  })

  const { employee_onboardings = [], row_count = 0 } = employeeOnboardings

  useEffect(() => {
    if (!loading) {
      setEmployees(employee_onboardings)
    }
  }, [loading, employee_onboardings])
  /**
   * Use Apollo's fetchMore() function to update useQuery().data with the next page, if more records exist.
   * Merge logic for this query can be found in web/config/apolloConfig
   */
  async function handleScrollEnd() {
    if (employee_onboardings.length < row_count) {
      const lastEmployee = employee_onboardings[employee_onboardings.length - 1]
      // update # of records fetched so far so we can get all pages on a sort change
      setPageNumber(pageNumber + 1)
      await fetchMoreEmployees({
        variables: {
          pageSize,
          lastId: +lastEmployee.id,
          lastValue: lastEmployee[sortColumn],
        },
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
      'Onboarding Employees',
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
        'Onboarding Employees',
        'Clicked',
        'Search_EnterSearch'
      )
  }

  // TODO: empty state needs to be within <Grid> with blurred mock data, as opposed to a static image
  const useEmptyState = !loading && !employee_onboardings.length
  const emptyMessage = 'No data found on Employee report'
  const numRecords = `${row_count} records.`
  return (
    <DivContainer>
      <DivEmployeeOnboardingsTable data-testid='div-employee-onboardings-table'>
        <DivHeaderContainer>
          <DivRecordsContainer>
            <p>{numRecords}</p>
          </DivRecordsContainer>
          <DivFilterContainer>
            <EmployeeOnboardingsFilter
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
            columnConfig={onboardingEmployeesGridColumnConfig}
            defaultSortFieldname={'fullName'}
            handleSortChange={handleSortChange}
            onScrollEnd={handleScrollEnd}
            onRowClick={(row) => history.push(routes.ONBOARDING + `/employee/${row.processId}`)}
            rowData={employees}
            selectedRows={selectedRows || new Set()}
          />
        )}
      </DivEmployeeOnboardingsTable>
    </DivContainer>
  )
}
