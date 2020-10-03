import React, { useState } from "react"
import PropTypes from 'prop-types'
import fetch from 'node-fetch'
import ReactMde from "react-mde"
import "react-mde/lib/styles/css/react-mde-all.css"
import CommentSubmit from "./CommentSubmit"
import { FaCheck } from 'react-icons/fa'
import * as Showdown from "showdown"
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"

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
  code: true,
  ghMentions: true,
  emoji: true,
})

const CommentForm = ({ post }) => {
  const postId = post.ghostId
  const postSlug = post.slug
  const authorName = post.primary_author.name
  const commentId = post.comment_id
  const identity = useIdentityContext()
  const user = identity.user
  const userId = user ? user.id : ``
  const userName = user ? user.user_metadata.full_name : ``
  const userAvatar = user ? user.user_metadata.user_avatar : ``
  const userProvider = user ? user.app_metadata ? user.app_metadata.provider : `` : ``
  const userEmail = user ? user.email : ``
  const ref = React.useRef()
  const messageRef = React.useRef()
  const [value, setValue] = useState(`Have something to say?`)
  const [selectedTab, setSelectedTab] = React.useState(`write`)
  const [dialog, setDialog] = React.useState(false)
  const isLoggedIn = identity && identity.isLoggedIn

  const handleClick = (e) => {
    if (isLoggedIn) {
      e.target.classList.add(`open`)
      ref.current.classList.add(`open`)
      ref.current.classList.remove(`closed`)
      value === `Have something to say?` ? setValue(``) : null
    } else {
      setDialog(true)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
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
        userEmail: userEmail,
      }),
    })
      .then(() => setValue(``))
      .then(messageRef.current.classList.add(`active`))
      .catch(error => console.log(error))
  }

  return (
    <>
      <div
        className="form-container closed"
        ref={ref}
        onClick={handleClick}
      >

        <div className="success-message" ref={messageRef}>
          <div className="message">
            <FaCheck className="icon" /> <span className="">Submitted!</span>
          </div>
        </div>

        <form
          name="comments"
          netlify
          data-netlify="true"
          netlify-honeypot="address"
          method="post"
          onSubmit={handleSubmit}
          className={isLoggedIn ? `logged-in` : `logged-out`}
        >

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="commentId">Comment ID</label>
            <input id="commentId" name="commentId" type="text" value={commentId} />
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userId">User ID</label>
            <input id="userId" name="userId" type="text" value={userId} />
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="postSlug">Post Slug</label>
            <input id="postSlug" name="postSlug" type="text" value={postSlug} />
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="postId">Post ID</label>
            <input id="postId" name="postId" type="text" value={postId} />
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userEmail">User Email</label>
            <input id="userEmail" name="userEmail" type="email" value={userEmail} />
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userName">User Name</label>
            <input id="userName" name="userName" type="text" value={userName} />
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userAvatar">User Avatar</label>
            <input id="userAvatar" name="userAvatar" type="text" value={userAvatar} />
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userProvider">User Provider</label>
            <input id="userProvider" name="userProvider" type="text" value={userProvider} />
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
      </div>
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
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
