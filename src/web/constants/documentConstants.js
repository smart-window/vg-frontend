/**
 * Constants used for document records.
 * @category Constants - Shared
 * @namespace documentConstants
 */

export const documentFileTypes = {
  DOCUMENT: 'document',
  SHEET: 'sheet',
  IMAGE: 'image',
  CONTRACT: 'contract',
  TEMPLATE: 'template',
}

export const documentTypes = {
  CLIENT: 'client',
  EMPLOYEE: 'employee',
  ALL: 'all'
}

export const documentStatuses = {
  COMPLETEDSTATUS: 'completed',
  NOTSTARTEDSTATUS: 'not_started',
}

export const documentActions = {
  DOWNLOADACTION: 'download',
  UPLOADACTION: 'upload',
  SIGNACTION: 'sign',
  NOACTION: 'no_action'
}

// Required file type by document type
export const docTypeToFileExtensions = {
  [documentFileTypes.DOCUMENT]: ['.doc', '.docx', '.pdf'],
  [documentFileTypes.SHEET]: ['.csv', '.xls', '.xlsx'],
  [documentFileTypes.IMAGE]: ['.png', '.jpg'],
  [documentFileTypes.CONTRACT]: [],
  [documentFileTypes.TEMPLATE]: ['.doc', '.docx', '.pdf', '.csv', '.xls', '.xlsx', '.png', '.jpg'],
}

// Built from https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
const mimeTypesToDocTypes = {
  'application/msword': documentFileTypes.DOCUMENT,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': documentFileTypes.DOCUMENT,
  'application/pdf': documentFileTypes.DOCUMENT,
  'text/csv': documentFileTypes.SHEET,
  'application/vnd.ms-excel': documentFileTypes.SHEET,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': documentFileTypes.SHEET,
  'image/jpeg': documentFileTypes.IMAGE,
  'image/png': documentFileTypes.IMAGE
}

/**
 * Returns the general document type (i.e. sheet, image, etc.) from a mime type
 * TODO: defaults to TEMPLATE type, but should default to OTHER doc type after implemented
 * @param {string} mimeType mime type of document
 * @returns corresponding document type
 */
export function getDocTypeForMimeType(mimeType) {
  let foundType = mimeTypesToDocTypes[mimeType]
  if (!foundType) foundType = documentFileTypes.TEMPLATE
  return foundType
}

export default {
  documentFileTypes,
  documentStatuses,
  documentActions,
  getDocTypeForMimeType,
  docTypeToFileExtensions
}