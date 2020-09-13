import React from "react"
import PropTypes from 'prop-types'
import CommentSubmit from "./CommentSubmit"
import fetch from 'node-fetch'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + `=` + encodeURIComponent(data[key]))
    .join(`&`)
}

class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.postId = props.post.ghostId
    this.postSlug = props.post.slug,
    this.postAuthor = props.post.primary_author,
    this.commentId = props.post.comment_id
    this.identity = props.identity
    this.isLoggedIn = props.identity && props.identity.isLoggedIn
    this.user = props.identity.user
    this.state = {
      postId: this.postId,
      postSlug: this.postSlug,
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
      .then(() => this.setState({ commentBody: `` }))
      .catch(error => console.log(error))
    e.preventDefault()
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { commentBody, commentId, userId, userEmail, userName, userAvatar, userRole, postId, postSlug } = this.state
    return (
      <>
        <form
          name="comments"
          netlify
          data-netlify="true"
          netlify-honeypot="address"
          method="post"
          onSubmit={this.handleSubmit}
        >
          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="commentId">Comment ID</label>
            <input id="commentId" name="commentId" type="text" value={commentId} style={{ visibility: `hidden` }} onChange={this.handleChange}/>
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userId">User ID</label>
            <input id="userId" name="userId" type="text" value={userId} style={{ visibility: `hidden` }} onChange={this.handleChange}/>
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="postSlug">Post Slug</label>
            <input id="postSlug" name="postSlug" type="text" value={postSlug} style={{ visibility: `hidden` }} onChange={this.handleChange}/>
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="postId">Post ID</label>
            <input id="postId" name="postId" type="text" value={postId} style={{ visibility: `hidden` }} onChange={this.handleChange}/>
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userEmail">User Email</label>
            <input id="userEmail" name="userEmail" type="email" value={userEmail} style={{ visibility: `hidden` }} onChange={this.handleChange}/>
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userName">User Name</label>
            <input id="userName" name="userName" type="text" value={userName} style={{ visibility: `hidden` }} onChange={this.handleChange}/>
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userAvatar">User Avatar</label>
            <input id="userAvatar" name="userAvatar" type="text" value={userAvatar} style={{ visibility: `hidden` }} onChange={this.handleChange}/>
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userRole">User Role</label>
            <input id="userRole" name="userRole" type="text" value={userRole} style={{ visibility: `hidden` }} onChange={this.handleChange}/>
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="commentAddress" >Address</label>
            <input id="commentAddress" name="address" type="hidden" onChange={this.handleChange} />
          </fieldset>

          <fieldset>
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
          </fieldset>
          <CommentSubmit isLoggedIn={this.isLoggedIn} />
        </form>
      </>
    )
  }
}

CommentForm.propTypes = {
  commentId: PropTypes.string.isRequired,
  identity: PropTypes.object,
}

export default CommentForm
