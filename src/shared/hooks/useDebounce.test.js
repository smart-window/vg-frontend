import {debounce} from './useDebounce'

jest.useFakeTimers()

it('calls a mock function after timeout', () => {
  const mockFunction = jest.fn()

  debounce(mockFunction, 300)()
  // At this point in time, the callback should not have been called yet
  expect(mockFunction).not.toBeCalled()

  // Fast-forward until all timers have been executed
  jest.runAllTimers()

  // Now our callback should have been called!
  expect(mockFunction).toBeCalled()
})