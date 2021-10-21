import styled from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const DivContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  @media (max-width: 881px) {
    flex-direction: column;
  }

  @media (min-width: 1539px) {
    section {
      width: 743px;
    }
  }
`

export const SectionErrorContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 50%;
  text-align: center;
  font-family: ${fonts.openSans};

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-left: 50px;
  }

  img {
    position: absolute;
    top: -140px;
    left: 0;
    max-width: 747px;
    max-height: 792px;
    width: 100%;
    height: 100%;
    min-width: 373px;
    min-height: 396px;
  }

  h1 {
    margin-bottom: 30px;
    font-family: ${fonts.helvetica};
    font-weight: 300;
    font-size: 14rem;
    line-height: 241px;
    color: ${colors.black};
  }
  h2 {
    font-weight: 600;
    font-size: 1rem;
    line-height: 20px;
    text-align: center;
    color: ${colors.charcoal};
    &:nth-of-type(2) {
      margin-bottom: 27px;
    }
  }
  button {
    width: 153px;
    height: 46px;
    margin-bottom: 15px;
    background: ${colors.officialBlue};
    border: 1px solid ${colors.officialBlue};
    border-radius: 6px;
    color: ${colors.white};
    font-size: 1.2rem;
    line-height: 25px;
    text-align: center;
  }

  @media (max-width: 1180px) {
    h1 {
      font-size: 10rem;
      line-height: 146px;
      margin-bottom: 24px;
    }
  }

  @media (max-width: 881px) {
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    div {
      padding: 0px 12px;
    }
    img {
      display: none;
    }
    h1 {
      font-size: 8rem;
      line-height: 146px;
    }
  }
`

export const ArticleErrorMessage = styled.article`
  min-width: 250px;
  width: 100%;
  max-width: 447px;
  height: 63px;
  margin-bottom: 21px;
  padding: 6px 3px 6px 9px;
  overflow: auto;
  background: ${colors.boneWhite};
  border: 1px solid #BDBDBD;
  box-sizing: border-box;
  border-radius: 6px;
  p {
    text-align: left;
    font-family: ${fonts.roboto};
    font-weight: 500;
    font-size: 0.8rem;
    line-height: 16px;
    color: ${colors.charcoal};
  }
`