import React from 'react'
import netlifyIdentity from 'netlify-identity-widget'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom'

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

function Auth() {
  return (
    <Router>
      <AuthButton />
      <Route path="/login" component={Login} />
    </Router>
  )
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

class Login extends React.Component {
  state = { redirectToReferrer: false };

  login = () => {
    netlifyAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: `/` } }
    let { redirectToReferrer } = this.state

    if (redirectToReferrer) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}
export default Auth
