import styled from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'
import { ViewButtonRow } from '../GenericModal/GenericModal.styles'
import { Button, SpanButtonText } from '../../VgButton/VgButton.styles'

export const DivErrorOuter = styled.div`
  width: 100%;
  height: 100%;
  ${ViewButtonRow} {
    box-sizing: border-box;
    margin-top: 0;
    padding-top: 0;
    padding-right: 12px;
    flex-grow: 1;
    justify-content: flex-end;
    align-items: flex-end;
  }
  ${Button} {
    width: 176px;
    height: 54px;
    box-sizing: border-box;
    border-radius: 21px;
    background: none;
    background-color: ${colors.uiAlertRed};
  }
  ${SpanButtonText} {
    font-family: ${colors.openSans};
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 25px;
  }
`

export const DivErrorInner = styled.div`
  display: flex;
  flex-direction: column;
`

export const DivIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  background: ${colors.uiAlertRed};
  svg {
    width: 36px;
    height: 36px;
  }
`

export const HeaderErrorTitle = styled.header`
  display: flex;
  align-items: center;
  padding: 18px;
`

export const DivHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  p {
      font-family: ${fonts.openSans};
      font-size: 0.8rem;
      line-height: 16px;
      text-transform: uppercase;
      color: ${colors.gray50};
    }
  h1 {
    font-family: ${fonts.helvetica};
    font-size: 1.4rem;
    line-height: 24px;
    color: ${colors.charcoal};
  }
`

export const PErrorMessage = styled.p`
  padding: 0 18px;
  font-family: ${fonts.openSans};
  font-size: 1rem;
  line-height: 24px;
  color: ${colors.charcoal};
`