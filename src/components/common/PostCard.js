import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const PostCard = ({ post }) => {
    const url = `/${ post.slug }/`
    const readingTime = readingTimeHelper(post)
    const authorFirstName = post.primary_author.name.split(` `)[0]
    const retinaFeatureImage = post.feature_image ? post.feature_image.replace(`q_auto:best`, `f_auto,w_700,dpr_2.0`) : null

    return (<div className="post-card">
        { post.feature_image && <Link to={url}><img className="post-card-image lazyload" data-src={retinaFeatureImage} alt={post.title} /></Link> }
        { post.featured && <span>Featured</span> }
        <div className="post-card-detail">
            <Link to={url}><h2 className="post-card-title">{post.title}</h2></Link>
            <section className="post-card-excerpt">{post.excerpt}</section>
            <footer className="post-card-footer">
                {post.tags ? <div className="meta-item tag">
                    <FontAwesomeIcon icon={[`far`, `tag`]} size="xs" />
                    <Tags post={post} limit={1} visibility="public" autolink={true} permalink="/tag/:slug" separator={null} classes={post.id} />
                </div> : null }
                <div className="meta-item reading-item"> <FontAwesomeIcon icon={[`far`, `eye`]} size="xs" /> <span>{readingTime}</span> </div>
                <div className="meta-item author"> <Link to={`/author/${post.primary_author.slug}`}><FontAwesomeIcon icon={[`far`, `user-edit`]} size="xs" /><span>{authorFirstName}</span> </Link></div>
                <div className="meta-item date"> <FontAwesomeIcon icon={[`far`, `calendar`]} size="xs" /> <span>{post.published_at_pretty}</span> </div>
            </footer>
        </div>
    </div>)
}

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                slug: PropTypes.string.isRequired,
            }),
        ),
        excerpt: PropTypes.string,
        published_at_pretty: PropTypes.string.isRequired,
        primary_author: PropTypes.shape(
            { name: PropTypes.string.isRequired,
                slug: PropTypes.string.isRequired,
                profile_image: PropTypes.string }).isRequired,
    }).isRequired,
}

export default PostCard
