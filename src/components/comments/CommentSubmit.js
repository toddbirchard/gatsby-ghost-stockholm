import React from "react"
import PropTypes from 'prop-types'
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"

const CommentSubmit = ({ children }) => {
  const [dialog, setDialog] = React.useState(false)
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
          onClick={() => setDialog(true)}
        >
          LOG IN
        </div>
      }
      <main>{children}</main>
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
    </>
  )
}

CommentSubmit.propTypes = {
  isLoggedIn: PropTypes.bool,
}

export default CommentSubmit
