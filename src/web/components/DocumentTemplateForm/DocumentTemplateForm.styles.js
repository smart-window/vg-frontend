import styled from 'styled-components'
import { colors } from 'shared/constants/cssConstants'

export const DivFormContent = styled.div`
  width: 100%;
  background-color: ${colors.white};
  height: 100%;
  overflow: auto;
`

export const DivFormTitle = styled.div`
  font-size: 1.4rem;
`

export const DivFormSubtitle = styled.div`
  font-size: 1rem;
`

export const DivTemplateName = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div:first-child {
    width: 80%;
  }
`

export const DivTemplateActions = styled.div`
  display: flex;
  height: 100%;
`

export const ButtonDeleteTemplate = styled.button`
  background-color: transparent;
  border: none;
`

export const DivFormBody = styled.div`
  height: 460px;
  display: flex;
  justify-content: space-between;
`

export const DivFormActions = styled.div`
  display: flex;
  justify-content: space-between;
`

export const DivFormActionButtonContainer = styled.div`
  margin-top: 16px;

  button {
    width: 200px;
  }
`

export const DivDocumentTemplateFormContainer = styled.div`
  height: 100%;
  width: 440px;
`

export const DivDocumentPreview = styled.div`
  height: 100%;
  width: 350px;
  margin-left: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.lightGray};
  border-radius: 3px;
`

export const DivFormSectionHeader = styled.div`
  color: ${colors.officialBlue};
  border-bottom: 1px solid ${colors.officialBlue};
  margin-top: 16px;
`

export const DivDocumentPreviewPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  color: ${colors.lightGray};
  padding: 0 24px;
  font-size: 1.4rem;
`

export const DivFormInputOptions = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const DivFormInput = styled.div`
  width: 45%;
  height: 56px;
  margin-top: 10px;
`
