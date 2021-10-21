import { useLocation, matchPath } from 'react-router'

/**
 * This hook matches the current pathname with a corresponding tab
 * @param tabs an array of objects representing tabs: [{id: '1', label: 'Tab', route: '/route'}]
 * @returns currently selected tab or undefined if not found
 * @category Hooks - Web
 * @module useMatchTabPath
 */
export default function useMatchTabPath() {
  const {pathname} = useLocation()

  function matchTab(tabs) {
    const currentTab = tabs.find(tab => {
      const match = matchPath(pathname, {
        path: tab.route,
        exact: true,
        strict: false
      })
      if (!!match) return true
      return false
    })

    return currentTab
  }

  return matchTab
}