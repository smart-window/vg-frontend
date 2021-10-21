import React, { useEffect, useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useHistory, useParams } from 'react-router-dom'
import TabControl from 'web/components/TabControl/TabControl'
import {
  DivClientCompanyHeader,
  DivClientCompanyDetail,
  DivClientCompanyBody,
  DivClientCompnayContainer
} from './ClientCompany.styles'
import ClientInformation from './components/ClientInformation/ClientInformation'
import ClientDocuments from './components/ClientDocuments/ClientDocuments'
import ClientStory from './components/ClientStory/ClientStory'
import { GlobalLoaderContext } from 'shared/providers/GlobalLoaderProvider'
import ProfileHeader from 'web/components/ProfileHeader/ProfileHeader'
import { routes } from 'web/constants/routeConstants'

const CLIENT_INFORMATION_TAB = 0
const DOCUMENTS_TAB = 1
const CLIENT_STORY_TAB = 2

const employeeReportingTabs = [
  {
    id: CLIENT_INFORMATION_TAB,
    label: 'Client Information',
    analyticsCategory: 'Client Information',
  },
  { id: DOCUMENTS_TAB, label: 'Documents', analyticsCategory: 'Documents' },
  { id: CLIENT_STORY_TAB, label: 'Client Story', analyticsCategory: 'Client Story' },
]

const subRoutes = {
  [CLIENT_INFORMATION_TAB]: 'client-info',
  [DOCUMENTS_TAB]: 'documents',
  [CLIENT_STORY_TAB]: 'client-story'
}

const tabIdx = {
  'client-info': CLIENT_INFORMATION_TAB,
  'documents': DOCUMENTS_TAB,
  'client-story': CLIENT_STORY_TAB,
}

export const CLIENT_COMPANY_QUERY = gql`
  query ClientProfile(
    $id: Integer!
  ) {
    clientProfile (
      id: $id
    ) {
      id
      name
      operatingCountries {
        id
        country {
          id
          name
        }
      }
    }
  }
`
/**
 * Renders a client profile
 * @category Components - Web
 * @namespace ClientCompany
 */
export default function ClientCompany() {

  const history = useHistory()
  const { setIsLoading } = useContext(GlobalLoaderContext)
  const { type: companyType, id: companyId, tab = subRoutes[CLIENT_INFORMATION_TAB] } = useParams();
  const selectedTab = tabIdx[tab]

  useEffect(
    function didMount() {
      setIsLoading(false)
    },
    [setIsLoading]
  )

  const {
    fetchMore: fetchMoreClients,
    loading,
    data: {
      clientProfile = {
        operatingCountries: []
      }
    } = {},
  } = useQuery(CLIENT_COMPANY_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: { id: companyId },
  })

  const headerMockData = {
    name: clientProfile.name,
    label: 'Client Company',
    title: 'Operating in ' + clientProfile?.operatingCountries.map(oc => oc.country.name).join(', '),
    downloadUrl: 'http://www.clientCompany.com/profile/download',
    isActive: true
  }

  function handleTabSelect(tab) {
    history.push(routes.CLIENT_COMPANIES + `/${companyType}/${companyId}/${subRoutes[tab]}`)
  }
  return (
    <DivClientCompanyDetail>
      <DivClientCompanyHeader>
        <TabControl
          tabs={employeeReportingTabs}
          onTabSelect={handleTabSelect}
          selectedTabId={selectedTab}
        />
      </DivClientCompanyHeader>
      <DivClientCompanyBody>
        <ProfileHeader profile={headerMockData} />
        <DivClientCompnayContainer>
          {selectedTab === CLIENT_INFORMATION_TAB && <ClientInformation />}
          {selectedTab === CLIENT_STORY_TAB && <ClientStory />}
          {selectedTab === DOCUMENTS_TAB && <ClientDocuments />}
        </DivClientCompnayContainer>
      </DivClientCompanyBody>
    </DivClientCompanyDetail>
  )
}
