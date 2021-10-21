import { ONBOARDING_COMMENTS_QUERY } from 'web/modules/OnboardingDiscussion/OnboardingDiscussion'
import { POST_COMMENT_MUTATION } from 'web/modules/OnboardingDiscussion/OnboardingPostComment/OnboardingPostComment'

export const discussionMock = () => ({
  request: {
    query: ONBOARDING_COMMENTS_QUERY,
    variables: {
      id: 4,
    },
  },
  result: {
    data: {
      task: {
        __typename: 'Task',
        id: '4',
        name: 'Do the the thing',
        stage: { __typename: 'Stage', name: 'Do the the thing' },
        status: 'not_started',
        taskComments: [
          {
            __typename: 'TaskComment',
            comment: 'this is my last comment',
            id: '30',
            insertedAt: '2021-04-23 15:33:29',
            user: {
              __typename: 'User',
              firstName: 'Mike',
              id: '208',
              lastName: 'Newman',
            },
            visibilityType: 'internal_only',
          },
          {
            __typename: 'TaskComment',
            comment: 'hi',
            id: '31',
            insertedAt: '2021-04-23 16:19:44',
            user: {
              __typename: 'User',
              firstName: 'Mike1',
              id: '208',
              lastName: 'Newman',
            },
            visibilityType: 'internal_only',
          },
          {
            __typename: 'TaskComment',
            comment: 'hi',
            id: '32',
            insertedAt: '2021-04-29 00:19:06',
            user: {
              __typename: 'User',
              firstName: 'Mike2',
              id: '208',
              lastName: 'Newman',
            },
            visibilityType: 'internal_only',
          },
        ],
      },
    },
  },
})

export const commentMock = () => ({
  comment: 'this is my last comment',
  id: '30',
  insertedAt: '2021-04-23 15:33:29',
  user: {
    __typename: 'User',
    firstName: 'Mike',
    id: '208',
    lastName: 'Newman',
  },
  visibilityType: 'internal_only',
})

export const postCommentMock = () => ({
  request: {
    query: POST_COMMENT_MUTATION,
    variables: {
      id: 30,
    },
  },
  result: {
    data: {
      task: {
        __typename: 'Task',
        id: '4',
        name: 'Do the the thing',
        stage: { __typename: 'Stage', name: 'Do the the thing' },
        status: 'not_started',
        taskComments: [
          {
            __typename: 'TaskComment',
            comment: 'hi',
            id: '31',
            insertedAt: '2021-04-23 16:19:44',
            user: {
              __typename: 'User',
              firstName: 'Mike',
              id: '208',
              lastName: 'Newman',
            },
            visibilityType: 'internal_only',
          },
          {
            __typename: 'TaskComment',
            comment: 'hi',
            id: '32',
            insertedAt: '2021-04-29 00:19:06',
            user: {
              __typename: 'User',
              firstName: 'Mike',
              id: '208',
              lastName: 'Newman',
            },
            visibilityType: 'internal_only',
          },
          {
            __typename: 'TaskComment',
            comment: 'hello',
            id: '33',
            insertedAt: '2021-05-03 08:45:27',
            user: {
              __typename: 'User',
              firstName: 'Mike',
              id: '208',
              lastName: 'Newman',
            },
            visibilityType: 'internal_only',
          },
        ],
      },
    },
  },
})
