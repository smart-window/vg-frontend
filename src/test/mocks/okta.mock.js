// TODO: is there a better way to encapsulate mocks?
export const mockedIsAuthenticatedValue = jest.fn()
export const mockedLogoutFunction = jest.fn()

export default jest.mock('@okta/okta-react', () => {
  return {
    useOktaAuth: () => {
      return {
        authState: { isAuthenticated: mockedIsAuthenticatedValue() },
        oktaAuth: { signOut: mockedLogoutFunction }
      }
    },
  }
})