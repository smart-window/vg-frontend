import { colors } from 'shared/constants/cssConstants'
import styled from 'styled-components'

export const DivOnboardingCommentContainer = styled.div`
  padding: 8px 8px 18px 40px;
  border-bottom: solid 1px ${colors.coolGray};
  &:last-child {
    border-bottom: none;
  }
`

export const DivCommentHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

export const DivVisibility = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.charcoal};
  font-weight: 500;
  img {
    margin-right: 9px;
  }
  span {
    text-transform: uppercase;
    margin-left: 5px;
  }
`

export const DivCommentBody = styled.div`
  font-size: 1rem;
  line-height: 20px;
  margin-bottom: 12px;
  .mentions_readonly {
    margin: 0;
  }

  .mentions_readonly__control {
    font-size: 1rem;
    font-weight: 400;
  }
  .mentions_readonly__highlighter {
    padding: 9px;
  }
  .mentions_readonly__input {
    padding: 9px;
    min-height: 63px;
    outline: 0;
    border: 0;
    display: none !important;
  }
  .mentions_readonly__highlighter__substring {
    color: #182026;
    visibility: visible !important;
  }

  .mentions_readonly__suggestions__list {
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 10pt;
  }

  .mentions_readonly__suggestions__item {
    padding: 5px 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }

  .mentions_readonly__suggestions__item--focused {
    background-color: #cee4e5;
  }

  .mentions_readonly__mention {
    color: #499fda;
    text-decoration: underline;
  }
`

export const DivCommentFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const DivDeleteComment = styled.div`
  color: ${colors.officialBlue};
  font-weight: 600;
  font-size: 1rem;
  text-decoration: underline;
  cursor: pointer;
`
export const DivPostedOn = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.charcoal};
  font-weight: 600;
  font-size: 1rem;
  .contract {
    color: ${colors.officialBlue};
    text-decoration: underline;
    margin-left: 5px;
    cursor: pointer;
  }
  .posted-at {
    color: ${colors.charcoal};
    font-weight: 300;
    margin-left: 20px;
  }
`
