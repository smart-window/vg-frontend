import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import {
  DivCommentBody,
  DivCommentFooter,
  DivCommentHeader,
  DivDeleteComment,
  DivOnboardingCommentContainer,
  DivPostedOn,
  DivVisibility,
} from './OnboardingComment.styles'
import CommentUserAvatar from '../CommentUserAvatar/CommentUserAvatar'
import eyeIcon from '../../../../assets/images/icons/eye.svg'
import { CurrentUserContext } from 'web/providers/CurrentUserProvider.web'
import { gql, useMutation, useQuery } from '@apollo/client'
import { MentionsInput, Mention } from 'react-mentions'
import { visibilityTypeToLabel } from 'shared/constants/visibilityConstants'
import { CSR_USERS_QUERY } from '../OnboardingPostComment/OnboardingPostComment'
import { GlobalModalContext } from 'shared/providers/GlobalModalProvider'
import modalConstants from 'web/constants/modalConstants'
import dateHelper from 'shared/services/dateHelper'

OnboardingComment.propTypes = {
  /** an object that has information on a posted comment */
  comment: PropTypes.object,
  /** the name of a stage in which the comment was posted to */
  stageName: PropTypes.string,
  /** function that the parent component can use to do something when the comment gets deleted */
  onDeleted: PropTypes.func,
}

export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteTaskComment($id: ID!) {
    deleteTaskComment(id: $id) {
      id
    }
  }

`

/**
 * Renders a comment item.
 * @category Components - Web
 * @namespace OnboardingDiscussion
 */
export default function OnboardingComment({ comment, stageName, onDeleted }) {
  const { currentUser } = useContext(CurrentUserContext)
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION)
  const [deleting, setDeleting] = useState(false)
  const {showModal} = useContext(GlobalModalContext)

  async function deleteItem() {
    if (deleting) return
    setDeleting(true)
    await deleteComment({
      variables: {
        id: comment.id,
      },
    })
    onDeleted(comment.id)
    setDeleting(false)
  }

  const { data } = useQuery(CSR_USERS_QUERY)
  const userMentionData = data
    ? data.csr_users.map((user) => ({
      id: user.id,
      display: `${user.fullName}`,
    }))
    : []
  return (
    <DivOnboardingCommentContainer>
      <DivCommentHeader>
        <CommentUserAvatar
          fullName={comment.user.firstName + ' ' + comment.user.lastName}
        />
        <DivVisibility>
          <img src={eyeIcon} alt='visibility' />
          Visible to <span>{visibilityTypeToLabel[comment.visibilityType]}</span>
        </DivVisibility>
      </DivCommentHeader>
      <DivCommentBody>
        <MentionsInput
          value={comment.comment}
          markup='@{{__type__||__id__||__display__}}'
          placeholder='Enter comment'
          className='mentions_readonly'>
          <Mention
            type='user'
            trigger='@'
            data={userMentionData}
            className='mentions_readonly__mention'
          />
        </MentionsInput>
      </DivCommentBody>
      <DivCommentFooter>
        {currentUser.id === comment.user.id ? (
          <DivDeleteComment onClick={() => showModal(modalConstants.CONFIRMATION_MODAL, {
            title: 'Confirm Comment Deletion',
            message: 'Are you sure you want to delete your comment?',
            onSubmit: deleteItem
          })}>
            {deleting ? 'Deleting ...' : 'Delete Comment'}
          </DivDeleteComment>
        ) : (
          <div></div>
        )}
        <DivPostedOn>
          Posted on <span className='contract'>{stageName}</span>
          <span className='posted-at'>
            {dateHelper.getDateStringForTimezone(new Date(comment.insertedAt), 'America/New_York')}
          </span>
        </DivPostedOn>
      </DivCommentFooter>
    </DivOnboardingCommentContainer>
  )
}
