import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { waitFor, render, screen, fireEvent, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { getClientStoryMockData } from 'test/mockData/clientStoryMock'
import ClientStory from 'web/pages/CompanyProfile/components/ClientStory/ClientStory'

jest.mock('/web/modules/Grid/hooks/usePageSize', () => () => 5)

window.gtag = () => { }

const Wrapper = ({ children }) => (
  <MemoryRouter initialEntries={['/companies/client/1/client-story']}>
    <MockedProvider mocks={getClientStoryMockData()} addTypename={false}>
      <Route path='/companies/:tab(client|partner)/:id/client-story'>{children}</Route>
    </MockedProvider>
  </MemoryRouter>
)

describe('Client Story', () => {

  it('Populates correct form values from the server', async () => {

    render(
      <Wrapper>
        <ClientStory />
      </Wrapper>
    )

    await waitFor(() => {
      expect(screen.getByDisplayValue('Task discussion.')).toBeDefined()
    })

  })

})