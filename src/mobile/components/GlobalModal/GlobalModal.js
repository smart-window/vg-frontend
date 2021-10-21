import React, {useContext} from 'react'
import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'

import modalConstants from 'mobile/constants/modalConstants'
import ConfirmationModal from 'mobile/components/ConfirmationModal/ConfirmationModal'
import DatePickerModal from 'mobile/components/DatePickerModal/DatePickerModal'

/**
 * Each value here should map a modalConstant to a modal component.
 * Ensure that new modals are added here.
 */
const constantToSpecificModal = {
  [modalConstants.CONFIRMATION_MODAL]: ConfirmationModal,
  [modalConstants.DATE_PICKER_MODAL]: DatePickerModal
}

/**
 * Global Modal wrapper component.
 * Displays the appropriate modal based on modalConstant and modalProps in the GlobalModalContext.
 * Not intended to be used outside of App.js
 */
export default function GlobalModal() {
  const {modalConstant, modalProps} = useContext(GlobalModalContext)

  const SpecificModal = constantToSpecificModal[modalConstant]

  return SpecificModal ? (
    <SpecificModal {...modalProps}/>
  ) : null
}