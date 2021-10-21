import { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import styled from 'styled-components'
import {
  DivCountryName,
  DivOperatingCountryInfo,
  DivOperatingCountryInfoItem,
} from './OperatingCountryInfo.styles'
import analyticsService from 'web/services/analyticsService'
import { AddButton } from '../ClientStory/ClientStory.styles'
import { ImgTrashIcon } from '../ClientStory/MeetingRecord.styles'
import VgInput from 'web/modules/VgInput/VgInput'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import { CLIENT_COMPANY_QUERY } from './ClientInformation';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import closeIcon from 'assets/images/icons/closeIcon.svg'

export const UPSERT_OPERATING_COUNTRY_QUERY = gql`
  mutation UpsertOperatingCountry (
    $clientId:ID
    $countryId:ID
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

export const FILTER_OPTIONS_QUERY = gql`
  query {
    countries {
      id
      name
    }
  }
`

export default function AddNewOperatingCountryRecord({ onAdded, onCancel }) {
  const [countryName, setCountryName] = useState(null)
  const [probationaryPeriodLength, setProbationaryPeriodLength] = useState(null)
  const [noticePeriodLength, setNoticePeriodLength] = useState(null)
  const [privateMedicalInsurance, setPrivateMedicalInsurance] = useState(null)
  const [otherInsuranceOffered, setOtherInsuranceOffered] = useState(null)
  const [annualLeave, setAnnualLeave] = useState(null)
  const [sickLeave, setSickLeave] = useState(null)
  const [standardAdditionsDeadline, setStandardAdditionsDeadline] = useState(null)
  const [clientOnFasterReimbursement, setClientOnFasterReimbursement] = useState(false)
  const [standardAllowancesOffered, setStandardAllowancesOffered] = useState(null)
  const [standardBonusesOffered, setStandardBonusesOffered] = useState(null)
  const [notes, setNotes] = useState(null)
  const [selectedCountries, setSelectedCountries] = useState([])
  const [operatingCountry, setOperatingCountry] = useState(null)

  const { id: companyId } = useParams()
  const [AddNewOperatingCountry] = useMutation(UPSERT_OPERATING_COUNTRY_QUERY, {
    onCompleted: onAdded,
    onError: (error) => alert("You cannot add the same country!"),
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
            operatingCountries: [...data.clientProfile.operatingCountries, upsertOperatingCountry]
          }
        }
      })
    }
  })

  const { data } = useQuery(FILTER_OPTIONS_QUERY)
  let countriesForFilter = []
  if (data) {
    // map to expected format for <CountriesSelectComboBox>
    countriesForFilter = data.countries.map((country) => ({
      value: country.id,
      label: country.name
    }))
  }

  function addNewOperatingCountry() {
    AddNewOperatingCountry({
      variables: {
        clientId: companyId,
        countryId: operatingCountry,
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


  function getFiltersForApi({
    countries = selectedCountries
  }) {
    const filters = []
    if (countries.length) {
      const selectedCountryIds = countries.map((c) => c.id).join(',')
      filters.push({
        name: 'country_id',
        value: selectedCountryIds,
      })
    }
    return filters
  }

  /**
 * Handles a change to the countries filter.
 * @param {string} newCountries - the new countries on which to filter
 * @param {object} addedCountry - the country added to filter, null if country removed
 */
  function handleCountriesChange(newCountries, addedCountry) {
    setSelectedCountries(newCountries)
    const updatedFilters = getFiltersForApi({ countries: newCountries })
    // onFilterChange(updatedFilters)
    if (addedCountry)
      analyticsService.logEvent(
        'EE Client Companies',
        'Clicked',
        'FilterAdded_Country'
      )
  }

  return (
    <div>
      <DivCountryName>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.SELECT}
            value={operatingCountry}
            options={countriesForFilter}
            label='Operating Country'
            onChange={setOperatingCountry} />
        </DivOperatingCountryInfoItem>
      </DivCountryName>
      <DivOperatingCountryInfo>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={probationaryPeriodLength}
            label='Probationary Period Length'
            onChange={setProbationaryPeriodLength} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={noticePeriodLength}
            label='Notice Period Length'
            onChange={setNoticePeriodLength} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={privateMedicalInsurance}
            label='Private Medical Insurance'
            onChange={setPrivateMedicalInsurance} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={otherInsuranceOffered}
            label='Other Insurance Offered'
            onChange={setOtherInsuranceOffered} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={annualLeave}
            label='Annual Leave'
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
            onChange={setStandardAdditionsDeadline} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.SELECT}
            value={clientOnFasterReimbursement}
            label='Client on Faster Reimbursement'
            options={[{ label: 'No', value: false }, { label: 'Yes', value: true }]}
            onChange={setClientOnFasterReimbursement} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={standardAllowancesOffered}
            label='Standard Allowances Offered'
            onChange={setStandardAllowancesOffered} />
        </DivOperatingCountryInfoItem>
        <DivOperatingCountryInfoItem>
          <VgInput
            type={InputTypes.TEXT}
            value={standardBonusesOffered}
            label='Standard Bonuses Offered'
            onChange={setStandardBonusesOffered} />
        </DivOperatingCountryInfoItem>
      </DivOperatingCountryInfo>
      <VgInput
        type='textarea'
        value={notes}
        rows='6'
        label='Notes for this Country of Operation'
        onChange={setNotes} />
      {/* <DivFooter> */}
        <DivNewOperatingCountryFooter>
          <AddButton text='Add' isActive={true} onClick={addNewOperatingCountry} />
          <ImgTrashIcon src={closeIcon} alt='remove-item' onClick={onCancel} />
        </DivNewOperatingCountryFooter>
      {/* </DivFooter> */}
    </div>
  )
}

export const DivNewOperatingCountryFooter = styled.div`
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  margin-bottom:30px;
  position: relative;
  width: 150px;
  float: right;
  align-items: center;
  display: flex;
`