import { colors } from 'shared/constants/cssConstants'
import styled from 'styled-components'

export const DivContainer = styled.div`
  width: 348px;
  border-radius: 18px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  position: relative;
`

export const DivProfileImage = styled.div`
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.4)
    ),
    url('${(p) => p.src}');
  background-size: cover;
  background-position: center;
  border-radius: 18px;
  width: 100%;
  height: 169px;
  padding-bottom: 42px;
  margin-bottom: -35px;
  box-sizing: border-box;
`

export const DivDetails = styled.div`
  width: 100%;
  height: 231px;
  border-radius: 18px;
  background: ${colors.white};
  padding: 24px 28px 8px;
  box-sizing: border-box;
`

export const DivDetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 5px solid ${colors.coolGray};
`

export const DivDetailHeading = styled.div`
  font-weight: 300;
  font-style: italic;
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 4px;
`
export const DivCompanyText = styled.div`
  font-size: 1rem;
  color: ${colors.officialBlue};
`

export const AIconLink = styled.a`
  color: ${colors.officialBlue};
  &:visited {
    color: initial;
  }
  &:not(:first-child) {
    margin-left: 16px;
  }
`

export const DivDetail = styled.div`
  width: 50%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:not(:last-child) {
    margin-right: 8px;
  }
`

export const DivDetailRow = styled.div`
  display: flex;
  margin: 16px 0;
`

export const DivChevronContainer = styled.div`
  text-align: center;

  & > svg {
    transform: rotate(90deg);
  }
`

export const DivNameContainer = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  top: 75px;
`

export const H3UserName = styled.h3`
  font-size: 1.6rem;
  color: ${colors.white};
  margin-bottom: 4px;
`

export const H4NameSubHeading = styled.h4`
  font-style: italic;
  font-weight: 600;
  font-size: 1rem;
  color: ${colors.white};
`

export const ButtonViewProfile = styled.button`
  position: absolute;
  top: calc(100% + 16px);
  right: 0;
  background: ${colors.officialBlue};
  border: 1px solid ${colors.officialBlue};
  border-radius: 6px;
  padding: 8px 24px;
  font-size: 1.2rem;
  color: ${colors.white};
  cursor: pointer;
`