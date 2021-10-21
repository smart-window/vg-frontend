const apiKey = process.env.REACT_APP_GEOCODING_KEY || ''

/**
 * @category Services - Web
 * @module geocodingService
 */
export default {
  fetchAddressMatches
}

/**
 * Fetches possible addresses from the Geocoding API from the Google Maps Platform
 * @param {string} addressString string search for address matching
 * @returns {array} parsed Goocoding API results
 */
async function fetchAddressMatches(addressSting) {
  const encodedAddress = encodeURIComponent(addressSting)
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`
  const response = await fetch(url)
  const parsedResponse = await response.json()
  return parsedResponse.results
}