import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { waitFor, render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { getClientInformationMockData } from 'test/mockData/clientInformationMock'
import ClientInformation from 'web/pages/CompanyProfile/components/ClientInformation/ClientInformation'

jest.mock('/web/modules/Grid/hooks/usePageSize', () => () => 5)

window.gtag = () => { }

const Wrapper = ({ children }) => (
  <MemoryRouter initialEntries={['/companies/client/1/client-info']}>
    <MockedProvider mocks={getClientInformationMockData()} addTypename={false}>
      <Route path='/companies/:tab(client|partner)/:id/client-info'>{children}</Route>
    </MockedProvider>
  </MemoryRouter>
)

describe('Client Information', () => {

  it('Populates correct form values from the server', async () => {

    render(
      <Wrapper>
        <ClientInformation />
      </Wrapper>
    )

    await waitFor(() => {
      expect(screen.getByDisplayValue('Client 1')).toBeDefined()
      expect(screen.getByDisplayValue('Pierce')).toBeDefined()
    })

  })

})