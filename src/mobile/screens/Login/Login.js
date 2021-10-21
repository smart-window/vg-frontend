import React, {useContext, useState, useEffect} from 'react'
import * as WebBrowser from 'expo-web-browser'
import {CurrentUserContext} from 'mobile/providers/CurrentUserProvider.mobile'
import {useTranslation} from 'react-i18next'
import {makeRedirectUri, useAuthRequest, useAutoDiscovery} from 'expo-auth-session'
import {colors} from 'shared/constants/cssConstants'
import backdrop from 'assets/images/mobile-backdrop.png'
import VelocityGlobalLogo from 'mobile/icons/DynamicIcons/VelocityGlobalLogo'
import oktaConfig from 'shared/config/oktaConfig'

import {
  ViewLogin,
  ImageBackgroundBlue,
  ViewLogo,
  ViewSignIn,
  TouchableOpacityLogin,
  TextSignIn,
  TextOkta,
  TextLoginError
} from './Login.styles'

/** Auth Session login utilizes WebBrowser. */
WebBrowser.maybeCompleteAuthSession()

/**
 * The Login page that facilitates a user's authentication via Okta.
 * @category Components - Mobile
 * @namespace Login
 */
export default function Login() {
  const { t } = useTranslation()
  const [loginError, setLoginError] = useState(null)
  const currentUserContext = useContext(CurrentUserContext)

  /**
   * Auth Session functionality to grab a user's authorization code via the
   * WebBrowser. Code used to request Okta access and id tokens.
  */
  const discovery = useAutoDiscovery(oktaConfig.issuer)
  // TODO: confirm correct value for prod
  const nativeCallbackScheme = (process.env.REACT_APP_OKTA_SCHEME || 'com.okta.dev-283105') + ':/callback'
  // Request
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: oktaConfig.mobileClientId,
      scopes: oktaConfig.mobileScopes,
      // For usage in managed apps
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        native: nativeCallbackScheme,
      }),
    },
    discovery
  )

  useEffect(() => {
    /**
     * Checks response from sign in attempt. If success, uses the response to request an Okta Auth State.
     * If error, displays error on screen.
    */
    if (response?.type === 'success' && request) {
      currentUserContext.postToken(request, response, discovery)
        .catch(() => setLoginError(true))
    }
    else if (response?.type === 'error') {
      setLoginError(true)
    }
  }, [response, request])

  return (
    <ViewLogin testID='Login'>
      <ImageBackgroundBlue
        testID='ImageBackdrop'
        source={backdrop}
      >
        <ViewLogo>
          <VelocityGlobalLogo
            fillColor={colors.white}
            textColor={colors.white}
          />
        </ViewLogo>
      </ImageBackgroundBlue>
      <ViewSignIn>
        <TouchableOpacityLogin
          onPress={() => promptAsync()}
        >
          <TextSignIn>
            {t('Sign In')}
          </TextSignIn>
        </TouchableOpacityLogin>
        <TextOkta>
          {t('Powered by Okta')}
        </TextOkta>
        {
          loginError &&
          <TextLoginError>
            {t('Something went wrong, please try again')}
          </TextLoginError>
        }
      </ViewSignIn>
    </ViewLogin>
  )
}