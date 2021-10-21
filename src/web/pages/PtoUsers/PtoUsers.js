import React from 'react'
import { useHistory } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { Table, Trow } from './PtoUsers.styles'
import oktaService from 'web/services/oktaService'
import styled from 'styled-components'

const DivContainer = styled.div`
  height: 100%;
  overflow: auto;
`

const GET_USERS_QUERY = gql`
  query Users {
    users {
      id
      oktaUserUid
      fullName
      email
    }
  }
`

function exportAllLedgers() {
  fetch(`${process.env.REACT_APP_API_HOST || 'http://localhost:4000'}/pto/ledgers/export_all`, {
    headers: { Authorization: oktaService.getBearerToken() },
  }).then((response) => {
    if (response.ok) {
      response.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        const date = new Date().toString().replaceAll(' ', '-')
        a.download = `ledgers-export-${date}.csv`
        a.click()
      })
    }
    else {
      response.json().then(data => {
        console.error(data)
      })
    }
  })
}

/**
 * This page is used by admins in order to view all users who are assigned to policies.
 * @category Pages
 * @module PtoUsers
 */
function PtoUsers() {
  const history = useHistory()
  const { loading, error, data } = useQuery(GET_USERS_QUERY)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <DivContainer>
      <h2>Pto Users</h2>
      <button onClick={exportAllLedgers}>export all ledgers</button>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Okta User Uid</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((user) => {
            return (
              <Trow
                key={user.id}
                onClick={() => history.push('/pto/users/' + user.id)}
              >
                <td>{user.id}</td>
                <td>{user.oktaUserUid}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
              </Trow>
            )
          })}
        </tbody>
      </Table>
    </DivContainer>
  )
}
export default PtoUsers
