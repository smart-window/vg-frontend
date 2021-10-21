import { CLIENT_COMPANY_QUERY, CLIENT_TEAM_QUERY } from 'web/pages/CompanyProfile/components/ClientInformation/ClientInformation'
/* Query mocks */

export function getClientInformationMockData() {
 
  const basicReport = {
    request: {
      query: CLIENT_COMPANY_QUERY,
      variables: {
        id: "1"
      },
    },
    result: {
      data: {
        clientProfile: {
          address: {
            country: {
              id: "1",
              name: "United States of America",
              __typename: "Country"
            },
            countyDistrict: "Pierce",
            id: "4",
            __typename: "Address"
          },
          id: "1",
          mainPointOfContact: "Jonathan Knowles",
          name: "Client 1",
          operatingCountries: [{
            annualLeave: "Annual Leave",
            clientOnFasterReimbursement: true,
            country: {
              __typename: "Country",
              id: "1",
              name: "Afghanistan"
            },
            id: "64",
            notes: "Notes",
            noticePeriodLength: "Notice Period Length",
            otherInsuranceOffered: "Other Insurance Offered",
            privateMedicalInsurance: "Private Medical Insurance",
            probationaryPeriodLength: "Probationary Period Length",
            sickLeave: "Sick Leave",
            standardAdditionsDeadline: "Standard Additions Deadline",
            standardAllowancesOffered: "Standard Allowances Offered",
            standardBonusesOffered: "Standard Bonuses Offered",
            __typename: "ClientOperatingCountry"
          }],
          timezone: "MT | Mountain Time, USA-Colorado",
          __typename: "Client"
        },
      },
    },
  }

  const clientTeams = {
    request: {
      query: CLIENT_TEAM_QUERY,
      variables: {
        clientId: "1"
      },
    },
    result: {
      data: {
        clientTeams: [{
          id: "1",
          name: "Team 1",
          parentId: "null",
          __typename: "Team"
        }]
      },
    },
  }

  return [basicReport, clientTeams]
}