import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const NextPrev = ({ post }) => {
    const prevURL = post.previous ? post.previous.slug : null
    const nextURL = post.next ? post.next.slug : null

    return (
      <>
        <div className="series-next-prev">
            <h1>test</h1>
            { prevURL ? <div className="series-posts"> prevURL </div> : null }
            { nextURL ? <div className="series-posts"> nextURL </div> : null }
            {/*{ prevPost ?
                <Link to={prevPost.slug}>
                    <div className="series-prev">{prevPost.title}</div>
                    </Link> : null }
            { nextPost ?
                <Link to={nextPost.slug}>
                    <div className="series-next">{nextPost.title}</div>
                </Link> : null }*/}
        </div>
      </>
    )
}

NextPrev.propTypes = {
    prevPost: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
    }),
    nextPost: PropTypes.shape({
        slug: PropTypes.string,
        title: PropTypes.string,
    })
}

export default NextPrev
