import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { faTag, faEye, faPencilAlt, faUserEdit, faCalendar } from '@fortawesome/pro-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faTag, faEye, faPencilAlt, faUserEdit, faCalendar)

const PostCard = ({ post }) => {
    const url = `/${ post.slug }/`
    const readingTime = readingTimeHelper(post)
    const authorFirstName = post.primary_author.name.split(' ')[0]

    return (<div className="post-card">
        {
            post.feature_image && <Link to={url}><img className="post-card-image" src={post.feature_image} /></Link>
        }
        {post.featured && <span>Featured</span>}
        <div className="post-card-detail">
            <Link to={url}><h2 className="post-card-title">{post.title}</h2></Link>
            <section className="post-card-excerpt">{post.excerpt}</section>
            <footer className="post-card-footer">
                <div className="post-card-footer-left">
                    <div className="meta-item tag">
                        <FontAwesomeIcon icon={[`far`, `tag`]} />
                        {post.tags && <Tags post={post} limit={1} visibility="public" autolink={false}/>}
                    </div>
                    <div className="meta-item reading-item"> <FontAwesomeIcon icon={[`far`, `eye`]} /> <span>{readingTime}</span> </div>
                    <div className="meta-item author"> <Link to={`/author/${post.primary_author.slug}`}><FontAwesomeIcon icon={[`far`, `user-edit`]} /><span>{authorFirstName}</span> </Link></div>
                    <div className="meta-item date"> <FontAwesomeIcon icon={[`far`, `calendar`]} /> <span>{post.published_at_pretty}</span> </div>
                </div>
            </footer>
        </div>
    </div>)
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.object.isRequired,
        excerpt: PropTypes.string,
        published_at_pretty: PropTypes.string.isRequired,
        primary_author: PropTypes.shape(
            { name: PropTypes.string.isRequired,
                slug: PropTypes.string.isRequired,
                profile_image: PropTypes.string }).isRequired,
    }).isRequired,
}

export default PostCard
