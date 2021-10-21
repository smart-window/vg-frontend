import { CLIENT_REPORT_QUERY } from 'web/pages/Companies/components/ClientCompaniesTable/ClientCompaniesTable'
/* Query mocks */
export function getClientCompaniesTableMockData() {
  const basicReport = {
    request: {
      query: CLIENT_REPORT_QUERY,
      variables: {
        filterBy: [],
        pageSize: 5,
        searchBy: null,
        sortColumn: "clientName",
        sortDirection: "asc"
      },
    },
    result: {
      data: {
        paginatedClientsReport: {
          __typename: 'PaginatedClientsReport',
          client_report_items: [
            {
              activeEmployees: 21,
              clientName: "Client 1",
              id: "1",
              operatingCountries: [{
                id: "60",
                country: {
                  id: "2",
                  name: "Albania",
                  __typename: "Country"
                },
              },
              {
                id: "62",
                country: {
                  id: "1",
                  name: "Afghanistan",
                  __typename: "Country"
                },
                __typename: "ClientOperatingCountry"
              }],
              regionName: "Africa",
              totalEmployees: 21,
              __typename: "ClientReportItem"
            },
            {
              activeEmployees: 19,
              clientName: "Client 2",
              id: "2",
              operatingCountries: [{
                id: "60",
                country: {
                  id: "2",
                  name: "Albania",
                  __typename: "Country"
                },
              },
              {
                id: "62",
                country: {
                  id: "1",
                  name: "Afghanistan",
                  __typename: "Country"
                },
                __typename: "ClientOperatingCountry"
              }],
              regionName: "Asia",
              totalEmployees: 19,
              __typename: "ClientReportItem"
            },
            {
              activeEmployees: 18,
              clientName: "Client 3",
              id: "3",
              operatingCountries: [{
                id: "60",
                country: {
                  id: "2",
                  name: "Albania",
                  __typename: "Country"
                },
              },
              {
                id: "62",
                country: {
                  id: "1",
                  name: "Afghanistan",
                  __typename: "Country"
                },
                __typename: "ClientOperatingCountry"
              }],
              regionName: "Central America",
              totalEmployees: 18,
              __typename: "ClientReportItem"
            },
          ],
          row_count: 3,
        },
      },
    },
  }
  const emptySearchResult = {
    request: {
      query: CLIENT_REPORT_QUERY,
      variables: {
        pageSize: 5,
        sortColumn: 'fullName',
        sortDirection: 'asc',
        filterBy: [],
        searchBy: 'foobar',
      },
    },
    result: {
      data: {
        paginatedClientsReport: {
          row_count: 0,
          client_report_items: [],
        },
      },
    },
  }

  return [basicReport, emptySearchResult]
}

/** Time Reports Mock */
export function getFiltersMockData() {
  const filters = {
    request: {
      query: 'FILTER_OPTIONS_QUERY',
    },
    result: {
      data: {
        countries: [{ name: 'Brazil', id: 1 }],
        clients: [{ name: 'Velocity Global', id: 1 }],
      },
    },
  }
  return [filters]
}

export const detailedClientInfoGeneralMock = {
  clientSegment: ['Strategic'],
  industryVertical: 'Telecommunications',
  experienceInternationalMarkets: 'Very little except  years with French telecom',
  clientSince: '20 August 2000',
  experienceInternationalPEOs: 'Switched to use from Global Partners in 2018'
}

export const detailedClientInfoClientGoalsMock = {
  expansion: 'Increase in coverage and revenue in France',
  existingSolution: 'Replaced Global Partners in 2018; also replacing internal spreadsheets including the 4A_Form...',
  serviceGoalsandExpectations: 'White-glove service; unhappy with Global Partners’ hands-off approach.',
  biggestPainPointsandChallenges: 'Lack of company-level expertise in France.',
  specialInstructions: 'No special Onboarding requirements.'
}

export const detailedClientInfoClientInteractionNotesMock = {
  interactionHighlights: 'Marcy Bogart is a huge proponent of Velocity Global and an  outspoken supporter. She has two kids and is a big cat lover.',
  interactionChallenges: 'Ryan Mercer is a product detractor. He is difficult and outspoken.',
  secondaryPointsofContact: [
    {
      id: 1,
      name: 'Jennifer Villanova',
      role: 'HR Manager',
      title: 'HR Senior Manager II'
    }, {
      id: 2,
      name: 'Patty Franc',
      role: 'HR Manager',
      title: 'Engineering Manager'
    }, {
      id: 3,
      name: 'Ana Hillock',
      role: 'PTO Manager',
      title: 'Senior Business Analyst'
    }
  ]
}

export const detailedClientInfoReferralInformationMock = {
  partnerReferral: 'Cyber Y',
  partnerStakeholder: 'Marcy Bogart',
  otherReferralInformation: 'Marcy Bogart is a big Velocity Global proponent'
}

export const detailedClientInfoPaymentsandpricingMock = {
  standardPaymentTerms: 'Net 5',
  ACHorWire: 'ACH',
  pricingStructure: '14% Domestic; 16% Foreign',
  pricingNotes: 'No special pricing structures or requirements.'
}

export const detailedClientInfoMeetingRecordsMock = [
  {
    contactDate: '20 August 2000',
    correspondanceType: 'Client Kickoff Meeting',
    involvedUsers: ['User1'],
    meetingNotes: 'Standard kickoff meeting, should set up 4 CMs - names in email',
  },
  {
    contactDate: '01 June 2000',
    correspondanceType: 'Client Introduction Call',
    involvedUsers: ['User1', 'User2'],
    meetingNotes: 'Short introduction, follow up in 10 days via email',
  },
]

export const detailedClientInfoEmailRecordsMock = [
  {
    contactDate: '20 August 2000',
    emailType: 'EE Welcome Email',
    involvedUsers: ['User1'],
    description: '',
  },
  {
    contactDate: '01 June 2000',
    emailType: 'EE Welcome Email',
    involvedUsers: ['User1', 'User2'],
    description: 'Short introduction, follow up in 10 days via email',
  },
]
