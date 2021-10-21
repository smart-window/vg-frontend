import React, { useContext, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useLocation } from 'react-router'
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

export const DELETE_CLIENT_EMAIL_QUERY = gql`
  mutation DeleteClientSentEmail (
    $id: ID
  ) {
    deleteClientSentEmail (
      id: $id
    ) {
      id
    }
  }
`

export const UPSERT_CLIENT_EMAIL_QUERY = gql`
  mutation UpsertClientSentEmail (
    $id: ID
    $clientId: ID
    $description: String
    $sentDate: Date
    $subject: String
    $body: String
  ) {
    upsertClientSentEmail (
        id: $id
        client_id: $clientId
        description: $description
        sent_date: $sentDate
        subject: $subject
        body: $body
      ) {
        id
        client {
          id
          name
        }
        sentEmail {
          id
          description
          body
          sentDate
          subject
          
        }
      }
    }
`

/**
 * Renders communiation record component
 * @category Components - Web
 * @namespace EmailRecord
 */
export default function EmailRecord({ record }) {
  const {showModal} = useContext(GlobalModalContext)
  const { pathname } = useLocation()
  const [, , , clientId] = pathname.split('/')
  const { id: companyId } = useParams()
  const [contactDate, setContactDate] = useState(new Date(record?.sentDate))
  const [description, setDescription] = useState(record?.description)

  const [UpdateEmail] = useMutation(UPSERT_CLIENT_EMAIL_QUERY, {
    update(cache, { data: { upsertClientSentEmail } }) {
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
            // sentEmails: [...data.clientProfile.sentEmails, upsertClientSentEmail.meeting]
            sentEmails: data.clientProfile.sentEmails.map((sentEmail) => {
              if (sentEmail.id === upsertClientSentEmail.id) {
                return upsertClientSentEmail
              }
              return sentEmail
            })
          }
        }
      })
    }
  })

  function updateEmail() {
    const sentDate = formatDate(contactDate);
    UpdateEmail({
      variables: {
        id: record?.id,
        clientId: clientId,
        description: description,
        sentDate: sentDate,
        body: 'body',
        subject:"subject"
      }
    })
  }

  /********** delete email **********/
  function deleteEmail() {
    DeleteEmail({
      variables: {
        id: record?.id
      }
    })
  }

  const [DeleteEmail] = useMutation(DELETE_CLIENT_EMAIL_QUERY, {
    update(cache, { data: { deleteClientSentEmail } }) {
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
            sentEmails: data.clientProfile.sentEmails.filter((sentEmail) => {
              return sentEmail.id !== deleteClientSentEmail.id
            })
          }
        }
      })
    }
  })
  /********** delete email **********/

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
              onBlur={updateEmail}
              label='Date of Contact'
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem>
            <VgInput
              id='emailType'
              type={InputTypes.TEXT}
              value={record.emailType}
              label='Email Type'
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem>
            <VgInput
              id='involvedUsers'
              type={InputTypes.SELECT}
              value={0}
              options={[{label: " ", value: 0}]}
              label='Involved Users'
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem className='long-item'>
            <VgInput
              id='description'
              type={InputTypes.TEXT}
              value={description}
              onChange={setDescription}
              onBlur={updateEmail}
              label='Description'
              isOptional
            />
          </DivClientSummaryItem>
        </DivInputInfo>
      </DivRecordInfo>
      <ImgTrashIcon src={trashIcon} alt='remove-item' onClick={() => showModal(modalConstants.CONFIRMATION_MODAL, {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this email record?',
        onSubmit: () => deleteEmail()
      })}/>
    </DivRecordContainer>
  )
}
