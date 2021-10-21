import styled from 'styled-components'
import {colors} from 'shared/constants/cssConstants'

export const ContainerDiv = styled.div`
  height: 100%;
  font-family: 'proxima nova', montserrat, Arial, Helvetica, sans-serif;
  color: ${colors.oktaFont};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FormDiv = styled.div`
  border: 1px solid ${colors.oktaBorder};
  box-shadow: 2px;
  border-radius: 4px;
  width: 400px;
  min-width: 300px;
`

export const FormHeaderDiv = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${colors.oktaBorder};
  svg {
    height: 40px;
    width: 40px;
  }
`

export const FormBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 42px;
`

export const FormBodyHeaderDiv = styled.div`
  align-self: center;
  padding: 15px;
`

export const FormBodyHeaderH2 = styled.div`
  font-size: 1rem;
  font-weight: 600;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-bottom: 14px;
`

export const FormLabelDiv = styled.div`
  padding: 7px 10px 7px 0;
`

export const FormLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
`

export const FormInputDiv = styled.div`
  margin-bottom: 18px;
  width: 100%;
`
export const FormInput = styled.input`
  padding: 6px 8px;
  width: 100%;
  box-sizing: border-box;
  line-height: 1.5;
`

export const FormButton = styled.button`
  height: 50px;
  border-radius: 3px;
  border: 1px solid ${colors.oktaButtonBorder};
  outline: none;
  color: ${colors.white};
  background-color: ${colors.officialBlue};
  margin-bottom: 4px;
  &:hover {
    cursor: pointer;
  }
`

export const LinkA = styled.a`
  font-size: 0.8rem;
  &:hover {
    cursor: pointer;
  }
`

export const FormP = styled.p`
  font-size: 0.8rem;
  text-align: center;
  margin-bottom: 20px;
`