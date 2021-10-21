import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'
import XIcon from 'web/components/DynamicIcons/XIcon.js'
import WarningIcon from 'web/components/DynamicIcons/WarningIcon'
import {colors} from 'shared/constants/cssConstants'

import {
  DivModalContainer,
  DivContentBackground,
  DivModalContent,
  DivTopSection,
  DivTemplateIcon,
  DivTitles,
  DivModalTitle,
  DivModalSubtitle,
  ButtonExit,
  DivModalInside,
  DivButtonsContainer,
  DivErrorIconWrapper,
  DivErrorButtonContainer,
  PTitle
} from './GenericLargeModal.styles'
import VgButton from 'web/components/VgButton/VgButton'

GenericLargeModal.propTypes = {
  /** Icon react element */
  icon: PropTypes.node,
  /** Title of modal */
  title: PropTypes.string,
  /** Subtitle of modal */
  subtitle: PropTypes.string,
  /** RN elements to display inside the modal */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  /** Text for cancel button */
  cancelButtonText: PropTypes.string,
  /** Text for apply button */
  applyButtonText: PropTypes.string,
  /** Boolean indicating if apply button is active */
  isApplyActive: PropTypes.bool,
  /** Called when the user submits the form */
  onSubmit: PropTypes.func.isRequired,
  /** Called when the user clicks the cancel or x button */
  onCancel: PropTypes.func.isRequired,
}

GenericLargeModal.defaultProps = {
  onCancel: () => {},
  onSubmit: () => {}
}

/**
 * A reusable component to wrap large modals that displays full screen.
 * @category Components - Web
 * @namespace GenericLargeModal
 */
export default function GenericLargeModal({
  children,
  title,
  subtitle,
  icon,
  applyButtonText,
  isApplyActive,
  cancelButtonText,
  onSubmit,
  onCancel,
  error,
  onErrorApply
}) {
  const {hideModal} = useContext(GlobalModalContext)

  /** Hides modal and calls cancel callback */
  function handleCancel() {
    hideModal()
    onCancel()
  }

  /** Hides modal and calls submit callback */
  function handleSubmit() {
    hideModal()
    onSubmit()
  }

  const firstSpace = title.indexOf(' ')
  const titleFirstWord = title.substr(0, firstSpace)
  const restOfTitle = title.substr(firstSpace + 1)
  const formattedTitle = <PTitle><span>{titleFirstWord}</span>{' '+restOfTitle}</PTitle>

  return (
    <DivModalContainer>
      <DivContentBackground color={error ? colors.uiAlertRed : colors.officialBlue}>
        <DivModalContent>
          <DivTopSection>
            <DivTemplateIcon>
              {error ? <ErrorIcon /> : icon}
            </DivTemplateIcon>
            <DivTitles>
              <DivModalSubtitle>{error ? 'ACTION REQUIRED' : subtitle}</DivModalSubtitle>
              <DivModalTitle>{error ? error.errorTitle : formattedTitle}</DivModalTitle>
            </DivTitles>
          </DivTopSection>
          {
            !error &&
            <ButtonExit onClick={handleCancel}>
              <XIcon />
            </ButtonExit>
          }
          <DivModalInside>
            {children}
          </DivModalInside>
          {
            !error &&
            <DivButtonsContainer>
              <VgButton text={cancelButtonText || 'Cancel'} onClick={handleCancel}/>
              <VgButton
                type='submit'
                text={applyButtonText || 'Apply'}
                onClick={handleSubmit}
                isActive={isApplyActive}
              />
            </DivButtonsContainer>
          }
          {
            error &&
            <DivErrorButtonContainer>
              <VgButton
                type='submit'
                text={'Got it'}
                onClick={onErrorApply}
              />
            </DivErrorButtonContainer>
          }
        </DivModalContent>
      </DivContentBackground>
    </DivModalContainer>
  )
}

function ErrorIcon() {
  return <DivErrorIconWrapper><WarningIcon lineColor={colors.white}/></DivErrorIconWrapper>
}