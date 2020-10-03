import React from "react"
import PropTypes from 'prop-types'
import { useIdentityContext } from "react-netlify-identity-widget"

const CommentSubmit = ({ children }) => {
  const identity = useIdentityContext()
  const isLoggedIn = identity && identity.isLoggedIn

  return (
    <>
      {isLoggedIn
        ? <button
          className="comment-btn submit"
          type="submit"
        >
          SUBMIT
        </button>
        :
        <div
          className="comment-btn login"
        >
          Sign in to Comment
        </div>
      }
      <main>{children}</main>
    </>
  )
}

CommentSubmit.propTypes = {
  isLoggedIn: PropTypes.bool,
}

export default CommentSubmit
