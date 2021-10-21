
import React from 'react'
import { render } from '@testing-library/react'
import EmployeeContract from './EmployeeContract'
import 'test/mocks/google-window-object.mock.js'

const mockEmployment = {
  job: {
  },
  country: {
    id: '47',
    name: 'Tatooine',
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

const mockWorkForm = {
  id: '339',
  slug: 'eeprofile-work-info',
  __typename: 'Form',
  formFields: [
    {
      config: {label: 'Coefficient', order: 4},
      id: '3677',
      optional: false,
      slug: 'coefficient',
      sourceTableField: 'country_specific_fields.coefficient',
      type: 'number',
      value: '1',
      __typename: 'FormField'
    }
  ]
}

const mockCountries = [
  {
    id: '47',
    iso_alpha_2_code: 'CO',
    name: 'Colombia',
    __typename: 'Country'
  }
]

it('Populates correct form values from the employments and the form fields tables', () => {
  const {getByLabelText} = render(
    <EmployeeContract
      employment={mockEmployment}
      countries={mockCountries}
      workForm={mockWorkForm}
    />
  )

  const lastNameInput = getByLabelText('Client Company')
  expect(lastNameInput.value).toEqual('The Rebel Alliance')
  const workAddressInput = getByLabelText('Coefficient')
  expect(workAddressInput.value).toEqual('1')
})