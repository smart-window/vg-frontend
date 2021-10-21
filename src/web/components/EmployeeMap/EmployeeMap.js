import React, { useContext, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useQuery, gql } from '@apollo/client'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api'

import Grid from 'web/modules/Grid/Grid'
import usePageSize from 'web/modules/Grid/hooks/usePageSize'
import {GlobalLoaderContext} from 'shared/providers/GlobalLoaderProvider'
import ChevronArrowIcon from 'web/components/DynamicIcons/ChevronArrowIcon'
import { colors } from 'shared/constants/cssConstants'

import EmployeeProfileCard from '../EmployeeProfileCard/EmployeeProfileCard'
import {
  DivEmployeesContainer,
  DivEmployeesListWrapper,
  DivTableTitle,
  DivEmployeeTableWrapper,
  ButtonSeeDetails,
  DivButtonArrow,
  DivSidebar
} from './EmployeeMap.styles'

const employeeAdminGridColumnConfig = [
  { fieldName: 'fullName', title: 'Name', columnWidth: '30%', sortable: true },
  { fieldName: 'clientName', title: 'Client', columnWidth: '30%', sortable: true },
  { fieldName: 'countryIsoThree', title: 'Ctry', columnWidth: '15%', sortable: true },
  { fieldName: 'status', title: 'Status', columnWidth: '25%', sortable: true },
]

EmployeeMap.fragments = {
  paginatedEmployees: gql`
    fragment SupportedEmployeesReportFragment on PaginatedEmployeesReport {
      row_count
      employeeReportItems {
        id
        fullName
        partnerName
        clientName
        regionName
        countryIsoThree
        employmentType
        status
        country {
          id,
          name,
          latitude,
          longitude,
          region {
            id,
            name,
            latitude,
            longitude
          }
        }
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
  ${EmployeeMap.fragments.paginatedEmployees}
`

EmployeeMap.propTypes = {
  /** A function to change the selected tab for the support employees page */
  setSelectedTab: PropTypes.func,
  /** A function called to set filters for the supported employees table */
  setFilters: PropTypes.func
}

/**
 * Renders supported employees map
 * @category Components - Web
 * @namespace EmployeeMap
 */
export default function EmployeeMap({ setSelectedTab, setFilters }) {
  const {setIsLoading} = useContext(GlobalLoaderContext)
  const [zoom, setZoom] = useState(1)
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [mouseOverMarker, setMouseOverMarker] = useState(false)
  const [hoverCluster, setHoverCluster] = useState(null)
  const [activeCluster, setActiveCluster] = useState(null)
  const [center] = useState({ lat: 0, lng: 0})
  const [pageNumber, setPageNumber] = useState(1)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [sortColumn, setSortColumn] = useState('fullName')
  const [sortDirection, setSortDirection] = useState('asc')
  const gridRef = useRef()
  const pageSize = usePageSize(gridRef)

  const {
    fetchMore: fetchMoreEmployees,
    loading,
    data: { paginatedEmployeesReport = {} } = {}
  } = useQuery(EMPLOYEE_REPORT_QUERY, {
    variables: {
      pageSize: 200,
	    sortColumn,
	    sortDirection
    }
  })
  setIsLoading(loading)
  const { employeeReportItems: employees = [], row_count } = paginatedEmployeesReport

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
          sortColumn,
	        sortDirection,
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
  }

  function onMarkerClick(marker, cluster) {
    setDropdownIsOpen(true)
    setMouseOverMarker(false)
    setActiveCluster(cluster)
  }
  function onMarkerMouseEvent(mouseOverMarker, cluster) {
    setMouseOverMarker(mouseOverMarker)
    setHoverCluster(cluster)
  }
  function onZoomChanged(e) {
    setZoom(this.zoom)
  }
  function closeInfoWindow() {
    setDropdownIsOpen(false)
    setActiveCluster(null)
  }

  function renderStatusMarkers(cluster) {
    // add markers for each unique status for employees of this cluster
    const byStatus = {
      onboarding: 0,
      active: 0,
      offboarding: 0
    }

    cluster.employees.reduce((byStatus, employee) => {
      if (employee.status === 'onboarding') {
        byStatus.onboarding += 1
      }
      else if (employee.status === 'active') {
        byStatus.active += 1
      }
      else {
        byStatus.offboarding += 1
      }
      return byStatus
    }, byStatus)

    const sharedIconProps = {
      fillOpacity: 1.0,
      strokeWeight: 1,
      strokeColor: colors.white,
      scale: 1.0
    }

    const sharedLabelProps = {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: colors.white
    }

    // use fixed latitude to place breakdown markers at the same
    // pixel distance for longitude
    const lngMetersPerPx = 156543.03392 * Math.cos(0 * Math.PI / 180) / Math.pow(2, zoom)
    const lngLarge = lngMetersPerPx * 50 / 111000
    const lngSmall = lngMetersPerPx * 25 / 111000
    const latMetersPerPx = 156543.03392 * Math.cos(cluster.latitude * Math.PI / 180) / Math.pow(2, zoom)
    const latAddOrSubstract = latMetersPerPx * 50 / 111000
    return (
      <>
        <Marker
          position={{ lat: cluster.latitude + latAddOrSubstract, lng: cluster.longitude + lngSmall }}
          key={cluster.id + 'onboarding'}
          zIndex={1}
          icon={{
            ...sharedIconProps,
            path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
            fillColor: colors.darkYellow
          }}
          label={{
            ...sharedLabelProps,
            text: '' + byStatus.onboarding
          }}
        />
        <Marker
          position={{ lat: cluster.latitude + latAddOrSubstract, lng: cluster.longitude + (2 * lngLarge) }}
          key={cluster.id + 'onboardinglabel'}
          zIndex={2}
          icon={{
            ...sharedIconProps,
            path: 'M-45,-9 h88 a6,6 0 0 1 6,6 v7 a6,6 0 0 1 -6,6 h-88 a6,6 0 0 1 -6,-6 v-7 a6,6 0 0 1 6,-6 z',
            fillColor: colors.darkYellow
          }}
          label={{
            ...sharedLabelProps,
            text: 'In Onboarding'
          }}
        />
        <Marker
          position={{ lat: cluster.latitude, lng: cluster.longitude + lngLarge }}
          key={cluster.id + 'active'}
          zIndex={1}
          icon={{
            ...sharedIconProps,
            path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
            fillColor: colors.green
          }}
          label={{
            ...sharedLabelProps,
            text: '' + byStatus.active
          }}
        />
        <Marker
          position={{ lat: cluster.latitude, lng: cluster.longitude + (2.8 * lngLarge) }}
          key={cluster.id + 'activelabel'}
          zIndex={2}
          icon={{
            ...sharedIconProps,
            path: 'M-60,-9 h120 a6,6 0 0 1 6,6 v7 a6,6 0 0 1 -6,6 h-120 a6,6 0 0 1 -6,-6 v-7 a6,6 0 0 1 6,-6 z',
            fillColor: colors.green
          }}
          label={{
            ...sharedLabelProps,
            text: 'Actively Employed'
          }}
        />
        <Marker
          position={{ lat: cluster.latitude - latAddOrSubstract, lng: cluster.longitude + lngSmall }}
          key={cluster.id + 'offboarding'}
          zIndex={1}
          icon={{
            ...sharedIconProps,
            path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
            fillColor: colors.gray50
          }}
          label={{
            ...sharedLabelProps,
            text: '' + byStatus.offboarding
          }}
        />
        <Marker
          position={{ lat: cluster.latitude - latAddOrSubstract, lng: cluster.longitude + (2 * lngLarge) }}
          key={cluster.id + 'offboardinglabel'}
          zIndex={2}
          icon={{
            ...sharedIconProps,
            path: 'M-45,-9 h90 a6,6 0 0 1 6,6 v7 a6,6 0 0 1 -6,6 h-90 a6,6 0 0 1 -6,-6 v-7 a6,6 0 0 1 6,-6 z',
            fillColor: colors.gray50
          }}
          label={{
            ...sharedLabelProps,
            text: 'In Offboarding'
          }}
        />
      </>
    )
  }

  /**
   * Function for rendering the initial markers for each country/region
   * @param {array} employees array of employee objects
   */
  const renderMainMarkers = (employees) => {
    if (employees) {
      const clusters = new Map()
      employees.reduce((clusters, employee) => {
        // clustering on region or country
        // once we are storing employment status in the db, we'll need to make a new endpoint to return
        // counts of employees by country and region
        const clusterItem = zoom >= 4 ? employee.country : employee.country.region || {}
        let cluster = clusters.get(clusterItem.id)
        if (!cluster) {
          const filter = [{name: zoom >= 4 ? 'country_id' : 'region_id', value: clusterItem.id}]
          cluster = { id: clusterItem.id, latitude: clusterItem.latitude, longitude: clusterItem.longitude, filter, employees: [] }
          clusters.set(clusterItem.id, cluster)
        }
        cluster.employees.push(employee)
        return clusters
      }, clusters)
      const markers = Array.from(clusters.values()).map((cluster) => {
        return (
          <>
            <Marker
              position={{ lat: cluster.latitude, lng: cluster.longitude }}
              key={cluster.id}
              onClick={(marker) => onMarkerClick(marker, cluster)}
              onMouseOver={() => onMarkerMouseEvent(true, cluster)}
              onMouseOut={() => onMarkerMouseEvent(false, null)}
              zIndex={activeCluster?.id !== cluster.id && hoverCluster?.id === cluster.id ? 2 : null}
              icon={{
                path: 'M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0',
                fillColor: `${activeCluster?.id !== cluster.id && hoverCluster?.id === cluster.id ? colors.peachOrange : colors.darkPink}`,
                fillOpacity: 1.0,
                strokeWeight: 1,
                strokeColor: colors.white,
                scale: 1.0
              }}
              label={{
                text: '' + cluster.employees.length,
                fontSize: '1rem',
                fontWeight: 'bold',
                color: colors.white
              }}
            >
              { dropdownIsOpen && activeCluster && activeCluster.id === cluster.id &&
              <InfoWindow onCloseClick={closeInfoWindow}>
						    <DivEmployeesListWrapper>
						      <DivTableTitle>Supported Employees</DivTableTitle>
                  <DivEmployeeTableWrapper>
                    <Grid
                      containerRef={gridRef}
                      columnConfig={employeeAdminGridColumnConfig}
                      defaultSortFieldname={''}
                      handleSortChange={handleSortChange}
                      onRowClick={(ee) => setSelectedEmployee(prev => prev?.id === ee.id ? null : ee)}
                      onScrollEnd={handleScrollEnd}
                      selectedRowId={selectedEmployee?.id}
                      selectedRows={new Set()}
                      rowData={activeCluster.employees}
                    />
                  </DivEmployeeTableWrapper>
                  <ButtonSeeDetails
                    onClick={() => {
                      setFilters(activeCluster.filter)
                      setSelectedTab(1)
                    }
                    }
                  >
                    See Details for this List
                    <DivButtonArrow>
                      <ChevronArrowIcon />
                    </DivButtonArrow>
                  </ButtonSeeDetails>
						    </DivEmployeesListWrapper>
              </InfoWindow>
              }
            </Marker>
            {mouseOverMarker && activeCluster?.id !== cluster.id && hoverCluster?.id === cluster.id && (
              renderStatusMarkers(cluster)
            )}
          </>
        )
      })
      return markers
    }
  }

  return (
    <DivEmployeesContainer data-testid='div-employees-container'>
      <GoogleMap
        options={{
          minZoom: 2,
          maxZoom: 4,
          streetViewControl: false
        }}
        zoom={zoom}
        center={center}
        onZoomChanged={onZoomChanged}
        mapContainerStyle={{
          height: 'calc(100% - 16px)',
          width: 'calc(100% - 16px)',
          position: 'static'
        }}
      >
        { renderMainMarkers(employees) }
      </GoogleMap>
      <DivSidebar open={!!selectedEmployee}>
        <EmployeeProfileCard employee={selectedEmployee} />
      </DivSidebar>
    </DivEmployeesContainer>
  )
}
