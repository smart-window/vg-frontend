import * as Analytics from 'expo-firebase-analytics'

/**
 * Wrapper for Firebase Google Analytics
 * Use this service to send data to GA on mobile.
 *
 * Firebase and Analytics are initialized in MobileAppContainer.js, and logged in
 * parallel to a GA property and stream. The two are linked through
 * connected site tags via Firebase.
 *
 * @category Services - Mobile
 * @module analyticsServiceMobile
 */
export default {
  initUser,
  logEvent
}

/**
 * Set the User ID to correlate GA sessions for this user.
 * @param {string} userId - Okta user role
 * @param {string} userRole - TODO: figure out what to pass here
 * https://docs.expo.io/versions/latest/sdk/firebase-analytics/#setuserid
 */
async function initUser(userId, userRole) {
  await Analytics.setUserId(userId)
}

/**
 * Logs a basic event
 * @param {string} eventCategory
 * @param {string} eventAction
 * @param {string} eventLabel
 * @param {string} value
 * https://developers.google.com/gtagjs/reference/event
 */
function logEvent(eventCategory = '', eventAction = '', eventLabel, value) {
  Analytics.logEvent(eventCategory, {
    event_action: eventAction,
    event_label: eventLabel,
    value
  })
}