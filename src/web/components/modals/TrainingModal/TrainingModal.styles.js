import styled, {css} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const ImgTrainingIconContainer = styled.div`
  width: 60px;
  height: 60px;
  margin-left: 12px;
  margin-top: 9px;
  margin-right: 13px;
  border-radius: 100%;
  background: ${props => props.trainingStatus === 'completed' ? '#7CBE73' : '#54BAE3'}
`

export const ImgTrainingIcon = styled.img`
  width: 60px;
  height: 60px;
  margin-left: 0px;
  margin-top: 0px;
  ${props => props.trainingStatus === 'completed' && css`
    width: 30px;
    height: 30px;
    margin-left: 15px;
    margin-top: 15px;
  `}
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
  font-size: 1.4rem;
  line-height: 29px;
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
  height: calc(100% - 16px);
  top: 10px;
  left: calc(50vw - 400px);
  background: ${colors.officialBlue};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
  border-radius: 18px;
`

export const DivLitmosTrainingContainer = styled.div`
  position: absolute;
  width: 800px;
  height: calc(100% - 6px);
  left: 0px;
  top: 6px;
  background: ${colors.white};
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

export const ImgLitmosTrainingCloseButtonContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 21px;
  right: 19px;
  height: 18px;
  width: 18px;
  svg {
    height: 100%;
    width: 100%;
  }
`

export const DivLitmosDateInfo = styled.div`
  position: absolute;
  right: 51px;
  top: 16px;
  font-family: ${fonts.openSans};
  font-size: 0.8rem;
  text-align: right;
  color: ${colors.gray30};
`

export const DivLitmosDateInfoOverdue = styled.div`
  position: absolute;
  right: 51px;
  top: 16px;
  font-family: ${fonts.openSans};
  font-size: 0.8rem;
  text-align: right;
  color: ${colors.uiAlertRed};
`

export const IFrameLitmosTraining = styled.iframe`
  position: absolute;
  left: 18px;
  top: 94px;
  width: calc(100% - 36px);
  height: calc(100% - 225px);
`

export const DivLitmosTrainingFooter = styled.div`
  width: 764px;
  height: 123px;
  margin-right: 19px;
  position: absolute;
  left: 18px;
  bottom: 0px;
  border-top: 3px solid ${colors.coolGray};
`

export const DivLitmosTrainingCompletion = styled.div`
  width: 310px;
  height: 18px;
  position: absolute;
  left: 231px;
  top: 12px;
  display: flex;
`

export const InputLitmosTrainingCompletedCheckbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 5px;
`

export const InputLitmosTrainingCompletedCheckboxDisabled = styled(InputLitmosTrainingCompletedCheckbox)`
`

export const SpanLitmosTrainingCompletionText = styled.div`
  font-family: ${fonts.openSans};
  font-size: 0.8rem;
  line-height: 16px;
  color: ${props => props.disabled ? colors.gray30 : colors.charcoal};
  margin-top: 2px;
  margin-left: 5px;
`

export const DivLitmosTrainingCancel = styled.div`
  position: absolute;
  left: 18px;
  top: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 54px;
  width: 176px;
  font-family: ${fonts.openSans};
  font-size: 1.2rem;
  line-height: 25px;
  text-align: center;
  color: ${colors.black};
  cursor: pointer;
`

export const DivLitmosTrainingSubmit = styled.div`
  position: absolute;
  right: 19px;
  top: 34px;
  height: 54px;
  width: 176px;
  text-align: center;
  background: ${colors.officialBlue};
  border: 1px solid ${colors.white};
  box-sizing: border-box;
  border-radius: 21px;
  font-family: ${fonts.openSans};
  font-size: 1.2rem;
  line-height: 54px;
  text-align: center;
  color: ${colors.white};
  ${props => props.isDeactivated && css`
    opacity: .5;
  `}
  ${props => props.isDeactivated && css`
    cursor: pointer;
  `}
`