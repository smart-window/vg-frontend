import { useEffect, useState } from 'react'
import GridHelpers from 'web/modules/Grid/Grid.helpers'

/**
 * Hook to get the page size for a table. This is needed because the gridRef is not
 * loaded on the first render so we useEffect to ensure that it is loaded and then
 * setState to make sure the component rerenders with the correct page size.
 *
 * @returns {Int} page size of the users browser.
 * @category Hooks - Web
 * @module usePageSize
 */
function usePageSize(gridRef) {
  const [pageSize, setPageSize] = useState(null)

  useEffect(() => {
    setPageSize(GridHelpers.getPageSize(gridRef))
  }, [gridRef])

  return pageSize
}

export default usePageSize
