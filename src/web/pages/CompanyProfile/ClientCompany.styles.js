import { colors } from 'shared/constants/cssConstants'
import styled from 'styled-components'
export const DivClientCompanyDetail = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 18px 18px 18px;
`

export const DivClientCompanyHeader = styled.div`
  display: flex;
  justify-content: flex-start;
`

export const DivClientCompanyBody = styled.div`
  margin-top: 20px;
  width: 100%;
`
export const DivSubBlock = styled.div`
  margin-bottom: 36px;
`

export const DivSubBlockHeader = styled.div`
  color: ${colors.officialBlue};
  padding-bottom: 4px;
  border-bottom: solid 1px ${colors.officialBlue};
  margin-bottom: 12px;
`

export const DivSubBlockBody = styled.div`
  
`

export const DivHeaderTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 400;
  font-family: Helvetica, sans-serif;
  margin-bottom: 13px;
  width: 100%;
`

export const DivLeftHeader = styled.div`
  display: flex;
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

export const DivRightHeader = styled.div`
  display: flex;
  align-items: center;
`

export const DivDownload = styled.div`
  font-size: .8rem;
  margin-right: 15px;
  font-style: italic;
  display: flex;
  align-items: flex-end;
  span {
    border-bottom: solid 1px ${colors.charcoal}
  }
`
export const DivActiveClient = styled.div`
  color: white;
  font-size: .8rem;
  padding: 2px 12px;
  background-color: ${colors.green};
  border-radius: 6px;
  height: 21px;
  display: flex;
  align-items: center;
`

export const DivClientCompnayContainer = styled.div`
  overflow: auto;
  max-height: calc(100vh - 230px);
`