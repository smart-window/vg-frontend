import React, { useState } from 'react'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import VgInput from 'web/modules/VgInput/VgInput'
import { DivClientSummaryItem } from '../ClientInformation/ClientInformation.styles'
import {
  DivClientGoals,
  DivInputInfo
} from './ClientGoalsBlock.styles'

/**
 * Renders general component
 * @category Components - Web
 * @namespace ClientGoalsBlock
 */
export default function ClientGoalsBlock({ data }) {
  const [serviceGoalsandExpectations, setServiceGoalsandExpectations] = useState(data.serviceGoalsandExpectations)
  const [expansion, setExpansion] = useState(data.expansion)
  const [existingSolution, setExistingSolution] = useState(data.existingSolution)
  const [biggestPainPointsandChallenges, setBiggestPainPointsandChallenges] = useState(data.biggestPainPointsandChallenges)
  const [specialInstructions, setSpecialInstructions] = useState(data.specialInstructions)
  return (
    <DivClientGoals>
      <DivInputInfo>
        <DivClientSummaryItem className='long-item'>
          <VgInput
            id='expansion'
            type={InputTypes.TEXT}
            value={expansion}
            onChange={setExpansion}
            label='What are the Client’s goals for expansion?'
          />
        </DivClientSummaryItem>
        <DivClientSummaryItem className='long-item'>
          <VgInput
            id='existingSolution'
            type={InputTypes.TEXT}
            value={existingSolution}
            onChange={setExistingSolution}
            label='Are they replacing an existing solution?'
          />
        </DivClientSummaryItem>
      </DivInputInfo>
      <DivInputInfo>
        <DivClientSummaryItem className='long-item'>
          <VgInput
            id='serviceGoalsandExpectations'
            type={InputTypes.TEXTAREA}
            value={serviceGoalsandExpectations}
            onChange={setServiceGoalsandExpectations}
            label='What are the Client’s service goals and expectations?' />
        </DivClientSummaryItem>
        <DivClientSummaryItem className='long-item'>
          <VgInput
            id='biggestPainPointsandChallenges'
            type={InputTypes.TEXTAREA}
            value={biggestPainPointsandChallenges}
            onChange={setBiggestPainPointsandChallenges}
            label='What are the Client’s biggest pain points and challenges?'
          />
        </DivClientSummaryItem>
      </DivInputInfo>
      <DivInputInfo>
        <DivClientSummaryItem className='long-item'>
          <VgInput
            id='specialInstructions'
            type={InputTypes.TEXTAREA}
            value={specialInstructions}
            onChange={setSpecialInstructions}
            label='Special Instructions for Onboarding'
          />
        </DivClientSummaryItem>
      </DivInputInfo>
    </DivClientGoals>
  )
}
