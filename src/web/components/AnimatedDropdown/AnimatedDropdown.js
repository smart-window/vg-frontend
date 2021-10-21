import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import useOnClickOutside from 'web/hooks/useOnClickOutside'

import {
  AsideAnimatedContainer,
} from './AnimatedDropdown.styles'

AnimatedDropdown.propTypes = {
  /** Content for the modal */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  /** Handler for when the user clicks outside of the dropdown */
  onClickOutside: PropTypes.func.isRequired,
  /** Indicator for the dropdown to transition to open or close */
  isDropdownOpen: PropTypes.bool.isRequired,
}

/**
 * A fancy animated dropdown which disables the rest of the screen when in use.
 * Intended to be absolutely positioned to a parent.
 * @category Components - Web
 * @namespace AnimatedDropdown
 */
export default function AnimatedDropdown({
  children,
  onClickOutside,
  isDropdownOpen
}) {
  const dropdownRef = useRef()
  useOnClickOutside(dropdownRef, handleCloseDropdown)

  /** Only closes the dropdown if it is open */
  function handleCloseDropdown() {
    if (isDropdownOpen) {
      onClickOutside()
    }
  }

  return (
    <AsideAnimatedContainer
      ref={dropdownRef}
      role='dialog'
      isDropdownOpen={isDropdownOpen}
    >
      {children}
    </AsideAnimatedContainer>
  )
}