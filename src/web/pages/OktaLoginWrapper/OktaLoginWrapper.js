import React, { useContext, useEffect } from 'react'
import * as OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'
import styled from 'styled-components'

import { GlobalLoaderContext } from 'shared/providers/GlobalLoaderProvider'
import {colors} from 'shared/constants/cssConstants'
import {routes} from 'web/constants/routeConstants'
import oktaConfig from 'shared/config/oktaConfig'

const DivLoginWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
    align-items: center;
    justify-content: center;
  #okta-sign-in {
    margin: 0;
  }
`

/**
 * Wraps okta-signin-widget in a react component.
 * Inspired by https://github.com/okta/samples-js-react/tree/master/custom-login
 * @category Pages
 * @namespace OktaLoginWrapper
 */
export default function OktaLoginWrapper() {
  const {setIsLoading} = useContext(GlobalLoaderContext)
  // clear loader on mount
  useEffect(() => setIsLoading(false), [])
  useEffect(function initWidget() {
    const { pkce, issuer, clientId, redirectUri, scopes } = oktaConfig
    const widget = new OktaSignIn({
      baseUrl: issuer.split('/oauth2')[0],
      clientId,
      redirectUri,
      logo: 'favicon.ico', // just using favicon logo for now since only /public assets are supported, resolution seems fine
      colors: {
        brand: colors.officialBlue
      },
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to Velocity Global',
          'forgotpassword': 'Reset password',
          'help': 'Get help with sign in credentials'
        },
      },
      authParams: {
        pkce,
        issuer,
        display: 'page',
        responseMode: 'query',
        scopes,
      },
      helpLinks: {
        help: window.location.origin + routes.SIGN_IN_HELP
      }
    })

    widget.renderEl(
      { el: '#sign-in-widget' },
      () => {
        /**
         * In this flow, the success handler will not be called beacuse we redirect
         * to the Okta org for the authentication workflow.
         */
      },
      (err) => {
        throw err
      },
    )

    return () => { widget.remove() }
  }, [])

  return <DivLoginWrapper id='sign-in-widget' />
}