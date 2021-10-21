import React from 'react'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import {
  Table,
  Trow,
} from './PtoLevels.styles'

const GET_POLICY_QUERY = gql`
  query AccrualPolicy($accrualPolicyId: ID!) {
    accrualPolicy(accrualPolicyId: $accrualPolicyId) {
      id
      levels {
        id
        startDateInterval
        startDateIntervalUnit
        pegaLevelId
        accrualAmount
        accrualPeriod
        accrualFrequency
        maxDays
        carryoverLimit
        carryoverLimitType
        accrualCalculationMonthDay
        accrualCalculationWeekDay
        accrualCalculationYearMonth
        accrualCalculationYearDay
        accrualPolicyId
      }
    }
  }
`

/**
 * This page is used by admins in order to view all of the accrual policies.
 * @category Pages
 * @module PtoLevels
 */
function PtoLevels() {
  const params = useParams()
  const { loading, error, data } = useQuery(GET_POLICY_QUERY, {variables: {accrualPolicyId: params.accrualPolicyId}})

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div>
      <h2>Levels</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Start Date Interval</th>
            <th>Start Date Interval Unit</th>
            <th>Pega Level Id</th>
            <th>Accrual Amount</th>
            <th>Accrual Period</th>
            <th>Accrual Frequency </th>
            <th>Max Days</th>
            <th>Carryover Limit</th>
            <th>Carryover Limit Type</th>
            <th>Accrual Calculation Month Day</th>
            <th>Accrual Calculation Week Day </th>
            <th>Accrual Calculation Year Month</th>
            <th>Accrual Calculation Year Day</th>
            <th>Accrual Policy Id</th>
          </tr>
        </thead>
        <tbody>
          {data.accrualPolicy.levels.map((level) => {
            return (
              <Trow
                key={level.id}
              >
                <td>{level.id}</td>
                <td>{level.startDateInterval}</td>
                <td>{level.startDateIntervalUnit}</td>
                <td>{level.pegaLevelId}</td>
                <td>{level.accrualAmount}</td>
                <td>{level.accrualPeriod}</td>
                <td>{level.accrualFrequency}</td>
                <td>{level.maxDays}</td>
                <td>{level.carryoverLimit}</td>
                <td>{level.carryoverLimitType}</td>
                <td>{level.accrualCalculationMonthDay}</td>
                <td>{level.accrualCalculationWeekDay}</td>
                <td>{level.accrualCalculationYearMonth}</td>
                <td>{level.accrualCalculationYearDay}</td>
                <td>{level.accrualPolicyId}</td>
              </Trow>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}
export default PtoLevels