import React from "react"
import PropTypes from 'prop-types'
import CommentSubmit from "./CommentSubmit"
import "react-netlify-identity-widget/styles.css"
import "@reach/tabs/styles.css"

const Comments = ({ commentId, identity }) => {
  const isLoggedIn = identity && identity.isLoggedIn
  return (
    <>
      <div id="comments">
        <form
          name="comments"
          data-netlify="true"
          netlify-honeypot="email"
          action="#"
          method="POST"
        >
          <div className="form-group">
            <label className="hidden-label"><input name="comment-id" type="text" />{commentId}</label>
            <label className="hidden-label"><input name="email" type="email" /></label>
            <label className="hidden-label" htmlFor="message">Post comment</label>
            <textarea
              name="message"
              placeholder={`What'd you think?`}
              rows="5"
              autoComplete="false"
            />
          </div>
        </form>
        <CommentSubmit isLoggedIn={isLoggedIn} />
      </div>
    </>

  )
}

Comments.propTypes = {
  commentId: PropTypes.string.isRequired,
  identity: PropTypes.object,
}

export default Comments
