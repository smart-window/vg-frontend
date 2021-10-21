import { CLIENT_COMPANY_QUERY } from 'web/pages/CompanyProfile/components/ClientStory/ClientStory'
/* Query mocks */

export function getClientStoryMockData() {

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
            __typename: "Address",
            id: "1"
          },
          email: "client@example.com",
          id: "1",
          mainPointOfContact: "Jonathan Knowles",
          meetings: [{
            description: "Task discussion.",
            id: "60",
            meetingDate: "2021-05-22",
            notes: "note",
            users: [],
            __typename: "Meeting",
          }],
          name: "Client 1",
          operatingCountries: [{
            country: {
              __typename: "Country",
              id: "1",
              name: "Afghanistan"
            },
            id: "72",
            __typename: "ClientOperatingCountry"
          }],
          phoneNumber: "+12816038895",
          sentEmails: [],
          timezone: "MT | Mountain Time, USA-Colorado",
          __typename: "Client"
        },
      },
    },
  }

  return [basicReport]
}