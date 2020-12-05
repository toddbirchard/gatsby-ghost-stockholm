import React, { useState } from "react"
import PropTypes from 'prop-types'
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"

const AuthButton = ({ styleClass }) => {
  const [dialog, setDialog] = React.useState(false)
  const identity = useIdentityContext()
  const isLoggedIn = identity && identity.isLoggedIn
  const [userSession, setUserSession] = React.useState(isLoggedIn)
  const [buttonText, setButtonText] = useState(userSession ? `Sign out` : `Sign up`)

  const handleLogout = (u) => {
    console.log(`Logging user out: ` + u)
    identity.logoutUser()
      .then(() => setUserSession(identity.isLoggedIn))
      .then(() => setButtonText(`Sign up`))
      .catch(error => console.log(error))
  }
  const handleLogin = (u) => {
    console.log(`Logging user in: ` + u)
    setUserSession(identity.isLoggedIn)
      .then(() => setUserSession(identity.isLoggedIn))
      .then(() => setButtonText(`Sign out`))
      .catch(error => console.log(error))
  }

  return (
    <>
      <a
        className={styleClass}
        onClick={userSession ? u => handleLogout(u) : u => handleLogin(u)}
      >
        {buttonText}
      </a>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={u => handleLogin(u)}
        onSignup={u => handleLogin(u)}
        onLogout={u => handleLogout(u)}
      />
    </>
  )
}

AuthButton.propTypes = {
  isLoggedIn: PropTypes.bool,
  styleClass: PropTypes.string,
}

export default AuthButton
