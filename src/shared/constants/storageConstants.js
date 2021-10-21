/**
 * Each constant in this file should map to a key
 * in localStorage (web) or asyncStorage (mobile)
 * @category Constants
 * @namespace cssConstants
 */

// our constants
const USER_INFO = 'USER_INFO'
const NOTIFICATIONS_LAST_VIEWED_AT = 'NOTIFICATIONS_LAST_VIEWED_AT'
const REDIRECT_URI = 'REDIRECT_URI'
const MOBILE_OKTA_AUTH = 'MOBILE_OKTA_AUTH'
const USER_LANGUAGE = 'USER_LANGUAGE'
const EEWW_PAGE_NUMBER = 'EEWW_PAGE_NUMBER'
const EXPANDED_SECTIONS = 'EXPANDED_SECTIONS'

// 3rd party storage constants
const OKTA_TOKEN_STORAGE = 'okta-token-storage'

export default {
  USER_INFO,
  OKTA_TOKEN_STORAGE,
  NOTIFICATIONS_LAST_VIEWED_AT,
  REDIRECT_URI,
  MOBILE_OKTA_AUTH,
  USER_LANGUAGE,
  EEWW_PAGE_NUMBER,
  EXPANDED_SECTIONS
}