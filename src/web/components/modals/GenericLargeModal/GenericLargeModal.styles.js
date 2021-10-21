import styled from 'styled-components'
import { colors, fonts } from 'shared/constants/cssConstants'
import {SpanButtonText} from 'web/components/VgButton/VgButton.styles'

export const DivModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-family: ${fonts.helvetica};
`

export const DivContentBackground = styled.div`
  padding-top: 4px;
  background-color: ${props => props.color};
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const DivModalContent = styled.div`
  position: relative;
  background-color: ${colors.white};
  border-radius: 18px;
  padding: 20px 18px 18px 18px;
`

export const DivTopSection = styled.div`
  display: flex;
  align-items: center;
`

export const DivTemplateIcon = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: ${colors.officialBlue};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DivTitles = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`

export const PTitle = styled.p`
  font-family: ${fonts.helvetica};
  font-weight: 300;
  span {
    font-weight: 600;
  }
`

export const DivModalTitle = styled.div`
  font-family: ${fonts.helvetica};
  font-size: 1.4rem;
  line-height: 22px;
`

export const DivModalSubtitle = styled.div`
  font-size: 0.8rem;
  margin-bottom: 4px;
  color: ${colors.gray50};
  font-family: ${fonts.helvetica};
`

export const ButtonExit = styled.button`
  position: absolute;
  top: 21px;
  right: 18px;
  border: none;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
  img {
    width: 18px;
    height: 18px;
  }
`

export const DivModalInside = styled.div`
  height: 100%;
  width: 100%;
`

export const DivButtonsContainer = styled.div`
  display: flex;
    justify-content: space-between;
  width: 100%;
  margin-top: 22px;

  button {
    width: fit-content;
    border-radius: 21px;
    padding: 0 18px;
  }

  button[type=button] {
    background-color: ${colors.white};
    box-shadow: none;
    span {
      color: ${colors.charcoal};
      font-weight: 400;
    }
  }

  ${SpanButtonText} {
    font-weight: 400;
  }
`

export const DivErrorIconWrapper = styled.div`
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

export const DivErrorButtonContainer = styled.div`
  display: flex;
    justify-content: flex-end;
  width: 100%;
  margin-top: 22px;

  button {
    width: 224px;
    border-radius: 21px;
    background-color: ${colors.uiAlertRed};
  }
`