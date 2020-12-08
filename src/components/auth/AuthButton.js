import React, { useState } from "react"
import PropTypes from 'prop-types'
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"

const AuthButton = ({ styleClass }) => {
  const [dialog, setDialog] = React.useState(false)
  const identity = useIdentityContext()
  const isLoggedIn = identity && identity.isLoggedIn
  const [userSession, setUserSession] = React.useState(isLoggedIn)
  const [buttonText, setButtonText] = useState(userSession ? `Sign out` : `Sign up`)

  const handleClick = () => {
    if (userSession) {
      identity.logoutUser()
        .catch(error => console.log(error))
    } else {
      setDialog(true)
    }
  }
  return (
    <>
      <a
        className={styleClass}
        onClick={() => handleClick()}
      >
        {buttonText}
      </a>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={() => setUserSession(identity.isLoggedIn)}
        onSignup={() => setUserSession(identity.isLoggedIn)}
        onLogout={() => setButtonText(`Sign up`)}
      />
    </>
  )
}

AuthButton.propTypes = {
  isLoggedIn: PropTypes.bool,
  styleClass: PropTypes.string,
}

export default AuthButton
