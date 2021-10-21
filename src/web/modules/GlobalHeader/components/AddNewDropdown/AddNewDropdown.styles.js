import styled from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'
import {Header, DivContent} from 'web/components/MenuWrapper/MenuWrapper.styles'

export const SpanControlsItemContainer = styled.span`
  display: inline-flex;
  ${Header} {
    margin-bottom: 15px;
  }
  ${DivContent} {
    max-height: 585px;
    height: fit-content;
  }
`

export const DivMenuItem = styled.div`
  margin: 0 -30px;
  height: 39px;
  padding-left: 33px;
  display: flex;
    align-items: center;
  font-family: ${fonts.openSans};
    font-size: 1.2rem;
    color: ${colors.gray50};
    line-height: 21px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.boneWhite}
  }
`