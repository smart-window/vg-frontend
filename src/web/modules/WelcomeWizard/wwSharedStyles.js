import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'
import {DivInputWrapper} from 'web/modules/VgInput/VgInput.styles'
import {Button} from 'web/components/VgButton/VgButton.styles'
import {DivContainer} from 'web/modules/VgInput/components/VgAddressInput/VgAddressInput.styles'

export const H2FormHeading = styled.h2`
  font-family: ${fonts.openSans};
    color: ${colors.charcoal};
    font-style: italic;
    font-weight: 300;
    font-size: 1.2rem;
    line-height: 25px;
  margin-bottom: 15px;
`

export const DivFormContents = styled.div`
  height: calc(100% - 25px - 15px); // subtract h2 height and margin
  overflow-y: auto;
  padding-left: 30px;
`

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

export const DivButtonsRow = styled.div`
  position: relative;
  display: flex;
    justify-content: space-between;
  margin-left: 30px;
  margin-top: 26px;
  padding-bottom: 30px;
  ${Button} {
    height: 54px;
    width: 102px;
  }
  ${props => props.isFirstPage && css`
    // if only next button push to right
    ${Button} {
      &:first-child {
        margin-left: auto;
      }
    }
  `}
  ${props => props.isLastPage && css`
    // if only prev button push to left
    ${Button} {
      &:first-child {
        margin-right: auto;
      }
    }
  `}
`