import React from 'react'
import PropTypes from 'prop-types'
import * as Showdown from "showdown"
import { AiOutlineUser } from 'react-icons/ai'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  code: true,
  ghMentions: true,
  emoji: true,
})

const Comment = ({ comment, moderators }) => {
  const isAdmin = comment && comment.user_role
  const isModerator = moderators.includes(comment.user_name)
  const commentBody = converter.makeHtml(comment.body)

  return (
    <div className="comment">
      { comment.user_avatar
        ? <img className="user-avatar" src={comment.user_avatar} alt={`${comment.user_avatar} avatar`}/>
        : <AiOutlineUser className="user-avatar" />
      }
      <div className="comment-main">
        <div className="comment-head">
          <div className="comment-author">
            <span className="user-name">{comment.user_name}</span>
            {isAdmin
              ? <span className="badge author">Author</span>
              : isModerator
                ? <span className="badge moderator">Moderator</span>
                : null }
          </div>
          <div className="comment-date">{comment.created_at}</div>
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
    })
  ),
}

export default Comment
