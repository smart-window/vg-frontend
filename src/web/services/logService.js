// TODO: refactor to work with mobile

const envLogStream = process.env.REACT_APP_AWS_LOG_STREAM || 'dev_client_errors_stream'

const credentials = {
  accessKeyId: process.env.REACT_APP_CLOUDWATCH_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_CLOUDWATCH_AWS_SECRET_ACCESS_KEY,
}

let cloudwatchlogs
if (window.AWS) {
  // TODO: in firefox sometimes window.AWS is initially undefined
  cloudwatchlogs = new window.AWS.CloudWatchLogs({ region: 'us-east-2', credentials })
}

const logGroupName = 'react_client_errors'
const logStreamName = envLogStream
// let nextToken = ''

const describeParams = {
  logGroupName,
}

const putParams = {
  logEvents: [],
  logGroupName,
  logStreamName,
  sequenceToken: '',
}

function _fetchNextToken() {
  return new Promise((resolve, reject) => {
    cloudwatchlogs.describeLogStreams(describeParams, (err, data) => {
      if (err) {
        reject(err)
      }
      if (data) {
        resolve(data)
      }
    })
  })
}

function _putCloudLogs() {
  return new Promise((resolve, reject) => {
    cloudwatchlogs.putLogEvents(putParams, (err, data) => {
      if (err) {
        reject(err)
      }
      if (data) {
        resolve(data)
      }
    })
  })
}

function _sendCloudWatchEvents() {
  if (!cloudwatchlogs) {
    cloudwatchlogs = new window.AWS.CloudWatchLogs({ region: 'us-east-2', credentials })
  }
  const logsToSend = putParams.logEvents.length

  _fetchNextToken()
    .then(response => {
      const logStream = response.logStreams.filter(stream => stream.logStreamName === envLogStream)
      putParams.sequenceToken = logStream[0].uploadSequenceToken
    })
    .catch(sequenceTokenError => {
      console.error('Error getting upload sequence token: ', sequenceTokenError)
    })
    .then(() => {
      _putCloudLogs()
    }) // TODO: prob don't need inline function here
    .catch(logWriteError => {
      console.error('Error writing logs to CloudWatchLogs: ', logWriteError)
    })
    .then(
      () =>
        (putParams.logEvents = putParams.logEvents.slice(
          logsToSend,
          putParams.logEvents.length
        ))
    )
}

function logError(errorObject) {
  // TODO: in the future we will only want to catch this in production
  // localhost workaround is because env === 'development' in our dev environment
  // if (env !== 'development') {
  if (window.location.hostname !== 'localhost') {
    // add whatever statically available fluff you want to log here
    // to your error object (e.g. window.location.href,
    // user agent strings, etc. to the payload)
    const errorPayload = JSON.stringify(errorObject)

    const AWSErrorObject = {
      timestamp: Date.now(),
      message: errorPayload
    }

    putParams.logEvents.push(AWSErrorObject)
    _sendCloudWatchEvents()
  }
}

function handleError(message, source, line, col, error) {
  const errorObject = error ? {message: error.message, stack: error.stack} : {message, source, line, col}
  logError(errorObject)
}

export default {handleError, logError}