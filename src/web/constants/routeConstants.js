/**
 * Constants used for routing - route names, params, etc
 * @category Constants - Web
 * @namespace routeConstants
 */

// Nav Item Routes
const HOME = '/home'
const CASE_MANAGEMENT = '/case-management'
const ONBOARDING = '/onboarding'
const REPORTS = '/reports'
const CALENDARS = '/calendars'
const PAYROLL_CALENDARS = '/payroll-calendars'
const COUNTRY_INFORMATION = '/country-information'
const PTO_ACCRUAL_POLICIES = '/pto-accrual-policies'
const COMPANIES = '/companies/:type(client|partner)?/:id?/:tab(client-info|documents|client-story)?'
const CLIENT_COMPANIES = '/companies'
const CLIENT_COMPANIES_TABLE = '/companies/client'
const PARTNER_COMPANIES_TABLE = '/companies/partner'
const DOCUMENT_MANAGEMENT = '/document-management'
const UNIT_MANAGEMENT = '/unit-management'
const TRAINING = '/training'
const TAGS = '/tags'
const ADMIN_TOOLS = '/admin-tools'
const MY_PROFILE='/my-profile'
const SUPPORTED_EMPLOYEES = '/supported-employees'
const EMPLOYEE_REPORTS = '/time-tracking'

// Add/Edit Routes
const PAYROLL_REQUEST = '/payroll-request'
const PAYROLL_DEACTIVATION = '/payroll-deactivation'
const PTO_REQUEST = '/pto-request'
const EMPLOYEE_PROFILE = '/employee-profile'
const MANAGE_MY_PROFILE = '/manage-my-profile'
const ICP_PROFILE = '/icp-profile'
const ICP_CONTACT_PROFILE = '/icp-contact-profile'
const CLIENT_PROFILE = '/client-profile'
const CLIENT_MANAGER_PROFILE = '/client-manager-profile'
const VG_EMPLOYEE_PROFILE = '/vg-employee-profile'
const SUPPORT_CASE = '/support-case'
const UPLOAD_DOCUMENTS = '/upload-documents'

// Other Pega Routes
const SEARCH = '/search'
const NOTIFICATION_SETTINGS = '/notification-settings'
const CASES = '/cases'
const EE_ONBOARDING='/ee-onboarding'
const PEGA_DOCUMENT_MANAGEMENT = '/pega-document-management'

// PTO Routes
const PTO_SIMULATION = '/pto/simulation'
const PTO_POLICIES = '/pto/policies'
const PTO_USERS = '/pto/users'
const PTO_USER_POLICES = '/pto/users/:userId'
const PTO_LEDGERS = '/pto/ledgers/user/:userId/policy/:accrualPolicyId'
const PTO_LEVELS = '/pto/levels/:accrualPolicyId'
const EMPLOYEE_PTO = '/my-time-off'

// Other Routes
const DASHBOARD = '/dashboard'
const DOCUMENTS = '/documents'
const DOCUMENT_TEMPLATES = '/documents/templates'
const DOCUMENT = '/documents/:documentId'
const LOGIN = '/login' // okta login widget page
const PROCESS = '/process/:processId/:taskId?'
const SIGN_IN_HELP = '/sign-in-help'
const DOCUSIGN_CALLBACK = '/docusign/callback'
const ONBOARDING_DETAIL = '/onboarding/:tab(employee|client)/:processId/(task)?/:taskId?'

const EE_WELCOME_WIZARD='/ee-welcome-wizard'
const FULL_PAGE_ERROR='/error'

// TabControl Routes
const ONBOARDING_CLIENT_TABLE = '/onboarding/client'
const ONBOARDING_EMPLOYEE_TABLE = '/onboarding/employee'
const SUPPORTED_EMPLOYEE_DOCUMENTS = '/supported-employees/:employeeId/documents'
const SUPPORTED_EMPLOYEE_PAYROLL = '/supported-employees/:employeeId/payroll'
const SUPPORTED_EMPLOYEE_TIMEOFF = '/supported-employees/:employeeId/time-off'
const SUPPORTED_EMPLOYEE_WORK_INFORMATION = '/supported-employees/:employeeId/work-information'
const SUPPORTED_EMPLOYEE = '/supported-employees/:employeeId'


// These routes are mapped to a permission.slug
export const privateRoutes = {
  ADMIN_TOOLS,
  CALENDARS,
  CASE_MANAGEMENT,
  CLIENT_MANAGER_PROFILE,
  CLIENT_PROFILE,
  COUNTRY_INFORMATION,
  DASHBOARD,
  COMPANIES,
  CLIENT_COMPANIES,
  CLIENT_COMPANIES_TABLE,
  PARTNER_COMPANIES_TABLE,
  DOCUMENT_MANAGEMENT,
  DOCUSIGN_CALLBACK,
  EE_ONBOARDING,
  EE_WELCOME_WIZARD,
  EMPLOYEE_PROFILE,
  SUPPORTED_EMPLOYEE,
  SUPPORTED_EMPLOYEES,
  EMPLOYEE_REPORTS,
  HOME,
  ICP_CONTACT_PROFILE,
  ICP_PROFILE,
  MANAGE_MY_PROFILE,
  MY_PROFILE,
  NOTIFICATION_SETTINGS,
  ONBOARDING,
  ONBOARDING_CLIENT_TABLE,
  ONBOARDING_DETAIL,
  ONBOARDING_EMPLOYEE_TABLE,
  PAYROLL_CALENDARS,
  PAYROLL_DEACTIVATION,
  PAYROLL_REQUEST,
  PEGA_DOCUMENT_MANAGEMENT,
  PROCESS,
  PTO_ACCRUAL_POLICIES,
  PTO_POLICIES,
  PTO_REQUEST,
  PTO_SIMULATION,
  EMPLOYEE_PTO,
  REPORTS,
  SUPPORT_CASE,
  SEARCH,
  TAGS,
  TRAINING,
  UNIT_MANAGEMENT,
  UPLOAD_DOCUMENTS,
  VG_EMPLOYEE_PROFILE,
  PTO_USERS,
  PTO_USER_POLICES,
  PTO_LEDGERS,
  PTO_LEVELS,
  DOCUMENT_TEMPLATES,
  DOCUMENTS,
  DOCUMENT,
  SUPPORTED_EMPLOYEE_DOCUMENTS,
  SUPPORTED_EMPLOYEE_PAYROLL,
  SUPPORTED_EMPLOYEE_TIMEOFF,
  SUPPORTED_EMPLOYEE_WORK_INFORMATION
}

// Everyone can access these routes
export const publicRoutes = {
  CASES,
  LOGIN,
  SIGN_IN_HELP,
  FULL_PAGE_ERROR,
}

export const routes = Object.assign({}, publicRoutes, privateRoutes)
