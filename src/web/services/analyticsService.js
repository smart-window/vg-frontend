/**
 * Wrapper for Google Analytics (window.ga)
 * Use this service to send data to GA.
 *
 * Analytics are initialized in index.html, and logged in
 * parallel to a GA property and stream. The two are linked through
 * connected site tags.
 *
 * @category Services - Web
 * @module analyticsService
 */
export default {
  initUser,
  logEvent
}

// TODO: refactor to work on mobile (global.gtag instead of window.gtag)

/**
 * Set the User ID to correlate GA sessions for this user.
 * @param {string} userId - Okta user role
 * @param {string} userRole - TODO: figure out what to pass here
 * https://support.google.com/analytics/answer/3123662
 */
function initUser(userId, userRole) {
  // Set global GA user_id
  window.gtag('config', 'GA_MEASUREMENT_ID', {
    user_id: userId
  })
  window.gtag('set', {user_id: userId})

  // Set user metadata custom dimensions
  // window.gtag('set', 'dimension2', userRole);
  // Set user metadata as stream properties
  window.gtag('set', 'user_properties', {
    user_id: userId
    // user_role: userRole,
  })
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
  window.gtag('event', eventCategory, {
    hitType: 'event',
    event_action: eventAction,
    event_label: eventLabel,
    value
  })
}