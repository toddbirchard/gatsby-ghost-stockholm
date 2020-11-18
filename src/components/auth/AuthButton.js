import React from "react"
import PropTypes from 'prop-types'
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"

const AuthButton = ({ styleClass }) => {
  const [dialog, setDialog] = React.useState(false)
  const identity = useIdentityContext()
  const isLoggedIn = identity && identity.isLoggedIn
  const [userSession, setUserSession] = React.useState(isLoggedIn)

  const handleLogout = (u) => {
    console.log(`logging user out: ` + u)
    identity.logoutUser
    setUserSession(identity.isLoggedIn)
  }
  const handleLogin = (u) => {
    console.log(`logging user in: ` + u)
    setUserSession(identity.isLoggedIn)
  }

  return (
    <>
      {userSession
        ? <a
          className={styleClass}
          onClick={u => handleLogout(u)}
        > Sign out</a>
        : <a
          className={styleClass}
          onClick={() => setDialog(true)}
        > Sign up </a>
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
