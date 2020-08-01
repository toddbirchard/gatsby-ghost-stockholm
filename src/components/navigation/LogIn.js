import React from 'react'
import netlifyIdentity from 'netlify-identity-widget'

/*const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  authenticate(callback) {
    this.isAuthenticated = true
    netlifyIdentity.open()
    netlifyIdentity.on(`login`, (user) => {
      this.user = user
      callback(user)
    })
  },
  signout(callback) {
    this.isAuthenticated = false
    netlifyIdentity.logout()
    netlifyIdentity.on(`logout`, () => {
      this.user = null
      callback()
    })
  },
}*/

/*const AuthButton () = {
    netlifyAuth.isAuthenticated ? (
    <p>
        Welcome!{` `}
      <button
        onClick={() => {
          netlifyAuth.signout(() => history.push(`/`))
        }}
      >
          Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  ))
)*/

export default class LogIn extends React.Component {
  componentDidMount() {
    window.netlifyIdentity = netlifyIdentity
    netlifyIdentity.init({
      container: `#auth-modal`,
      locale: `en`,
    })
  }
  render() {
    return (
      <>
        <button onClick={netlifyIdentity.open()}>Log in</button>
        <div id="auth-modal"></div>
      </>
    )
  }
}
