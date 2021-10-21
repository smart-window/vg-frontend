import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { Table, Trow } from './PtoUserPolicies.styles'

const GET_USER_POLICIES_QUERY = gql`
  query UserPolicies($userId: ID, $email: String) {
    userPolicies(userId: $userId, email: $email) {
      id
      user {
        id
        oktaUserUid
        email
      }
      accrualPolicy {
        id
        pegaPolicyId
        label
      }
    }
  }
`

/**
 * This page is used by admins in order to view all of the policies assigned to a user.
 * @category Pages
 * @module PtoUserPolicies
 */
function PtoUserPolicies() {
  const params = useParams()
  const history = useHistory()
  const { loading, error, data } = useQuery(GET_USER_POLICIES_QUERY, {
    variables: {
      userId: params.userId,
    },
  })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div>
      <h2>User Policies</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Id</th>
            <th>Okta User Uid</th>
            <th>Email</th>
            <th>Policy Id</th>
            <th>Label</th>
            <th>Pega Policy Id</th>
          </tr>
        </thead>
        <tbody>
          {data.userPolicies.map((userPolicy) => {
            return (
              <Trow
                key={userPolicy.id}
                onClick={() =>
                  history.push(
                    '/pto/ledgers/user/' +
                      userPolicy.user.id +
                      '/policy/' +
                      userPolicy.accrualPolicy.id
                  )
                }
              >
                <td>{userPolicy.id}</td>
                <td>{userPolicy.user.id}</td>
                <td>{userPolicy.user.oktaUserUid}</td>
                <td>{userPolicy.user.email}</td>
                <td>{userPolicy.accrualPolicy.id}</td>
                <td>{userPolicy.accrualPolicy.label}</td>
                <td>{userPolicy.accrualPolicy.pegaPolicyId}</td>
              </Trow>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}
export default PtoUserPolicies
