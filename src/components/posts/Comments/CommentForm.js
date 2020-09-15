import React from "react"
import PropTypes from 'prop-types'
import CommentSubmit from "./CommentSubmit"
import fetch from 'node-fetch'
import Editor from "rich-markdown-editor"
import { debounce } from "lodash"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + `=` + encodeURIComponent(data[key]))
    .join(`&`)
}

const CommentForm = ({ post, identity }) => {
  const postId = post.ghostId
  const postSlug = post.slug
  const authorName = post.primary_author && post.primary_author.name
  const commentId = post.comment_id
  const user = identity.user
  const userId = user ? user.id : ``
  const userName = user ? user.user_metadata.full_name : ``
  const userAvatar = user ? user.user_metadata.avatar_url : ``
  const userProvider = user ? user.app_metadata ? this.user.app_metadata.provider : `` : ``
  const userRole = user ? user.role : ``
  const userEmail = user ? user.email : ``
  const isLoggedIn = user && user.isLoggedIn
  const [value, setValue] = React.useState(``)

  const handleSubmit = async function* (e) {
    const wait = function (time) {
      return new Promise((a, r) => {
        e.preventDefault()
        setTimeout(() => a(), time)
        const form = e.target
        fetch(`/`, {
          method: `POST`,
          headers: { 'Content-Type': `application/x-www-form-urlencoded` },
          body: encode({
            'form-name': form.getAttribute(`name`),
            commentBody: value,
            postId: postId,
            postSlug: postSlug,
            authorName: authorName,
            commentId: commentId,
            userId: userId,
            userName: userName,
            userAvatar: userAvatar,
            userProvider: userProvider,
            userRole: userRole,
            userEmail: userEmail,
          }),
        })
          .then(() => this.setState({ commentBody: `` }))
          .catch(error => console.log(error))
      })
    }
  }

  const handleClick = (e) => {
    e.target.className = `open`
    this.setState({ open: `open` })
  }

  const handleChange = debounce(value => {
    const text = value()
    localStorage.setItem(`saved`, text)
  }, 250)

  return (
    <>
      <form
        name="comments"
        netlify="true"
        data-netlify="true"
        netlify-honeypot="address"
        method="post"
        onSubmit={handleSubmit}
      >
        <fieldset>
          <label className="hidden-label" htmlFor="commentBody">Post comment</label>
          <Editor
            id="commentBody"
            name="commentBody"
            value={value}
            onChange={handleChange}
            readOnly={false}
            placeholder={`What'd you think?`}
            onClick={handleClick}
          />
        </fieldset>
        <CommentSubmit isLoggedIn={isLoggedIn}/>
      </form>
    </>
  )
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
