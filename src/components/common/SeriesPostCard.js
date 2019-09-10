import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'


const SeriesPostCard = ({ post, count }) => {
    const url = `/${ post.slug }/`
    const postNumber = count + 1;

    return (<div className="series-post-card">
        {
            post.feature_image && <Link to={url} className="series-post-card-image"><img src={post.feature_image} /></Link>
        }
        <div className="series-post-card-detail">
            <div className="series-post-card-count"><span>Post</span> {postNumber}</div>
            <Link to={url}><h2 className="series-post-card-title">{post.title}</h2></Link>
            <section className="series-post-card-excerpt">{post.excerpt}</section>
        </div>
    </div>)
}

export default SeriesPostCard
