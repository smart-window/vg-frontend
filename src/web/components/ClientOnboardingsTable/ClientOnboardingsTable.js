import React, { useEffect, useContext, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import analyticsService from 'web/services/analyticsService'
import ProgressIndicator from 'web/components/ProgressIndicator/ProgressIndicator'
import { GlobalLoaderContext } from 'shared/providers/GlobalLoaderProvider'
import Grid from 'web/modules/Grid/Grid'
import stringFormatter from 'shared/services/stringFormatter'
import {
  DivClientOnboardingsTable,
  DivFilterContainer,
  DivHeaderContainer,
  DivRecordsContainer,
  DivContainer,
} from './ClientOnboardingsTable.styles'
import ReportEmptyState from '../ReportEmptyState/ReportEmptyState'
import usePageSize from 'web/modules/Grid/hooks/usePageSize'
import { clientOnboardingsFragment } from 'web/apollo/fragments/onboardingFragments'
import { useHistory } from 'react-router'
import ClientOnboardingsFilter from '../ClientOnboardingsFilter/ClientOnboardingsFilter'
import { routes } from 'web/constants/routeConstants'

const clientOnboardingsGridColumnConfig = [
  {
    fieldName: 'contractId',
    title: 'Contract ID',
    columnWidth: '10%',
    sortable: false,
  },
  {
    fieldName: 'fullName',
    title: 'Client Name',
    columnWidth: '15%',
    sortable: true,
  },
  {
    fieldName: 'partnerName',
    title: 'Partner',
    columnWidth: '15%',
    sortable: true,
  },
  {
    fieldName: 'regionName',
    title: 'Region',
    columnWidth: '15%',
    sortable: true,
  },
  {
    fieldName: 'countryName',
    title: 'Country',
    columnWidth: '15%',
    sortable: true,
  },
  {
    fieldName: 'percentComplete',
    title: 'Progress',
    columnWidth: '15%',
    sortable: true,
    renderer: (row) => <ProgressIndicator progress={row.percentComplete}/>,
  },
  {
    fieldName: 'employees',
    title: 'Employees in Onboarding',
    columnWidth: '15%',
    sortable: true,
  },
]

export const CLIENT_ONBOARDINGS_REPORT_QUERY = gql`
  query ClientOnboardings(
    $pageSize: Int!
    $sortColumn: String!
    $sortDirection: String!
    $lastId: ID
    $lastValue: String
    $searchBy: String
    $filterBy: [FilterBy]
  ) {
    clientOnboardings(
      pageSize: $pageSize
      sortColumn: $sortColumn
      sortDirection: $sortDirection
      lastId: $lastId
      lastValue: $lastValue
      searchBy: $searchBy
      filterBy: $filterBy
    ) {
      ...ClientOnboardingsTableFragment
    }
  }
  ${clientOnboardingsFragment}
`

ClientOnboardingsTable.propTypes = {
  /** An array of filters */
  filters: PropTypes.array,
  /** A function called to set filters for the client_onboardings table */
  setFilters: PropTypes.func,
}

/**
 * Renders client onboarding table
 * @category Components - Web
 * @namespace ClientOnboardingsTable
 */
export default function ClientOnboardingsTable({ filters, setFilters }) {
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
  const {
    fetchMore: fetchMoreClients,
    loading,
    data: { clientOnboardings = {} } = {},
  } = useQuery(CLIENT_ONBOARDINGS_REPORT_QUERY, {
    fetchPolicy: 'no-cache',
    variables: {
      pageSize: pageSize * pageNumber,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      filterBy: filters,
      searchBy: searchTerm,
    },
  })

  const { client_onboardings = [], row_count = 0 } = clientOnboardings

  /**
   * Use Apollo's fetchMore() function to update useQuery().data with the next page, if more records exist.
   * Merge logic for this query can be found in web/config/apolloConfig
   */
  async function handleScrollEnd() {
    if (client_onboardings.length < row_count) {
      const lastClient = client_onboardings[client_onboardings.length - 1]
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
      'Client Onboardings',
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
        'Client Onboardings',
        'Clicked',
        'Search_EnterSearch'
      )
  }

  // TODO: empty state needs to be within <Grid> with blurred mock data, as opposed to a static image
  const useEmptyState = !loading && !client_onboardings.length
  const emptyMessage = 'No data found on Client report'
  const numRecords = `${row_count} records.`
  return (
    <DivContainer>
      <DivClientOnboardingsTable data-testid='div-client-onboardings-table'>
        <DivHeaderContainer>
          <DivRecordsContainer>
            <p>{numRecords}</p>
          </DivRecordsContainer>
          <DivFilterContainer>
            <ClientOnboardingsFilter
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
            columnConfig={clientOnboardingsGridColumnConfig}
            defaultSortFieldname={'fullName'}
            handleSortChange={handleSortChange}
            onScrollEnd={handleScrollEnd}
            onRowClick={(row) => history.push(routes.ONBOARDING + `/client/${row.processId}`)}
            rowData={client_onboardings}
            selectedRows={selectedRows || new Set()}
          />
        )}
      </DivClientOnboardingsTable>
    </DivContainer>
  )
}
