import React from 'react'
import PropTypes from 'prop-types'

const Comment = ({ comment }) => (
  <div className="comment">
    <img className="user-avatar" src={comment.user_avatar} />
    <div className="comment-main">
      <div className="comment-head">
        <div className="comment-author">
          <span className="user-name">{comment.user_name}</span>
          {comment.user_role && <span className="badge author">Author</span> }
        </div>
        <div className="comment-date">{comment.created_at}</div>
      </div>
      <p className="comment-body">{comment.body}</p>
      <div className="comment-buttons">
        <button className="comment-button reply">Reply</button>
        <button className="comment-button like" >Like</button>
      </div>
    </div>
  </div>
)

Comment.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string.isRequired,
    user_name: PropTypes.string.isRequired,
    user_avatar: PropTypes.string.isRequired,
    user_email: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
}

export default Comment
