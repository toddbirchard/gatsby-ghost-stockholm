import React from 'react'
import netlifyIdentity from 'netlify-identity-widget'
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"
import { withRouter } from 'react-router-dom'

export const Auth = ({ children }) => {
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  const name =
    (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.name) || `NoName`

  const isLoggedIn = identity && identity.isLoggedIn
  return (
    <>
      <div className="login-button">
        {` `}
        <div className="btn" onClick={() => setDialog(true)}>
          {isLoggedIn ? `Hello ${name}, Log out here!` : `LOG IN`}
        </div>
      </div>
      <main>{children}</main>
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
    </>
  )
}

const netlifyAuth = {
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
}

const AuthButton = withRouter(
  ({ history }) => (netlifyAuth.isAuthenticated ? (

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
)

/*function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (netlifyAuth.isAuthenticated ? (
        <Component {...props} />
      ) : null)
      }
    />
  )
}*/

class Login extends React.Component {
  state = { redirectToReferrer: false };

  login = () => {
    this.event.preventDefault()
    netlifyAuth.authenticate(() => {
      this.setState({ redirectToReferrer: false })
    })
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: `/` } }

    /*if (redirectToReferrer) {
      return <Redirect to={from} />
    }*/

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}
export default Auth
