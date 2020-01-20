import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const SeriesPostCard = ({ post, count }) => {
    const url = `/${ post.slug }/`
    const postNumber = count + 1

    return (<div className="series-post-card">
        {
            post.feature_image && <Link to={url} className="series-post-card-image"><img className="lazyload" data-src={post.feature_image} alt={post.title}/></Link>
        }
        <div className="series-post-card-detail">
            <div className="series-post-card-count"><span>Post</span> {postNumber}</div>
            <h2 className="series-post-card-title"><Link to={url}>{post.title}</Link></h2>
            <section className="series-post-card-excerpt">{post.excerpt}</section>
        </div>
    </div>)
}

SeriesPostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        excerpt: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        published_at: PropTypes.string.isRequired,
    }).isRequired,
    count: PropTypes.number,
}

export default SeriesPostCard
