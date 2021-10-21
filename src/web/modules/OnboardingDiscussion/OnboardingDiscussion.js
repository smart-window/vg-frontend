import { gql, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import DiscussionFilter from './DiscussionFilter/DiscussionFilter'
import OnboardingComment from './OnboardingComment/OnboardingComment'
import {
  DivCommentsContainer,
  DivDiscussionHeader,
  DivOnboardingDiscussionContainer,
  DivSeeMoreComments,
  DivComments,
} from './OnboardingDiscussion.styles'
import OnboardingPostComment from './OnboardingPostComment/OnboardingPostComment'

export const ONBOARDING_COMMENTS_QUERY = gql`
  query OnboardingComments($id: ID!) {
    task(id: $id) {
      id
      status
      name
      stage {
        name
      }
      taskComments {
        id
        user {
          id
          firstName
          lastName
        }
        comment
        visibilityType
        insertedAt
      }
    }
  }
`
OnboardingDiscussion.props = {
  /** the id of a task in which onboarding discussion should be pulled from */
  taskId: PropTypes.number,
}

/**
 * Renders the onboarding discussion that users have left in the scope of the task
 * @category Components - Web
 * @namespace OnboardingDiscussion
 */
export default function OnboardingDiscussion({ taskId }) {
  const { data, loading } = useQuery(ONBOARDING_COMMENTS_QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: parseInt(taskId),
    },
  })
  const [comments, setComments] = useState([])
  const [visibilities, setVisibilities] = useState('')
  const [searchStr, setSearchStr] = useState('')

  useEffect(() => {
    if (!loading && data) {
      setComments(data.task.taskComments)
    }
  }, [data, loading])

  const onSearchChange = (search) => {
    setSearchStr(search)
  }

  const onFilterChange = (filter) => {
    const i = filter.findIndex((item) => item.name === 'visibilities')
    if (i >= 0) {
      setVisibilities(filter[i].value)
    }
    else {
      setVisibilities('')
    }
  }

  return (
    <DivOnboardingDiscussionContainer>
      <DivDiscussionHeader>
        <h3>
          Onboarding Discussion <span>({comments.length})</span>
        </h3>
        <DiscussionFilter
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
        />
      </DivDiscussionHeader>
      {comments.length > 0 && (
        <DivCommentsContainer>
          <DivSeeMoreComments>See More Comments</DivSeeMoreComments>
          <DivComments>
            {comments
              .filter((item) => {
                if (
                  searchStr &&
                  !item.comment.toLowerCase().includes(searchStr.toLowerCase())
                ) {
                  return false
                }
                if (
                  visibilities &&
                  !visibilities.includes(item.visibilityType)
                ) {
                  return false
                }
                return true
              })
              .map((item, id) => (
                <OnboardingComment
                  comment={item}
                  stageName={data?.task?.stage?.name || ''}
                  key={id}
                  onDeleted={(deletedId) =>
                    setComments(
                      comments.filter((comment) => comment.id !== deletedId)
                    )
                  }
                />
              ))}
          </DivComments>
        </DivCommentsContainer>
      )}
      <OnboardingPostComment taskId={taskId} taskName={data?.task?.name || ''} />
    </DivOnboardingDiscussionContainer>
  )
}
