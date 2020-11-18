import React from "react"
import PropTypes from 'prop-types'
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"

const AuthButton = ({ styleClass }) => {
  const [dialog, setDialog] = React.useState(false)
  const identity = useIdentityContext()
  const isLoggedIn = identity && identity.isLoggedIn
  const [user, setUser] = React.useState(isLoggedIn)
  console.log(`Footer identity = ` + identity)

  return (
    <>
      {user
        ? <a
          className={styleClass}
          onClick={() => identity.logoutUser}
        > Sign out</a>
        : <a
          className={styleClass}
          onClick={() => setDialog(true)}
        > Sign up </a>
      }
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={() => setUser(identity.isLoggedIn)}
        onSignup={() => setUser(identity.isLoggedIn)}
      />
    </>
  )
}

AuthButton.propTypes = {
  isLoggedIn: PropTypes.bool,
  styleClass: PropTypes.string,
}

export default AuthButton
