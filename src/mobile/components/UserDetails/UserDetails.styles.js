import styled from 'styled-components/native'
import {colors, mobileFonts} from 'shared/constants/cssConstants'

export const ViewUserDetails = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`
export const ViewProfileImage = styled.View`
  width: 100%;
  height: 300px;
`
export const ImageProfile = styled.Image`
  width: 100%;
  height: 330px;
  border-top-right-radius: 32px;
  border-top-left-radius: 32px;
`
export const ViewUserInfo = styled.View`
  width: 100%;
  padding: 30px;
`
export const ViewFields = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 3px;
`

export const ImageLoading = styled.Image`
  width: 120px;
  height: 120px;
  margin: auto;
  margin-top: 18px;
`

export const TextUserDataError = styled.Text`
  font-family: ${mobileFonts.openSans(600)};
  font-size: 15px;
  color: ${colors.fuchsia};
  margin: 60px 0;
`