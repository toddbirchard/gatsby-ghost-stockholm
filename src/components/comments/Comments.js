import React, { Suspense } from "react"
import PropTypes from 'prop-types'
import { CommentForm, Comment } from './'

const Comments = ({ data, moderators }) => {
  const post = data.ghostPost
  const comments = data.comments && data.comments.edges

  return (
    <>
      <Suspense fallback={<div><p>Loading comments...</p></div>}>
        <div id="comments" className="markdown-render">
          {comments && (
            <div className="user-comments">
              {comments.map(({ node }) => (
                <Comment
                  key={node.comment_id}
                  comment={node}
                  moderators={moderators}
                />
              ))}
            </div>
          )}
          <CommentForm post={post}/>
        </div>
      </Suspense>
    </>
  )
}

Comments.propTypes = {
  data: PropTypes.object.isRequired,
  identity: PropTypes.object,
  comments: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        body: PropTypes.string,
        user_name: PropTypes.string,
        user_avatar: PropTypes.string,
        user_email: PropTypes.string,
        user_role: PropTypes.string,
        created_at: PropTypes.string,
      }),
    ),
  }),
  moderators: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
}

export default Comments
