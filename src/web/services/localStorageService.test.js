import localStorageService from './localStorageService'

describe('getFromStorage', () => {
  it('gets a parsed item from storage', () => {
    const storedObject = {'key': 123}
    localStorage.setItem('getKey', JSON.stringify(storedObject))

    expect(localStorageService.getFromStorage('getKey')).toEqual(storedObject)
  })
})

describe('setInStorage', () => {
  it('sets a stringified item in storage', () => {
    const objectToStore = {'key': 123}

    localStorageService.setInStorage('setKey', objectToStore)

    expect(localStorage.getItem('setKey')).toEqual(JSON.stringify(objectToStore))
  })
})

describe('removeFromStorage', () => {
  it('removes an item from storage', () => {
    const storedObject = {'key': 123}
    localStorage.setItem('removeItem', JSON.stringify(storedObject))

    localStorageService.removeFromStorage('removeItem')

    expect(localStorage.getItem('removeItem')).toEqual(null)
  })
})