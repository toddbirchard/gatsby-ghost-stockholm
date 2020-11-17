import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { FaClock } from 'react-icons/fa'

const SeriesPostCard = ({ post, count }) => {
  const route = post.slug.includes(`lynx`) ? `/roundup/${post.slug}` : `/${post.slug}`
  const readingTime = readingTimeHelper(post)
  const postNumber = count + 1

  return (
    <>
      <div className="series-post-card">
        <div className="series-post-number">{postNumber}</div>
        <div className="series-post-card-detail">
          <h2 className="series-post-card-title">
            <Link to={route}>
              <span className="series-post-title-text">{post.title}</span>
            </Link>
          </h2>
          <div className="excerpt">{post.excerpt}</div>
          <div className="reading-time"><FaClock /> <span>{readingTime}</span></div>
        </div>
      </div>
    </>
  )
}

SeriesPostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    published_at: PropTypes.string.isRequired,
  }).isRequired,
  count: PropTypes.number,
}

export default SeriesPostCard
