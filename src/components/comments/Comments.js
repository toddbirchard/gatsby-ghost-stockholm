import React from "react"
import PropTypes from 'prop-types'
import { CommentForm, Comment } from "./"

const Comments = ({ data, comments, moderators }) => {
  const post = data.ghostPost

  return (
    <>
      <div id="comments" className="markdown-render">
        {comments &&
        <div className="user-comments">
          {comments.map(({ node }) => (
            <Comment
              key={node.comment_id}
              comment={node}
              moderators={moderators}
            />
          ))}
        </div>
        }
        <CommentForm post={post} />
      </div>
    </>
  )
}

Comments.propTypes = {
  data: PropTypes.object.isRequired,
  identity: PropTypes.object,
  comments: PropTypes.array,
  moderators: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ),
}

export default Comments
