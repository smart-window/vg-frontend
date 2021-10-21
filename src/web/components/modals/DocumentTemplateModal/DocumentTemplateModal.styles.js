import styled from 'styled-components'
import { colors, fonts } from 'shared/constants/cssConstants'

export const DivModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-family: ${fonts.helvetica};
`

export const DivContentBackground = styled.div`
  padding-top: 4px;
  background-color: ${colors.officialBlue};
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const DivModalContent = styled.div`
  position: relative;
  background-color: ${colors.white};
  border-radius: 18px;
  padding: 20px 16px 16px 16px;
`

export const DivTopSection = styled.div`
  display: flex;
  align-items: center;
`

export const DivTemplateIcon = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: ${colors.officialBlue};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DivTitles = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`

export const DivModalTitle = styled.div`
  font-family: ${fonts.openSans};
  font-size: 1.4rem;
  line-height: 22px;

  span {
    font-weight: 700;
  }
`

export const DivModalSubtitle = styled.div`
  font-size: 1rem;
  margin-bottom: 4px;
  color: ${colors.gray50};
`

export const ButtonExit = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  background-color: transparent;
`
