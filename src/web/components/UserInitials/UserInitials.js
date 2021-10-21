import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

UserInitials.propTypes = {
  /** Full name of the user e.g. John Smith */
  fullName: PropTypes.string.isRequired
}

// To scale this component, adjust height, width, and font-size in the parent
const DivInitialsContainer = styled.div`
  border-radius: 100%;
  height: 39px;
  width: 39px;
  background-color: ${colors.officialBlue};
  display: flex;
    align-items: center;
    justify-content: center;
  font-family: ${fonts.openSans};
    font-size: 1rem;
    color: ${colors.white};
`

/**
 * Returns a circle with 2 initials, given a user's full name
 * @category Components - Web
 * @namespace UserInitials
 */
export default function UserInitials({fullName}) {
  // Find initials from name string
  let initials = ''
  if (fullName) {
    const names = fullName.trim().split(' ')
    switch (names.length) {
      case 0:
        break
      case 1:
        initials = names[0][0] // Just one name, so use one initial
        break
      default:
        const firstInitial = names[0][0]
        const lastInitial = names.pop()[0]
        initials = firstInitial + lastInitial
    }
    initials = initials.toUpperCase()
  }

  return (
    <DivInitialsContainer>
      {initials}
    </DivInitialsContainer>
  )
}