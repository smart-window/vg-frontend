import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import VelocityGlobalLogo from 'web/components/DynamicIcons/VelocityGlobalLogo'
import { colors } from 'shared/constants/cssConstants'
import { routes } from 'web/constants/routeConstants'
import {
  ContainerDiv,
  FormDiv,
  FormHeaderDiv,
  FormBodyDiv,
  FormBodyHeaderDiv,
  FormBodyHeaderH2,
  Form,
  FormLabelDiv,
  FormLabel,
  FormInputDiv,
  FormInput,
  FormButton,
  LinkA,
  FormP,
} from './SignInHelp.styles'

const API_URL = process.env.REACT_APP_API_HOST || 'http://localhost:4000'

/**
 * Sign in help page
 * @category Pages
 * @namespace SignInHelp
 */
export default function SignInHelp() {
  const history = useHistory()
  const query = new URLSearchParams(useLocation().search)
  const [username, setUsername] = useState(query.get('username') || '')
  const [message, setMessage] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    fetch(`${API_URL}/user_check?username=${username}`)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message)
      })
      .catch((e) => {
        console.error(e)
        setMessage('something went wrong')
      })
  }

  return (
    <ContainerDiv>
      <FormDiv>
        <FormHeaderDiv>
          <VelocityGlobalLogo
            fillColor={colors.officialBlue}
          />
        </FormHeaderDiv>
        {message ? (
          <FormBodyDiv>
            <FormBodyHeaderDiv>
              <FormBodyHeaderH2>You're all set!</FormBodyHeaderH2>
            </FormBodyHeaderDiv>
            <FormP>{message}</FormP>
            <FormButton onClick={() => history.push(routes.LOGIN)}>
              Back to Sign in
            </FormButton>
          </FormBodyDiv>
        ) : (
          <FormBodyDiv>
            <FormBodyHeaderDiv>
              <FormBodyHeaderH2>Get Help Signing In</FormBodyHeaderH2>
            </FormBodyHeaderDiv>
            <Form onSubmit={onSubmit}>
              <FormLabelDiv>
                <FormLabel>Email</FormLabel>
              </FormLabelDiv>

              <FormInputDiv>
                <FormInput
                  type='text'
                  value={username}
                  onChange={({ target: { value } }) => setUsername(value)}
                />
              </FormInputDiv>

              <FormButton type='submit'>Send me an Email</FormButton>
            </Form>
            <LinkA onClick={() => history.push(routes.LOGIN)}>
              Back to Sign In
            </LinkA>
          </FormBodyDiv>
        )}
      </FormDiv>
    </ContainerDiv>
  )
}
