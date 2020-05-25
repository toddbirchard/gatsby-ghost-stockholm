import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { FaUserEdit } from 'react-icons/fa'

const PostCard = ({ post }) => {
  const url = post.slug.includes(`lynx`) ? `/roundup/${post.slug}/` : `/${post.slug}/`
  const readingTime = readingTimeHelper(post)
  const authorFirstName = post.primary_author.name ? post.primary_author.name.split(` `)[0] : null
  const authorAvatar = post.primary_author.profile_image ? post.primary_author.profile_image : null
  const createdDate = post.created_at_pretty

  return (
    <div className="post-card">
      <Link to={url}>
        <picture>
          {post.feature_image && <img className="post-card-image lazyload" data-src={post.feature_image.replace(`.jpg`, `@2x.jpg`)} type="image/jpeg" alt={`Feature image for ${post.title}`} title={post.title} />}
        </picture>
      </Link>
      {post.featured && <span>Featured</span>}
      <div className="post-card-detail">
        {post.tags ?
          <div className={`primary-tag ${post.tags[0].slug}`}>
            <Tags post={post} limit={1} visibility="public" autolink permalink="/tag/:slug" class=":slug" separator={null} classes={post.id} />
          </div>
          : null}
        <Link to={url}>
          <h2 className="post-card-title">{post.title}</h2>
        </Link>
        {post.excerpt &&
          <section className="post-card-excerpt">{post.excerpt}</section>
        }
        <footer className="post-card-footer">
          {post.primary_author ?
            <div className="meta-items">
              {authorAvatar
                ? <img src={authorAvatar} alt={authorFirstName} className="author-avatar" />
                : <FaUserEdit /> }
              <div>
                <Link to={`/author/${post.primary_author.slug}`} className="author-name">{authorFirstName}</Link>
                <div className="post-card-meta-info">
                  <span className="meta-item date">{createdDate}</span>
                  <span className="meta-item separator">•</span>
                  <span className="meta-item reading-time">{readingTime}</span>
                </div>
              </div>
            </div> : null}
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
    created_at_pretty: PropTypes.string,
    primary_author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      profile_image: PropTypes.string,
    }).isRequired,
    primary_tag: PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    }),
  }).isRequired,
}

export default PostCard
