import { colors } from 'shared/constants/cssConstants'
import styled, { css } from 'styled-components'
import { DivInputWrapper } from 'web/modules/VgInput/VgInput.styles.js'

export const DivOperatingCountryInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const DivOperatingCountryInfoItem = styled.div`
  flex-grow: 1;
  max-width: 206px;
  min-width: 206px;
  margin-right: 20px;
  margin-bottom: 20px;
  ${DivInputWrapper} {
    z-index: 1;
  }
`

export const ImgExpandIndicator = styled.img`
  transition: all .3s ease;
  transform: rotate(0);
  ${props => props.expanded && css`
    transform: rotate(-90deg);
  `}
`

export const DivFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  margin-bottom:30px;
  position: relative;
`

export const ARemoveCountry = styled.a`
  color: ${colors.officialBlue};
  cursor: pointer;
`

export const DivAddCountry = styled.div`
  display: flex;
  font-size: 1rem;
  align-items: center;
  float:right;
  cursor: pointer;
  position: absolute;
  top: -50px;
  right: 0px;
`

export const DivAddIcon = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-right: 13px;
  border: solid 2px ${colors.green};
  font-size: 1rem;
  color: ${colors.green};

  display: flex;
  align-items: center;
  justify-content: center;
`

export const DivCountryName = styled.div`
  color: ${colors.officialBlue};
  padding-bottom: 5px;
  border-bottom: solid 2px ${colors.officialBlue};
  margin-bottom: 10px;
  ${DivInputWrapper} {
    z-index: 2;
    padding: 0 1px;
  }
`