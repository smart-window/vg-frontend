import ScriptsHelper from './scriptsHelper.js'

const mockGetElementByIdResult = jest.fn()
const mockCreateElementResult = jest.fn()

global.document.getElementById = mockGetElementByIdResult
global.document.createElement = mockCreateElementResult
global.document.body.appendChild = jest.fn()

it('creates a new <script> element if not pre-existing', () => {
  const fakeScriptElement = {id: 'some script', onload: () => {}}
  mockGetElementByIdResult.mockImplementation(() => null)
  mockCreateElementResult.mockImplementation(() => fakeScriptElement)

  const loadPromise = ScriptsHelper.loadExternalScript('foo', 'bar.com')
  fakeScriptElement.onload()
  loadPromise.then(scriptElement => {
    expect(scriptElement).toEqual(fakeScriptElement)
  })
})

