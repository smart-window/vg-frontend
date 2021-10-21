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

export const UPSERT_CLIENT_EMAIL_QUERY = gql`
  mutation UpsertClientSentEmail (
    $clientId: ID
    $description: String
    $sentDate: Date
    $subject: String
    $body: String
  ) {
    upsertClientSentEmail (
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
 * Renders a component where users can add a communication record
 * @category Components - Web
 * @namespace AddNewEmailRecord
 */
export default function AddNewEmailRecord({ onAdded, onCancel }) {
  const [contactDate, setContactDate] = useState('')
  const [emailType, setEmailType] = useState('')
  const [keyPerson, setKeyPerson] = useState(null)
  const [description, setDescription] = useState('')
  const { pathname } = useLocation()
  const [, , , clientId] = pathname.split('/')

  const { id: companyId } = useParams()
  const [AddNewEmail] = useMutation(UPSERT_CLIENT_EMAIL_QUERY, {
    onCompleted: onAdded,
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
            sentEmails: [...data.clientProfile.sentEmails, upsertClientSentEmail.sentEmail]
          }
        }
      })
    }
  })

  

  function addNewEmail() {
    const sentDate = formatDate(contactDate);
    AddNewEmail({
      variables: {
        clientId: clientId,
        description: description,
        sentDate: sentDate,
        body: 'body',
        subject:"subject"
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
              value={emailType}
              label='Email Type'
              onChange={e => setEmailType(e)}
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem>
            <VgInput
              type={InputTypes.SELECT}
              value={keyPerson}
              label='Key Person'
              options={[{ label: 'User 1', value: 0 }]}
              isOptional
              onChange={e => setKeyPerson(e)}
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
      <AddButton text='Add' isActive={contactDate && emailType} onClick={addNewEmail} />
      <ImgTrashIcon src={closeIcon} alt='remove-item' onClick={onCancel} />
    </DivRecordContainer>
  )
}
