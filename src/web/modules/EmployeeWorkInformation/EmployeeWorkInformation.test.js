
import React from 'react'
import { waitFor, render } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import {getProfileWorkInfoMockData} from 'test/mockData/formsMock.js'
import EmployeeWorkInformation from './EmployeeWorkInformation'
import 'test/mocks/google-window-object.mock.js'

jest.mock('web/components/PegaContainer/PegaContainer', () => () => (<div/>))

const mockEmployee = {
  id: 123,
  pekaAk: 'foobar',
  user: {
    id: 234,
    fullName: 'Luke Skywalker',
    firstName: 'Luke',
    lastName: 'Skywalker'
  },
  employments: [
    {
      job: {
      },
      country: {
        name: 'Tatooine'
      },
      effectiveDate: '2012-11-11',
      contract: {
        uuid: '1231-aaa-bbb',
        id: 123,
        client: {
          name: 'The Rebel Alliance'
        }
      }
    }
  ]
}

it('Populates correct form values from the employments and the server', async () => {
  const {getByLabelText, getByText} = render(
    <MockedProvider addTypename={false} mocks={getProfileWorkInfoMockData()}>
      <EmployeeWorkInformation employee={mockEmployee} />
    </MockedProvider>,
  )

  await waitFor(() => {
    expect(getByText('EMPLOYMENT CONTRACT 1231-aaa-bbb')).toBeDefined()
    const lastNameInput = getByLabelText('Client Company')
    expect(lastNameInput.value).toEqual('The Rebel Alliance')
    const workAddressInput = getByLabelText('Work Address')
    expect(workAddressInput.value).toEqual(`58 Rue d'Argout, 75002 Paris, France`)
  })
})