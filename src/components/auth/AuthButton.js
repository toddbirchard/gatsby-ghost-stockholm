import React from "react"
import PropTypes from 'prop-types'
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"

const AuthButton = () => {
  const [dialog, setDialog] = React.useState(false)
  const identity = useIdentityContext()
  const isLoggedIn = identity && identity.isLoggedIn

  return (
    <>
      {isLoggedIn
        ? null
        : <a
          className="signup"
          onClick={() => setDialog(true)}
        >
          Sign up
        </a>
      }
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
    </>
  )
}

AuthButton.propTypes = {
  isLoggedIn: PropTypes.bool,
}

export default AuthButton
