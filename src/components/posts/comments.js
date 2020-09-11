import React from "react"
import PropTypes from 'prop-types'
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"

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
        {isLoggedIn ? <SubmitComment /> : <SubmitComment /> }
      </div>
    </>

  )
}
const SubmitComment = ({ children }) => {
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)

  const isLoggedIn = identity && identity.isLoggedIn
  return (
    <>
      {isLoggedIn
        ? <button className="login-button submit-comment" onClick={() => setDialog(true)}>
          SUBMIT
        </button>
        :
        <button className="login-button submit-comment" onClick={() => setDialog(true)}>
          LOG IN
        </button>
      }
      <main>{children}</main>
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
    </>
  )
}

Comments.propTypes = {
  commentId: PropTypes.string.isRequired,
  identity: PropTypes.object,
}

export default Comments
