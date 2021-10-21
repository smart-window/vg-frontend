import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { DivClientSummary, DivClientSummaryItem, DivContentBlock, DivContentBody, DivContentHeader, DivDetailButtons, ViewButton } from './ClientInformation.styles'
import arrowRightIcon from 'assets/images/icons/arrowRight.svg'
import VgInput from 'web/modules/VgInput/VgInput'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import OperatingCountryInfo from './OperatingCountryInfo'

export const CLIENT_COMPANY_QUERY = gql`
  query ClientProfile(
    $id: Integer!
  ) {
    clientProfile (
      id: $id
    ) {
      id
      name
      mainPointOfContact
      timezone
      address {
        id
        countyDistrict
        country {
          id
          name
        }
      }
      operatingCountries {
        id
        country {
          id
          name
        }
        annualLeave
        clientOnFasterReimbursement
        notes
        noticePeriodLength
        otherInsuranceOffered
        privateMedicalInsurance
        probationaryPeriodLength
        sickLeave
        standardAdditionsDeadline
        standardAllowancesOffered
        standardBonusesOffered
      }
    }
  }
`

export const CLIENT_TEAM_QUERY = gql`
  query ClientTeams(
    $id: ID!
  ) {
    clientTeams (
      clientId: $id
    ) {
      id
      name
      parentId
    }
  }
`

/**
 * Renders a component where users can manage the client's general information.
 * @category Components - Web
 * @namespace ClientInformation
 */
export default function ClientInformation() {
  const [address, setAddress] = useState(null)
  const [clientName, setName] = useState(null)
  const [mainContract, setMainContract] = useState(null)
  const [mainContractList, setMainContractList] = useState([])
  const [timezone, setTimezone] = useState([null])
  const [timezoneList, setTimezoneList] = useState([])
  const [contractId, setContractId] = useState(null)
  const [assignedTeamId, setAssignedTeamId] = useState(null)
  const [operatingCountries, setOperatingCountries] = useState([])
  const [, setItems] = useState([])
  const { id: companyId } = useParams();

  const {
    data: { clientProfile = {} } = {}
  } = useQuery(CLIENT_COMPANY_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: companyId
    },
  })

  const {
    data: { clientTeams = [] } = {}
  } = useQuery(CLIENT_TEAM_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: companyId
    },
  })

  useEffect(() => {
    setName(clientProfile.name)
    setAddress(clientProfile.address?.countyDistrict)
    setContractId(clientProfile.id)
  }, [clientProfile])

  useEffect(() => {
    setMainContractList([{ label: clientProfile.mainPointOfContact, value: 0 }])
    setMainContract(0)
  }, [clientProfile.mainPointOfContact])

  useEffect(() => {
    setTimezoneList([{ label: clientProfile.timezone, value: 0 }])
    setTimezone(0)
  }, [clientProfile.timezone])

  useEffect(() => {
    setOperatingCountries(clientProfile.operatingCountries || [])
  }, [clientProfile.operatingCountries])

  useEffect(() => {
    setAssignedTeamId(clientTeams.length > 0 ? clientTeams[0].id : null)
  }, [clientTeams])

  return (
    <div>
      <DivContentBlock>
        <DivContentHeader>
          Client Information
        </DivContentHeader>
        <DivContentBody expanded>
          <DivClientSummary>
            <DivClientSummaryItem className='fixed-width'>
              <VgInput
                type={InputTypes.TEXT}
                value={clientName}
                label='Client Name'
                onChange={() => { }} />
            </DivClientSummaryItem>
            <DivClientSummaryItem className='fixed-width'>
              <VgInput
                type={InputTypes.TEXT}
                value={contractId}
                label='ERP ID'
                onChange={() => { }} />
            </DivClientSummaryItem>
            <DivClientSummaryItem>
              <VgInput
                type={InputTypes.TEXT}
                value={address}
                label='Business Address'
                onChange={(value) => setAddress(value)} />
            </DivClientSummaryItem>

            <DivClientSummaryItem className='fixed-width'>
              <VgInput
                type={InputTypes.SELECT}
                value={assignedTeamId}
                options={clientTeams.map(team => ({
                  label: team.name,
                  value: team.id
                }))}
                label='Team Assignment'
                onChange={() => { }} />
            </DivClientSummaryItem>
            <DivClientSummaryItem className='fixed-width'>
              <VgInput
                type={InputTypes.SELECT}
                value={mainContract}
                options={mainContractList}
                label='Main Point of Contact'
                onChange={() => { }} />
            </DivClientSummaryItem>
            <DivClientSummaryItem>
              <VgInput
                type={InputTypes.SELECT}
                value={timezone}
                options={timezoneList}
                label='Timezone'
                onChange={() => { }} />
            </DivClientSummaryItem>
          </DivClientSummary>
          <DivDetailButtons>
            <ViewButton text='View all Client Managers'>
              <img src={arrowRightIcon} alt='view-detail' />
            </ViewButton>
            <ViewButton text='View all Employees'>
              <img src={arrowRightIcon} alt='view-detail' />
            </ViewButton>
          </DivDetailButtons>
        </DivContentBody>
      </DivContentBlock>
      <OperatingCountryInfo records={operatingCountries} />
    </div>
  )
}