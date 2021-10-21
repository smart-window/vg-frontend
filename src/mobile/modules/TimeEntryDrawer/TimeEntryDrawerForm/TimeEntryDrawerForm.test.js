import 'react-native'
import React from 'react'
import TimeEntryDrawerForm from './TimeEntryDrawerForm.js'
import {render} from '@testing-library/react-native'
import {timeTypesData} from 'test/mockData/timeEntriesMock'

describe('TimeEntryDrawerForm', () => {
  const timeTypes = timeTypesData
  const collapseDrawer = jest.fn()
  const submitTimeEntry = jest.fn()
  const totalHours = ''
  const setTotalHours = jest.fn()
  const description = ''
  const setDescription = jest.fn()
  const selectedTimeType = timeTypesData[0]
  const setSelectedTimeType = jest.fn()
  const setDate = jest.fn()

  it('Renders an add form for the time entry drawer', () => {
    const { getByText } = render(
      <TimeEntryDrawerForm
        timeTypes={timeTypes}
        date={new Date()}
        collapseDrawer={collapseDrawer}
        submitTimeEntry={submitTimeEntry}
        totalHours={totalHours}
        setTotalHours={setTotalHours}
        description={description}
        setDescription={setDescription}
        selectedTimeType={selectedTimeType}
        setSelectedTimeType={setSelectedTimeType}
        setDate={setDate}
      />
    )

    expect(getByText('Work Time')).toBeDefined()
    expect(getByText('Submit Entry')).toBeDefined()
  })

  it('Renders an edit form for the time entry drawer', () => {
    const timeEntryForEdit = {
      __typename: 'TimeEntry',
      description: 'It’s Christmas!!',
      eventDate: '2020-12-25',
      id: '52',
      timePolicyId: '1',
      timeType: {
        __typename: 'TimeType',
        id: '3',
        slug: 'planned absence',
      },
      timeTypeId: '3',
      totalHours: 8,
      userId: '6',
    }

    const { getByText } = render(
      <TimeEntryDrawerForm
        timeTypes={timeTypes}
        date={new Date()}
        collapseDrawer={collapseDrawer}
        submitTimeEntry={submitTimeEntry}
        totalHours={totalHours}
        setTotalHours={setTotalHours}
        description={description}
        setDescription={setDescription}
        selectedTimeType={selectedTimeType}
        setSelectedTimeType={setSelectedTimeType}
        timeEntryForEdit={timeEntryForEdit}
        setDate={setDate}
      />
    )

    expect(getByText('Work Time')).toBeDefined()
    expect(getByText('Save Changes')).toBeDefined()
  })
})