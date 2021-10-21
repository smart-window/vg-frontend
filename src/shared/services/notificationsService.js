import oktaService from 'web/services/oktaService'
import storageConstants from 'shared/constants/storageConstants'
import pegaApiConfig from 'shared/config/pegaApiConfig'

/**
 * This file contains helpers for fetching and processing notification data from PEGA.
 * @category Services
 * @module notificationsService
 */
export default {
  fetchNotifications,
  markNotificationRead,
  markNotificationsViewed
}

const {PEGA_API_HOST, BASIC_AUTH_HEADER} = pegaApiConfig

/**
 * Retrieve notifications for current user (through operator id from okta) from PEGA.
 * Currently, only notifications with status=UNREAD are returned.
 * This function adds a field - hasNewNotifications {boolean} - to the JSON response.
 *
 * @returns {object} e.g.
 *   {
 *     notifications: [list of notifications from PEGA],
 *     hasNewNotifications: boolean
 *   }
 */
async function fetchNotifications() {
  const operatorId = oktaService.getOperatorId()

  const notificationsResponse = await fetch(
    PEGA_API_HOST + '/notifications?OperatorID=' + operatorId,
    {
      method: 'GET',
      headers: { authorization: BASIC_AUTH_HEADER }
    }
  )
  if (notificationsResponse.ok) {
    const notificationsJSON = await notificationsResponse.json()
    const notificationsData = notificationsJSON.notifications

    const hasNewNotifications = _getHasNewNotifications(notificationsData)
    return {notifications: notificationsData, hasNewNotifications}
  }
  else {
    // TODO: other error handling patterns to consider? Attempting to avoid a bunch of error handling in the caller.
    const errorText = 'Error fetching notificaitons: ' + notificationsResponse.statusText
    /* eslint-disable no-console */
    console.error(errorText)
    return {notifications: [], error: errorText}
  }
}

/**
 * Updates a notification's status to READ so it will not come back in future reads/GETs.
 * @param {string} notificationId maps to notification.uuid in PEGA notifications response
 */
async function markNotificationRead(notificationId) {
  const notificationsResponse = await fetch(
    PEGA_API_HOST + '/notifications?Status=READ&GUUID=' + notificationId,
    {
      method: 'PUT',
      headers: { authorization: BASIC_AUTH_HEADER }
    }
  )
  if (!notificationsResponse.ok) {
    // TODO: other error handling patterns to consider? Attempting to avoid a bunch of error handling in the caller.
    const errorText = `Error reading notificaiton with ID=${notificationId}. Error text: ${notificationsResponse.statusText}`
    /* eslint-disable no-console */
    console.error(errorText)
  }
}

/**
 * Update localStorage.NOTIFICATIONS_LAST_VIEWED_AT with the current date/time.
 * This is used to reset the pip indicator for new notifications.
 *
 * TODO: eventually, this should be moved server-side
 */
function markNotificationsViewed() {
  const currentTimeMs = Date.now()
  localStorage.setItem(storageConstants.NOTIFICATIONS_LAST_VIEWED_AT, currentTimeMs)
}

/**
 * Using localStorage.NOTIFICATIONS_LAST_VIEWED_AT together with a list of notification data,
 * determines whether there are any new notifications for the current user.
 *
 * Not intended to be exported outside of this file.
 *
 * @param {array} notificationsItems Notification JSON from PEGA Rest API.
 * @returns {boolean} true if there are any new notifications for the current user.
 */
function _getHasNewNotifications(notificationsItems) {
  if (notificationsItems.length) {
    const notificationsLastViewedAt = localStorage.getItem(storageConstants.NOTIFICATIONS_LAST_VIEWED_AT)
    // use a very old date if unset (for logic simplicity)
    const notificationsLastViewedDateTime = new Date(+notificationsLastViewedAt || '1970-01-01')

    const mostRecentNotification = notificationsItems[0]
    const mostRecentDateTime = new Date(mostRecentNotification.createTime)

    return mostRecentDateTime > notificationsLastViewedDateTime
  }
  else return false
}

