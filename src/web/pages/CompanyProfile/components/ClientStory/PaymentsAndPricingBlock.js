import React from 'react'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import VgInput from 'web/modules/VgInput/VgInput'
import { DivClientSummaryItem } from '../ClientInformation/ClientInformation.styles'
import {
  DivClientGoals,
  DivInputInfo
} from './PaymentsAndPricingBlock.styles'

/**
 * Renders payments and pricing component
 * @category Components - Web
 * @namespace PaymentsAndPricingBlock
 */
export default function PaymentsAndPricingBlock({ data }) {
  return (
    <DivClientGoals>
        <DivInputInfo>
          <DivClientSummaryItem>
            <VgInput
              id='standardPaymentTerms'
              type={InputTypes.TEXT}
              value={data.standardPaymentTerms}
              label='Standard Payment Terms'
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem>
            <VgInput
              id='ACHorWire'
              type={InputTypes.TEXT}
              value={data.ACHorWire}
              label='ACH or Wire'
            />
          </DivClientSummaryItem>
          <DivClientSummaryItem className='long-item'>
            <VgInput
              id='pricingStructure'
              type={InputTypes.TEXT}
              value={data.pricingStructure}
              label='Pricing Structure'
            />
          </DivClientSummaryItem>
        </DivInputInfo>
        <DivInputInfo>
          <DivClientSummaryItem className='long-item'>
            <VgInput
              id='pricingNotes'
              value={data.pricingNotes}
              type={InputTypes.TEXTAREA}
              label='Pricing Notes'
            />
          </DivClientSummaryItem>
        </DivInputInfo>
    </DivClientGoals>
  )
}
