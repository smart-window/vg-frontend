import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useLocation } from 'react-router'
import {
  detailedClientInfoGeneralMock,
  detailedClientInfoClientGoalsMock,
  detailedClientInfoClientInteractionNotesMock,
  detailedClientInfoReferralInformationMock,
  detailedClientInfoPaymentsandpricingMock,
} from 'test/mockData/clientCompaniesMock'
import { DivContentBlock, DivContentBody, DivContentHeader } from '../ClientInformation/ClientInformation.styles'
import { DivAddNewRecord, DivNoRecords, ImgAddNew, BlueA } from './ClientStory.styles'
import GeneralBlock from './GeneralBlock'
import ClientGoalsBlock from './ClientGoalsBlock'
import ClientInteractionNotesBlock from './ClientInteractionNotesBlock'
import ReferralInformationBlock from './ReferralInformationBlock'
import PaymentsAndPricingBlock from './PaymentsAndPricingBlock'
import MeetingRecord from './MeetingRecord'
import addNewIcon from 'assets/images/icons/plusCircleGreen.svg'
import AddNewMeetingRecord from './AddNewMeetingRecord'
import { DivSubBlock, DivSubBlockBody, DivSubBlockHeader } from '../../ClientCompany.styles'
import AddNewEmailRecord from './AddNewEmailRecord'
import EmailRecord from './EmailRecord'
import { InputLitmosTrainingCompletedCheckboxDisabled } from 'web/components/modals/TrainingModal/TrainingModal.styles'

export const CLIENT_COMPANY_QUERY = gql`
  query ClientProfile(
    $id: Integer!
  ) {
    clientProfile (
      id: $id
    ) {
      id
      name
      address {
        id
      }
      operatingCountries {
        id
        country {
          id
          name
        }
      }
      meetings {
        id
        description
        meetingDate
        notes
        users {
          id
          fullName
        }
      }
      mainPointOfContact
      email
      sentEmails {
        body
        description
        id
        sentDate
        subject
      }
      timezone
      phoneNumber

      }
    }
`

export function formatDate(date) {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

/**
 * Renders a component where users can manage client story
 * @category Components - Web
 * @namespace ClientStory
 */
export default function ClientStory() {
  const [addNewMeetingRecord, setAddNewMeetingRecord] = useState(false)
  const [addNewEmailRecord, setAddNewEmailRecord] = useState(false)
  const [meetingRecords, setMeetingRecords] = useState([]);
  const [emailRecords, setEmailRecords] = useState([]);
  const { pathname } = useLocation()
  const [, , , client_id] = pathname.split('/')

  const {
    fetchMore: fetchMoreClients,
    loading,
    data: { clientProfile = {} } = {},
  } = useQuery(CLIENT_COMPANY_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: client_id
    },
  })

  useEffect(() => {
    if (clientProfile.meetings) {
      setMeetingRecords(clientProfile.meetings)
    }
    if (clientProfile.sentEmails) {
      setEmailRecords(clientProfile.sentEmails)
    }
  }, [clientProfile]);

  return (
    <>
      <DivContentBlock>
        <DivContentHeader>
          Client Story
        </DivContentHeader>
        <DivContentBody expanded>
          <DivSubBlock>
            <DivSubBlockHeader>GENERAL</DivSubBlockHeader>
            <DivSubBlockBody>
              <GeneralBlock data={detailedClientInfoGeneralMock} />
            </DivSubBlockBody>
          </DivSubBlock>
          <DivSubBlock>
            <DivSubBlockHeader>CLIENT GOALS</DivSubBlockHeader>
            <DivSubBlockBody>
              <ClientGoalsBlock data={detailedClientInfoClientGoalsMock} />
            </DivSubBlockBody>
          </DivSubBlock>
          <DivSubBlock>
            <DivSubBlockHeader>MEETING RECORDS</DivSubBlockHeader>
            <DivSubBlockBody>
              {meetingRecords.length === 0 && <DivNoRecords>No Meeting Records have been added yet.</DivNoRecords>}
              {meetingRecords.map((item) => <MeetingRecord key={item.id} record={item} />)}
              {addNewMeetingRecord && <AddNewMeetingRecord onAdded={() => setAddNewMeetingRecord(false)} onCancel={() => setAddNewMeetingRecord(false)} />}
              {!addNewMeetingRecord && <DivAddNewRecord onClick={() => setAddNewMeetingRecord(true)}>
                <ImgAddNew src={addNewIcon} alt='add-new' />
                Add New Communication Record
              </DivAddNewRecord>}
            </DivSubBlockBody>
          </DivSubBlock>
          <DivSubBlock>
            <DivSubBlockHeader>EMAIL RECORDS</DivSubBlockHeader>
            <DivSubBlockBody>
              {emailRecords.length === 0 && <DivNoRecords>No Email Records have been added yet.</DivNoRecords>}
              {emailRecords.map((item) => <EmailRecord key={item.id} record={item} />)}
              {addNewEmailRecord && <AddNewEmailRecord onAdded={() => setAddNewEmailRecord(false)} onCancel={() => setAddNewEmailRecord(false)} />}
              {!addNewEmailRecord && <DivAddNewRecord onClick={() => setAddNewEmailRecord(true)}>
                <ImgAddNew src={addNewIcon} alt='add-new' />
                Add New Email Record
              </DivAddNewRecord>}
            </DivSubBlockBody>
          </DivSubBlock>
          <DivSubBlock>
            <DivSubBlockHeader>CLIENT INTERACTION NOTES</DivSubBlockHeader>
            <DivSubBlockBody>
              <ClientInteractionNotesBlock data={detailedClientInfoClientInteractionNotesMock} />
            </DivSubBlockBody>
          </DivSubBlock>
          <DivSubBlock>
            <DivSubBlockHeader>REFERRAL INFORMATION</DivSubBlockHeader>
            <DivSubBlockBody>
              <ReferralInformationBlock data={detailedClientInfoReferralInformationMock} />
            </DivSubBlockBody>
          </DivSubBlock>
          <DivSubBlock>
            <DivSubBlockHeader>PAYMENTS AND PRICING</DivSubBlockHeader>
            <DivSubBlockBody>
              <PaymentsAndPricingBlock data={detailedClientInfoPaymentsandpricingMock} />
            </DivSubBlockBody>
          </DivSubBlock>
          <BlueA>View Client Audit History</BlueA>

        </DivContentBody>
      </DivContentBlock>
    </>
  )
}