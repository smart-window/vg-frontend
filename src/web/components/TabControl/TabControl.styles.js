import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const DivContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`

export const DivTabItem = styled.div`
  font-family: ${fonts.helvetica};
  font-size: 1.125rem;
  font-weight: 300;
  margin-right: 20px;
  cursor: pointer;
  padding-top: 9px;
  color: ${colors.gray50};
  ${props => props.selected && css`
    font-weight: 400;
    border-top: 4px solid ${colors.officialBlue};
    color: ${colors.officialBlue};
  `}
`
