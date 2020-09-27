import React, { useState } from "react"
import PropTypes from 'prop-types'
import fetch from 'node-fetch'
import ReactMde from "react-mde"
import * as Showdown from "showdown"
import "react-mde/lib/styles/css/react-mde-all.css"
import CommentSubmit from "./CommentSubmit"
import config from '../../utils/siteConfig'

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + `=` + encodeURIComponent(data[key]))
    .join(`&`)
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
})

const CommentForm = ({ post, identity }) => {
  const postId = post.ghostId
  const postSlug = post.slug
  const authorName = post.primary_author.name
  const commentId = post.comment_id
  const userId = user ? user.id : ``
  const user = identity.user
  const userName = user ? user.user_metadata.full_name : ``
  const userAvatar = user ? user.user_metadata.user_avatar : ``
  const userProvider = user ? user.app_metadata ? user.app_metadata.provider : `` : ``
  const userRole = user ? user.role : ``
  const userEmail = user ? user.email : ``
  const ref = React.useRef()
  const [value, setValue] = useState(`Have something to say?`)
  const [selectedTab, setSelectedTab] = React.useState(`write`)
  console.log(encode({
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
  }))

  // const handleChange = e => this.setState({ [e.target.name]: e.target.value })
  const handleClick = (e) => {
    e.target.classList.add(`open`)
    ref.current.classList.add(`open`)
    ref.current.classList.remove(`closed`)
    value === `Have something to say?` ? setValue(``) : null
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch(config.links.commentsApi, {
      method: `POST`,
      headers: { 'Content-Type': `application/x-www-form-urlencoded` },
      // headers: { 'Content-Type': `application/json` },
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
      .then(() => setValue(``))
      .catch(error => console.log(error))
  }

  return (
    <>
      <form
        name="comments"
        netlify
        data-netlify="true"
        netlify-honeypot="address"
        method="post"
        onSubmit={handleSubmit}
        ref={ref}
        onClick={handleClick}
        className="closed"
      >

        <fieldset className="hidden-label">
          <label className="hidden-label" htmlFor="commentId">Comment ID</label>
          <input id="commentId" name="commentId" type="text" value={commentId} style={{ visibility: `hidden` }}/>
        </fieldset>

        <fieldset className="hidden-label">
          <label className="hidden-label" htmlFor="userId">User ID</label>
          <input id="userId" name="userId" type="text" value={userId} style={{ visibility: `hidden` }}/>
        </fieldset>

        <fieldset className="hidden-label">
          <label className="hidden-label" htmlFor="postSlug">Post Slug</label>
          <input id="postSlug" name="postSlug" type="text" value={postSlug} style={{ visibility: `hidden` }}/>
        </fieldset>

        <fieldset className="hidden-label">
          <label className="hidden-label" htmlFor="postId">Post ID</label>
          <input id="postId" name="postId" type="text" value={postId} style={{ visibility: `hidden` }}/>
        </fieldset>

        <fieldset className="hidden-label">
          <label className="hidden-label" htmlFor="userEmail">User Email</label>
          <input id="userEmail" name="userEmail" type="email" value={userEmail} style={{ visibility: `hidden` }}/>
        </fieldset>

        <fieldset className="hidden-label">
          <label className="hidden-label" htmlFor="userName">User Name</label>
          <input id="userName" name="userName" type="text" value={userName} style={{ visibility: `hidden` }}/>
        </fieldset>

        <fieldset className="hidden-label">
          <label className="hidden-label" htmlFor="userAvatar">User Avatar</label>
          <input id="userAvatar" name="userAvatar" type="text" value={userAvatar} style={{ visibility: `hidden` }}/>
        </fieldset>

        <fieldset className="hidden-label">
          <label className="hidden-label" htmlFor="userRole">User Role</label>
          <input id="userRole" name="userRole" type="text" value={userRole} style={{ visibility: `hidden` }}/>
        </fieldset>

        <fieldset className="hidden-label">
          <label className="hidden-label" htmlFor="userProvider">User Provider</label>
          <input id="userProvider" name="userProvider" type="text" value={userProvider} style={{ visibility: `hidden` }}/>
        </fieldset>

        <fieldset className="hidden-label">
          <label className="hidden-label" htmlFor="commentAddress" >Address</label>
          <input id="commentAddress" name="address" type="hidden" />
        </fieldset>
        <fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="commentBody">Post comment</label>
            <textarea
              id="commentBody"
              name="commentBody"
              rows="5"
              required
              value={value}
            >
            </textarea>
          </fieldset>

          <ReactMde
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))}
            placeholder={`What'd you think?`}
            onClick={handleClick}
          />
        </fieldset>
        <CommentSubmit />
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
