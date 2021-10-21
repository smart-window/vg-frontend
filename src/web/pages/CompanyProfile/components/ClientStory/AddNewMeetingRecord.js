import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useLocation } from 'react-router'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import VgInput from 'web/modules/VgInput/VgInput'
import { DivClientSummaryItem } from '../ClientInformation/ClientInformation.styles'
import closeIcon from 'assets/images/icons/closeIcon.svg'
import { AddButton } from './ClientStory.styles'
import { DivRecordInfo, DivRecordContainer, DivInputInfo, ImgTrashIcon } from './MeetingRecord.styles'
import { CLIENT_COMPANY_QUERY, formatDate } from './ClientStory';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

export const CLIENT_MEETING_FRAGMENT = gql`
  fragment ClientMeetingFragment on ClientMeeting {
    id
    client {
      id
      name
    }
    meeting {
      id
      meetingDate
      notes
      description
      users {
        id
        fullName
      }
    }
  }
`

export const UPSERT_CLIENT_MEETING_QUERY = gql`
  mutation UpsertClientMeeting (
    $clientId: ID
    $description: String
    $meetingDate: Date
    $notes: String
  ) {
      upsertClientMeeting (
        client_id:$clientId
        description:$description
        meeting_date:$meetingDate
        notes:$notes
      ) {
        ...ClientMeetingFragment
      }
    }
  ${CLIENT_MEETING_FRAGMENT}
`

/**
 * Renders a component where users can add a communication record
 * @category Components - Web
 * @namespace AddNewMeetingRecord
 */
export default function AddNewMeetingRecord({ onAdded, onCancel }) {
  

  const [contactDate, setContactDate] = useState('')
  const [correspondanceType, setCorrespondanceType] = useState('')
  const [involvedUsers, setInvolvedUsers] = useState(null)
  const [description, setDescription] = useState('')
  const { pathname } = useLocation()
  const [, , , clientId] = pathname.split('/')

  const { id: companyId } = useParams()
  const [AddNewMeeting] = useMutation(UPSERT_CLIENT_MEETING_QUERY, {
    onCompleted: onAdded,
    update(cache, { data: { upsertClientMeeting } }) {
      const data = cache.readQuery({
        query: CLIENT_COMPANY_QUERY,
        variables: { id: companyId }
      })

      cache.writeQuery({
        query: CLIENT_COMPANY_QUERY,
        variables: { id: companyId },
        data: {
          ...data,
          clientProfile: {
            ...data.clientProfile,
            meetings: [...data.clientProfile.meetings, upsertClientMeeting.meeting]
          }
        }
      })
    }
  })

  function addNewMeeting() {
    const meetingDate = formatDate(contactDate);
    AddNewMeeting({
      variables: {
        clientId: clientId,
        description: description,
        meetingDate: meetingDate,
        notes: 'note'
      }
    })
  }

  return (
    <DivRecordContainer>
      <DivRecordInfo>
        <DivInputInfo>
          <DivClientSummaryItem>
            <VgInput
              type={InputTypes.DATE}
              value={contactDate}
              label='Date of Contact'
              onChange={e => setContactDate(e)}
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem>
            <VgInput
              type={InputTypes.TEXT}
              value={correspondanceType}
              label='Correspondance Type'
              onChange={e => setCorrespondanceType(e)}
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem>
            <VgInput
              type={InputTypes.SELECT}
              value={involvedUsers}
              label='Key Person'
              options={[{ label: 'Client 1', value: 0 }]}
              isOptional
              onChange={e => setInvolvedUsers(e)}
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem className='long-item'>
            <VgInput
              type={InputTypes.TEXT}
              value={description}
              label='Description'
              isOptional
              onChange={e => setDescription(e)}
            />
          </DivClientSummaryItem>
        </DivInputInfo>
      </DivRecordInfo>
      <AddButton text='Add' isActive={contactDate && correspondanceType} onClick={addNewMeeting} />
      <ImgTrashIcon src={closeIcon} alt='remove-item' onClick={onCancel} />
    </DivRecordContainer>
  )
}
