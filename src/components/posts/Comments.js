import React from "react"
import PropTypes from 'prop-types'
import CommentSubmit from "./CommentSubmit"

const Comments = ({ commentId, identity }) => {
  const isLoggedIn = identity && identity.isLoggedIn
  const user = identity.currentUser
  console.log(user)

  return (
    <>
      <div id="comments">
        <form
          name="comments"
          netlify
          data-netlify="true"
          netlify-honeypot="address"
          method="post"
        >
          <label className="hidden-label"></label><input name="comment-id" type="text" value={commentId} style={{ visibility: `hidden` }}/>
          <label className="hidden-label"></label><input name="address" type="hidden" />
          <label className="hidden-label" htmlFor="message">Post comment</label>
          <textarea
            name="message"
            placeholder={`What'd you think?`}
            rows="5"
          ></textarea>
          <CommentSubmit isLoggedIn={isLoggedIn} />
        </form>
      </div>
    </>
  )
}

Comments.propTypes = {
  commentId: PropTypes.string.isRequired,
  identity: PropTypes.object,
}

export default Comments
