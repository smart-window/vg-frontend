import React, { useEffect, useContext, useRef, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import analyticsService from 'web/services/analyticsService'
import { GlobalLoaderContext } from 'shared/providers/GlobalLoaderProvider'
import Grid from 'web/modules/Grid/Grid'
import stringFormatter from 'shared/services/stringFormatter'
import {
  DivClientCompaniesTable,
  DivFilterContainer,
  DivHeaderContainer,
  DivContainer,
  DivViewingRecords,
  DivSidebar,
  DivClientCompaniesTableContainer,
} from './ClientCompaniesTable.styles'
import usePageSize from 'web/modules/Grid/hooks/usePageSize'
import ClientCompaniesFilter from '../ClientCompaniesFilter/ClientCompaniesFilter'
import ReportEmptyState from 'web/components/ReportEmptyState/ReportEmptyState'
import downloadIcon from 'assets/images/icons/download.svg'
import { clientReportFragment } from 'web/apollo/fragments/clientCompaniesFragment'
import ClientProfileCard from '../ClientProfileCard/ClientProfileCard'
const clientCompaniesGridColumnConfig = [
  {
    fieldName: 'id',
    title: 'Client ERP ID',
    columnWidth: '15%',
    sortable: false,
  },
  {
    fieldName: 'clientName',
    title: 'Client Name',
    columnWidth: '20%',
    sortable: true,
  },
  {
    fieldName: 'regionName',
    title: 'Region',
    columnWidth: '15%',
    sortable: true,
  },
  {
    fieldName: 'operatingCountries',
    title: 'Operating Countries',
    columnWidth: '25%',
    sortable: true,
    renderer: (row) => <>{ row.operatingCountries.map(row => {return row.country.name + `, `}) }</>
  },
  {
    fieldName: 'activePayroll',
    title: 'Active Payroll Employees',
    columnWidth: '25%',
    sortable: true,
    renderer: (row) => <>{`${row.activeEmployees || 0} (${row.totalEmployees || 0} Total)`}</>
  },
]

export const CLIENT_REPORT_QUERY = gql`
  query GetClientCompanies(
    $pageSize: Int!
    $sortColumn: String!
    $sortDirection: String!
    $lastId: ID
    $lastValue: String
    $searchBy: String
    $filterBy: [FilterBy]
  ) {
    paginatedClientsReport(
      pageSize: $pageSize
      sortColumn: $sortColumn
      sortDirection: $sortDirection
      lastId: $lastId
      lastValue: $lastValue
      searchBy: $searchBy
      filterBy: $filterBy
    ) {
      ...ClientCompaniesFragment
    }
  }
  ${clientReportFragment}
`

/**
 * Renders a list of client contract
 * @category Components - Web
 * @namespace ClientCompaniesTable
 */
export default function ClientCompaniesTable() {
  const { setIsLoading } = useContext(GlobalLoaderContext)
  const [filters, setFilters] = useState([])

  useEffect(
    function didMount() {
      setIsLoading(false)
    },
    [setIsLoading]
  )

  const gridRef = useRef()
  const pageSize = usePageSize(gridRef)
  const [pageNumber, setPageNumber] = useState(1)
  const [sortColumn, setSortColumn] = useState('clientName')
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState(null)
  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedRows] = useState(null)
  const {
    fetchMore: fetchMoreClients,
    loading,
    data: { paginatedClientsReport = {} } = {},
  } = useQuery(CLIENT_REPORT_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      pageSize: pageSize * pageNumber,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      filterBy: filters,
      searchBy: searchTerm,
    },
  })

  const { client_report_items = [], row_count = 0 } = paginatedClientsReport
  /**
   * Use Apollo's fetchMore() function to update useQuery().data with the next page, if more records exist.
   * Merge logic for this query can be found in web/config/apolloConfig
   */
  async function handleScrollEnd() {
    if (client_report_items.length < row_count) {
      const lastClient = client_report_items[client_report_items.length - 1]
      // update # of records fetched so far so we can get all pages on a sort change
      setPageNumber(pageNumber + 1)
      await fetchMoreClients({
        variables: {
          pageSize,
          lastId: +lastClient.id,
          lastValue: lastClient[sortColumn] || '',
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
      'Client Companies',
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
        'Client Companies',
        'Clicked',
        'Search_EnterSearch'
      )
  }

  // TODO: empty state needs to be within <Grid> with blurred mock data, as opposed to a static image
  const useEmptyState = !loading && !client_report_items.length
  const emptyMessage = 'No data found on Client report'
  const numRecords = `${row_count} records.`
  return (
    <DivContainer>
      <DivClientCompaniesTableContainer>
        <DivHeaderContainer>
          <DivViewingRecords>
            Viewing {numRecords} records.
            <span>Download now </span>
            <img src={downloadIcon} alt='download'/>
          </DivViewingRecords>
          <DivFilterContainer>
            <ClientCompaniesFilter
              onClear={setFilters}
              onSearchChange={handleSearchChange}
              onFilterChange={setFilters}
            />
          </DivFilterContainer>
        </DivHeaderContainer>
        <DivClientCompaniesTable data-testid='div-client-companies-table'>
          {useEmptyState ? (
            <ReportEmptyState emptyMessage={emptyMessage} />
          ) : (
            <Grid
              containerRef={gridRef}
              columnConfig={clientCompaniesGridColumnConfig}
              defaultSortFieldname={'clientName'}
              handleSortChange={handleSortChange}
              onScrollEnd={handleScrollEnd}
              onRowClick={(row) => setSelectedClient(prev => prev?.id === row.id ? null : row)}
              selectedRowId={selectedClient?.id}
              rowData={client_report_items}
              selectedRows={selectedRows || new Set()}
            />
          )}
        </DivClientCompaniesTable>
      </DivClientCompaniesTableContainer>
      <DivSidebar open={!!selectedClient}>
        <ClientProfileCard client={selectedClient} />
      </DivSidebar>
    </DivContainer>
  )
}
