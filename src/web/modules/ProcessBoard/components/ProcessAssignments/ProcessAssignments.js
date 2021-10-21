import { gql, useQuery } from '@apollo/client'
import { arrayOf, object } from 'prop-types'
import React, { useState } from 'react'
import { colors } from 'shared/constants/cssConstants'
import styled from 'styled-components'
import DropdownModal from 'web/components/DropdownModal/DropdownModal'
import { AsideMainContainer } from 'web/components/DropdownModal/DropdownModal.styles'
import UsersIcon from 'web/components/DynamicIcons/UsersIcon'
import UserAvatar from 'web/components/UserAvatar/UserAvatar'
import AssignmentSelect from '../AssignmentSelect/AssignmentSelect'

ProcessAssignments.propTypes = {
  assignments: arrayOf(object),
}

const USERS_QUERY = gql`
  query Users {
    csrUsers {
      id
      fullName
      avatarUrl
    }
  }
`

/**
 * a component that shows the assignments for the current process. It also contains
 * multiselects for each role assignment.
 * @category Components - Web
 * @module ProcessAssignments
 */
function ProcessAssignments(props) {
  const { assignments } = props
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const displayAssignments = assignments.slice(0, 3)
  const remainingAssignments = assignments.length - 3

  const { data = {} } = useQuery(USERS_QUERY)
  const userOptions = data.csrUsers?.map((user) => ({
    slug: user.fullName,
    id: user.id,
  }))

  return (
    <DivContainer>
      <DivAssignmentsContainer
        onClick={() => setIsDropdownOpen((state) => !state)}
      >
        {displayAssignments.map((assignment) => (
          <UserAvatar key={assignment.id} user={assignment.user} />
        ))}
        {remainingAssignments > 0 && (
          <DivRemainingAssignments>
            +{remainingAssignments}
          </DivRemainingAssignments>
        )}
      </DivAssignmentsContainer>
      {isDropdownOpen && (
        <DropdownModal closeModal={() => setIsDropdownOpen(false)}>
          <DivHeader>
            <UsersIcon color={colors.officialBlue} /> Assignments
          </DivHeader>
          <AssignmentSelect
            selectedUser={data.csrUsers?.[0]}
            userOptions={userOptions}
            title='Client Account Manager'
          />
          <AssignmentSelect
            selectedUser={data.csrUsers?.[1]}
            userOptions={userOptions}
            title='Client Account Team'
          />
          <AssignmentSelect
            selectedUser={data.csrUsers?.[2]}
            userOptions={userOptions}
            title='Regional Account Manager'
          />
          <AssignmentSelect
            selectedUser={data.csrUsers?.[3]}
            userOptions={userOptions}
            title='Regional Account Team'
          />
          <AssignmentSelect
            selectedUser={data.csrUsers?.[4]}
            userOptions={userOptions}
            title='HR Specialist'
          />
          <AssignmentSelect
            selectedUser={data.csrUsers?.[5]}
            userOptions={userOptions}
            title='Client Experience Team'
          />
        </DropdownModal>
      )}
    </DivContainer>
  )
}

const DivContainer = styled.div`
  position: relative;

  & ${AsideMainContainer} {
    top: 56px;
  }
`

const DivAssignmentsContainer = styled.div`
  display: flex;
  align-items: center;
  user-select: none;

  & > *:not(:first-child) {
    margin-left: 4px;
  }
`

const DivRemainingAssignments = styled.div`
  font-size: 1.2rem;
  color: ${colors.officialBlue};
`

const DivHeader = styled.div`
  font-size: 1.4rem;
  border-bottom: 8px solid ${colors.coolGray};
  display: flex;
  align-items: center;
  padding: 8px 0;
  svg {
    margin-right: 8px;
    border: 1px solid ${colors.officialBlue};
    border-radius: 50%;
    padding: 4px;
    width: 22px;
    height: 22px;
  }
`

export default ProcessAssignments
