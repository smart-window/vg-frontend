import React from 'react'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import VgInput from 'web/modules/VgInput/VgInput'
import { DivClientSummaryItem } from '../ClientInformation/ClientInformation.styles'
import {
  DivGeneral,
  DivInputInfo
} from './ReferralInformationBlock.styles'

/**
 * Renders Referral Information component
 * @category Components - Web
 * @namespace ReferralInformationBlock
 */
export default function ReferralInformationBlock({ data }) {
  return (
    <DivGeneral>
        <DivInputInfo>
        <DivClientSummaryItem>
            <VgInput
              id='partnerReferral'
              type={InputTypes.TEXT}
              value={data.partnerReferral}
              label='Partner Referral'
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem>
            <VgInput
              id='partnerStakeholder'
              type={InputTypes.TEXT}
              value={data.partnerStakeholder}
              label='Partner Stakeholder'
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem className='long-item'>
            <VgInput
              id='otherReferralInformation'
              type={InputTypes.TEXT}
              value={data.otherReferralInformation}
              label='Other Referral Information'
            />
          </DivClientSummaryItem>
        </DivInputInfo>
    </DivGeneral>
  )
}
