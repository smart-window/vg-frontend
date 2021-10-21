import React, { useState } from 'react'
import { DivContentBlock, DivContentBody, DivContentHeader } from './ClientInformation.styles'
import expandArrowIcon from 'assets/images/icons/expandArrow.svg'
import { DivAddCountry, DivAddIcon, DivFooter, ImgExpandIndicator } from './OperatingCountryInfo.styles'
import OperatingCountryRecord from './OperatingCountryRecord'
import AddNewOperatingCountryRecord from './AddNewOperatingCountryRecord'
import { DivNoRecords } from '../ClientStory/ClientStory.styles'

export default function OperatingCountryInfo(props) {
  const countries = props.records;
  const [expanded, setExpanded] = useState(false)
  const [addNewOperatingCountryRecord, setAddOperatingCountryRecord] = useState(false)

  return (
    <DivContentBlock>
      <DivContentHeader onClick={() => setExpanded(!expanded)}>
        Operating Country Information
        <ImgExpandIndicator src={expandArrowIcon} alt='expand' expanded={expanded} />
      </DivContentHeader>
      <DivContentBody expanded={expanded}>
        {countries.length === 0 && <DivNoRecords>No Operating Countries have been added yet.</DivNoRecords>}
        {countries.map(record => <OperatingCountryRecord key={record.id} record={record} />)}
        {addNewOperatingCountryRecord && <AddNewOperatingCountryRecord onAdded={() => setAddOperatingCountryRecord(false)} onCancel={() => setAddOperatingCountryRecord(false)} />}
        {!addNewOperatingCountryRecord &&
          <DivFooter>
            <DivAddCountry onClick={() => setAddOperatingCountryRecord(true)}>
              <DivAddIcon>+</DivAddIcon>
            Add Operating Country
          </DivAddCountry>
          </DivFooter>}
      </DivContentBody>
    </DivContentBlock>
  )
}