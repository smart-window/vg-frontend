import styled, {css, keyframes} from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const AsideProgressIndicator = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 287px;
  min-width: 287px;
  height: 100%;
  max-height: 800px;
  z-index: 0;
  border-radius: 40px;
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.1)),
    linear-gradient(180deg, ${colors.officialBlue} -62.52%, ${colors.officialBlue} -40.3%, #4DA8DD 50.03%, ${colors.lightBlue} 111.19%);
  overflow-x: hidden;
`

export const DivLogoOverlay = styled.div`
  position: absolute;
  top: 12px;
  left: -28px;
  z-index: -1;
  svg {
    width: 445px;
    height: 412px;
  }
`

export const ArticleHeaderContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 24px;
  width: 100%;
  img {
    width: 191px;
    height: 30px;
    margin-top: 21px;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  p {
    width: 226px;
    margin-top: 24px;
    font-family: ${fonts.helvetica};
    font-style: italic;
    font-size: 1rem;
    line-height: 19px;
    text-align: center;
    color: ${colors.white};
  }
`
export const UlProgressContainer = styled.ul`
  width: 100%;
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 48px;
`

export const LiStepContainer = styled.li`
  display: flex;
  flex-direction: column;
  padding-left: 26px;
  margin-bottom: 30px;
  ${props => !props.isSelected && css`
    opacity: 0.8;
  `}
  img {
    width: 23px;
    height: 21px;
    margin-left: 9px;
    margin-right: 15px;
  }
  p {
    font-family: ${fonts.openSans};
    font-weight: ${props => props.isSelected ? 'bold' : 'normal'};
    font-size: 1rem;
    line-height: 20px;
    color: ${colors.white};
  }
  div {
    display: flex;
    align-items: center;
    width: 100%;
    figure {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 39px;
      height: 39px;
      margin-right: 9px;
      background: ${colors.white};
      border-radius: 100px;
      box-sizing: border-box;
      box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.1);
      figcaption {
        font-family: ${fonts.openSans};
        font-weight: 600;
        font-size: 1.8rem;
        line-height: 37px;
        color: ${colors.officialBlue};
      }
    }
  }
`

export const UlSubstepsContainer = styled.ul`
  overflow-y: hidden;
  height: 100%;
  animation: ${fadeIn} .3s linear;

  ${LiStepContainer} {
    margin-bottom: 0;
    div {
      position: relative;
      width: 100%;
      box-sizing: border-box;
      padding-left: 50px;
      img {
        position: absolute;
        top: 3px;
        left: 25px;
        width: 16px;
        height: 14px;
      }
      p {
        width: 100%;
        word-wrap: break-word;
        font-style: normal;
        font-weight: normal;
        font-size: 0.8rem;
        line-height: 21px;
      }
    }
  }
`