import { colors } from 'shared/constants/cssConstants'
import styled from 'styled-components'

export const DivOnboardingDiscussionContainer = styled.div`
  margin-top: 32px;
  width: 100%;
`

export const DivDiscussionHeader = styled.div `
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  h3 {
    color: ${colors.charcoal};
    font-weight: 400;
    font-size: 1.125rem;
    span {
      font-weight: 300;
      margin-left: 10px;
    }
  }
`

export const DivCommentsContainer = styled.div`
  width: 100%;
`

export const DivComments = styled.div`
  width: 100%;
`

export const DivSeeMoreComments = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1rem;
  color: ${colors.officialBlue};
  padding-bottom: 4px;
  border-bottom: solid 1px ${colors.officialBlue};
  margin-bottom: 16px;
`