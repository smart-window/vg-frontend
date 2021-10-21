import {routes} from 'web/constants/routeConstants'

export const mockedRoutePermissionsSet = jest.fn()
const allRoutes = Object.values(routes)
mockedRoutePermissionsSet.mockImplementation(() => new Set(allRoutes))
export default jest.mock('web/hooks/useAccessibleRoutes', () => (
  {
    __esModule: true,
    default: mockedRoutePermissionsSet
  }
))