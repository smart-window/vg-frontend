import styled from 'styled-components'
import {DivInputWrapper} from 'web/modules/VgInput/VgInput.styles'
import {DivContainer} from 'web/modules/VgInput/components/VgAddressInput/VgAddressInput.styles'

export const DivFieldsRow = styled.div`
  display: flex;
  margin-bottom: 12px;

  ${DivContainer} {
    width: calc(50% - 12px);
    margin-right: 24px;
    &:last-child {
      margin-right: 0;
    }
  }

  ${DivInputWrapper} {
    flex-basis: 0;
    flex-grow: 1;
    min-width: 50px;
    height: 56px;
    margin-right: 24px;
    &:last-child {
      margin-right: 0;
    }
  }
`