import React from "react"
import PropTypes from 'prop-types'
import CommentSubmit from "./CommentSubmit"
import fetch from 'node-fetch'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + `=` + encodeURIComponent(data[key]))
    .join(`&`)
}

const Comments = ({ commentId, identity }) => {
  const isLoggedIn = identity && identity.isLoggedIn
  const user = identity.currentUser
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch(`/`, {
      method: `POST`,
      headers: { 'Content-Type': `application/x-www-form-urlencoded` },
      body: encode({
        'form-name': form.getAttribute(`name`),
      }),
    })
      .catch(error => console.log(error))
  }

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
          onSubmit={handleSubmit}
        >
          <label className="hidden-label" htmlFor="comment-id">
            <input id="comment-id" name="comment-id" type="text" value={commentId} style={{ visibility: `hidden` }}/>
          </label>
          <label className="hidden-label" htmlFor="comment-address">
            <input id="comment-address" name="address" type="hidden" />
          </label>
          <label className="hidden-label" htmlFor="comment-body">
            Post comment
            <textarea
              id="comment-body"
              name="comment-body"
              placeholder={`What'd you think?`}
              rows="5"
            ></textarea>
          </label>
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
