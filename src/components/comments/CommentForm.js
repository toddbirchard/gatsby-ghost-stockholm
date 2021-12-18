import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { FaCheck, FaRegWindowClose, FaRegComment } from 'react-icons/fa'
import * as Showdown from 'showdown'
import IdentityModal, {
  useIdentityContext,
} from 'react-netlify-identity-widget'
import Promise from 'promise'

import fetch from 'node-fetch'

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

const wait = timeout => new Promise((resolve) => {
  setTimeout(resolve, timeout)
})

const CommentForm = ({ post }) => {
  const postId = post.ghostId
  const postSlug = post.slug
  const authorName = post.primary_author.name
  const authorId = post.primary_author.id
  const identity = useIdentityContext()
  const user = identity.user
  const isLoggedIn = identity.isLoggedIn
  const formRef = React.useRef()
  const commentSubmittedRef = React.useRef()
  const commentFailedRef = React.useRef()
  const textAreaRef = React.useRef()
  const [userId, setUserId] = useState(user ? user.id : ``)
  const [userName, setUserName] = useState(
    user ? user.user_metadata.full_name : ``,
  )
  const [userAvatar, setUserAvatar] = useState(
    user ? user.user_metadata.avatar_url : ``,
  )
  const [userProvider, setUserProvider] = useState(
    user ? user.app_metadata.provider : ``,
  )
  const [userEmail, setUserEmail] = useState(user ? user.email : ``)
  const [value, setValue] = useState(`Leave a comment!`)
  const [selectedTab, setSelectedTab] = React.useState(`write`)
  const [dialog, setDialog] = React.useState(false)

  useEffect(() => {
    setUserId(user ? user.id : ``)
    setUserName(user ? user.user_metadata.full_name : ``)
    setUserAvatar(user ? user.user_metadata.avatar_url : ``)
    setUserProvider(user ? user.app_metadata.provider : ``)
    setUserEmail(user ? user.email : ``)
    if (isLoggedIn) {
      formRef.current.classList.add(`logged-in`)
      formRef.current.classList.remove(`logged-out`)
    } else {
      formRef.current.classList.add(`logged-out`)
      formRef.current.classList.remove(`logged-in`)
    }
  })

  const handleClick = () => {
    if (isLoggedIn) {
      formRef.current.classList.add(`open`)
      formRef.current.classList.remove(`closed`)
    } else {
      setDialog(true)
    }
    if (value === `Leave a comment!`) {
      setValue(``)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    if (isLoggedIn === false) {
      console.log(`User is not logged in.`)
    }
    if (
      value === `Leave a comment!` ||
      value === ``
    ) {
      commentSubmittedRef.current.classList.add(`active`)
        .then(hideMessage)
        .catch(error => console.log(error))
    }
    fetch(`/`, {
      method: `POST`,
      headers: { 'Content-Type': `application/x-www-form-urlencoded` },
      body: encode({
        'form-name': form.getAttribute(`name`),
        postId: postId,
        postSlug: postSlug,
        authorName: authorName,
        authorId: authorId,
        userId: userId,
        userName: userName,
        userAvatar: userAvatar,
        userProvider: userProvider,
        userEmail: userEmail,
        commentBody: value,
      }),
    })
      .then(() => setValue(`Leave a comment!`))
      .then(formRef.current.classList.add(`closed`))
      .then(formRef.current.classList.remove(`open`))
      .then(commentSubmittedRef.current.classList.add(`active`))
      .then(hideMessage)
      .catch(error => console.log(error))
  }
  const handleLogin = (u) => {
    setUserId(u.id)
    setUserName(u.user_metadata.full_name)
    setUserAvatar(u.user_metadata.user_avatar)
    setUserProvider(u.app_metadata.provider)
    setUserEmail(u.email)
  }
  const handleLogout = () => {
    setUserId(``)
    setUserName(``)
    setUserAvatar(``)
    setUserProvider(``)
    setUserEmail(``)
  }
  const hideMessage = () => {
    wait(2000)
      .then(() => commentSubmittedRef.classList.add(`inactive`))
      .catch(error => console.log(error))
  }

  return (
    <>
      {/* Success message for submitted comments. */}
      <div className="submission-message success" ref={commentSubmittedRef}>
        <div className="message">
          <FaCheck className="icon"/>
          <div>Comment Submitted!</div>
        </div>
        <p>Your comment will be visible shortly.</p>
      </div>

      {/* Success message for submitted comments. */}
      <div className="submission-message failure" ref={commentFailedRef}>
        <div className="message">
          <FaRegWindowClose className="icon"/>
          <div>Comment failed to submit!</div>
        </div>
        <p>Make sure your comment body was not left empty.</p>
      </div>

      <div
        className={`form-container closed ${
          isLoggedIn ? `logged-in` : `logged-out`
        } `}
        ref={formRef}
        onClick={handleClick}
      >
        <form
          name="comments"
          netlify
          data-netlify
          data-netlify-honeypot="streetAddress"
          method="post"
          onSubmit={handleSubmit}
        >

          {/* Netlify ID of the user. */}
          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userId">
              User ID
            </label>
            <input id="userId" name="userId" type="text" value={userId}/>
          </fieldset>

          {/* Ghost slug of the current post. */}
          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="postSlug">
              Post Slug
            </label>
            <input id="postSlug" name="postSlug" type="text" value={postSlug}/>
          </fieldset>

          {/* Ghost ID of the current post. */}
          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="postId">
              Post ID
            </label>
            <input id="postId" name="postId" type="text" value={postId}/>
          </fieldset>

          {/* User's email address. */}
          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userEmail">
              User Email
            </label>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              value={userEmail}
            />
          </fieldset>

          {/* User's name (optional). */}
          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userName">
              User Name
            </label>
            <input id="userName" name="userName" type="text" value={userName}/>
          </fieldset>

          {/* User's avatar (optional). */}
          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userAvatar">
              User Avatar
            </label>
            <input
              id="userAvatar"
              name="userAvatar"
              type="text"
              value={userAvatar}
            />
          </fieldset>

          {/* Method by which the user created their account. */}
          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userProvider">
              User Provider
            </label>
            <input
              id="userProvider"
              name="userProvider"
              type="text"
              value={userProvider}
            />
          </fieldset>

          {/* Primary author's name. */}
          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="authorName">
              Author Name
            </label>
            <input
              id="authorName"
              name="authorName"
              type="text"
              value={authorName}
            />
          </fieldset>

          {/* Primary author's ID. */}
          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="authorEmail">
              Author ID
            </label>
            <input
              id="authorId"
              name="authorId"
              type="text"
              value={authorId}
            />
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="streetAddress">
              Address
            </label>
            <input id="streetAddress" name="streetAddress" type="hidden"/>
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="commentBody">
              Comment
            </label>
            <textarea
              id="commentBody"
              name="commentBody"
              value={value}
            />
          </fieldset>

          {/* Markdown textarea for user comments */}
          <ReactMde
            ref={textAreaRef}
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={
              markdown => Promise.resolve(converter.makeHtml(markdown))
            }
            placeholder={`Leave a comment!`}
            onClick={handleClick}
            minEditorHeight={100}
            maxEditorHeight={200}
            minPreviewHeight={50}
            initialEditorHeight={50}
          />
          {isLoggedIn ? (
            <input
              className="comment-btn submit"
              type="submit"
              value="Submit"
            />
          ) : (
            <div className="comment-login login">
              <a>Sign in to comment</a> <FaRegComment/>
            </div>
          )}
        </form>
      </div>
      <IdentityModal
        showDialog={dialog}
        onCloseDialog={() => setDialog(false)}
        onLogin={u => handleLogin(u)}
        onSignup={u => handleLogin(u)}
        onLogout={() => handleLogout()}
      />
    </>
  )
}

CommentForm.propTypes = {
  post: PropTypes.shape({
    ghostId: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    primary_author: PropTypes.object.isRequired,
    comment_id: PropTypes.string.isRequired,
  }).isRequired,
  identity: PropTypes.object,
}

export default CommentForm
