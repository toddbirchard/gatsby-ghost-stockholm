import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../../styles/post-card.less'

const PostCard = ({ post }) => {
  const url = post.slug.includes(`lynx`) ? `/roundup/${post.slug}/` : `/${post.slug}/`
  const readingTime = readingTimeHelper(post)
  const authorFirstName = post.primary_author.name ? post.primary_author.name.split(` `)[0] : null

  return (
    <div className="post-card">
      <Link to={url}>
        <picture>
          {/*<source data-srcset={post.feature_image.replace(`.jpg`, `@2x.webp`)} type="image/webp" alt={post.title} />*/}
          {/*<source data-src={post.feature_image.replace(`.jpg`, `@2x.jpg`)} type="image/jpeg" alt={post.title} />*/}
          <img className="post-card-image lazyload" data-src={post.feature_image.replace(`.jpg`, `@2x.jpg`)} type="image/jpeg" alt={`Feature image for ${post.title}`} title={post.title}/>
        </picture>
      </Link>
      {post.featured && <span>Featured</span>}
      <div className="post-card-detail">
        <Link to={url}>
          <h2 className="post-card-title">{post.title}</h2>
        </Link>
        {post.excerpt && <section className="post-card-excerpt">{post.excerpt}</section> }
        <footer className="post-card-footer">
          {post.tags ? <div className="meta-item tag">
            <FontAwesomeIcon icon={[`fas`, `tags`]} size="xs" swapOpacity/>
            <Tags post={post} limit={1} visibility="public" autolink={true} permalink="/tag/:slug" separator={null} classes={post.id}/>
          </div> : null}
          <div className="meta-item reading-item">
            <FontAwesomeIcon icon={[`fas`, `eye`]} size="xs"/>
            <span>{readingTime}</span>
          </div>
          {post.primary_author && <div className="meta-item author">
            <Link to={`/author/${post.primary_author.slug}`}>
              <FontAwesomeIcon icon={[`fas`, `user-edit`]} size="xs"/>
              <span>{authorFirstName}</span>
            </Link>
          </div>}
          <div className="meta-item date">
            <FontAwesomeIcon icon={[`fas`, `calendar`]} size="xs"/>
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
