import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import useOnClickOutside from 'web/hooks/useOnClickOutside'

import XIcon from 'web/components/DynamicIcons/XIcon'
import fancyDropdownArrowIcon from 'assets/images/icons/fancyDropdownArrow.svg'
import {
  AsideMainContainer,
  DivBackgroundMask,
  DivModalContents,
  SpanCloseIconContainer,
  ImgFancyDropdownArrow
} from './DropdownModal.styles'

DropdownModal.propTypes = {
  /** Content for the modal */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  /** Handler for when the user clicks the close (x) button */
  closeModal: PropTypes.func.isRequired,
}

/**
 * A fancy dropdown modal which disables the rest of the screen when in use.
 * Intended to be absolutely positioned to a parent.
 * @category Components - Web
 * @namespace DropdownModal
 */
export default function DropdownModal({children, closeModal}) {
  const modalRef = useRef()
  useOnClickOutside(modalRef, closeModal)

  return (
    <AsideMainContainer role='dialog'>
      <DivBackgroundMask/>
      <DivModalContents ref={modalRef}>
        <ImgFancyDropdownArrow src={fancyDropdownArrowIcon} alt=''/>
        <SpanCloseIconContainer onClick={closeModal} aria-label='Close Modal' role='button'>
          <XIcon/>
        </SpanCloseIconContainer>
        {children}
      </DivModalContents>
    </AsideMainContainer>
  )
}