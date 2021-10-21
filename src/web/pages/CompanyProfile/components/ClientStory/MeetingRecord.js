import React, { useContext, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useLocation } from 'react-router'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import VgInput from 'web/modules/VgInput/VgInput'
import { DivClientSummaryItem } from '../ClientInformation/ClientInformation.styles'
import {
  DivRecordInfo,
  DivRecordContainer,
  ImgTrashIcon,
  DivInputInfo,
} from './MeetingRecord.styles'
import trashIcon from 'assets/images/icons/trashIcon.svg'
import { GlobalModalContext } from 'shared/providers/GlobalModalProvider'
import modalConstants from 'web/constants/modalConstants'
import { CLIENT_COMPANY_QUERY, formatDate } from './ClientStory'

export const DELETE_CLIENT_MEETING_QUERY = gql`
  mutation DeleteClientMeeting (
    $id: ID
  ) {
    deleteClientMeeting (
      id: $id
    ) {
      id
    }
  }
`

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
    $id: ID
    $clientId: ID
    $description: String
    $meetingDate: Date
    $notes: String
  ) {
      upsertClientMeeting (
        id: $id
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
 * Renders communiation record component
 * @category Components - Web
 * @namespace MeetingRecord
 */

export default function MeetingRecord({ record }) {
  const { showModal } = useContext(GlobalModalContext)

  const { pathname } = useLocation()
  const [, , , clientId] = pathname.split('/')
  const { id: companyId } = useParams()
  const [contactDate, setContactDate] = useState(new Date(record?.meetingDate))
  const [description, setDescription] = useState(record?.description)

  const [UpdateMeeting] = useMutation(UPSERT_CLIENT_MEETING_QUERY, {
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
            meetings: data.clientProfile.meetings.map((meeting) => {
              if (meeting.id === upsertClientMeeting.id) {
                return upsertClientMeeting
              }
              return meeting
            })
          }
        }
      })
    }
  })

  function updateMeeting() {
    const meetingDate = formatDate(contactDate);
    UpdateMeeting({
      variables: {
        id: record?.id,
        clientId: clientId,
        description: description,
        meetingDate: meetingDate,
        notes: 'note'
      }
    })
  }

  /********** delete meeting **********/
  function deleteMeeting() {
    DeleteMeeting({
      variables: {
        id: record?.id
      }
    })
  }

  const [DeleteMeeting] = useMutation(DELETE_CLIENT_MEETING_QUERY, {
    update(cache, { data: { deleteClientMeeting } }) {
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
            meetings: data.clientProfile.meetings.filter((meeting) => meeting.id !== deleteClientMeeting.id)
          }
        }
      })

    }
  })
  /********** delete meeting **********/

  return (
    <DivRecordContainer>
      <DivRecordInfo>
        <DivInputInfo>
          <DivClientSummaryItem>
            <VgInput
              id='dateContact'
              type={InputTypes.DATE}
              value={contactDate}
              onChange={setContactDate}
              onBlur={updateMeeting}
              label='Date of Contact'
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem>
            <VgInput
              id='correspondanceType'
              type={InputTypes.TEXT}
              value={record?.correspondanceType}
              label='Correspondance Type'
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem>
            <VgInput
              id='involvedUsers'
              type={InputTypes.SELECT}
              value={0}
              options={[{ label: record?.involvedUsers ? record?.involvedUsers[0] : "", value: 0 }]}
              label='Key Person'
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem className='long-item'>
            <VgInput
              id='description'
              type={InputTypes.TEXT}
              value={description}
              onChange={setDescription}
              onBlur={updateMeeting}
              label='Description'
            />
          </DivClientSummaryItem>
        </DivInputInfo>
      </DivRecordInfo>
      <ImgTrashIcon src={trashIcon} alt='remove-item' onClick={() => showModal(modalConstants.CONFIRMATION_MODAL, {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this meeting record?',
        onSubmit: () => deleteMeeting()
      })} />
    </DivRecordContainer>
  )
}
