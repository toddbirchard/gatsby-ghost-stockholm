import React from "react"
import PropTypes from 'prop-types'
import IdentityModal from "react-netlify-identity-widget"

const CommentSubmit = ({ isLoggedIn, children }) => {
  const [dialog, setDialog] = React.useState(false)

  return (
    <>
      {isLoggedIn
        ? <button className="login-button comment-btn" type="submit" label="submit">
          SUBMIT
        </button>
        :
        <div className="login-button comment-btn" onClick={() => setDialog(true)}>
          LOG IN
        </div>
      }
      <main>{children}</main>
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
    </>
  )
}

CommentSubmit.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}

export default CommentSubmit
