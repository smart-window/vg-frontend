import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'
import GenericModal from 'web/components/modals/GenericModal/GenericModal'
import { colors, fonts } from 'shared/constants/cssConstants'

const PMessage = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  margin-top: 24px;
  padding: 0 18px;
  font-family: ${fonts.openSans};
  font-size: 1rem;
  line-height: 24px;
  color: ${colors.charcoal};
`

ConfirmationModal.propTypes = {
  /** Called when cancel button is clicked */
  onClose: PropTypes.func,
  /** Called when submit button is clicked */
  onSubmit: PropTypes.func,
  /** Text to display as the confirmation message */
  message: PropTypes.string,
  /** Inner text for 'submit' button */
  submitButtonText: PropTypes.string
}

ConfirmationModal.defaultProps = {
  onClose: () => {},
  onSubmit: () => {}
}

/**
 * A basic confirmation modal, intended to only be used with <GlobalModal>
 */
export default function ConfirmationModal({
  onClose,
  onSubmit,
  message,
  submitButtonText,
  title
}) {
  const {hideModal} = useContext(GlobalModalContext)
  /** hide modal and invoke close callback */
  function handleClose() {
    hideModal()
    onClose()
  }

  /** hide modal and invoke submit callback */
  function handleSubmit() {
    hideModal()
    onSubmit()
  }

  return (
    <GenericModal
      title={title || 'Confirmation'}
      cancelButtonText={'Cancel'}
      applyButtonText={submitButtonText || 'Apply'}
      handleCancel={handleClose}
      handleSubmit={handleSubmit}
      modalTopBarColor={colors.officialBlue}
    >
      <PMessage>{message}</PMessage>
    </GenericModal>
  )
}