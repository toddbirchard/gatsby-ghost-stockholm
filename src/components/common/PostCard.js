import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { FaUserEdit } from 'react-icons/fa'
import { getRetinaImageUrl, getMobileImageUrl } from '../../utils/imageUrl'

const PostCard = ({ post }) => {
  const url = post.slug.includes(`lynx`) ? `/roundup/${post.slug}/` : `/${post.slug}/`
  const readingTime = readingTimeHelper(post)
  const authorFirstName = post.primary_author.name ? post.primary_author.name.split(` `)[0] : null
  const authorAvatar = post.primary_author.profile_image ? post.primary_author.profile_image : null
  const createdDate = post.created_at_pretty
  const featureImage = post.feature_image
  const featureRetinaImage = post.feature_image && getRetinaImageUrl(post.feature_image)
  const featureMobileImage = post.feature_image && getMobileImageUrl(post.feature_image)
  // const authorAvatarRetinaImage = authorAvatar && getMobileImageUrl(authorAvatar)

  return (
    <>
      <div className="post-card">
        {featureImage &&
            <Link to={url}>
              <picture>
                <source
                  media="(max-width:600px)"
                  data-srcset={featureMobileImage}
                />
                <source data-srcset={featureRetinaImage} />
                <img
                  className="post-card-image lazyload"
                  data-src={featureImage}
                  alt={post.title}
                  title={post.title}
                />
              </picture>
            </Link>
        }
        <div className="post-card-detail">
          <Link to={url}>
            <h2 className="post-card-title">{post.title}</h2>
          </Link>
          {post.excerpt &&
            <p className="post-card-excerpt">{post.excerpt}</p>
          }
          <footer className="post-card-footer">
            {post.primary_author &&
              <div className="meta-items-left">
                {authorAvatar
                  ? <picture>
                    <source data-srcset={authorAvatar} />
                    <img
                      data-src={authorAvatar}
                      alt={authorFirstName}
                      title={authorFirstName}
                      className="author-avatar lazyload"
                    />
                  </picture>
                  : <FaUserEdit /> }
                <div>
                  <Link to={`/author/${post.primary_author.slug}/`} className="author-name">{authorFirstName}</Link>
                  <div className="post-card-meta-info">
                    <span className="meta-item date">{createdDate}</span>
                    <span className="meta-item separator">•</span>
                    <span className="meta-item reading-time">{readingTime}</span>
                  </div>
                </div>
              </div> }
            {post.primary_tag &&
              <Link
                to={`/tag/${post.primary_tag.slug}/`}
                className="primary-tag"
                style={{
                  background: post.primary_tag.accent_color,
                  border: `1px solid ${post.primary_tag.accent_color}`,
                }}>
                {post.primary_tag.name}
              </Link> }
          </footer>
        </div>
      </div>
    </>
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
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      accent_color: PropTypes.string,
    }),
  }).isRequired,
}

export default PostCard
