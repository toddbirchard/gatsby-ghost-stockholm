import React from "react"
import PropTypes from 'prop-types'
import CommentSubmit from "./CommentSubmit"
import fetch from 'node-fetch'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + `=` + encodeURIComponent(data[key]))
    .join(`&`)
}

class Comments extends React.Component {
  constructor(props) {
    super(props)
    this.commentId = props.commentId
    this.identity = props.identity
    this.isLoggedIn = props.identity && props.identity.isLoggedIn
    this.user = props.identity.currentUser
    this.state = { commentId: ``, commentBody: ``, commentEmail: `` }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch(`/`, {
      method: `POST`,
      headers: { 'Content-Type': `application/x-www-form-urlencoded` },
      body: encode({
        'form-name': form.getAttribute(`name`),
      }),
    })
      .catch(error => console.log(error))
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { commentBody } = this.state
    return (
      <>
        <div id="comments">
          <form
            name="comments"
            netlify
            data-netlify="true"
            netlify-honeypot="address"
            method="post"
            onSubmit={this.handleSubmit}
          >
            <label className="hidden-label" htmlFor="commentId">Comment ID</label>
            <input id="commentId" name="commentId" type="text" value={this.commentId} style={{ visibility: `hidden` }} onChange={this.handleChange}/>
            <label className="hidden-label" htmlFor="commentEmail">Email</label>
            <input id="commentEmail" name="commentEmail" type="email" value={this.user.email} style={{ visibility: `hidden` }} onChange={this.handleChange}/>
            <label className="hidden-label" htmlFor="commentAddress" >Address</label>
            <input id="commentAddress" name="address" type="hidden" onChange={this.handleChange} />
            <label className="hidden-label" htmlFor="commentBody">Post comment</label>
            <textarea
              id="commentBody"
              name="commentBody"
              placeholder={`What'd you think?`}
              rows="5"
              required
              value={commentBody}
              onChange={this.handleChange}
            ></textarea>
            <CommentSubmit isLoggedIn={this.isLoggedIn} />
          </form>
        </div>
      </>
    )
  }
}

Comments.propTypes = {
  commentId: PropTypes.string.isRequired,
  identity: PropTypes.object,
}

export default Comments
