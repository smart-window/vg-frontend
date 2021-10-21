import { gql } from '@apollo/client'
import EmployeeProfileCard from 'web/components/EmployeeProfileCard/EmployeeProfileCard'

export const partnerFragment = gql`
  fragment PartnerFragment on Partner {
    id
    name
    netsuiteId
    statementOfWorkWith
    deploymentAgreementWith
    contactGuidelines
  }
`

export const employmentFragment = gql`
  fragment EmploymentFragment on Employment {
    id
    effectiveDate
    partner {
      ...PartnerFragment
    }
    employeeReportItem {
      ...EmployeeProfileCardFragment
    }
  }
  ${partnerFragment}
  ${EmployeeProfileCard.fragments.EmployeeReportItem}
`

export const processFragment = gql`
  fragment ProcessFragment on Employment {
    id

  }
  ${partnerFragment}
  ${EmployeeProfileCard.fragments.EmployeeReportItem}
`

export const onboardingEmployeeFragment = gql`
  fragment OnboardingEmployeesTableFragment on PaginatedEmployeeOnboardings {
    row_count
    employee_onboardings {
      id
      contractId
      processId
      fullName
      partnerName
      clientName
      regionName
      countryName
      percentComplete
      signatureStatus
      immigration
      benefits
      anticipatedStartDate
    }
  }
`

export const clientOnboardingsFragment = gql`
  fragment ClientOnboardingsTableFragment on PaginatedClientOnboardings {
    row_count
    client_onboardings {
      id
      contractId
      partnerId
      processId
      fullName
      partnerName
      regionName
      countryName
      percentComplete
      employees
    }
  }
`