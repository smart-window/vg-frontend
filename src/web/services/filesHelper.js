/**
 * @category Services - Web
 * @module filesHelper
 */
export default {
  downloadBlob,
  uploadToS3,
  deleteFromS3,
  downloadFile,
  validateFilesForUpload,
  buildFileTypeRegex,
  convertBytesToMB,
  getFileNameWithoutExtension
}

// Default file size allowed per file upload
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 20000000
// Map for the different types of errors a document upload may encounter
const errorTypesMap = {
  tooLarge: (fileSize) => {
    return {
      errorTitle: 'File Size Is Too Large',
      message: `The maximum file size allowable for an upload is ${convertBytesToMB(fileSize)} MB.`
    }
  },
  typeNotValid: (requiredTypes) => {
    return {
      errorTitle: 'File Type not Accepted',
      message: `That file type is not accepted for the target upload. Please upload a ${requiredTypes}`
    }
  },
  tooManyDocs: () => {
    return {
      errorTitle: 'Multiple Files Detected',
      message: 'Only one file may be uploaded for a requested document upload.'
    }
  }
}

/**
 * Downloads a blob using an anchor tag ref
 * @param {File} blob a File blob for download
 * @param {string} name the name of the download
 * @param {Element} anchorRef ref of the anchor that triggers download
*/
function downloadBlob(blob, name='file.txt', anchorRef) {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob)

  downloadFile(blobUrl, anchorRef, name)
}

/**
 * Downloads a file via url
 * @param {string} downloadPath working url for file download
 * @param {Element} anchorRef ref of the anchor that triggers download
 * @param {string} name file name
 */
function downloadFile(downloadPath, anchorRef, name) {
  // Create a link element
  const link = anchorRef.current

  // Set link's href to point to the Blob URL
  link.href = downloadPath
  link.download = name || null

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
  )

  // Reset the link's href
  link.href = null
  link.download = null
}

/**
 * Uploads a file to S3, using a presigned URL with bucket/account info embedded
 * @param {string} presignedUrl S3 url generated from API
 * @param {File} file
 * @returns
 */
async function uploadToS3(presignedUrl, file) {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
  })
  return response.ok
}

async function deleteFromS3(presignedDeleteUrl) {
  const response = await fetch(presignedDeleteUrl, {
    method: 'DELETE'
  })
  return response.ok
}

/**
 * Validates files available for upload, checks by file type, file size, and number of files
 * @param {array} newFiles array of new files for upload
 * @param {number} allowedNumberOfFiles number of allowed uploads
 * @param {array} requiredTypes array of allowed file types for upload
 * @param {number} maxFileSizeInBytes max file size allowed for upload, defaults to 500000
 * @returns [files, errorObject] - files for upload, error object to display
 */
function validateFilesForUpload(newFiles, allowedNumberOfFiles, requiredTypes, maxFileSizeInBytes=DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
  let errorObject, regexFileType

  if (requiredTypes) {
    regexFileType = buildFileTypeRegex([...requiredTypes])
  }

  for (let i = 0; i < newFiles.length; i++) {
    const file = newFiles[i]
    if (allowedNumberOfFiles && i > (allowedNumberOfFiles - 1)) {
      errorObject = errorTypesMap.tooManyDocs()
    }
    if (regexFileType && !regexFileType.exec(file.name)) {
      const requiredTypesCopy = [...requiredTypes]
      const typesStringified = requiredTypesCopy.splice(
        requiredTypesCopy.length - 1, 1).join(', ') +' or ' +
        requiredTypesCopy[requiredTypesCopy.length - 1]
      errorObject = errorTypesMap.typeNotValid(typesStringified)
    }
    if (file.size > maxFileSizeInBytes) {
      errorObject = errorTypesMap.tooLarge(maxFileSizeInBytes)
    }
    if (errorObject) return errorObject
  }
}

/**
 * Dynamically creates a regex to check file type from array of accepted file types
 * @param {array} requiredTypes array of allowed file types for upload
 * @returns regex
 */
function buildFileTypeRegex(requiredTypes) {
  const formattedRequiredTypes = requiredTypes.reduce((string, type, index) => {
    return index === requiredTypes.length - 1 ? string += `\\${type})$` : string += `\\${type}|`
  }, '(')
  return new RegExp(formattedRequiredTypes, 'i')
}

/**
 * Converts a number of bytes to number of Megabytes
 * @param {number} bytes number of bytes
 * @returns number of megabytes
 */
function convertBytesToMB(bytes) {
  const MEGA_BYTES_PER_BYTE = 1000000
  return Math.round(bytes / MEGA_BYTES_PER_BYTE)
}

/**
 * Returns a file name without an extension
 * @param {string} fileName file string name with file extension, i.e. filename.png
 * @returns file name without extension, i.e. filename
 */
function getFileNameWithoutExtension(fileName) {
  return /(.+?)(.[^.]*$|$)/.exec(fileName)[1]
}