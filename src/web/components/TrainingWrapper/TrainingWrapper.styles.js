import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const DivTrainingWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${colors.white};
  overflow: auto;
`

export const DivTrainingModules = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 20px;
`

export const DivTrainingsCaption = styled.div`
  font-family: ${fonts.helvetica};
  font-style: normal;
  font-weight: normal;
  font-size: 1.2rem;
  line-height: 21px;
  color: ${colors.charcoal};
  margin-bottom: 23px;
`

export const DivTrainingModulesGrid = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
`

export const DivTrainingModulesRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
`

export const DivTrainingModulesCard = styled.div`
  position: relative;
  width: 390px;
  height: 78px;
  background: ${colors.white};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  display: flex;
  margin-right: 24px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform .2s;
  margin-top: 0;
  margin-bottom: 0;
  transition: margin-top 300ms ease-out, margin-bottom 300ms ease-out, box-shadow 300ms ease-out;
  &:hover {
    margin-top: -5px;
    margin-bottom: 5px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
    transition: margin-top 300ms ease-out, margin-bottom 300ms ease-out, box-shadow 300ms ease-out;
  }
`

export const ImgTrainingIconContainer = styled.div`
  width: 60px;
  height: 60px;
  margin-left: 12px;
  margin-top: 9px;
  margin-right: 13px;
  border-radius: 100%;
  ${props => props.background && css`
    background: ${props.background};
  `}
`

export const ImgTrainingIcon = styled.img`
  ${props => props.margin && css`
    margin-left: ${props.margin};
    margin-top: ${props.margin};
  `}
  ${props => props.size && css`
    width: ${props.size};
    height: ${props.size};
  `}
`

export const DivDateInfo = styled.div`
  position: absolute;
  right: 9px;
  top: 9px;
  font-family: ${fonts.openSans};
  font-style: normal;
  font-weight: normal;
  font-size: 0.8rem;
  line-height: 16px;
  text-align: right;
  color: ${colors.gray30};
`

export const DivDateInfoOverDue = styled.div`
  position: absolute;
  right: 9px;
  top: 9px;
  font-family: ${fonts.openSans};
  font-style: normal;
  font-weight: normal;
  font-size: 0.8rem;
  line-height: 16px;
  text-align: right;
  color: ${colors.uiAlertRed};
`

export const DivTrainingTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 300px;
`

export const DivPoweredByText = styled.div`
  font-family: ${fonts.openSans};
  font-style: normal;
  font-weight: normal;
  font-size: 0.8rem;
  line-height: 16px;
  text-transform: uppercase;
  color: ${colors.gray50};
`

export const DivTrainingTitle = styled.div`
  font-family: ${fonts.openSans};
  font-style: normal;
  font-weight: normal;
  font-size: 1.2rem;
  line-height: 20px;
  text-transform: uppercase;
  color: ${colors.charcoal};
`

export const SpanBoldedTrainingTitle = styled.span`
  font-weight: bold;
`

export const SpanNonBoldedTrainingTitle = styled.span`
  font-weight: normal;
`

export const DivLitmosTrainingContainerShadow = styled.div`
  position: fixed;
  width: 800px;
  height: 696px;
  left: calc(50vw - 400px);
  top: calc(50vh - 339px);
  background: ${colors.officialBlue};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 18px;
`

export const DivLitmosTrainingContainer = styled.div`
  position: absolute;
  width: 800px;
  height: 690px;
  left: 0px;
  top: 6px;
  background: #FFFFFF;
  border-radius: 18px;
`

export const DivLitmosTrainingHeader = styled.div`
  position: relative;
  width: 100%;
  height: 93px;
  background: ${colors.white};
  display: flex;
  margin-top: 12px;
`

export const DivTrainingHeaderInfo = styled.div`
  margin-top: 18px;
  height: 50px;
  ${DivTrainingTitle} {
    white-space: nowrap;
    overflow: hidden;
    max-width: 665px;
    text-overflow: ellipsis;
  }
`
