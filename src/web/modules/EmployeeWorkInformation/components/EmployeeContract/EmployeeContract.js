import React, {useRef, useState, useContext} from 'react'
import PropTypes from 'prop-types'
import {GlobalModalContext} from 'shared/providers/GlobalModalProvider'

import Grid from 'web/modules/Grid/Grid'
import EmployeeWorkInfoForm from '../EmployeeWorkInfoForm/EmployeeWorkInfoForm'
import DynamicFormFields from 'web/components/DynamicFormFields/DynamicFormFields'
import SectionHeading from 'web/modules/WelcomeWizard/components/SectionHeading/SectionHeading'
import VgInput from 'web/modules/VgInput/VgInput'
import VgCheckbox from 'web/components/VgCheckbox/VgCheckbox'

import usePageSize from 'web/modules/Grid/hooks/usePageSize'
import modalConstants from 'mobile/constants/modalConstants'
import dateHelper from 'shared/services/dateHelper'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import {employmentTypes, employmentTypesToLabels, terminationReasons, terminationSubReasons} from 'web/constants/employmentConstants'
import {
  ArticleContract,
  DivClientTeamWrapper,
  HrSeparator,
  DivLeaveWrapper,
  DivLeaveInputs,
  DivCheckboxWrapper
} from './EmployeeContract.styles'

EmployeeContract.propTypes = {
  /** employment record from server, needs embedded data from employmentFragment */
  employment: PropTypes.object.isRequired,
  /** List of countries from the server, used to for address fields */
  countries: PropTypes.arrayOf(PropTypes.object),
  /** Fetched form with form fields for user's work address and CSF */
  workForm: PropTypes.object.isRequired
}

const months = [
  {label: 'None', value: 0},
  {label: 'January', value: 1},
  {label: 'February', value: 2},
  {label: 'March', value: 3},
  {label: 'April', value: 4},
  {label: 'May', value: 5},
  {label: 'June', value: 6},
  {label: 'July', value: 7},
  {label: 'August', value: 8},
  {label: 'September', value: 9},
  {label: 'October', value: 10},
  {label: 'November', value: 11},
  {label: 'December', value: 12},
]

const employmentTypeOptions = Object.keys(employmentTypes).map(type => {
  return {label: employmentTypesToLabels[employmentTypes[type]], value: type}
})

const clientTeamGridColumnConfig = [
  {fieldName: 'name', title: 'Name', columnWidth: '30%', sortable: false},
  {fieldName: 'title', title: 'Title', columnWidth: '30%', sortable: false},
  {fieldName: 'roles', title: 'Roles', columnWidth: '30%', sortable: false},
]

const mockTeamData = [
  {name: 'Pikachu', title: 'Electric', roles: 'Starter'},
  {name: 'Gyradose', title: 'Dragon', roles: 'Starter'},
  {name: 'Bulbasaur', title: 'Grass', roles: 'Starter'},
  {name: 'Quagsire', title: 'Water', roles: 'Starter'},
  {name: 'Gengar', title: 'Ghost', roles: 'Starter'},
  {name: 'Latios', title: 'Dragon', roles: 'Starter'},
  {name: 'Alteria', title: 'Dragon Flying', roles: 'Starter'},
  {name: 'Gardevoir', title: 'Psychic', roles: 'Backup'},
  {name: 'Lapras', title: 'Dragon Water', roles: 'Backup'},
]

const formattedTerminationReasons = Object.keys(terminationReasons).map(reason => {
  return { label: terminationReasons[reason], value: reason}
})

/**
 * Information around employees contract
 * @category Components - Web
 * @namespace EmployeeContract
 */
export default function EmployeeContract({employment, countries, workForm}) {
  const gridRef = useRef()
  const [terminationReason, setTerminationReason] = useState(formattedTerminationReasons[0].value)
  const [terminationSubReason, setTerminationSubReason] = useState('NONE')
  const [onTemporaryLeave, setOnTemporaryLeave] = useState(false)
  const {showModal} = useContext(GlobalModalContext)
  const employmentFormFields = formatEmploymentForFields(employment)
  const terminationReasonKey = terminationReasons[terminationReason]
  const formattedSubReasons = Object.keys(terminationSubReasons[terminationReasonKey]).map(subreason => {
    return {
      label: terminationSubReasons[terminationReasonKey][subreason],
      value: subreason
    }
  })

  let pageSize = usePageSize(gridRef)
  if (!pageSize) {
    // this seems to avoid the sporadic "Data not found" condition
    // even when data exists
    pageSize = 5
  }

  /** Show confirmation modal on temporary leave selection */
  function handleTempLeaveSelection() {
    if (!onTemporaryLeave) {
      showModal(modalConstants.CONFIRMATION_MODAL, {
        title: 'Confirm Selection',
        message: 'Are you sure you want to select On Temporary Leave?',
        submitButtonText: 'Yes',
        onSubmit: () => setOnTemporaryLeave(true)
      })
    }
    else {
      setOnTemporaryLeave(false)
    }
  }

  /**
   * Format work info fields for dynamic fields
   * @param {object} employment fetched employment object
   * @returns {array} array of work info formatted for dynamic fields
   */
  function formatEmploymentForFields(employment) {
    const countryOptions = countries.map(country => ({label: country.name, value: country.id}))
    const country = countries.find(country => country.id === employment.country?.id)
    const payroll13Month = months.findIndex(month => month.label.toLowerCase() === employment.contract?.payroll_13th_month)
    const payroll14Month = months.findIndex(month => month.label.toLowerCase() === employment.contract?.payroll_14th_month)
    const employmentFormFields = [
      {label: 'Contract Id', type: InputTypes.TEXT, value: employment.contract?.uuid, options: []},
      {label: 'Client Company', type: InputTypes.TEXT, value: employment.contract?.client?.name, options: [], readOnly: true},
      {label: 'Country of Employment', type: InputTypes.SELECT, value: country?.id || '', options: countryOptions},
      {label: 'Employment Type', type: InputTypes.SELECT, value: '', options: employmentTypeOptions},
      {label: 'Title', type: InputTypes.TEXT, value: '', options: []},
      {label: 'Start Date', type: InputTypes.DATE, value: dateHelper.convertAPIDateToDate(employment.effectiveDate), options: []},
      {label: 'Probationary Period Length', type: InputTypes.NUMBER, value: employment.job?.probationaryPeriodLength, options: []},
      {label: 'Probationary Period Term', type: InputTypes.TEXT, value: employment.job?.probationaryPeriodTerm, options: []},
      {label: '13th Payroll Month', type: InputTypes.SELECT, value: payroll13Month >= 0 ? payroll13Month : 0, options: months},
      {label: '14th Payroll Month', type: InputTypes.SELECT, value: payroll14Month >= 0 ? payroll14Month : 0, options: months},
    ]

    return employmentFormFields.map(field => {
      return getEmploymentFormField(field)
    })
  }

  /**
   * Creates formatted employment data replicating the form field data structure
   * @param {object} field static field with employment info
   * @returns object of formatted field
   */
  function getEmploymentFormField(field) {
    const { label, type, value, options, readOnly=false } = field
    return {
      config: {label, options},
      slug: label,
      type,
      value,
      readOnly
    }
  }

  return (
    <ArticleContract>
      <SectionHeading title={`EMPLOYMENT CONTRACT ${employment.contract?.uuid}`}/>
      <DynamicFormFields
        formFields={employmentFormFields}
      />
      {
        workForm?.formFields &&
        <EmployeeWorkInfoForm formFields={workForm?.formFields} countries={countries}/>
      }
      <HrSeparator/>
      <DivClientTeamWrapper>
        <h3>Client Manager Team</h3>
        <Grid
          containerRef={gridRef}
          columnConfig={clientTeamGridColumnConfig}
          defaultSortFieldname={'name'}
          hasSelectAll={false}
          onScrollEnd={() => {}}
          rowData={mockTeamData}
          selectedRows={new Set()}
        />
      </DivClientTeamWrapper>
      <DivLeaveWrapper>
        <SectionHeading title={`LEAVE AND TERMINATION`}/>
        <DivLeaveInputs>
          <VgInput
            isOptional={true}
            value={null}
            label='Termination Date'
            type={InputTypes.DATE}
          />
          <VgInput
            isOptional={true}
            value={terminationReason}
            label='Termination Reason'
            options={formattedTerminationReasons}
            type={InputTypes.SELECT}
            onChange={(value) => setTerminationReason(value)}
          />
          <VgInput
            isOptional={true}
            value={terminationSubReason}
            label='Termination Sub Reason'
            options={formattedSubReasons}
            type={InputTypes.SELECT}
            onChange={(value) => setTerminationSubReason(value)}
          />
          <DivCheckboxWrapper>
            <VgCheckbox checked={onTemporaryLeave} onChange={handleTempLeaveSelection} />
            <p>On Temporary Leave</p>
          </DivCheckboxWrapper>
        </DivLeaveInputs>
      </DivLeaveWrapper>
    </ArticleContract>
  )
}
