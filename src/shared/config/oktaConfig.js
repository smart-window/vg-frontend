const CLIENT_ID = process.env.REACT_APP_OKTA_CLIENT_ID || '0oa56obkugOhYhWh3357'
const MOBILE_CLIENT_ID = process.env.REACT_APP_OKTA_MOBILE_CLIENT_ID || '0oa77cvs06ISstaaE357'
const ISSUER = process.env.REACT_APP_OKTA_ISSUER || 'https://{yourOktaDomain}.com/oauth2/default'
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.REACT_APP_OKTA_TESTING_DISABLEHTTPSCHECK || false
const OKTA_REDIRECT_URI = process.env.REACT_APP_OKTA_REDIRECT_URI || 'http://localhost:8080/implicit/callback'

export default {
  clientId: CLIENT_ID,
  mobileClientId: MOBILE_CLIENT_ID,
  issuer: ISSUER,
  redirectUri: OKTA_REDIRECT_URI,
  scopes: ['openid', 'profile', 'email', 'groups'],
  mobileScopes: ['openid', 'profile', 'email', 'groups', 'offline_access'],
  pkce: true,
  disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  tokenManager: {
    autoRenew: true,
    expireEarlySeconds: 120
  },
  onSessionExpired: () => {}
}
