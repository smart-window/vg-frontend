import React from 'react'
import {useQuery, gql} from '@apollo/client'
import Card from 'mobile/components/Card/Card'
import CardHeader from 'mobile/components/CardHeader/CardHeader'
import InputField from 'mobile/components/InputField/InputField'
import DualButtons from 'mobile/components/DualButtons/DualButtons'
import dateHelper from 'shared/services/dateHelper'
import {useTranslation} from 'react-i18next'

import userImage from 'assets/images/default-user-img.png'
import UserCircle from 'mobile/icons/StaticIcons/UserProfileCircle'
import EditPencil from 'mobile/icons/DynamicIcons/EditPencil'
import MapPin from 'mobile/icons/StaticIcons/MapPin'
import loadingGif from 'assets/images/loading-gif.gif'

import {
  ViewUserDetails,
  ViewProfileImage,
  ImageProfile,
  ViewUserInfo,
  ViewFields,
  ImageLoading,
  TextUserDataError
} from './UserDetails.styles'

export const USER_QUERY = gql`
    query {
      currentUser {
        firstName
        lastName
        birthDate
        nationality {
          id
          isoCode
        }
      }
    }
  `

/**
 * A unique component to display an image attached to a Card component.
 * Displays a user's profile image and the user's information.
 * @category Components - Mobile
 * @namespace UserDetails
 */
export function UserDetails() {
  const {loading, error, data} = useQuery(USER_QUERY)
  const currentUser = data ? data.currentUser : null
  const { t } = useTranslation()

  return (
    <ViewUserDetails testID='UserDetails'>
      <ViewProfileImage>
        <ImageProfile testID='ImageProfile' source={userImage} />
      </ViewProfileImage>
      <Card hasBorderTop={true} >
        <ViewUserInfo>
          <CardHeader
            icon={<UserCircle />}
            title={t('User Information')}
          />
          { data &&
            <ViewFields>
              <InputField
                label={t('First Name')}
                labelItem={currentUser.firstName}
              />
              <InputField
                label={t('Last Name')}
                labelItem={currentUser.lastName}
              />
              <InputField
                label={t('Birthdate')}
                labelItem={dateHelper.formatBirthdate(currentUser.birthDate)}
              />
              <InputField
                label={t('Nationality')}
                labelItem={currentUser.nationality.isoCode || 'US'}
              />
            </ViewFields>
          }
          {
            loading &&
            <ImageLoading testID='loading-gif' source={loadingGif} />
          }
          {
            error &&
            <TextUserDataError>{t('Error fetching user data')}</TextUserDataError>
          }
        </ViewUserInfo>
        <DualButtons
          iconLeft={<MapPin />}
          iconRight={<EditPencil />}
        />
      </Card>
    </ViewUserDetails>
  )
}

export default UserDetails