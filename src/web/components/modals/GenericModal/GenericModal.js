import React from 'react'
import PropTypes from 'prop-types'
import VgButton from 'web/components/VgButton/VgButton'

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
  handleSubmit: PropTypes.func
}

/**
 * A generic popup modal that displays full screen.
 * @category Components - Web
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
    <ViewModalBackground>
      <ViewModalOuter modalTopBarColor={modalTopBarColor}>
        <ViewModalInner open={true}>
          {title && <TextTitle>{title}</TextTitle>}
          {children}
          <ViewButtonRow>
            { cancelButtonText &&
              <VgButton
                text={cancelButtonText}
                onClick={handleCancel}
              />
            }
            <VgButton
              type='submit'
              text={applyButtonText}
              onClick={handleSubmit}
            />
          </ViewButtonRow>
        </ViewModalInner>
      </ViewModalOuter>
    </ViewModalBackground>
  )
}