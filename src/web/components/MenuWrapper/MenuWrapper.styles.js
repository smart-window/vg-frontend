import styled from 'styled-components'
import {colors, fonts} from 'shared/constants/cssConstants'

export const Header = styled.header`
  display: flex;
  height: 48px;
  border-bottom: 9px solid ${colors.coolGray};
  padding-bottom: 12px;
  position: relative;
  svg {
    height: 39px;
    width: 39px;
    position: relative;
      top: 6px;
  }
`

// Needed by some parent components for things like
// cutting off scrollbar in a border radius container.
export const DivContentWrapper = styled.div``

export const DivContent = styled.div``

export const H2HeaderTitle = styled.h2`
  font-family: ${fonts.helvetica};
    font-size: 1.4rem;
    color: ${colors.charcoal};
  line-height: 40px;
  margin-top: 6px;
  margin-left: 18px;
`

export const DivSubheader = styled.div`
  position: absolute;
    bottom: 8px;
    left: 58px;
`