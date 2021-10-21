import styled from 'styled-components'
import {fonts} from 'shared/constants/cssConstants'

export const DivTrainingContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
    background-color: transparent;
`

export const DivTrainingNoneAvailable = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
  position: relative;
`

export const ImgNoneAvailabel = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
`

export const DivExplanation = styled.div`
width: 305px;
height: 65px;
position: absolute;
top: 89px;
margin-left: calc(50% - 152px);
display: flex;
`

export const ImgLightBulb = styled.img`
  width: 51px;
  height: 59px;
`

export const DivExplanationParagraph = styled.div`
  display: block;
  width: 248px;
  height: 65px;
`

export const SpanExplanationText = styled.span`
  font-family:${fonts.openSans};
  font-size: 1rem;
  font-style: italic;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`

export const SpanExplanationTextBold = styled.span`
  font-family:${fonts.openSans};
  font-size: 1rem;
  font-style: italic;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`
