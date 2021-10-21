import styled from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'
import {DivButtonsRow} from '../../wwSharedStyles'

export const DivContainer = styled.div`
  height: 100%;
  h3 {
    font-family: ${fonts.openSans};
    font-size: 1rem;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0px;
    color: ${colors.charcoal};
  }
  li {
    display: flex;
    align-items: flex-start;
    margin-top: 21px;
  }
  p {
    margin-left: 12px;
    font-family: ${fonts.openSans};
    font-size: 0.8rem;
    font-weight: 400;
    color: ${colors.charcoal};
    line-height: 17px;
    span {
      color: ${colors.officialBlue};
      text-decoration: underline;
    }
  }
  ${DivButtonsRow} {
    display: flex;
    justify-content: flex-end;
    width: calc(100% - 3px);
    button {
      &:hover {
        cursor: pointer;
      }
    }
  }
`