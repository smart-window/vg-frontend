import {useEffect} from 'react'

/**
 * This hook allows one to easily bind to a custom click outside event for a given ref.
 * Original source: https://usehooks.com/useOnClickOutside/
 *
 * It's worth noting that because the passed in handler is a new
 * function, this effect will run callback/cleanup on every render.
 * You can optimize this by wrapping handler in useCallback before
 * passing it into this hook.
 *
 * @param ref React ref (useRef) to the element we want to click outside
 * @param handler callback invoked when clicking outside the ref
 * @returns void
 * @category Hooks - Web
 * @module useClickOutside
 */
export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event)
      }
    }

    window.addEventListener('click', handleClickOutside)
    window.addEventListener('touchstart', handleClickOutside)

    return function cleanup() {
      window.removeEventListener('click', handleClickOutside)
      window.removeEventListener('touchstart', handleClickOutside)
    }
  }, [ref, handler])
}