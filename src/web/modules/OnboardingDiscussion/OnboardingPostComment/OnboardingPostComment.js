import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  DivPostCommentFooter,
  DivPostCommentHeader,
  DivOnboardingPostCommentContainer,
  DivVisibility,
  DivPostCommentBody,
  DivPostButtonContainer,
  CommentPostButton,
  VisibilitySelector,
  DivSuggestionItem,
} from './OnboardingPostComment.styles'
import eyeIcon from '../../../../assets/images/icons/eye.svg'
import { MentionsInput, Mention } from 'react-mentions'
import { gql, useMutation, useQuery } from '@apollo/client'
import InputTypes from 'web/modules/VgInput/constants/InputTypes'
import { visibilityTypes, visibilityTypeToLabel } from 'shared/constants/visibilityConstants'

export const POST_COMMENT_MUTATION = gql`
  mutation AddComment(
    $taskId: Int!
    $comment: String!
    $visibilityType: String!
  ) {
    addTaskComment(
      taskId: $taskId
      comment: $comment
      visibilityType: $visibilityType
    ) {
      id
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

export const CSR_USERS_QUERY = gql`
  query {
    csr_users {
      id
      fullName
    }
  }
`

OnboardingPostComment.propTypes = {
  /** the id of a task in which users discuss */
  taskId: PropTypes.number,
  /** the name of a task in which users discuss */
  taskName: PropTypes.string
}

/**
 * Renders a component where users can enter a comment, select a group of people who can see the comment, and post it to the system.
 * @category Components - Web
 * @namespace OnboardingDiscussion
 */
export default function OnboardingPostComment({ taskId, taskName }) {
  const [comment, setComment] = useState('')
  const [visibilityType, setVisibilityType] = useState(visibilityTypes.INTERNAL_USERS_ONLY)
  const [addComment] = useMutation(POST_COMMENT_MUTATION)
  const { data } = useQuery(CSR_USERS_QUERY)
  const [posting, setPosting] = useState(false)

  async function onPost () {
    setPosting(true)
    await addComment({
      variables: {
        taskId: parseInt(taskId),
        comment,
        visibilityType,
      },
    })
    setComment('')
    setVisibilityType(visibilityTypes.INTERNAL_USERS_ONLY)
    setPosting(false)
  }

  const userMentionData = data
    ? data.csr_users.map((user) => ({
      id: user.id,
      display: `${user.fullName}`,
      role: 'Supported Employee, Cyber X',
    }))
    : []
  const handleChange = (event, newValue) => {
    setComment(newValue)
  }
  return (
    <DivOnboardingPostCommentContainer>
      <DivPostCommentHeader>
        Post a Comment:
        <DivVisibility>
          <img src={eyeIcon} alt='visibility' />
          <VisibilitySelector
            type={InputTypes.SELECT}
            value={visibilityType}
            label='Visibility'
            onChange={(value) => setVisibilityType(value)}
            options={Object.keys(visibilityTypeToLabel).map((key) => ({
              value: key,
              label: visibilityTypeToLabel[key],
            }))}
          />
        </DivVisibility>
      </DivPostCommentHeader>
      <DivPostCommentBody>
        <MentionsInput
          value={comment}
          onChange={handleChange}
          markup='@[__display__](__id__)'
          placeholder='Enter comment'
          className='mentions'>
          <Mention
            type='user'
            trigger='@'
            data={userMentionData}
            renderSuggestion={(props) => {
              return (
                <DivSuggestionItem>
                  {props.display}
                  <span>{props.role}</span>
                </DivSuggestionItem>
              )
            }}
            displayTransform={(id, display) => '@' + display}
            className='mentions__mention'
          />
        </MentionsInput>
        <DivPostButtonContainer>
          <CommentPostButton
            text={posting ? 'Posting ...' : 'Post'}
            onClick={onPost}
            disabled={posting || !comment || !visibilityType}
          />
        </DivPostButtonContainer>
      </DivPostCommentBody>
      <DivPostCommentFooter>{taskName}</DivPostCommentFooter>
    </DivOnboardingPostCommentContainer>
  )
}
