import React from 'react'
import PropTypes, { bool, string } from 'prop-types'
import { Link } from 'react-router-dom'
import arrow from 'assets/images/icons/arrow.svg'
import { routes } from 'web/constants/routeConstants'
import downloadIcon from 'assets/images/icons/download.svg'
import {
  DivProfileHeaderTopRow,
  ImgBackArrow,
  DivProfileHeaderName,
  DivProfileHeaderClient,
  DivProfileLeftHeader,
  DivProfileRightHeader,
  DivProfileDownload,
  DivProfileActiveProfile
} from './ProfileHeader.styles'

ProfileHeader.propTypes = {
  profile: PropTypes.shape({
    name: string,
    title: string,
    profileType: string.isRequired,
    downloadUrl: string,
    isActive: bool
  })
}

function ProfileHeader(props) {
  const { profile } = props

  return (
    <DivProfileHeaderTopRow>
      <DivProfileLeftHeader>
        <Link to={routes.CLIENT_COMPANIES}>
          <ImgBackArrow src={arrow} />
        </Link>
        <DivProfileHeaderName>{profile?.name}</DivProfileHeaderName>
        <DivProfileHeaderClient>
          {profile?.title}
        </DivProfileHeaderClient>
      </DivProfileLeftHeader>
      <DivProfileRightHeader>
        <DivProfileDownload>
          <span>Download Profile</span>
          <img src={downloadIcon} alt='download' />
        </DivProfileDownload>
        {profile?.isActive == true ? <DivProfileActiveProfile>Active { profile?.label }</DivProfileActiveProfile> : <div></div>}
      </DivProfileRightHeader>
    </DivProfileHeaderTopRow>
  )
}

export default ProfileHeader
