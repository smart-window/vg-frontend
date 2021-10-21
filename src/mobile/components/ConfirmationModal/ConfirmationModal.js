import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {useTranslation} from 'react-i18next'

import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'
import GenericModal from 'mobile/components/GenericModal/GenericModal'
import { colors } from 'shared/constants/cssConstants'

import {
  TextMessage
} from './ConfirmationModal.styles'

ConfirmationModal.propTypes = {
  /** Called when cancel button is clicked */
  handleClose: PropTypes.func,
  /** Called when submit button is clicked */
  handleSubmit: PropTypes.func,
  /** Text to display as the confirmation message */
  message: PropTypes.string,
  /** Inner text for 'submit' button */
  submitButtonText: PropTypes.string
}

/**
 * A basic confirmation modal, intended to only be used with <GlobalModal>
 */
export default function ConfirmationModal(props) {
  const {hideModal} = useContext(GlobalModalContext)
  const {t} = useTranslation()

  /** hide modal and invoke close callback */
  function handleClose() {
    hideModal()
    if (props.handleClose) props.handleClose()
  }

  /** hide modal and invoke submit callback */
  function handleSubmit() {
    hideModal()
    if (props.handleSubmit) props.handleSubmit()
  }

  return (
    <GenericModal
      title={t('Confirmation')}
      cancelButtonText={t('Cancel')}
      applyButtonText={props.submitButtonText || t('Apply')}
      handleCancel={handleClose}
      handleSubmit={handleSubmit}
      modalTopBarColor={colors.uiAlertRed}
    >
      <TextMessage>{props.message}</TextMessage>
    </GenericModal>
  )
}