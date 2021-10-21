import React, { useState } from 'react'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import VgInput from 'web/modules/VgInput/VgInput'
import { DivClientSummaryItem } from '../ClientInformation/ClientInformation.styles'
import {
  DivGeneral,
  DivInputInfo
} from './GeneralBlock.styles'

/**
 * Renders general component
 * @category Components - Web
 * @namespace GeneralBlock
 */
export default function GeneralBlock({ data }) {
  const [industryVertical, setIndustryVertical] = useState(data.industryVertical);
  const [experienceInternationalMarkets, setExperienceInternationalMarkets] = useState(data.experienceInternationalMarkets);
  const [experienceInternationalPEOs, setExperienceInternationalPEOs] = useState(data.experienceInternationalPEOs);
  return (
    <DivGeneral>
        <DivInputInfo>
          <DivClientSummaryItem>
            <VgInput
              id='clientSegment'
              type={InputTypes.SELECT}
              value={0}
              options={[{label: data.clientSegment[0], value: 0}]}
              label='Client Segment'
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem>
            <VgInput
              id='industryVertical'
              type={InputTypes.TEXT}
              value={industryVertical}
              label='Industry Vertical'
              onChange={setIndustryVertical}
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem className='long-item'>
            <VgInput
              id='experienceInternationalMarkets'
              type={InputTypes.TEXT}
              value={experienceInternationalMarkets}
              onChange={setExperienceInternationalMarkets}
              label='Experience with Operating in International Markets'
            />
          </DivClientSummaryItem>
        </DivInputInfo>
        <DivInputInfo>
          <DivClientSummaryItem>
            <VgInput
              id='clientSince'
              type={InputTypes.DATE}
              value={new Date(data.clientSince)}
              label='Client Since'
            />
          </DivClientSummaryItem>
          
          <DivClientSummaryItem className='long-item'>
            <VgInput
              id='experienceInternationalPEOs'
              type={InputTypes.TEXT}
              value={experienceInternationalPEOs}
              onChange={setExperienceInternationalPEOs}
              label='Experience with other International PEOs'
            />
          </DivClientSummaryItem>
        </DivInputInfo>
    </DivGeneral>
  )
}
