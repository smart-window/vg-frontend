import { useHistory } from 'react-router'
import { useOktaAuth } from '@okta/okta-react'
import { useEffect, useContext, useState } from 'react'
import { useLazyQuery} from '@apollo/client'
import {routes} from 'web/constants/routeConstants'
// import pegaService from 'shared/services/pegaService'
import {CurrentUserContext, CURRENT_USER_QUERY} from 'web/providers/CurrentUserProvider.web'
import {GlobalLoaderContext} from 'shared/providers/GlobalLoaderProvider'
import analyticsService from 'web/services/analyticsService'

/**
 * Component that maps to '/'
 * Used for login redirects and initialization.
 * @category Pages
 * @namespace Home
 */
export default function Home() {
  const [redirectingToHome, setRedirectingToHome] = useState(false)
  const history = useHistory()
  const currentUserContext = useContext(CurrentUserContext)
  const {setIsLoading} = useContext(GlobalLoaderContext)
  const { authState } = useOktaAuth()
  const [getCurrentUser] = useLazyQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: ({ currentUser }) => {
      currentUserContext.setUserData(currentUser)
      analyticsService.initUser(authState?.idToken?.claims?.sub)
      setIsLoading(false)
      setRedirectingToHome(false)
      const eeOnboardingStatus = currentUser.clientState?.ee_onboarding_status
      if (eeOnboardingStatus) {
        // presence of this clientState field indicates the user is an EE
        const onboardingInProgress = eeOnboardingStatus === 'in_progress'
        const eeRoute = onboardingInProgress ? routes.EE_WELCOME_WIZARD : routes.MY_PROFILE
        history.replace(eeRoute)
      }
      // TODO: restore this before spa release if release doesn't include onboarding
      // const userIsCustomer = currentUser.permissions.find(permission => permission.slug === 'my-profile')
      // if (userIsCustomer) {
      //   const assignmentsResult = await pegaService.fetchAssignments()
      //   const hasOnboardingAssignments = assignmentsResult.assignments.find((assignment) => {
      //     return assignment.caseID && assignment.caseID.match(/.*OB-[0-9]*.*/)
      //   })
      //   if (hasOnboardingAssignments) {
      //     history.replace(routes.EE_ONBOARDING)
      //   }
      // else {
      //   history.replace(routes.MY_PROFILE)
      // }
      // }
      else {
        // user is internal (non-EE)
        history.replace(routes.HOME)
      }
    },
    onError: (error) => {
      // TODO: if this request fails they are authenticated but have no permissions... what should we do?
    }
  })

  // TODO: this will not handle session expirations, but I think the okta SDK should make those redirects for us.
  useEffect(function didMount() {
    function login() {
      if (!authState.isAuthenticated && !authState.isPending) {
        // When user isn't authenticated, forget any user info and redirect to okta login
        currentUserContext.clearUserData()
        setIsLoading(false)
        history.replace(routes.LOGIN)
      }
      else if (authState.isAuthenticated && !redirectingToHome) {
        // get permissions and redirect user to /home
        setIsLoading(true)
        setRedirectingToHome(true)
        getCurrentUser()
      }
    }
    login()
  })

  return null
}
