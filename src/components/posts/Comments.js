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
    console.log(props.data)
    this.postId = props.data.ghostPost.ghostId
    this.commentId = props.data.ghostPost.comment_id
    this.identity = props.identity
    this.isLoggedIn = props.identity && props.identity.isLoggedIn
    this.user = props.identity.user
    this.state = {
      postId: this.postId,
      commentId: this.commentId,
      userId: this.user ? this.user.id : ``,
      userName: this.user ? this.user.user_metadata.full_name : ``,
      userAvatar: this.user ? this.user.user_metadata.avatar_url : ``,
      userRole: this.user ? this.user.role : ``,
      userEmail: this.user ? this.user.email : ``,
      commentBody: ``,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch(`/`, {
      method: `POST`,
      headers: { 'Content-Type': `application/x-www-form-urlencoded` },
      body: encode({
        'form-name': form.getAttribute(`name`),
        ...this.state,
      }),
    })
      .then(() => console.log(this.state))
      .catch(error => console.log(error))
    e.preventDefault()
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { commentBody, commentId, userEmail } = this.state
    console.log(this.state)
    console.log(this.identity)
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
            <input id="commentId" name="commentId" type="text" value={commentId} style={{ visibility: `hidden` }} onChange={this.handleChange}/>
            <label className="hidden-label" htmlFor="userEmail">Email</label>
            <input id="userEmail" name="userEmail" type="email" value={userEmail} style={{ visibility: `hidden` }} onChange={this.handleChange}/>
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
