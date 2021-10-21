import React, {useRef} from 'react'
import PropTypes from 'prop-types'

import CurvedUpOrDownloadIcon from 'web/components/DynamicIcons/CurvedUpOrDownloadIcon'
import {DivDownloadAll, ADownload} from './DownloadAllButton.styles'
import {colors} from 'shared/constants/cssConstants'
import filesHelper from 'web/services/filesHelper'

DownloadAllButton.propTypes = {
  /** array of all documents for download */
  documents: PropTypes.array.isRequired,
  /** on single document download handler  */
  onDocumentDownload: PropTypes.func
}

DownloadAllButton.defaultProps = {
  onDocumentDownload: () => {}
}

/**
 * This button kicks off a multi-document download.
 * @category Components - Web
 * @namespace DownloadAllButton
 */
export default function DownloadAllButton({documents, onDocumentDownload}) {
  const aDownloadTag = useRef(null)
  let interval

  /**
   * Downloads a document from a list of urls
   * @param {array} downloadPaths array of S3 download paths
   */
  function downloadDocument(downloadPaths) {
    const document = downloadPaths.shift()
    filesHelper.downloadFile(document.downloadUrl, aDownloadTag)

    onDocumentDownload(document)

    if (!downloadPaths.length && interval) {
      clearInterval(interval)
    }
  }

  /**
   * Download all documents in "download" section
   * An interval must be used because browsers limit the number of documents can be downloaded within a timeframe
   * TODO: Change to zip served from backend on BE zip implementation
   */
  function handleDocumentDownloads() {
    const downloadPaths = [...documents]
    interval = setInterval(() => downloadDocument(downloadPaths), 500)
  }

  return (
    <>
      <DivDownloadAll role='button' onClick={handleDocumentDownloads}>
        <span>{`Download all ${documents.length} documents`}</span>
        <CurvedUpOrDownloadIcon strokeColor={colors.officialBlue}/>
      </DivDownloadAll>
      <ADownload key={'download-all-ref'} ref={aDownloadTag} />
    </>
  )
}