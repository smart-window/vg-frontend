import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

import InputTypes from './constants/InputTypes'
import {DivDatePickerWrapper} from 'web/components/VgDatePicker/VgDatePicker.styles'

export const sharedInputStyles = css`
  border: unset;
    border-bottom: 1px solid ${colors.gray50};
    border-radius: 6px 6px 0 0;
    box-sizing: border-box;
  font-family: ${fonts.openSans};
    color: ${colors.charcoal};
    font-size: 1rem;
    line-height: 20px;
  height: 24px;
  ${props => props.hasError && css`
    border-bottom-color: ${colors.uiAlertRed};
  `}
`

export const DivInputWrapper = styled.div`
  position: relative;
  display: flex;
    flex-direction: column;
  z-index: 0;
  ${DivDatePickerWrapper} {
    input {
      padding-left: 2px;
      ${sharedInputStyles}
    }
  }
`

export const Label = styled.label`
  height: 16px;
  position: relative;
`

export const SpanAnimatedLabelText = styled.span`
  font-family: ${fonts.openSans};
    color: ${colors.gray50};
    font-style: italic;
    font-weight: 300;
    font-size: 0.8rem;
    line-height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  position: absolute;
    top: 0;
    left: 0;
  transition: all 0.1s ease-in;
  width: 100%;
  z-index: 1;
  ${props => props.useAsPlaceholder && css`
    // Dynamic properties for animation
    font-size: 1rem;
    font-weight: 400;
    top: 19px;
    left: 1px;
    line-height: 19px;
    pointer-events: none;
    max-width: 95%;
  `}
  // truncate label width when there's an embedded icon
  ${props => props.useAsPlaceholder && (
      (props.type === InputTypes.DATE) ||
      (props.type === InputTypes.SELECT) ||
      (props.type === InputTypes.BOOLEAN)
    ) && css`
      max-width: 90%;
  `}
  ${props => props.useAsPlaceholder && props.type === InputTypes.TEXTAREA && css`
      left: 6px;
  `}
`

export const Input = styled.input`
  ${sharedInputStyles}
  ${props => props.readOnly && css`
    pointer-events: none;
    color: ${colors.officialBlue};
  `}
`

export const Textarea = styled.textarea`
  resize: none;
  border: 1px solid ${colors.gray30};
  border-radius: 3px;
`

const belowTextStyles = css`
  font-family: ${fonts.openSans};
    font-style: italic;
    font-size: 0.8rem;
    line-height: 14px;
  margin-top: 2px;
`

export const SpanOptionalIndicator = styled.span`
  ${belowTextStyles}
  color: ${colors.gray50};
`

export const SpanErrorMessage = styled.span`
  ${belowTextStyles}
  color: ${colors.uiAlertRed};
`

export const ImgErrorIcon = styled.img`
  position: absolute;
    top: 22px;
    right: 1px;
  height: 14px;
  width: 15px;
  svg {
    height: 100%;
    width: 100%;
  }
  ${props => props.type === InputTypes.TEXTAREA && css`
      right: 6px;
  `}
`
