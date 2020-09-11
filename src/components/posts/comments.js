import React from "react"
import fetch from 'node-fetch'

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ``,
      message: ``,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    // event.preventDefault()

    const postURL = `example.com/members/api/send-magic-link/`

    const values = {
      email: this.state.value,
      emailType: `subscribe`,
      labels: [],
    }

    fetch(postURL, {
      method: `POST`,
      mode: `cors`,
      headers: { 'Content-Type': `application/json` },
      body: JSON.stringify(values),
    }).then(() => {
      this.setState({ message: `success` })
    }).catch(() => {
      this.setState({ message: `error` })
    })
  }

  render() {
    return (
      <>
        <div id="comments">
          <form name="comments" data-netlify="true" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="hidden-label" htmlFor="message">Post comment</label>
              <textarea
                name="message"
                placeholder={`What'd you think?`}
                autoComplete="false"
              />
              <button className="submit-comment" type="submit" value="Submit">
                <span className="button-content">{`Submit`}</span>
              </button>
            </div>
          </form>
        </div>
      </>
    )
  }
}

export default Comments
