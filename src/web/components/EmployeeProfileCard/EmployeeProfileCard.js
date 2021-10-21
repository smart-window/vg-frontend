import { gql } from '@apollo/client'
import { shape, string } from 'prop-types'
import React from 'react'
import {useHistory} from 'react-router'
import ChevronArrowIcon from '../DynamicIcons/ChevronArrowIcon'

import {
  DivContainer,
  DivProfileImage,
  DivDetails,
  DivDetailsHeader,
  DivDetailHeading,
  DivCompanyText,
  AIconLink,
  DivDetail,
  DivDetailRow,
  DivChevronContainer,
  DivNameContainer,
  H3UserName,
  H4NameSubHeading,
  ButtonViewProfile
} from './EmployeeProfileCard.styles'

EmployeeProfileCard.propTypes = {
  employee: shape({
    avatarUrl: string,
    clientName: string,
    countryName: string,
    regionName: string,
    email: string,
    employmentType: string,
    fullName: string,
    id: string,
    phone: string,
    title: string
  })
}

EmployeeProfileCard.defaultProps = {
  user: {}
}

EmployeeProfileCard.fragments = {
  EmployeeReportItem: gql`
    fragment EmployeeProfileCardFragment on EmployeeReportItem {
      avatarUrl
      clientName
      countryName
      regionName
      email
      employmentType
      fullName
      id
      phone
      title
    }
  `
}

/**
 * renders a profile card with information about an employee.
 * @category Components - Web
 * @namespace SupportedEmployeesFilter
 */
export default function EmployeeProfileCard(props) {
  const { employee } = props
  const history = useHistory()

  /** Navigates to the EE profile route */
  function viewFullProfile() {
    history.push('/supported-employees/'+employee.id)
  }

  return (
    <DivContainer>
      <DivProfileImage src={employee?.avatarUrl} />
      <DivNameContainer>
        <H3UserName>{employee?.fullName}</H3UserName>
        <H4NameSubHeading>Supported Employee</H4NameSubHeading>
      </DivNameContainer>
      <DivDetails>
        <DivDetailsHeader>
          <div>
            <DivDetailHeading>Primary Client Company</DivDetailHeading>
            <DivCompanyText>{employee?.clientName}</DivCompanyText>
          </div>
          <div>
            <AIconLink href={`tel:${employee?.phone}`}>
              <PhoneIcon />
            </AIconLink>
            <AIconLink href={`mailto:${employee?.email}`}>
              <EmailIcon />
            </AIconLink>
          </div>
        </DivDetailsHeader>
        <DivDetailRow>
          <DivDetail>
            <DivDetailHeading>Contract ID</DivDetailHeading>
            {employee?.id}
          </DivDetail>
          <DivDetail>
            <DivDetailHeading>Country and Region</DivDetailHeading>
            {employee?.countryName}, {employee?.region}
          </DivDetail>
        </DivDetailRow>
        <DivDetailRow>
          <DivDetail>
            <DivDetailHeading>Title</DivDetailHeading>
            {employee?.title}
          </DivDetail>
          <DivDetail>
            <DivDetailHeading>Employment Type</DivDetailHeading>
            {employee?.employmentType}
          </DivDetail>
        </DivDetailRow>
        <DivChevronContainer>
          <ChevronArrowIcon />
        </DivChevronContainer>
      </DivDetails>
      <ButtonViewProfile onClick={viewFullProfile}>View Full Profile</ButtonViewProfile>
    </DivContainer>
  )
}

function EmailIcon() {
  return (
    <svg
      width='37'
      height='36'
      viewBox='0 0 37 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M1.00195 8.198V6.73L1.09495 6.548L1.14095 6.411L1.27895 6.274L1.41695 6.137L1.55495 6.09L1.74095 6H35.541L35.725 6.09L35.863 6.137L36.001 6.274L36.139 6.411L36.186 6.548L36.277 6.73V8.198'
        fill='black'
        fillOpacity='0.01'
      />
      <path
        d='M1.00195 8.198V6.73L1.09495 6.548L1.14095 6.411L1.27895 6.274L1.41695 6.137L1.55495 6.09L1.74095 6H35.541L35.725 6.09L35.863 6.137L36.001 6.274L36.139 6.411L36.186 6.548L36.277 6.73V8.198'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.7 21.942L1 28.862V8.381L18.366 20.842L18.504 20.932H18.781L18.919 20.842L36.282 8.377V28.861L26.582 21.941'
        fill='black'
        fillOpacity='0.01'
      />
      <path
        d='M10.7 21.942L1 28.862V8.381L18.366 20.842L18.504 20.932H18.781L18.919 20.842L36.282 8.377V28.861L26.582 21.941'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M36.2 29L35.498 29.644H1.78599L1 29'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg
      width='30'
      height='32'
      viewBox='0 0 36 38'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21.818 24.9258C20.7735 25.3165 19.5956 25.0492 18.8244 24.2463C17.8203 23.0844 16.8201 21.834 15.8281 20.5206C14.8361 19.2072 13.9315 17.8858 13.0983 16.5952C12.542 15.6183 12.6121 14.4076 13.2773 13.5007L14.8266 11.544C15.4915 10.6187 15.6159 9.41241 15.1537 8.37183L11.9313 2.02203C11.7112 1.57641 11.3185 1.23903 10.8436 1.08738C10.3686 0.935737 9.85218 0.982857 9.41282 1.21792L4.37185 3.89829C4.19504 3.96248 4.02895 4.05284 3.8792 4.16633C1.2867 6.1364 4.62222 14.9937 11.3256 23.9515C18.0289 32.9093 25.556 38.5783 28.1512 36.6095C28.3006 36.494 28.4305 36.3556 28.5362 36.1994L32.4815 32.0449C33.2008 31.287 33.1676 30.0924 32.4074 29.3752L27.2332 24.5184'
        stroke='currentColor'
      />
    </svg>
  )
}