import {useState} from 'react'

/**
 * This hook allows components to easily store uploaded files.
 *
 * @returns void
 * @category Hooks - Web
 * @module useFileState
 */
export default function useFileState() {
  const [files, setFiles] = useState([])
  const [isLoadingFile, setIsLoadingFile] = useState(false)

  return [files, setFiles, isLoadingFile, setIsLoadingFile]
}