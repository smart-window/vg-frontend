import { colors } from 'shared/constants/cssConstants'
import styled from 'styled-components'
import VgButton from 'web/components/VgButton/VgButton'
import VgInput from 'web/modules/VgInput/VgInput'

export const DivOnboardingPostCommentContainer = styled.div`
  background-color: ${colors.boneWhite};
  border-radius: 3px;
  padding: 13px 24px;
`

export const DivPostCommentHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 1.125rem;
`

export const DivVisibility = styled.div`
  display: flex;
  align-items: flex-end;
  color: ${colors.charcoal};
  font-weight: 500;
  img {
    margin-right: 8px;
  }
`

export const DivPostCommentBody = styled.div`
  margin-bottom: 12px;
  border-radius: 18px;
  padding: 8px;
  background-color: white;
  .mentions {
    margin: 0;
  }

  .mentions__control {
    font-size: 1rem;
    font-weight: 400;
    min-height: 63px;
  }
  .mentions__highlighter {
    padding: 9px;
    min-height: 63px;
  }
  .mentions__input {
    padding: 9px;
    min-height: 63px;
    outline: 0;
    border: 0;
    /* color: transparent; */
  }

  .mentions__suggestions__list {
    background-color: white;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
    border-radius: 12px;
  }

  .mentions__suggestions__item {
    padding: 0;
  }

  .mentions__suggestions__item--focused {
    background-color: #cee4e5;
  }
  /* .mentions__highlighter__substring{
  visibility: visible !important;
  color: #182026;
} */
  .mentions__mention {
    background-color: #cee4e5;
    /* color: #499FDA; */
  }
`

export const DivPostCommentFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: ${colors.gray50};
  font-size: 1rem;
  font-style: italic;
`
export const DivPostButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const CommentPostButton = styled(VgButton)`
  width: 120px;
  height: 36px;
`

export const VisibilitySelector = styled(VgInput)`
  min-width: 180px;
`

export const DivSuggestionItem = styled.div`
  cursor: pointer;
  padding: 5px 17px;
  color: ${colors.charcoal};
    font-size: .75rem;
  span {
    margin-left: 8px;
    color: ${colors.gray50};
    font-style: italic;
  }
  &:hover {
    background-color: ${colors.boneWhite}
  }
`