const PEGA_HOST = process.env.REACT_APP_PEGA_HOST || 'https://portal-dev.velocityglobal.com'
const PEGA_API_HOST = PEGA_HOST + '/prweb/PRRestService/spaapi/v1'
const API_USERNAME = process.env.REACT_APP_PEGA_API_USERNAME
const API_PASSWORD = process.env.REACT_APP_PEGA_API_PASSWORD
// Base-64 encode basic auth credentials
const BASIC_AUTH_HEADER = 'Basic ' + btoa(API_USERNAME + ':' + API_PASSWORD)

export default {
  BASIC_AUTH_HEADER,
  PEGA_API_HOST
}