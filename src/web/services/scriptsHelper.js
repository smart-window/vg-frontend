/**
 * @category Services - Web
 * @module scriptsHelper
 */
export default {
  loadExternalScript
}

/**
 * Load an external script from a URL.
 * @param {string} scriptId HTML id of the script tag
 * @param {string} scriptSrc URL to the external script
 * @param {boolean} useBody
 * @returns {Promise} executed once script is loaded
 */
function loadExternalScript(scriptId, scriptSrc, useBody) {
  return new Promise(resolve => {
    const existingScript = document.getElementById(scriptId)
    if (existingScript) {
      existingScript.remove()
    }

    const script = document.createElement('script')
    script.src = scriptSrc
    script.id = scriptId
    script.defer = true
    document.head.appendChild(script)
    if (useBody) {
      document.body.appendChild(script)
    }

    script.onload = () => {
      resolve(script)
    }
  })
}