import { bool, func } from 'prop-types'
import React from 'react'
import { colors } from 'shared/constants/cssConstants'
import styled from 'styled-components'
import ProcessActionsDropdown from '../ProcessActionsDropdown/ProcessActionsDropdown'
import ProcessAssignments from '../ProcessAssignments/ProcessAssignments'

ProcessActionBar.propTypes = {
  isProfileOpen: bool.isRequired,
  setIsProfileOpen: func.isRequired,
}

function ProcessActionBar(props) {
  const {process, isProfileOpen, setIsProfileOpen} = props
  const assignments = process.assignments || []
  return (
    <DivContainer>
      <ProcessActionsDropdown />
      <ProcessAssignments assignments={assignments} />
      <DivProfile onClick={() => setIsProfileOpen(state => !state)}>{isProfileOpen ? 'hide' : 'view'} profile</DivProfile>
    </DivContainer>
  )
}

const DivContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  right: 16px;
  top: -24px;
  & > *:not(:last-child) {
    margin-right: 24px;
  }
`

const DivProfile = styled.div`
  font-size: 1.2rem;
  text-decoration: underline;
  color: ${colors.officialBlue};
`

export default ProcessActionBar
