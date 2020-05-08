import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { FaEye, FaTags, FaCalendar, FaUserEdit } from 'react-icons/fa'

const PostCard = ({ post }) => {
  const url = post.slug.includes(`lynx`) ? `/roundup/${post.slug}/` : `/${post.slug}/`
  const readingTime = readingTimeHelper(post)
  const authorFirstName = post.primary_author.name ? post.primary_author.name.split(` `)[0] : null

  return (
    <div className="post-card">
      <Link to={url}>
        <picture>
          {post.feature_image && <img className="post-card-image lazyload" data-src={post.feature_image.replace(`.jpg`, `@2x.jpg`)} type="image/jpeg" alt={`Feature image for ${post.title}`} title={post.title} />}
        </picture>
      </Link>
      {post.featured && <span>Featured</span>}
      <div className="post-card-detail">
        <Link to={url}>
          <h2 className="post-card-title">{post.title}</h2>
        </Link>
        {post.excerpt && <section className="post-card-excerpt">{post.excerpt}</section>}
        <footer className="post-card-footer">
          {post.tags ?
            <div className="meta-item tag">
              <FaTags />
              <Tags post={post} limit={1} visibility="public" autolink permalink="/tag/:slug" separator={null} classes={post.id} />
            </div>
            : null}
          <div className="meta-item reading-item">
            <FaEye />
            <span>{readingTime}</span>
          </div>
          {post.primary_author ?
            <div className="meta-item author">
              <Link to={`/author/${post.primary_author.slug}`}>
                <FaUserEdit />
                <span>{authorFirstName}</span>
              </Link>
            </div> : null}
          <div className="meta-item date">
            <FaCalendar />
            <span>{post.published_at_pretty}</span>
          </div>
        </footer>
      </div>
    </div>
  )
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
    published_at_pretty: PropTypes.string,
    primary_author: PropTypes.shape(
      {
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        profile_image: PropTypes.string,
      }).isRequired,
  }).isRequired,
}

export default PostCard
