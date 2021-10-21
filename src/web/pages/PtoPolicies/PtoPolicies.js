import React from 'react'
import { useHistory } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import {
  DivContainer,
  Table,
  Trow,
} from './PtoPolicies.styles'

const GET_POLICIES_QUERY = gql`
  query GetPolicies {
    accrualPolicies {
      id
      pegaPolicyId
      label
      firstAccrualPolicy
      carryoverDay
    }
  }
`

/**
 * This page is used by admins in order to view all of the accrual policies.
 * @category Pages
 * @module PtoPolicies
 */
function PtoPolicies() {
  const history = useHistory()
  const { loading, error, data } = useQuery(GET_POLICIES_QUERY)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <DivContainer>
      <h2>Accrual Policies</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Pega Policy Id</th>
            <th>Label</th>
            <th>First Accrual Policy</th>
            <th>Carryover Day</th>
          </tr>
        </thead>
        <tbody>
          {data.accrualPolicies.map((accrualPolicy) => {
            return (
              <Trow
                key={accrualPolicy.id}
                onClick={() =>
                  history.push(
                    '/pto/levels/' + accrualPolicy.id
                  )
                }
              >
                <td>{accrualPolicy.id}</td>
                <td>{accrualPolicy.pegaPolicyId}</td>
                <td>{accrualPolicy.label}</td>
                <td>{accrualPolicy.firstAccrualPolicy}</td>
                <td>{accrualPolicy.carryoverDay}</td>
              </Trow>
            )
          })}
        </tbody>
      </Table>
    </DivContainer>
  )
}
export default PtoPolicies
