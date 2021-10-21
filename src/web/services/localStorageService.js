/**
 * @category Services - Web
 * @module localStorageService
 */
export default {
  getFromStorage,
  setInStorage,
  removeFromStorage
}

/**
 * Gets and parses from localStorage.
 * @param {string} key key reference in storage
 * @returns {*} returns parsed stored data
 */
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key))
}

/**
 * Stringifies and sets data into localStorage
 * @param {string} key key reference in storage
 * @param {*} item item to store in storage
 */
function setInStorage(key, item) {
  localStorage.setItem(key, JSON.stringify(item))
}

/** Removes stored item from storage */
function removeFromStorage(key) {
  localStorage.removeItem(key)
}