import React, {useContext, useEffect} from 'react'
import AddButton from 'web/components/AddButton/AddButton'
import {CurrentUserContext} from 'web/providers/CurrentUserProvider.web'
import { GlobalLoaderContext } from 'shared/providers/GlobalLoaderProvider'
import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'
import Grid from 'web/modules/Grid/Grid'
import sectionLocalStorageIds from 'web/components/ExpandableSection/SectionLocalStorageIds'
import modalConstants from 'web/constants/modalConstants'
import ExpandableSection from 'web/components/ExpandableSection/ExpandableSection'
import VgInput from 'web/modules/VgInput/VgInput'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import {
  DivContainer,
  SectionContentContainer,
  DivProfileHeader,
  SpanUserName,
  SpanUserTitle,
  DivRequestsHeader,
  DivRequestsEmptyState,
  H4Subsection,
  DivInformationFields
} from './EmployeePto.styles'

// TODO: if this grows large make employeePto module, maybe rename this to EmployeePtoPage

/**
 * A page for EEs to view and request time off.
 * @category Pages
 * @namespace EmployeePto
 */
export default function EmployeePto() {
  const {currentUser} = useContext(CurrentUserContext)
  const {setIsLoading} = useContext(GlobalLoaderContext)
  const {showModal} = useContext(GlobalModalContext)

  // clear loader on mount
  useEffect(() => setIsLoading(false), [])

  // TODO: populate from API
  const ptoRequests = []

  /** Displays modal to add a time off request */
  function showTimeOffRequestModal() {
    showModal(modalConstants.TIME_OFF_REQUEST_MODAL, {
      user: currentUser
    })
  }

  return (
    <DivContainer>
      {/* TODO: Mike should be making a component for this */}
      <DivProfileHeader>
        <SpanUserName>{currentUser?.fullName}</SpanUserName>
        <SpanUserTitle>User's title goes here</SpanUserTitle>
      </DivProfileHeader>
      <SectionContentContainer>
        <DivRequestsHeader>
          <h3>Upcoming Time Off Requests</h3>
          <AddButton
            text={'New Time Off Request'}
            hasOutline={true}
            onClick={showTimeOffRequestModal}
          />
        </DivRequestsHeader>
        <Grid
          columnConfig={requestsGridColumnConfig}
          defaultSortFieldname={'startDate'}
          handleSortChange={() => {}}
          rowData={ptoRequests}
        />
        {!ptoRequests.length &&
          <DivRequestsEmptyState>
            No entries yet. Add one!
          </DivRequestsEmptyState>
        }
        <ExpandableSection title={'Time Off Information'} isCollapsable={true} localStorageId={sectionLocalStorageIds.TIME_OFF_INFORMATION}>
          <H4Subsection>OTHER TIME OFF INFORMATION</H4Subsection>
          <DivInformationFields>
            <VgInput type={InputTypes.SELECT} label={'Holiday Calendar'} options={[]}/>
            <VgInput type={InputTypes.DATE} label={'Time Off Observed Start Date'} isOptional={true}/>
          </DivInformationFields>
        </ExpandableSection>
      </SectionContentContainer>
    </DivContainer>
  )
}

const requestsGridColumnConfig = [
  {fieldName: 'timeOffType', title: 'Time Off Type', columnWidth: '16%', sortable: true},
  {fieldName: 'startDate', title: 'Start Date', columnWidth: '16%', sortable: true},
  {fieldName: 'endDate', title: 'End Date', columnWidth: '16%', sortable: true},
  {fieldName: 'days', title: 'Total Days', columnWidth: '16%', sortable: true},
  {fieldName: 'status', title: 'Status', columnWidth: '16%', sortable: true},
  {fieldName: 'approver', title: 'Approver', columnWidth: '20%', sortable: true},
]