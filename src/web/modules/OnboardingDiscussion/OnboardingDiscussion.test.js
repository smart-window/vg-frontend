import React from 'react'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import OnboardingDiscussion from './OnboardingDiscussion'
import { discussionMock } from 'test/mockData/discussionMock'
import { visibilityTypes, visibilityTypeToLabel } from 'shared/constants/visibilityConstants'

describe('OnboardingDiscussion', () => {
  it('displays onboarding discussion', async () => {
    render(
      <MockedProvider mocks={[discussionMock()]} addTypename={false}>
        <OnboardingDiscussion taskId={4}/>
      </MockedProvider>
    )

    await screen.findAllByText('Mike Newman')
    screen.findByText('this is my last comment')
    screen.findAllByText(visibilityTypeToLabel[visibilityTypes.INTERNAL_USERS_ONLY])
  })

  it('displays the filter', async () => {
    render(
      <MockedProvider mocks={[discussionMock()]} addTypename={false}>
        <OnboardingDiscussion taskId={4}/>
      </MockedProvider>
    )
    await screen.getByText('FILTERS')
  })
})
