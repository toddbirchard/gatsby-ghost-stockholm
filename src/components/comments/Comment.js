import React from 'react'
import PropTypes from 'prop-types'
import * as Showdown from 'showdown'
import { AiOutlineUser } from 'react-icons/ai'
import { IoArrowUndoOutline, IoArrowUpCircleOutline } from 'react-icons/io5'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  code: true,
  ghMentions: true,
  emoji: true,
})

const Comment = ({ comment }) => {
  const userIsAuthor = comment && comment.user_role === `author`
  const userIsModerator = comment && comment.user_role === `moderator`
  const commentBody = converter.makeHtml(comment.body)
  const userAvatar = comment.user_avatar && comment.user_avatar

  return (
    <div className="comment" key={comment.id}>
      <div className="comment-main">
        <div className="comment-head">
          <div className="comment-author">
            {userAvatar ? (
              <img
                className="user-avatar avatar-border lazyload"
                data-src={comment.user_avatar}
                alt={`${comment.user_name}'s avatar`}
              />
            ) : (
              <AiOutlineUser
                className="user-avatar"
                alt={`${comment.user_name}'s avatar`}
              />
            )}
            <div>
              <div className="comment-author-details">
                <span className="user-name">{comment.user_name}</span>
                {userIsAuthor ? (
                  <span className="badge author">Author</span>
                ) : userIsModerator ? (
                  <span className="badge moderator">Moderator</span>
                ) : null}
              </div>
              <div className="comment-date">{comment.created_at}</div>
            </div>
          </div>

          <div className="comment-actions">
            <button className="comment-action">
              <IoArrowUndoOutline/>
            </button>
            <button className="comment-action">
              <IoArrowUpCircleOutline/>
            </button>
          </div>
        </div>
        <div
          className="comment-body"
          dangerouslySetInnerHTML={{ __html: commentBody }}
        />
        <div className="comment-buttons">
          <button className="comment-button reply">Reply</button>
          <button className="comment-button like">Like</button>
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    body: PropTypes.string.isRequired,
    user_name: PropTypes.string,
    user_avatar: PropTypes.string,
    user_email: PropTypes.string,
    user_role: PropTypes.string,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  moderators: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
    }),
  ),
}

export default Comment
