/**
 * Constants used for employment records.
 * @category Constants - Shared
 * @namespace employmentConstants
 */

export const employmentTypes = {
  INDEFINITE: 'indefinite',
  THREE_MONTH_FIXED: 'three_month_fixed',
  THREE_YEAR_FIXED_TERM: 'three_year_fixed_term',
  TWELVE_FIXED_AUTO_RENEWAL: 'twelve_fixed_auto_renewal',
  EIGHTEEN_MONTH_FIXED: 'eighteen_month_fixed',
  CONTRACTOR: 'contractor',
  FIXED_TERM_BACK_TO_BACK: 'fixed_term_back_to_back',
  FIXED_TERM: 'fixed_term',
  NOT_APPLICABLE: 'not_applicable',
  UNKNOWN: 'unknown'
}

export const employmentTypesToLabels = {
  [employmentTypes.INDEFINITE]: 'Indefinite',
  [employmentTypes.THREE_MONTH_FIXED]: '3 Month Fixed',
  [employmentTypes.THREE_YEAR_FIXED_TERM]: '3 Year Fixed Term',
  [employmentTypes.TWELVE_FIXED_AUTO_RENEWAL]: '12 Fixed Auto Renewal',
  [employmentTypes.EIGHTEEN_MONTH_FIXED]: '18 Month Fixed',
  [employmentTypes.CONTRACTOR]: 'Contractor',
  [employmentTypes.FIXED_TERM_BACK_TO_BACK]: 'Fixed Term Back To Back',
  [employmentTypes.FIXED_TERM]: 'Fixed Term',
  [employmentTypes.NOT_APPLICABLE]: 'N/A',
  [employmentTypes.UNKNOWN]: 'Unknown'
}

// TODO: move to database when time allows
export const terminationReasons = {
  NONE: 'None',
  CLIENT_OFFBOARDED: 'Client Offboarded from Velocity Global',
  COMPANY_STRATEGY: 'Company Strategy',
  COUNTY_REGULATION: 'Country Regulation or Restriction Change',
  CUSTOMER_LEFT: 'Customer Left for a Competitor',
  EMPLOYEE_RESIGNATION: 'Employee Resignation',
  ENTITY_TRANSFER: 'Entity Transfer ',
  FIXED_TERM: 'Fixed Term Contract Ends',
  IMMIGRATION: 'Immigration',
  PROBATION_PERIOD: 'Probation Period Ends',
  TERMINATION: 'Termination with Cause',
  END_RELATIONSHIP: 'Velocity Global ended relationship with client'
}

export const terminationSubReasons = {
  [terminationReasons.NONE]: {
    NONE: 'None'
  },
  [terminationReasons.CLIENT_OFFBOARDED]: {
    UNHAPPY_PEO: 'Unhappy with PEO model',
    UNHAPPY_SERVICE: 'Unhappy with Velocity Global Service',
    COMPANY_CHANGE: 'Change in company strategy',
    CLIENT_ACQUIRED: 'Client acquired by another company',
    OTHER: 'Other, see comments'
  },
  [terminationReasons.COMPANY_STRATEGY]: {
    BUDGET_CUTS: 'Budget cuts in market',
    OPTIONS_DISSOLVED: 'Customer dissolved operations in market'
  },
  [terminationReasons.COUNTY_REGULATION]: {
    AUG: 'AUG',
    OTHER: 'Other, see comments'
  },
  [terminationReasons.CUSTOMER_LEFT]: {
    PRICE: 'Price',
    SERVICE_ISSUES: 'Service issues',
    REJECTED_MOVE: 'Rejected move to Velocity Global Entity',
    UNKNOWN: 'Unknown',
    OTHER: 'Other, see comments'
  },
  [terminationReasons.EMPLOYEE_RESIGNATION]: {
    NEW_OPPORTUNITY: 'Accepted new opportunity',
    COMPENSATION: 'Compensation, unhappy with role',
    FAMILY: 'Family reasons',
    RELOCATION: 'Relocation',
    RETIREMENT: 'Retirement',
    UNHAPPY_PEO: 'Unhappy with PEO model',
    SERVICE_ISSUES: 'Service issues with Velocity Global',
    MTA: 'MTA',
    REDUNDANCY: 'Redundancy of position',
    OTHER: 'Other, see comments'
  },
  [terminationReasons.ENTITY_TRANSFER]: {
    MOVE: 'Move to Velocity Global Entity',
    MOVED_EES: 'Velocity Global moved EEs to new ICP in country',
    EE_RELOCATE: 'EE relocates to a new country, changes ICP',
    MOVED_EE_CLIENT: 'Moved EE to client\'s entity',
    OTHER: 'Other, see comments'
  },
  [terminationReasons.FIXED_TERM]: {
    EE_NO_RENEWAL: 'EE did not renew contract',
    CLIENT_NO_RENEWAL: 'Client opted not to renew contract',
    OTHER: 'Other, see comments'
  },
  [terminationReasons.IMMIGRATION]: {
    VISA_DENIAL: 'Visa Denial (From Onset)',
    VISA_RENEWAL_DENIAL: 'Visa Renewal Denied',
    CLIENT_REFUSED: 'Client Refused to Pay for Immigration',
    COUNTY_REGULATION: 'Country Regulations Change',
    US_LEGISLATION: 'American Legislation Changes',
    UNWORKABLE_PROCESSING: 'Unworkable Processing Time',
    OTHER: 'Other, see comments'
  },
  [terminationReasons.PROBATION_PERIOD]: {
    CLIENT_NO_OP: 'Client opted not to move forward with EE',
    PROBATION_PERIOD: 'Probation period extension rejected by EE',
    OTHER: 'Other, see comments'
  },
  [terminationReasons.TERMINATION]: {
    BAD_ACTOR: 'Bad Actor (Stealing, Drinking, Misconduct)',
    POOR_PERFORMANCE: 'Poor Performance',
    ATTENDANCE: 'Attendance',
    OTHER: 'Other, see comments'
  },
  [terminationReasons.END_RELATIONSHIP]: {
    BAD_CLIENT: 'Client Did not adhere to Velocity Global values',
    FUNDING_ISSUES: 'Funding issues (AR)'
  }
}