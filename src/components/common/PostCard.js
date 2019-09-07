import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { faTag, faEye } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faTag, faEye)

const PostCard = ({ post }) => {
    const url = `/${ post.slug }/`
    const readingTime = readingTimeHelper(post)

    return (<Link to={url} className="post-card">
        {
            post.feature_image && <div className="post-card-image" style={{
                backgroundImage: `url(${post.feature_image})`
            }}></div>
        }
        {post.featured && <span>Featured</span>}
        <div className="post-card-detail">
            <h2 className="post-card-title">{post.title}</h2>
            <section className="post-card-excerpt">{post.excerpt}</section>
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                    <div className="meta-item tag">
                        <FontAwesomeIcon icon="tag" />
                        {post.tags && <Tags post={post} limit={1} visibility="public" autolink={false}/>}
                    </div>
                    <div className="meta-item reading-item"> <FontAwesomeIcon icon="eye" /> {readingTime} </div>
                    <div className="meta-item author"> <Link to={`/author/${post.primary_author.slug}`}><FontAwesomeIcon icon="user-edit" />{post.primary_author.name} </Link></div>
                    <div className="meta-item date"> <FontAwesomeIcon icon="eye" />{post.published_at_pretty} </div>
                </div>
            </footer>
        </div>
    </Link>)
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(PropTypes.object.isRequired),
        excerpt: PropTypes.string.isRequired,
        published_at: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string }).isRequired
    }).isRequired
}

export default PostCard
