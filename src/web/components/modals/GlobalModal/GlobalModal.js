import React, {useContext} from 'react'
import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'

import modalConstants from 'web/constants/modalConstants'
import DocumentTemplateModal from 'web/components/modals/DocumentTemplateModal/DocumentTemplateModal'
import AddDocumentsModal from 'web/components/modals/AddDocumentsModal/AddDocumentsModal'
import TrainingModal from 'web/components/modals/TrainingModal/TrainingModal'
import ErrorModal from 'web/components/modals/ErrorModal/ErrorModal'
import ConfirmationModal from 'web/components/modals/ConfirmationModal/ConfirmationModal'
import TimeOffRequestModal from 'web/components/modals/TimeOffRequestModal/TimeOffRequestModal'

import {
  GlobalModalContainer
} from './GlobalModal.styles'

/**
 * Each value here should map a modalConstant to a modal component.
 * Ensure that new modals are added here.
 */
const constantToSpecificModal = {
  [modalConstants.DOCUMENT_TEMPLATE_MODAL]: DocumentTemplateModal,
  [modalConstants.TRAINING_MODAL]: TrainingModal,
  [modalConstants.ADD_DOCUMENT_MODAL]: AddDocumentsModal,
  [modalConstants.ERROR_MODAL]: ErrorModal,
  [modalConstants.CONFIRMATION_MODAL]: ConfirmationModal,
  [modalConstants.TIME_OFF_REQUEST_MODAL]: TimeOffRequestModal
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
    <GlobalModalContainer>
      <SpecificModal {...modalProps}/>
    </GlobalModalContainer>
  ) : null
}
