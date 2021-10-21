import {useState} from 'react'

/**
 * This hook allows one to easily store uploaded files.
 *
 *
 * @param ref React ref (useRef) to the element we want to click outside
 * @param handler callback invoked when clicking outside the ref
 * @returns void
 * @category Hooks - Web
 * @module useFileUpload
 */
export default function useFileUpload() {
  const [files, setFiles] = useState([])
  const [loadingFile, setLoadingFile] = useState(false)

  return [files, setFiles, loadingFile, setLoadingFile]
}