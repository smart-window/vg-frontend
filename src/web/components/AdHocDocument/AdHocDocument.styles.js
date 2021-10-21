import styled from 'styled-components'
import {colors} from 'shared/constants/cssConstants'

export const ArticleContainer = styled.article`
  // give 2px for box-shadow
  max-width: 1008px;
  margin-right: 2px;
  width: calc(100% - 2px);
  display: flex;
  flex-direction: column;
`

export const DivWidget = styled.div`
  background: ${colors.white};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 21px 0 21px;
  box-sizing: border-box;
  border-radius: 18px;
`

export const DivIconsWrapper = styled.div`
  padding-left: 25px;
  cursor: pointer;
`

export const FormForDocument = styled.form`
  display: flex;
  justify-content: space-between;
  height: 100%;
  flex-grow: 1;
  margin-left: 25px;
  input {
    width: 248px;
  }
`

export const DivSelectInputWrapper = styled.div`
  width: 163px;
`

export const DivInputWrapper = styled.div`
  width: 163px;
  input {
    width: 163px;
    pointer-events: none;
    border: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`