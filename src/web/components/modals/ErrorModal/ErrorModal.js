import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'
import GenericModal from 'web/components/modals/GenericModal/GenericModal'
import { colors } from 'shared/constants/cssConstants'
import WarningIcon from 'web/components/DynamicIcons/WarningIcon'
import {
  DivErrorOuter,
  DivErrorInner,
  DivIconWrapper,
  HeaderErrorTitle,
  DivHeaderWrapper,
  PErrorMessage
} from './ErrorModal.styles'

ErrorModal.propTypes = {
  /** Called when submit button is clicked */
  handleAcceptError: PropTypes.func,
  /** Error message title */
  errorTitle: PropTypes.string,
  /** Text to display as the confirmation message */
  message: PropTypes.string,
  /** Inner text for 'submit' button */
  errorButtonText: PropTypes.string
}

ErrorModal.defaultProps = {
  handleAcceptError: () => {},
  errorButtonText: 'Ok'
}

/**
 * A basic confirmation modal, intended to only be used with <GlobalModal>
 */
export default function ErrorModal({
  handleAcceptError,
  message,
  errorTitle,
  errorButtonText
}) {
  const {hideModal} = useContext(GlobalModalContext)

  /** hide modal and invoke error accept callback */
  function handleErrorClick() {
    hideModal()
    handleAcceptError()
  }

  return (
    <DivErrorOuter>
      <GenericModal
        applyButtonText={errorButtonText}
        handleSubmit={handleErrorClick}
        modalTopBarColor={colors.uiAlertRed}
      >
        <DivErrorInner>
          <HeaderErrorTitle>
            <DivIconWrapper><WarningIcon lineColor={colors.white}/></DivIconWrapper>
            <DivHeaderWrapper>
              <p>Error</p>
              <h1>{errorTitle}</h1>
            </DivHeaderWrapper>
          </HeaderErrorTitle>
          <PErrorMessage>{message}</PErrorMessage>
        </DivErrorInner>
      </GenericModal>
    </DivErrorOuter>
  )
}