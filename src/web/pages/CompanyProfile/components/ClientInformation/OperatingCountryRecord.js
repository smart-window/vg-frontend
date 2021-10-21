import React, { useState, useContext } from 'react'
import { ARemoveCountry, DivCountryName, DivFooter, DivOperatingCountryInfo, DivOperatingCountryInfoItem, ImgExpandIndicator } from './OperatingCountryInfo.styles'
import VgInput from 'web/modules/VgInput/VgInput'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import { gql, useMutation } from '@apollo/client'
import { CLIENT_COMPANY_QUERY } from './ClientInformation';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import modalConstants from 'web/constants/modalConstants'
import { GlobalModalContext } from 'shared/providers/GlobalModalProvider'

export const DELETE_OPERATING_COUNTRY_QUERY = gql`
  mutation DeleteOperatingCountry (
    $id: ID
  ) {
    deleteOperatingCountry (
      id: $id
    ) {
      id
    }
  }
`

export const UPSERT_OPERATING_COUNTRY_QUERY = gql`
mutation UpsertOperatingCountry (
  $id: ID
  $clientId: ID
  $countryId: ID
  $probationaryPeriodLength: String
  $noticePeriodLength: String
  $privateMedicalInsurance: String
  $otherInsuranceOffered: String
  $annualLeave: String
  $sickLeave: String
  $standardAdditionsDeadline: String
  $clientOnFasterReimbursement: Boolean
  $standardAllowancesOffered: String
  $standardBonusesOffered: String
  $notes: String
) {
  upsertOperatingCountry (
    id: $id
    clientId: $clientId
    countryId: $countryId
    probationaryPeriodLength: $probationaryPeriodLength
    noticePeriodLength: $noticePeriodLength
    privateMedicalInsurance: $privateMedicalInsurance
    otherInsuranceOffered: $otherInsuranceOffered
    annualLeave: $annualLeave
    sickLeave: $sickLeave
    standardAdditionsDeadline: $standardAdditionsDeadline
    clientOnFasterReimbursement: $clientOnFasterReimbursement
    standardAllowancesOffered: $standardAllowancesOffered
    standardBonusesOffered: $standardBonusesOffered
    notes: $notes
    ) {
      id
      country {
        id
        name
      }
      annualLeave
      clientOnFasterReimbursement
      notes
      noticePeriodLength
      otherInsuranceOffered
      privateMedicalInsurance
      probationaryPeriodLength
      sickLeave
      standardAdditionsDeadline
      standardAllowancesOffered
      standardBonusesOffered
    }
  }
`

export default function OperatingCountryRecord(props) {
  const country = props.record
  const { showModal } = useContext(GlobalModalContext)

  const [countryName, setCountryName] = useState(country.country.name)
  const [probationaryPeriodLength, setProbationaryPeriodLength] = useState(country.probationaryPeriodLength)
  const [noticePeriodLength, setNoticePeriodLength] = useState(country.noticePeriodLength)
  const [privateMedicalInsurance, setPrivateMedicalInsurance] = useState(country.privateMedicalInsurance)
  const [otherInsuranceOffered, setOtherInsuranceOffered] = useState(country.otherInsuranceOffered)
  const [annualLeave, setAnnualLeave] = useState(country.annualLeave)
  const [sickLeave, setSickLeave] = useState(country.sickLeave)
  const [standardAdditionsDeadline, setStandardAdditionsDeadline] = useState(country.standardAdditionsDeadline)
  const [clientOnFasterReimbursement, setClientOnFasterReimbursement] = useState(country.clientOnFasterReimbursement)
  const [standardAllowancesOffered, setStandardAllowancesOffered] = useState(country.standardAllowancesOffered)
  const [standardBonusesOffered, setStandardBonusesOffered] = useState(country.standardBonusesOffered)
  const [notes, setNotes] = useState(country.notes)
  const { id: companyId } = useParams()

  const [UpdateOperatingCountry] = useMutation(UPSERT_OPERATING_COUNTRY_QUERY, {
    update(cache, { data: { upsertOperatingCountry } }) {
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
            operatingCountries: data.clientProfile.operatingCountries.map((country) => {
              if (country.id === upsertOperatingCountry.id) {
                return upsertOperatingCountry
              }
              return country
            })
          }
        }
      })
    }
  })

  function updateOperatingCountry() {
    UpdateOperatingCountry({
      variables: {
        id: country?.id,
        clientId: companyId,
        countryId: 1,
        probationaryPeriodLength: probationaryPeriodLength,
        noticePeriodLength: noticePeriodLength,
        privateMedicalInsurance: privateMedicalInsurance,
        otherInsuranceOffered: otherInsuranceOffered,
        annualLeave: annualLeave,
        sickLeave: "Sick Leave",
        standardAdditionsDeadline: standardAdditionsDeadline,
        clientOnFasterReimbursement: clientOnFasterReimbursement,
        standardAllowancesOffered: standardAllowancesOffered,
        standardBonusesOffered: standardBonusesOffered,
        notes: notes
      }
    })
  }

  /********** delete operating country **********/
  function deleteOperatingCountry() {
    DeleteOperatingCountry({
      variables: {
        id: country?.id
      }
    })
  }

  const [DeleteOperatingCountry] = useMutation(DELETE_OPERATING_COUNTRY_QUERY, {
    update(cache, { data: { deleteOperatingCountry } }) {
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
            operatingCountries: data.clientProfile.operatingCountries.filter((operatingCountry) => {
              return operatingCountry.id !== deleteOperatingCountry.id
            })
          }
        }
      })
    }
  })
  /********** delete operating country **********/

  return (
    <div>
      <DivCountryName>{countryName}</DivCountryName>
      <DivOperatingCountryInfo>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={probationaryPeriodLength}
            label='Probationary Period Length'
            onBlur={updateOperatingCountry}
            onChange={setProbationaryPeriodLength} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={noticePeriodLength}
            label='Notice Period Length'
            onBlur={updateOperatingCountry}
            onChange={setNoticePeriodLength} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={privateMedicalInsurance}
            label='Private Medical Insurance'
            onBlur={updateOperatingCountry}
            onChange={setPrivateMedicalInsurance} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={otherInsuranceOffered}
            label='Other Insurance Offered'
            onBlur={updateOperatingCountry}
            onChange={setOtherInsuranceOffered} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={annualLeave}
            label='Annual Leave'
            onBlur={updateOperatingCountry}
            onChange={setAnnualLeave} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.SELECT}
            value={0}
            options={[{ label: sickLeave, value: 0 }]}
            label='Sick Leave'
            onChange={setSickLeave} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={standardAdditionsDeadline}
            label='Standard Additions Deadline'
            onBlur={updateOperatingCountry}
            onChange={setStandardAdditionsDeadline} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.SELECT}
            value={clientOnFasterReimbursement}
            label='Client on Faster Reimbursement'
            options={[{ label: 'No', value: false }, { label: 'Yes', value: true }]}
            onBlur={updateOperatingCountry}
            onChange={setClientOnFasterReimbursement} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={standardAllowancesOffered}
            label='Standard Allowances Offered'
            onBlur={updateOperatingCountry}
            onChange={setStandardAllowancesOffered} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={standardBonusesOffered}
            label='Standard Bonuses Offered'
            onBlur={updateOperatingCountry}
            onChange={setStandardBonusesOffered} />
        </DivOperatingCountryInfoItem>
      </DivOperatingCountryInfo>
      <VgInput
        type='textarea'
        value={notes}
        rows='6'
        label='Notes for this Country of Operation'
        onBlur={updateOperatingCountry}
        onChange={setNotes} />
      <DivFooter>
        <ARemoveCountry onClick={() => showModal(modalConstants.CONFIRMATION_MODAL, {
          title: 'Confirm Deletion',
          message: 'Are you sure you want to delete this email record?',
          onSubmit: () => deleteOperatingCountry()
        })}>Remove as Operating Country</ARemoveCountry>
      </DivFooter>
    </div>
  )
}