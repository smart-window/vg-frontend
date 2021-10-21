import React from 'react'
import PropTypes from 'prop-types'
import {Modal} from 'react-native'
import VgButton from 'mobile/components/VgButton/VgButton'

import {
  ViewModalBackground,
  ViewModalOuter,
  ViewModalInner,
  TextTitle,
  ViewButtonRow
} from './GenericModal.styles'

GenericModal.propTypes = {
  /** Title of modal */
  title: PropTypes.string,
  /** RN elements to display inside the modal */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  /** Text for cancel button */
  cancelButtonText: PropTypes.string,
  /** Text for submit button */
  applyButtonText: PropTypes.string,
  /** Function that fires on modal cancel */
  handleCancel: PropTypes.func,
  /** Function that fires on modal submit */
  handleSubmit: PropTypes.func,
  /** Modal top bar color */
  modalTopBarColor: PropTypes.string
}

/**
 * A generic popup modal that displays full screen.
 * @category Components - Mobile
 * @namespace GenericModal
 */
export default function GenericModal(props) {
  const {
    title,
    children,
    cancelButtonText,
    applyButtonText,
    handleCancel,
    handleSubmit,
    modalTopBarColor
  } = props

  return (
    <Modal
      animationType={'fade'}
      statusBarTranslucent={true}
      transparent={true}
    >
      <ViewModalBackground>
        <ViewModalOuter modalTopBarColor={modalTopBarColor}>
          <ViewModalInner>
            <TextTitle>{title}</TextTitle>
            {children}
            <ViewButtonRow>
              <VgButton text={cancelButtonText} type={'cancel'} handlePress={handleCancel} />
              <VgButton text={applyButtonText} handlePress={handleSubmit} />
            </ViewButtonRow>
          </ViewModalInner>
        </ViewModalOuter>
      </ViewModalBackground>
    </Modal>
  )
}