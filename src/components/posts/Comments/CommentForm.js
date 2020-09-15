import React from "react"
import PropTypes from 'prop-types'
import fetch from 'node-fetch'
import Editor from "rich-markdown-editor"
import CommentSubmit from "./CommentSubmit"

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
    this.authorName = props.post.primary_author.name,
    this.commentId = props.post.comment_id
    this.identity = props.identity
    this.isLoggedIn = props.identity && props.identity.isLoggedIn
    this.user = props.identity.user
    this.userId = this.user ? this.user.id : ``,
    this.userName = this.user ? this.user.user_metadata.full_name : ``,
    this.userAvatar = this.user ? this.user.user_metadata.avatar_url : ``,
    this.userProvider = this.user ? this.user.app_metadata ? this.user.app_metadata.provider : `` : ``,
    this.userRole = this.user ? this.user.role : ``,
    this.userEmail = this.user ? this.user.email : ``,
    this.state = {
      commentBody: ``,
      isFocused: ``,
    }
  }

  handleClick = (e) => {
    e.target.classList.add(`open`)
  }
  handleChange = e => this.setState({ [e.target.name]: e.target.value })
  handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch(`/`, {
      method: `POST`,
      headers: { 'Content-Type': `application/x-www-form-urlencoded` },
      body: encode({
        'form-name': form.getAttribute(`name`),
        commentBody: this.value,
        postId: this.postId,
        postSlug: this.postSlug,
        authorName: this.this.authorName,
        commentId: this.commentId,
        userId: this.userId,
        userName: this.userName,
        userAvatar: this.userAvatar,
        userProvider: this.userProvider,
        userRole: this.userRole,
        userEmail: this.userEmail,
      }),
    })
      .then(() => this.setState({ commentBody: `` }))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <>
        <form
          name="comments"
          netlify="true"
          data-netlify="true"
          netlify-honeypot="address"
          method="post"
          onSubmit={this.handleSubmit}
          className={this.state.isFocused}
          onClick={this.handleClick}
        >
          <fieldset>
            <label className="hidden-label" htmlFor="commentBody">Post comment</label>
            <Editor
              id="commentBody"
              name="commentBody"
              value={this.value}
              onChange={this.andleChange}
              readOnly={false}
              placeholder={`What'd you think?`}
              onClick={this.handleClick}
            />
          </fieldset>
          <CommentSubmit isLoggedIn={this.isLoggedIn}/>
        </form>
      </>
    )
  }
}

CommentForm.propTypes = {
  post: PropTypes.shape({
    ghostId: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    primary_author: PropTypes.object,
    comment_id: PropTypes.string.isRequired,
  }).isRequired,
  identity: PropTypes.object,
}

export default CommentForm
