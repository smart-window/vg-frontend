import { colors, fonts } from 'shared/constants/cssConstants'
import styled from 'styled-components'

export const DivContainer = styled.div`
  margin-bottom: 24px;
`

export const DivProgressBarContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
`
export const DivDetailsContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const DivProgressBar = styled.div`
  height: 6px;
  border-radius: 6px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  background: ${colors.white};
  flex-grow: 1;
  &:before {
    content: "";
    height: 6px;
    display: block;
    background: ${colors.officialBlue};
    transform: scaleX(${(p) => p.percentComplete});
    transform-origin: left;
  }
`

export const DivProgressText = styled.div`
  margin-left: 8px;
  font-size: 1rem;
  color: ${colors.officialBlue};
  font-family: ${fonts.openSans};
`

export const DivHeaderTopRow = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-family: Helvetica, sans-serif;
`
export const DivHeaderName = styled.div`
  margin-left: 16px;
  font-size: 1.2rem;
`
export const DivHeaderClient = styled.div`
  margin-left: 24px;
  font-size: 1rem;
  color: ${colors.gray50};
`
export const ImgBackArrow = styled.img`
  transform: rotate(90deg);
  height: 24px;
`