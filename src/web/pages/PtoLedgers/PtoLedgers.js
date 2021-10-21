import React from 'react'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { Table, Trow } from './PtoLedgers.styles'
import oktaService from 'web/services/oktaService'

const GET_LEDGERS_QUERY = gql`
  query Ledgers($userId: ID!, $accrualPolicyId: ID!) {
    ledgers(userId: $userId, accrualPolicyId: $accrualPolicyId) {
      id
      eventDate
      eventType
      regularBalance
      regularTransaction
      carryoverBalance
      carryoverTransaction
    }
  }
`

function deleteAllLedgers(userId, policyId) {
  const confirmation = window.confirm(
    `Are you sure you want to do this? This will delete all ledgers for this user (${userId}) and policy (${policyId})`
  )
  if (confirmation) {
    fetch(
      `${
        process.env.REACT_APP_API_HOST || 'http://localhost:4000'
      }/pto/user/${userId}/policy/${policyId}/ledgers/delete_all`,
      {
        method: 'DELETE',
        headers: { Authorization: oktaService.getBearerToken() },
      }
    ).then((response) => response.json()).then((data) => {
      window.location.reload()
    }).catch((error) => {
      console.error(error)
    })
  }
}

/**
 * This page is used by admins in order to view ledgers for user / policy.
 * @category Pages
 * @module PtoLedgers
 */
function PtoLedgers() {
  const params = useParams()
  const { loading, error, data } = useQuery(GET_LEDGERS_QUERY, {
    variables: {
      userId: params.userId,
      accrualPolicyId: params.accrualPolicyId,
    },
  })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div>
      <h2>Ledgers</h2>
      <button onClick={() => deleteAllLedgers(params.userId, params.accrualPolicyId)}>delete all ledgers</button>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Date</th>
            <th>Event Type</th>
            <th>Regular Balance</th>
            <th>Regular Transaction</th>
            <th>Carryover Balance</th>
            <th>Carryover Transaction</th>
          </tr>
        </thead>
        <tbody>
          {data.ledgers.map((ledger) => {
            return (
              <Trow key={ledger.id}>
                <td>{ledger.id}</td>
                <td>{ledger.eventDate}</td>
                <td>{ledger.eventType}</td>
                <td>{ledger.regularBalance}</td>
                <td>{ledger.regularTransaction}</td>
                <td>{ledger.carryoverBalance}</td>
                <td>{ledger.carryoverTransaction}</td>
              </Trow>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}
export default PtoLedgers
