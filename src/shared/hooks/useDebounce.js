import {useCallback} from 'react'

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * `wait` milliseconds.
 *
 * Originally inspired by  David Walsh (https://davidwalsh.name/javascript-debounce-function)
 *
 * @param {func} func function to be run on timeout end
 * @param {number} wait number of milliseconds for timeout to wait
 * @returns {func} debounced function/handler
 * @category Hooks - Shared
 * @module useDebounce
 */
export default function useDebounce(func, waitTimeMs) {
  return useCallback(debounce(func, waitTimeMs), [])
}

export function debounce(func, wait){
  let timeout

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}