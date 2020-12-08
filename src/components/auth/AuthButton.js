import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"

const AuthButton = ({ styleClass }) => {
  const [dialog, setDialog] = React.useState(false)
  const identity = useIdentityContext()
  const isLoggedIn = identity && identity.isLoggedIn
  const [buttonText, setButtonText] = useState(isLoggedIn ? `Sign out` : `Sign up`)

  useEffect(() => {
    setButtonText(isLoggedIn ? `Sign out` : `Sign up`)
  })
  const handleClick = () => {
    if (isLoggedIn) {
      identity.logoutUser()
        .catch(error => console.log(error))
    } else {
      setDialog(true)
    }
  }
  const handleLogin = (u) => {
    console.log(`---user info----`)
    console.log(u.id)
    console.log(u.user_metadata.full_name)
    console.log(u.user_metadata.user_avatar)
    console.log(u.app_metadata.provider)
    console.log(u.email)
    console.log(`--- values ----`)
    console.log(`isLoggedIn = ` + isLoggedIn)
  }
  const handleLogout = () => {
    console.log(`--- values ----`)
    console.log(`isLoggedIn = ` + isLoggedIn)
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
        onLogin={u => handleLogin(u)}
        onSignup={u => handleLogin(u)}
        onLogout={() => handleLogout()}
      />
    </>
  )
}

AuthButton.propTypes = {
  isLoggedIn: PropTypes.bool,
  styleClass: PropTypes.string,
}

export default AuthButton
