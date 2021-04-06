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
    <>
      {netlifyAuth.isAuthenticated
        ? <Router>
          <LogoutButton />
          <Route path="/login" component={LogoutButton} />
        </Router>
        : <Router>
          <LoginButton />
          <Route path="/login" component={LoginButton} />
        </Router> }
    </>
  )
}

const LogoutButton = withRouter(
  ({ history }) => (netlifyAuth.isAuthenticated ? (

    <button
      onClick={() => {
        netlifyAuth.signout(() => history.push(`/`))
      }}
    >
          Sign out
    </button>
  ) : (
    <p>You are not logged in.</p>
  ))
)

class LoginButton extends React.Component {
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
        <button
          onClick={this.login}
          className="comment-btn login"
        >
        Log in
        </button>
      </div>
    )
  }
}
export default Auth
