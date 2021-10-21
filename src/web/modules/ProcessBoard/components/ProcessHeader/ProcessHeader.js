import React from 'react'
import PropTypes, { bool, func } from 'prop-types'
import { Link } from 'react-router-dom'
import arrow from 'assets/images/icons/arrow.svg'
import DetailItem from '../DetailItem/DetailItem'
import ProcessActionBar from '../ProcessActionBar/ProcessActionBar'
import {
  DivContainer,
  DivHeaderTopRow,
  ImgBackArrow,
  DivHeaderName,
  DivHeaderClient,
  DivProgressBarContainer,
  DivProgressBar,
  DivProgressText,
  DivDetailsContainer,
} from './ProcessHeader.styles'

ProcessHeader.propTypes = {
  process: PropTypes.shape({
    fullName: PropTypes.string,
    clientName: PropTypes.string,
    startDate: PropTypes.string,
  }),
  isProfileOpen: bool.isRequired,
  setIsProfileOpen: func.isRequired,
}

ProcessHeader.defaultProps = {
  process: {},
}

function ProcessHeader(props) {
  const { isProfileOpen, process, setIsProfileOpen } = props

  const { percentComplete = 0, user } = process
  return (
    <DivContainer>
      <ProcessActionBar
        process={process}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
      />
      <DivHeaderTopRow>
        <Link to='/onboarding'>
          <ImgBackArrow src={arrow} />
        </Link>
        <DivHeaderName>{user?.fullName}'s Onboarding</DivHeaderName>
        <DivHeaderClient>
          {user?.clientName} starting on {user?.startDate}
        </DivHeaderClient>
      </DivHeaderTopRow>
      <DivProgressBarContainer>
        <DivProgressBar percentComplete={percentComplete} />
        <DivProgressText>{percentComplete * 100}% Complete</DivProgressText>
      </DivProgressBarContainer>
      <DivDetailsContainer>
        <DetailItem title='Contract ID' value={user?.contractId} />
        <DetailItem title='Anticipated Start Date' value={user?.startDate} />
        <DetailItem title='Client Company' value={user?.clientName} />
        <DetailItem title='Partner Company' value={user?.partnerName} />
        <DetailItem title='Country of Employment' value={user?.countryName} />
        <DetailItem
          title='Client Account Manager'
          value={process?.clientAccountManager}
        />
        <DetailItem title='Sales Associate' value={process?.salesAssociate} />
      </DivDetailsContainer>
    </DivContainer>
  )
}

export default ProcessHeader
