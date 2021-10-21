
import styled from 'styled-components'
import {colors} from 'shared/constants/cssConstants'
import { sharedInputStyles, DivInputWrapper } from '../../VgInput.styles'

export const Input = styled.input`
  ${sharedInputStyles}
  width: 400px;
  box-sizing: border-box;
  padding-right: 12px;
`

export const InputSuite = styled.input`
  ${sharedInputStyles}
`

export const ImgMapIcon = styled.img`
  position: absolute;
    bottom: 3px;
    right: 0;
  width: 7px;
  height: 10px;
  padding-bottom: 3px;
  padding-left: 3px;
`

export const InnerDivInputWrapper = styled.div`
  ${DivInputWrapper};
  display: flex;
    flex-direction: row;
    align-items: flex-end;
  border-bottom: 1px solid ${colors.gray50};
`

export const DivSuiteInput = styled.div`
  width: 87px;
  display: flex;
  flex-direction: column;
`

export const DivAddressInput = styled.div`
  width: calc(100% - 87px - 24px);
  display: flex;
  flex-direction: column;
  margin-right: 24px;
`

export const DivAddressInner = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
  }
`

export const DivContainer = styled.div`
  display: flex;
`