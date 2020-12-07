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
      .then(() => setButtonText(`Sign up`))
      .catch(error => console.log(error))
  }
  const handleLogin = () => {
    setUserSession(identity.isLoggedIn)
    setButtonText(`Sign out`)
  }

  return (
    <>
      {userSession ? <a
        className={styleClass}
        onClick={u => handleLogout(u)}
      >
        {buttonText}
      </a>
        : <a
          className={styleClass}
          onClick={() => setDialog(true)}
        >
          {buttonText}
        </a>
      }
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
