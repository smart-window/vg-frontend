import styled from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'
import {Button, SpanButtonText} from 'web/components/VgButton/VgButton.styles'

export const ViewModalBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

export const ViewModalOuter = styled.div`
  position: relative;
  background-color: ${props => props.modalTopBarColor ? props.modalTopBarColor : colors.officialBlue};
  width: 329px;
  height: 240px;
  border-radius: 12px;
`

export const ViewModalInner = styled.dialog`
  position: absolute;
    top: 6px;
  display: flex;
    flex-direction: column;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  background-color: ${colors.white};
  border-radius: 12px;
`

export const TextTitle = styled.p`
  margin-left: 18px;
  margin-top: 24px;

  font-family: ${fonts.openSans};
    font-size: 1.4rem;
    line-height: 24px;
    color: ${colors.charcoal};
`

export const ViewButtonRow = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 45px 15px 15px 15px;
  width: 100%;
  ${Button} {
    width: 196px;
    border-radius: 21px;
    &[type='button'] {
      width: 145px;
      background: none;
      border: none;
      box-shadow: none;
      ${SpanButtonText}{
        color: ${colors.charcoal};
      }
    }
  }
  ${SpanButtonText} {
    font-family: ${fonts.openSans};
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 25px;
    letter-spacing: 0px;
  }
`