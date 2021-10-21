import {routes} from 'web/constants/routeConstants'

// TODO: should this be in the hooks folder?
export const mockedPermissionsSet = jest.fn()
const allRoutes = Object.values(routes)
const otherPermissions = ['notifications', 'knowledge-management']
mockedPermissionsSet.mockImplementation(() => new Set([...allRoutes, ...otherPermissions]))
export default jest.mock('web/hooks/usePermissions', () => (
  {
    __esModule: true,
    default: mockedPermissionsSet
  }
))