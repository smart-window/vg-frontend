import styled from 'styled-components/native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'

export const ViewModalBackground = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.5);
`

export const ViewModalOuter = styled.View`
  background-color: ${props => props.modalTopBarColor ? props.modalTopBarColor : colors.officialBlue};
  height: 240px;
  width: 329px;
  border-radius: 12px;
  margin-bottom: 69%;
`

export const ViewModalInner = styled.View`
  background-color: ${colors.white};
  position: absolute;
    top: 6px;
  width: 100%;
  border-radius: 12px;
`

export const TextTitle = styled.Text`
  margin-left: 18px;
  margin-top: 24px;

  font-family: ${mobileFonts.deviceSpecificFont};
    font-size: 21px;
    line-height: 24px;
    color: ${colors.charcoal};
`

export const ViewButtonRow = styled.View`
  display: flex;
    flex-direction: row;
    justify-content: center;
    flex-grow: 1;
  margin-top: 45px;
  margin-bottom: 15px;
  padding-right: 12px;
  width: 100%;
`