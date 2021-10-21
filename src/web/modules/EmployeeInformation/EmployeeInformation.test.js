
import React from 'react'
import { waitFor, render, fireEvent, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import {getProfileFormMockData} from 'test/mockData/formsMock.js'
import { GlobalModalProvider } from 'shared/providers/GlobalModalProvider'
import GlobalModal from 'web/components/modals/GlobalModal/GlobalModal'
import EmployeeInformation from './EmployeeInformation'
import 'test/mocks/google-window-object.mock.js'
import exportConstants from 'shared/constants/exportConstants'

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
        client: {
          name: 'The Rebel Alliance'
        }
      },
      country: {
        name: 'Tatooine'
      },
    }
  ]
}

it('Populates correct form values from the server', async () => {
  const {getByLabelText} = render(
    <MockedProvider addTypename={false} mocks={getProfileFormMockData()}>
      <EmployeeInformation employee={mockEmployee} />
    </MockedProvider>,
  )

  await waitFor(() => {
    const lastNameInput = getByLabelText('Legal Last Name')
    const registroInput = getByLabelText('R.G. Nº')
    expect(lastNameInput.value).toEqual('Skywalker')
    expect(registroInput.value).toEqual('registro numero uno')
  })
})

it('Doesn\'t update business email without confirmation', () => {

  const {getByLabelText, getByText} = render(
    <MockedProvider addTypename={false} mocks={getProfileFormMockData()}>
      <GlobalModalProvider>
        <GlobalModal/>
        <EmployeeInformation employee={mockEmployee} />
      </GlobalModalProvider>
    </MockedProvider>,
  )

  act(async () => {
    await waitFor(() => {
      const lastNameInput = getByLabelText('Business Email Address')
      fireEvent.change(lastNameInput, { target: { value: 'test@business.email' } })
      fireEvent.blur(lastNameInput)
    })

    await waitFor(() => {
      const confirmationModalText = getByText('Confirm Data Changes')
      expect(confirmationModalText.toBeDefined())
    })
  })

})
it('Renders the download link', async () => {
  const {getByText, getByTestId} = render(
    <MockedProvider addTypename={false} mocks={getProfileFormMockData()}>
      <EmployeeInformation employee={mockEmployee} />
    </MockedProvider>,
  )
  await waitFor(async () => {
    const downloadProfile = getByText('Download Profile')
    expect(downloadProfile).toBeDefined()
    fireEvent.click(downloadProfile)
    const downloadProfileTag = await getByTestId('profile-download-tag')
    // ignore the host as env is not properly set for testing it appears
    let href = downloadProfileTag.href
    href = href.substring(href.indexOf(exportConstants.FORM_FIELD_VALUES_EXPORT_URL))
    expect(href).toEqual(exportConstants.FORM_FIELD_VALUES_EXPORT_URL + '?form_slugs=eeprofile-personal-info,eeprofile-contact-info,eeww-bank-info,eeww-work-info,eeww-identification-info,eeww-other-info&user_id=234&csv_delimiter=,&filename=Skywalker_Luke_The%20Rebel%20Alliance_Tatooine.csv&token=')
  })
})
