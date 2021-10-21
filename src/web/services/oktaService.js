import storageConstants from 'shared/constants/storageConstants'

/**
 * @category Services - Web
 * @module oktaService
 */
export default {
  getBearerToken,
  getOperatorId
}

/**
 * Gets okta idToken from localStorage.
 * TODO: confirm this is consistent with useOktaAuth().authState.idToken
 * @returns {string} formatted bearer token Authorization header
 */
function getBearerToken() {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(storageConstants.OKTA_TOKEN_STORAGE)
  const jsonToken = JSON.parse(token)
  const idToken = jsonToken?.idToken?.idToken
  return idToken ? `Bearer ${idToken}` : ''
}

/**
 * Gets PEGA 'OperatorId' from okta localStorage.
 * Tries to pull from employeenumber, then falls back to okta preferred_username
 * @returns {string} user identifier to send to PEGA
 */
function getOperatorId() {
  const token = localStorage.getItem(storageConstants.OKTA_TOKEN_STORAGE)
  const jsonToken = JSON.parse(token)
  const oktaClaims = jsonToken?.idToken?.claims || {}
  return oktaClaims.employeenumber || oktaClaims.preferred_username
}