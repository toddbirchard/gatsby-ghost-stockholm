import React from "react"
import PropTypes from 'prop-types'
import IdentityModal from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

const CommentSubmit = ({ isLoggedIn, children }) => {
  const [dialog, setDialog] = React.useState(false)

  return (
    <>
      {isLoggedIn
        ? <button className="login-button submit-comment" type="submit">
          SUBMIT
        </button>
        :
        <div className="login-button submit-comment" onClick={() => setDialog(true)}>
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

export default CommentSubmitButton
