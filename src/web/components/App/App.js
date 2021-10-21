import {hot} from 'react-hot-loader/root'
import React, {useMemo} from 'react'
import {Route, Switch} from 'react-router-dom'
import {useHistory} from 'react-router'
import { OktaAuth } from '@okta/okta-auth-js'
import {LoginCallback} from '@okta/okta-react'
import {SecureRoute, Security} from '@okta/okta-react'
import 'i18n'
import { ApolloProvider } from '@apollo/client'
import createClient from 'web/apollo/client/velocityClient'

import EEWelcomeWizard from 'web/pages/EEWelcomeWizard/EEWelcomeWizard'

import { AppModeProvider } from 'web/providers/AppModeProvider'
import { CurrentUserProvider } from 'web/providers/CurrentUserProvider.web'
import { GlobalModalProvider } from 'shared/providers/GlobalModalProvider'
import { HelpjuiceFlyoutProvider } from 'web/providers/HelpjuiceFlyoutProvider'

import {routes} from 'web/constants/routeConstants'
import permissions from 'shared/constants/permissions'
import oktaConfig from 'shared/config/oktaConfig'

import GlobalModal from 'web/components/modals/GlobalModal/GlobalModal'
import OktaLoginWrapper from 'web/pages/OktaLoginWrapper/OktaLoginWrapper'
import PrivateRoute from 'web/components/PrivateRoute/PrivateRoute'
import GlobalHeader from 'web/modules/GlobalHeader/GlobalHeader'
import HelpjuiceFlyout from 'web/modules/HelpjuiceFlyout/HelpjuiceFlyout'
import PegaContainer from 'web/components/PegaContainer/PegaContainer'
import GlobalLoader from 'web/components/GlobalLoader/GlobalLoader'
import LookerContainer from 'web/pages/LookerContainer/LookerContainer'
import TrainingContainer from 'web/pages/TrainingContainer/TrainingContainer'

import Home from 'web/pages/Home/Home'
import DocumentManagement from 'web/pages/DocumentManagement/DocumentManagement'
import SupportedEmployees from 'web/pages/SupportedEmployees/SupportedEmployees'
import EmployeeProfile from 'web/pages/EmployeeProfile/EmployeeProfile'
import EmployeePto from 'web/pages/EmployeePto/EmployeePto'
import EmployeeReports from 'web/pages/EmployeeReports/EmployeeReports'
import FullPageError from 'web/pages/FullPageError/FullPageError'
import Process from 'web/pages/Process/Process'
import PtoSimulation from 'web/pages/PtoSimulation/PtoSimulation'
import PtoPolicies from 'web/pages/PtoPolicies/PtoPolicies'
import PtoUsers from 'web/pages/PtoUsers/PtoUsers'
import PtoUserPolicies from 'web/pages/PtoUserPolicies/PtoUserPolicies'
import PtoLedger from 'web/pages/PtoLedgers/PtoLedgers'
import PtoLevels from 'web/pages/PtoLevels/PtoLevels'
import SignInHelp from 'web/pages/SignInHelp/SignInHelp'
import DocusignCallback from 'web/pages/DocusignCallback/DocusignCallback'

import backgroundImage from 'assets/images/backgroundLogo.png'
import {ImgAppBackground, MainRouteContainer, DivAppContainer} from './App.styles'
import Onboarding from 'web/pages/Onboarding/Onboarding'
import OnboardingDetail from 'web/pages/OnboardingDetail/OnboardingDetail'
import CompanyRouter from 'web/pages/Companies'

/*
 * ROUTE CONFIG
 */
const pegaReportsUrl = process.env.REACT_APP_PEGA_REPORTS_URL || 'https://portal-stage.velocityglobal.com/prweb/PRAuth/Okta_Stage'
const pegaRouteData = [
  // Nav Item Routes:
  { route: routes.HOME, pegaClassName: 'Data-Portal', harnessName: 'Home', isPublic: true},
  { route: routes.CASE_MANAGEMENT, pegaClassName: 'Data-Portal', harnessName: 'CaseManagement'},
  // { route: routes.ONBOARDING, pegaClassName: 'Data-Portal', harnessName: 'OnboardingHarness'},
  { route: routes.REPORTS, urlOverride: pegaReportsUrl},
  { route: routes.CALENDARS, pegaClassName: 'Data-Admin-Calendar', harnessName: 'CalendarManagement'},
  { route: routes.PAYROLL_CALENDARS, pegaClassName: 'VG-VGSales-Data-PayrollCalendar', harnessName: 'PayrollCalendar'},
  { route: routes.COUNTRY_INFORMATION, pegaClassName: 'VG-VGSales-Data-Country', harnessName: 'CountryInformation'},
  { route: routes.PTO_ACCRUAL_POLICIES, pegaClassName: 'VG-VGSales-Data-AccrualPolicy', harnessName: 'PTOAccrualManagement'},
  { route: routes.PEGA_DOCUMENT_MANAGEMENT, permissionSlug: permissions.DOCUMENTS, pegaClassName: 'VG-VGSales-Data-VGTemplates', harnessName: 'GenerateTemplate'},
  { route: routes.UNIT_MANAGEMENT, pegaClassName: 'VG-PEO-Work-ManagePod'},
  { route: routes.TAGS, pegaClassName: 'Data-Social-Tag', harnessName: 'TagHarness'},
  { route: routes.EE_ONBOARDING, pegaClassName: 'Data-Portal', harnessName: 'NewEEPersonalInfoHarness'},
  { route: routes.MY_PROFILE, pegaClassName: 'Data-Portal', harnessName: 'MyProfileHarness'},
  // { route: routes.ADMIN_TOOLS, pegaClassName: 'Default', harnessName: 'Default'}
  // Add/Edit Routes:
  { route: routes.PAYROLL_REQUEST, pegaClassName: 'VG-PEO-Work-PayrollRequest'},
  { route: routes.PAYROLL_DEACTIVATION, pegaClassName: 'VG-PEO-Work-Keying-PayItem'},
  { route: routes.PTO_REQUEST, pegaClassName: 'VG-PEO-Work-PTO'},
  { route: routes.EMPLOYEE_PROFILE, pegaClassName: 'VG-PEO-Work-ChangeEmployeeDetails'},
  { route: routes.MANAGE_MY_PROFILE, pegaClassName: 'VG-PEO-Work-ChangeEmployeeDetails'},
  { route: routes.ICP_PROFILE, pegaClassName: 'VG-PEO-Work-UpdateICPProfile'},
  { route: routes.ICP_CONTACT_PROFILE, pegaClassName: 'VG-PEO-Work-UpdateICPContactProfile'},
  { route: routes.CLIENT_PROFILE, pegaClassName: 'VG-PEO-Work-UpdateClientProfile'},
  { route: routes.CLIENT_MANAGER_PROFILE, pegaClassName: 'VG-PEO-Work-UpdateClientManagerProfile'},
  { route: routes.VG_EMPLOYEE_PROFILE, pegaClassName: 'VG-PEO-Work-UpdateVelocityGlobalEmployee'},
  { route: routes.SUPPORT_CASE, pegaClassName: 'VG-PEO-Work-ServiceRequest'},
  { route: routes.UPLOAD_DOCUMENTS, pegaClassName: 'VG-PEO-Work-UploadDocuments'},
  // Other Private Pega routes
  { route: routes.NOTIFICATION_SETTINGS, pegaClassName: 'VG-PEO-Work-Notify'},
  // Public PEGA Routes
  { route: routes.SEARCH, pegaClassName: 'Data-Portal', harnessName: 'UserSearchMain'},
  { route: (routes.CASES + '/:caseId'), isPublic: true }
]
const pegaRoutes = pegaRouteData.map((data) => {
  const { route, pegaClassName, harnessName, urlOverride, isPublic } = data
  const routeContents =
    <PegaContainer
      pegaClassName={pegaClassName}
      harnessName={harnessName}
      urlOverride={urlOverride}
    />

  if (isPublic) {
    return <SecureRoute render={() => routeContents} path={route} key={route}/>
  }
  else return (
    <PrivateRoute path={route} key={route} permissionSlug={route.substr(1)}>
      {routeContents}
    </PrivateRoute>
  )
})

const oktaAuth = new OktaAuth({
  issuer: oktaConfig.issuer,
  clientId: oktaConfig.clientId,
  redirectUri: window.location.origin + '/implicit/callback',
  scopes: ['openid', 'profile', 'email', 'groups'],
  tokenManager: {
    autoRenew: true,
    expireEarlySeconds: 120,
  },
  /* eslint-disable require-await */
  transformAuthState: async (_oktaAuth, authState) => {
    // Okta has some kind of a getter in authState.idToken which will get a refresh token when called.
    // This event should fire whenever Okta thinks the authState might change (before expiry)
    // Simply calling this getter should update the idToken with a new expireAt
    /* eslint-disable no-unused-vars */
    const _refreshToken = authState.idToken
    return authState
  },
})

function App() {
  const history = useHistory()
  const velocityClient = useMemo(() => {
    return createClient(history)
  }, [history])
  /* eslint-enable */
  return (
    <Security oktaAuth={oktaAuth}>
      <ApolloProvider client={velocityClient}>
        <CurrentUserProvider>
          <AppModeProvider>
            <HelpjuiceFlyoutProvider>
              <GlobalModalProvider>
                <DivAppContainer>
                  <GlobalModal/>
                  <GlobalHeader />
                  <ImgAppBackground alt='background' src={backgroundImage}/>
                  <MainRouteContainer>
                    <GlobalLoader/>
                    <Switch>
                      {pegaRoutes}
                      <Route exact path='/' component={Home}/>
                      <Route exact path='/implicit/callback' component={LoginCallback} />
                      <Route path='/login' component={OktaLoginWrapper} />
                      <Route path={routes.SIGN_IN_HELP} component={SignInHelp}/>
                      {/* ADMIN */}

                      <PrivateRoute path={routes.COMPANIES} component={CompanyRouter} key={routes.COMPANIES}/>
                      <PrivateRoute path={routes.ONBOARDING} component={Onboarding} key={routes.ONBOARDING}/>
                      <PrivateRoute path={routes.ONBOARDING_DETAIL} component={OnboardingDetail} permissionSlug={permissions.ONBOARDING} key={routes.ONBOARDING_DETAIL}/>
                      <PrivateRoute path={routes.ONBOARDING} component={Onboarding} key={routes.ONBOARDING}/>
                      <PrivateRoute path={routes.SUPPORTED_EMPLOYEE} component={EmployeeProfile} key={routes.SUPPORTED_EMPLOYEE}/>
                      <PrivateRoute path={routes.SUPPORTED_EMPLOYEES} component={SupportedEmployees} key={routes.SUPPORTED_EMPLOYEES}/>
                      <PrivateRoute path={routes.EMPLOYEE_REPORTS} component={EmployeeReports} permissionSlug={permissions.TIME_TRACKING} key={routes.EMPLOYEE_REPORTS}/>
                      <PrivateRoute path={routes.DASHBOARD} component={LookerContainer} permissionSlug={permissions.DASHBOARD} key={routes.DASHBOARD}/>
                      <PrivateRoute path={routes.PROCESS} component={Process} key={routes.PROCESS}/>
                      <PrivateRoute path={routes.DOCUMENT_MANAGEMENT} component={DocumentManagement} permissionSlug={permissions.DOCUMENTS} key={routes.DOCUMENT_MANAGEMENT}/>
                      {/* PTO */}
                      <PrivateRoute path={routes.PTO_SIMULATION} component={PtoSimulation} key={routes.PTO_SIMULATION}/>
                      <PrivateRoute path={routes.PTO_POLICIES} component={PtoPolicies} key={routes.PTO_POLICIES}/>
                      <PrivateRoute path={routes.PTO_LEDGERS} component={PtoLedger} key={routes.PTO_LEDGERS}/>
                      <PrivateRoute path={routes.PTO_USER_POLICES} component={PtoUserPolicies} key={routes.PTO_USER_POLICES}/>
                      <PrivateRoute path={routes.PTO_USERS} component={PtoUsers} key={routes.PTO_USERS}/>
                      <PrivateRoute path={routes.PTO_LEVELS} component={PtoLevels} key={routes.PTO_LEVELS}/>
                      <PrivateRoute path={routes.EMPLOYEE_PTO} component={EmployeePto} key={routes.EMPLOYEE_PTO}/>
                      {/* EE */}
                      <PrivateRoute path={routes.EE_WELCOME_WIZARD} permissionSlug={permissions.EE_ONBOARDING} component={EEWelcomeWizard} />
                      <PrivateRoute path={routes.DOCUSIGN_CALLBACK} permissionSlug={permissions.EE_ONBOARDING} component={DocusignCallback} key={routes.DOCUSIGN_CALLBACK}/>
                      <PrivateRoute path={routes.TRAINING} component={TrainingContainer} permissionSlug={permissions.TRAINING} key={routes.TRAINING}/>
                      <Route render={() =>
                        <FullPageError pageIsNotFound={true} location={{state: {statusCode: '404', errorMessage: 'Page not found.'}}} />
                      }/>
                    </Switch>
                  </MainRouteContainer>
                  <HelpjuiceFlyout/>
                </DivAppContainer>
              </GlobalModalProvider>
            </HelpjuiceFlyoutProvider>
          </AppModeProvider>
        </CurrentUserProvider>
      </ApolloProvider>
    </Security>
  )
}

// hot() is bypassed in production mode
export default hot(App)
