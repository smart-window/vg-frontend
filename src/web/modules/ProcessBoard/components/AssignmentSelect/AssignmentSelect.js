import { shape, string } from 'prop-types'
import React, { useState } from 'react'
import { colors, fonts } from 'shared/constants/cssConstants'
import styled from 'styled-components'
import ComboBox from 'web/modules/ComboBox/ComboBox'
import UserAvatar from 'web/components/UserAvatar/UserAvatar'

AssignmentSelect.propTypes = {
  title: string.isRequired,
  userOptions: shape({
    id: string,
    slug: string,
  }).isRequired,
}

/**
 * a component that renders a single multiSelect for a role assignment
 * @category Components - Web
 * @module AssignmentSelect
 */
function AssignmentSelect(props) {
  const { title, userOptions } = props
  const [selectedUsers, setSelectedUsers] = useState([])

  return (
    <DivContainer>
      <UserAvatar user={{}} />
      <DivSelectContainer>
        <DivTitle>{title}</DivTitle>
        <ComboBox
          label={title}
          selectedOptions={selectedUsers}
          handleOptionSelect={setSelectedUsers}
          listItems={userOptions}
          allowSearching={true}
        />
      </DivSelectContainer>
    </DivContainer>
  )
}

const DivContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  div:first-child {
    flex-shrink: 0;
  }
  & > div:last-child {
    flex-grow: 1;
    label {
      display: none;
    }
    input {
      margin: 0;
      width: 100%;
    }
    aside {
      left: 0;
      right: 0;
    }
  }
`

const DivTitle = styled.div`
  font-family: ${fonts.openSans};
  font-size: 0.8rem;
  font-weight: 300;
  font-style: italic;
  margin-bottom: 4px;
  color: ${colors.transparentText};
`

const DivSelectContainer = styled.div`
  margin-left: 8px;
  flex-grow: 1;
`

export default AssignmentSelect
