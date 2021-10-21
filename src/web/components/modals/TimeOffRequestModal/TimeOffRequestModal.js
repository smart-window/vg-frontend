import React, {useState} from 'react'
import {PropTypes} from 'prop-types'
import GenericLargeModal from 'web/components/modals/GenericLargeModal/GenericLargeModal'
import TimeOffIcon from 'web/components/DynamicIcons/TimeOffIcon'
import VgInput from 'web/modules/VgInput/VgInput'
import { colors } from 'shared/constants/cssConstants'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import ComboBox from 'web/modules/ComboBox/ComboBox'
import DateRange from 'web/components/DateRange/DateRange'
import Grid from 'web/modules/Grid/Grid'
import {useQuery, gql} from '@apollo/client'

import {
  DivModalContents,
  DivEmployeeName,
  DivDetailsEmptyState,
  DivDivider,
  DivNotesAndDaysAvailable,
  DivDaysAvailable
} from './TimeOffRequestModal.styles'

TimeOffRequestModal.propTypes = {
  /** Called on 'submit time request' click after modal is closed. */
  onSubmit: PropTypes.func,
  /** User creating the time off request */
  user: PropTypes.object
}

TimeOffRequestModal.defaultProps = {
  onSubmit: () => {}
}

export const USER_PTO_TYPES_QUERY = gql`
  query UserPtoTypes($userId: ID!) {
    userPolicies(userId: $userId) {
      endDate
      accrualPolicy {
        id
        ptoType {
          id
          name
        }
      }
    }
  }
`

export const POLICY_BALANCE_QUERY = gql`
  query LastLedgerEntry($userId: ID!, $accrualPolicyId: ID!) {
    lastLedgerEntry(userId: $userId, accrualPolicyId: $accrualPolicyId) {
      regularBalance
    }
  }
`

/**
 * Allows one to submit a new time off request.
 * @category Components - Web
 * @namespace TimeOffRequestModal
 */
export default function TimeOffRequestModal({onSubmit, user}) {
  const [timeOffType, setTimeOffType] = useState(null)
  const [requestNotes, setRequestNotes] = useState('')
  const [timeOffFromDate, setTimeOffFromDate] = useState(null)
  const [timeOffToDate, setTimeOffToDate] = useState(null)

  const dailyDetailsData = []

  const {data: {userPolicies = []} = {}} = useQuery(USER_PTO_TYPES_QUERY, {
    variables: {
      userId: user.id
    }
  })
  const timeOffTypes = userPolicies.map(policy => {
    const type = policy.accrualPolicy?.ptoType
    return {id: type.id, slug: type.name}
  })

  const userPolicyForType = userPolicies.find(policy => (
    !policy.endDate
    &&
    policy?.accrualPolicy?.ptoType?.id === timeOffType?.id
  ))
  const currentAccrualPolicyId = userPolicyForType ? userPolicyForType.accrualPolicy.id : null

  const {data: {lastLedgerEntry} = {}} = useQuery(POLICY_BALANCE_QUERY, {
    variables: {
      accrualPolicyId: currentAccrualPolicyId,
      userId: user.id
    },
    skip: !currentAccrualPolicyId
  })
  const policyBalanceDays = lastLedgerEntry ? (lastLedgerEntry.regularBalance / 24) : null
  const policyBalanceDaysRounded = policyBalanceDays?.toFixed(1)

  function handleSubmit() {
    // TODO
    onSubmit()
  }

  return (
    <GenericLargeModal
      title={'CREATE TIME OFF REQUEST'}
      subtitle={'TIME OFF'}
      icon={<TimeOffIcon color={colors.officialBlue}/>}
      applyButtonText='Submit Time Off Request'
      onSubmit={handleSubmit}
      isApplyActive={false}
    >
      <DivModalContents>
        <DivEmployeeName>
          <label>Employee Name</label>
          <p>{user.fullName}</p>
        </DivEmployeeName>
        <ComboBox
          label={'Time Off Type'}
          selectedOptions={timeOffType ? [timeOffType] : []}
          handleOptionSelect={setTimeOffType}
          listItems={timeOffTypes}
          isSingleSelect={true}
        />
        <DateRange
          label={'Time Off Dates'}
          fromDate={timeOffFromDate}
          toDate={timeOffToDate}
          handleFromDateChange={setTimeOffFromDate}
          handleToDateChange={setTimeOffToDate}
          displayMode={'horizontal'}
        />
        <h4>Daily Details</h4>
        <Grid
          columnConfig={dailyDetailsGridColumnConfig}
          defaultSortFieldname={'day'}
          handleSortChange={() => {}}
          rowData={dailyDetailsData}
        />
        {!dailyDetailsData.length &&
          <DivDetailsEmptyState>
            Enter Time Off Days to see Daily Details
          </DivDetailsEmptyState>
        }
        <DivNotesAndDaysAvailable>
          <VgInput
            type={InputTypes.TEXTAREA}
            value={requestNotes}
            onChange={setRequestNotes}
            label={'Time Off Request Notes'}
          />
          <DivDaysAvailable>
            <span>Current Days Available:</span>
            <span>{policyBalanceDaysRounded || ''}</span>
          </DivDaysAvailable>
        </DivNotesAndDaysAvailable>
        <DivDivider/>
      </DivModalContents>
    </GenericLargeModal>
  )
}

const dailyDetailsGridColumnConfig = [
  {fieldName: 'day', title: 'Day', columnWidth: '25%'},
  {fieldName: 'date', title: 'Date', columnWidth: '25%'},
  {fieldName: 'days', title: 'Days', columnWidth: '10%'},
  {fieldName: 'notes', title: 'Notes', columnWidth: '40%'}
]