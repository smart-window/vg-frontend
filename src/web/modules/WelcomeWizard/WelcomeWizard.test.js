import React from 'react'
import {render, waitFor, fireEvent} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import StorageConstants from 'shared/constants/storageConstants'
import '@testing-library/jest-dom/extend-expect'
import 'test/mocks/react-google-maps.mock.js'
import {MockedProvider} from '@apollo/client/testing'
import WelcomeWizard from './WelcomeWizard'
import {getEewwFormMockData} from 'test/mockData/formsMock'
import {colors} from 'shared/constants/cssConstants'

describe('TimeTracking', () => {
  let mocks

  beforeEach(() => {
    mocks = getEewwFormMockData()
  })

  it('Renders user\'s preferred first name', async () => {
    await act(async () => {
      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <WelcomeWizard />
        </MockedProvider>
      )

      await waitFor(() => {
        expect(getByText('Welcome to Velocity Global, PreferredName!')).toBeDefined()
      })
    })
  })

  it('Populates form field values from the server', async () => {
    await act(async () => {
      const { getByLabelText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <WelcomeWizard />
        </MockedProvider>
      )

      await waitFor(() => {
        const lastNameInput = getByLabelText('Legal Last Name')
        expect(lastNameInput.value).toEqual('Lastname')
      })
    })
  })

  it('Populates an address form field correctly from the server', async () => {
    await act(async () => {
      const { getByLabelText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <WelcomeWizard />
        </MockedProvider>
      )

      await waitFor(() => {
        const addressInput = getByLabelText('Work Address')
        expect(addressInput.value).toEqual('Khalifa Bin Zayed St - Al Zahiyah - Abu Dhabi - United Arab Emirates')
      })
    })
  })

  it('changes EEWW pages correctly', async () => {
    await act(async () => {
      const { getByText, queryByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <WelcomeWizard />
        </MockedProvider>
      )

      await waitFor(() => {
        const nextButton = getByText('Next')
        const backButton = queryByText('Back')
        expect(backButton).toBeNull()
        fireEvent.click(nextButton)
      })

      await waitFor(() => {
        // now on page 2
        const page2Subheading = getByText('PERSONAL INFORMATION')
        expect(page2Subheading).toBeDefined()

        const backButton = getByText('Back')
        fireEvent.click(backButton)
      })

      await waitFor(() => {
        // back to page 1
        const page1Heading = getByText('Please ensure the following information is correct:')
        expect(page1Heading).toBeDefined()
        const backButton = queryByText('Back')
        expect(backButton).toBeNull()
      })
    })
  })

  it('validates that a form is complete', async () => {
    // current page is driven by localStorage
    localStorage.setItem(StorageConstants.EEWW_PAGE_NUMBER, 2)
    await act(async () => {
      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <WelcomeWizard />
        </MockedProvider>
      )

      await waitFor(() => {
        // Check for completed text styles
        const page2Subheading = getByText('PERSONAL INFORMATION')
        expect(page2Subheading).toHaveStyle(`color: ${colors.successGreen}`)
      })
    })
  })

  it('has the correct sections on page 3', async () => {
    // current page is driven by localStorage
    localStorage.setItem(StorageConstants.EEWW_PAGE_NUMBER, 3)
    await act(async() => {
      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <WelcomeWizard />
        </MockedProvider>
      )

      await waitFor(() => {
        expect(getByText('UPLOAD THE FOLLOWING DOCUMENTS')).toBeDefined()
        expect(getByText('DOWNLOAD THESE DOCUMENTS FOR YOUR RECORDS')).toBeDefined()
      })
    })
  })

  it('has the correct documents and their statuses on page 3', async () => {
    // current page is driven by localStorage
    localStorage.setItem(StorageConstants.EEWW_PAGE_NUMBER, 3)
    await act(async() => {
      const { getByText, getAllByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <WelcomeWizard />
        </MockedProvider>
      )

      await waitFor(() => {
        expect(getByText('document-download-test')).toBeDefined()
        expect(getByText('image-download-test')).toBeDefined()
        expect(getByText('image-upload-test')).toBeDefined()
        expect(getByText('image-download-upload-test')).toBeDefined()
        const fileUploadedIndicators = getAllByText('Uploaded')
        expect(fileUploadedIndicators.length).toEqual(1)
        const fileDownloadedIndicators = getAllByText('Need to download again?')
        expect(fileDownloadedIndicators.length).toEqual(1)
      })
    })
  })

  it('has the correct sections on page 4', async () => {
    // current page is driven by localStorage
    localStorage.setItem(StorageConstants.EEWW_PAGE_NUMBER, 4)
    await act(async() => {
      const { getByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <WelcomeWizard />
        </MockedProvider>
      )

      await waitFor(() => {
        const page4Heading = getByText('Last Step! Please sign your contract, below:')
        expect(page4Heading).toBeDefined()
      })
    })
  })

  it('has the correct sections on page 5 with a Done button and no Back button', async () => {
    // current page is driven by localStorage
    localStorage.setItem(StorageConstants.EEWW_PAGE_NUMBER, 5)
    await act(async() => {
      const { getByText, queryByText } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <WelcomeWizard />
        </MockedProvider>
      )

      await waitFor(() => {
        const page5Heading = getByText('You’re all set! We are thrilled to have you aboard.')
        expect(page5Heading).toBeDefined()
        expect(queryByText('Back')).toBeNull()
        expect(getByText('Done')).toBeDefined()
      })
    })
  })
})
