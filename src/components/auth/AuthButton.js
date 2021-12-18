import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import IdentityModal, {
  useIdentityContext,
} from 'react-netlify-identity-widget'

const AuthButton = ({ styleClass }) => {
  const [dialog, setDialog] = React.useState(false)
  const identity = useIdentityContext()
  const isLoggedIn = identity && identity.isLoggedIn
  const [buttonText, setButtonText] = useState(
    isLoggedIn ? `Sign out` : `Sign up`,
  )
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.name) || `NoName`

  useEffect(() => {
    setButtonText(isLoggedIn ? `Sign out` : `Sign up`)
  })
  const handleClick = () => {
    if (isLoggedIn) {
      identity.logoutUser().catch(error => console.log(error))
    } else {
      setDialog(true)
    }
  }
  return (
    <>
      <a className={styleClass} onClick={() => handleClick()}>
        {buttonText}
      </a>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={(user) => console.log(`hello `, user.user_metadata)}
        onSignup={(user) => console.log(`welcome `, user.user_metadata)}
        onLogout={() => console.log(`bye `, name)}
      />
    </>
  )
}

AuthButton.propTypes = {
  isLoggedIn: PropTypes.bool,
  styleClass: PropTypes.string,
}

export default AuthButton
