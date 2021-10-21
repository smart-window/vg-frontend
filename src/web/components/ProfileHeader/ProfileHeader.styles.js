import { colors } from 'shared/constants/cssConstants'
import styled from 'styled-components'

export const DivProfileHeaderTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 400;
  font-family: Helvetica, sans-serif;
  margin-bottom: 13px;
  width: 100%;
`

export const DivProfileLeftHeader = styled.div`
  display: flex;
`

export const DivProfileHeaderName = styled.div`
  margin-left: 16px;
  font-size: 1.2rem;
`

export const DivProfileHeaderClient = styled.div`
  margin-left: 24px;
  font-size: 1rem;
  color: ${colors.gray50};
`

export const ImgBackArrow = styled.img`
  transform: rotate(90deg);
  height: 24px;
`

export const DivProfileRightHeader = styled.div`
  display: flex;
  align-items: center;
`

export const DivProfileDownload = styled.div`
  font-size: .8rem;
  margin-right: 15px;
  font-style: italic;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  span {
    border-bottom: solid 1px ${colors.charcoal}
  }
`

export const DivProfileActiveProfile = styled.div`
  color: white;
  font-size: .8rem;
  padding: 2px 12px;
  background-color: ${colors.green};
  border-radius: 6px;
  height: 21px;
  display: flex;
  align-items: center;
`
