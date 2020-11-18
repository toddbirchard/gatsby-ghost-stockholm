import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import fetch from 'node-fetch'
import ReactMde from "react-mde"
import "react-mde/lib/styles/css/react-mde-all.css"
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
  const isLoggedIn = identity.isLoggedIn
  const formRef = React.useRef()
  const messageRef = React.useRef()
  const textAreaRef = React.useRef()
  const [userId, setUserId] = useState(user ? user.id : ``)
  const [userName, setUserName] = useState(user ? user.user_metadata.full_name : ``)
  const [userAvatar, setUserAvatar] = useState(user ? user.user_metadata.avatar_url : ``)
  const [userProvider, setUserProvider] = useState(user ? user.app_metadata.provider : ``)
  const [userEmail, setUserEmail] = useState(user ? user.email : ``)
  const [userRole, setUserRole] = useState(user && user.app_metadata.roles ? user.app_metadata.roles[0] : ``)
  const [value, setValue] = useState(`Have something to say?`)
  const [selectedTab, setSelectedTab] = React.useState(`write`)
  const [dialog, setDialog] = React.useState(false)

  useEffect(() => {
    setUserId(user ? user.id : ``)
    setUserName(user ? user.user_metadata.full_name : ``)
    setUserAvatar(user ? user.user_metadata.avatar_url : ``)
    setUserProvider(user ? user.app_metadata.provider : ``)
    setUserEmail(user ? user.email : ``)
    setUserRole(user && user.app_metadata.roles ? user.app_metadata.roles[0] : ``)
    if (isLoggedIn) {
      formRef.current.classList.add(`logged-in`)
      formRef.current.classList.remove(`logged-out`)
    } else {
      formRef.current.classList.add(`logged-out`)
      formRef.current.classList.remove(`logged-in`)
    }
  })

  const handleClick = () => {
    if (isLoggedIn){
      formRef.current.classList.add(`open`)
      formRef.current.classList.remove(`closed`)
    } else {
      setDialog(true)
    }
    if (value === `Have something to say?`){
      setValue(``)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    if (userEmail.indexOf(`.ru`) > 0) {
      console.log(`Invalid user`)
    } else if (isLoggedIn && value !== `Have something to say?` && value !== `` && value !== undefined) {
      fetch(`/`, {
        method: `POST`,
        headers: { 'Content-Type': `application/x-www-form-urlencoded` },
        body: encode({
          'form-name': form.getAttribute(`name`),
          postId: postId,
          postSlug: postSlug,
          authorName: authorName,
          userId: userId,
          userName: userName,
          userAvatar: userAvatar,
          userProvider: userProvider,
          userEmail: userEmail,
          commentId: commentId,
          commentBody: value,
        }),
      })
        .then(() => setValue(`Have something else to say?`))
        .then(formRef.current.classList.add(`closed`))
        .then(formRef.current.classList.remove(`open`))
        .then(messageRef.current.classList.add(`active`))
        .catch(error => console.log(error))
    }
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

  return (
    <>
      <div className="success-message" ref={messageRef}>
        <div className="message">
          <FaCheck className="icon" /> <span className="">Comment Submitted!</span>
        </div>
        <p>Thanks for contributing! Your comment will be visible shortly.</p>
      </div>

      <div
        className={`form-container closed ${isLoggedIn ? `logged-in` : `logged-out`} `}
        ref={formRef}
        onClick={handleClick}
      >

        <form
          name="comments"
          netlify
          data-netlify="true"
          netlify-honeypot="address"
          method="post"
          onSubmit={handleSubmit}
        >

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="commentId">Comment ID</label>
            <input id="commentId" name="commentId" type="text" value={commentId} />
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="userId" >User ID</label>
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
            <label className="hidden-label" htmlFor="userRole">User Role</label>
            <input id="userRole" name="userRole" type="text" value={userRole} />
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="commentAddress">Address</label>
            <input id="commentAddress" name="address" type="hidden" />
          </fieldset>

          <fieldset className="hidden-label">
            <label className="hidden-label" htmlFor="commentBody">Comment</label>
            <textarea id="commentBody" name="commentBody" value={value} ></textarea>
          </fieldset>

          <ReactMde
            ref={textAreaRef}
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={markdown => Promise.resolve(converter.makeHtml(markdown))}
            placeholder={`What'd you think?`}
            onClick={handleClick}
            minEditorHeight={100}
            maxEditorHeight={200}
            minPreviewHeight={50}
            initialEditorHeight={50}
          />
          {isLoggedIn
            ? <input
              className="comment-btn submit"
              type="submit"
              value="Submit"
            />
            :
            <button
              className="comment-btn login"
            >
              Sign in to Comment
            </button>
          }
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
    primary_author: PropTypes.object,
    comment_id: PropTypes.string.isRequired,
  }).isRequired,
  identity: PropTypes.object,
}

export default CommentForm
