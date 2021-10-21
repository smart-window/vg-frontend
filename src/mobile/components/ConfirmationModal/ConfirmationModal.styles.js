import styled from 'styled-components/native'
import {mobileFonts} from 'shared/constants/cssConstants'

export const TextMessage = styled.Text`
  margin-top: 24px;
  margin-left: 18px;
  margin-right: 30px;
  font-family: ${mobileFonts.openSans(400)};
    font-size: 15px;
    line-height: 24px;
    color: #000000;
`