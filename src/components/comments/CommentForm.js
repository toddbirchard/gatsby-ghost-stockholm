import React, { useState } from "react"
import PropTypes from 'prop-types'
import fetch from 'node-fetch'
import ReactMde from "react-mde"
import * as Showdown from "showdown"
import "react-mde/lib/styles/css/react-mde-all.css"
import CommentSubmit from "./CommentSubmit"

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

  const handleClick = (e) => {
    e.target.classList.add(`open`)
    ref.current.classList.add(`open`)
    value === `Have something to say?` ? setValue(``) : null
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
      >
        <fieldset>
          <label className="hidden-label" htmlFor="commentBody">Post comment</label>
          <ReactMde
            id="commentBody"
            name="commentBody"
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
