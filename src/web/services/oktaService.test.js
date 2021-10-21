import oktaService from './oktaService'
import storageConstants from 'shared/constants/storageConstants'

let mockOktaStorage

beforeEach(() => {
  mockOktaStorage = {
    idToken: {
      idToken: 'mock id token',
      claims: {
        employeenumber: 'mock employee number',
        preferred_username: 'mock username'
      }
    }
  }
})

afterEach(() => {
  localStorage.removeItem(storageConstants.OKTA_TOKEN_STORAGE)
})

describe('getBearerToken() tests', () => {
  it('returns empty string if okta storage isn\'t set', () => {
    expect(oktaService.getBearerToken()).toEqual('')
  })
  it('returns empty string if id token not set', () => {
    mockOktaStorage.idToken.idToken = null
    localStorage.setItem(storageConstants.OKTA_TOKEN_STORAGE, JSON.stringify(mockOktaStorage))
    expect(oktaService.getBearerToken()).toEqual('')
  })
  it('returns the correct idToken if set', () => {
    localStorage.setItem(storageConstants.OKTA_TOKEN_STORAGE, JSON.stringify(mockOktaStorage))
    expect(oktaService.getBearerToken()).toEqual('Bearer mock id token')
  })
})

describe('getOperatorId() tests', () => {
  it('returns null if okta storage isn\'t set', () => {
    expect(oktaService.getOperatorId()).toEqual(undefined)
  })
  it('returns undefined if okta claims are missing', () => {
    mockOktaStorage.idToken.claims = null
    localStorage.setItem(storageConstants.OKTA_TOKEN_STORAGE, JSON.stringify(mockOktaStorage))
    expect(oktaService.getOperatorId()).toEqual(undefined)
  })
  it('returns correct employeenumber if set', () => {
    localStorage.setItem(storageConstants.OKTA_TOKEN_STORAGE, JSON.stringify(mockOktaStorage))
    expect(oktaService.getOperatorId()).toEqual('mock employee number')
  })
  it('falls back to okta preferred_username if employeenumber not set', () => {
    mockOktaStorage.idToken.claims.employeenumber = null
    localStorage.setItem(storageConstants.OKTA_TOKEN_STORAGE, JSON.stringify(mockOktaStorage))
    expect(oktaService.getOperatorId()).toEqual('mock username')
  })
})