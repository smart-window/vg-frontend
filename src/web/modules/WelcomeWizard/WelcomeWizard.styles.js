import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const DivOnboardingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 12px 15px;
`

export const DivOnboardingContents = styled.div`
  margin: 0 75px 0 45px;
  max-height: 800px;
  height: 100%;
  padding-top: 81px;
  box-sizing: border-box;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

export const DivCurrentPage = styled.div`
  margin-top: 33px;
  margin-right: 27px;
  height: calc(100% - 28px - 33px - 84px - 26px); //subtract other content and margins
`

export const H1Welcome = styled.h1`
  font-family: ${fonts.helvetica};
    color: ${colors.officialBlue};
    font-size: 1.6rem;
    line-height: 28px;
    font-weight: normal;
`

export const DivToolTip = styled.div`
  position: absolute;
    bottom: 96px;
    right: 0;
  pointer-events: none;
  height: 66px;
  width: 396px;
  border-radius: 12px;
  background: ${colors.white};
  box-sizing: border-box;
  padding: 9px 18px;
  box-shadow: 0px 1px 4px ${colors.dropShadow};
  transition: opacity 0.15s ease-in;
  opacity: 0;
  ${props => props.showToolTip && css`
    opacity: 1;
  `}
  p {
    color: ${colors.charcoal};
    font-family: ${fonts.openSans};
    font-size: 1rem;
    font-weight: 400;
    line-height: 22px;
  }
`