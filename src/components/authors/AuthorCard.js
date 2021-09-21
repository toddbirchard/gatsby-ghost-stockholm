import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { twitter } from '@tryghost/social-urls'
import {
  AiOutlineTwitter,
  AiOutlineHome,
  AiOutlineLink,
  AiOutlineUser,
  AiOutlineGithub,
} from 'react-icons/ai'
import '../../styles/author-card.less'

const AuthorCard = ({ author, page, template, pageContext }) => {
  const authorTwitterUrl = author.twitter && twitter(author.twitter)
  const authorGithub =
    author.facebook && author.facebook.replace(`https://www.facebook.com/`, ``)
  const authorPostCount = author.postCount
  const pageCount =
    pageContext && pageContext.currentPage > 1 ? pageContext.currentPage : null
  const authorCardClass = page ? `author-card ${page}` : `author-card`
  const authorAvatar = author.profile_image

  return (
    <>
      <div className={authorCardClass}>
        <div className="author-card-head">
          <div className="author-card-image">
            {author.profile_image ? (
              <picture>
                <source data-srcset={authorAvatar}/>
                <img
                  className="lazyload"
                  data-src={authorAvatar}
                  alt={`${author.name}'s avatar`}
                  title={author.name}
                />
              </picture>
            ) : (
              <AiOutlineUser/>
            )}
          </div>
          <div className="author-card-content">
            {template === `author-template` ? (
              <h1 className="author-card-name">
                {author.name}
                {pageCount && <span>{` (page ${pageCount})`}</span>}
              </h1>
            ) : (
              <div className="author-card-name-wrapper">
                <Link
                  to={`/author/${author.slug}/`}
                  className="author-card-name"
                >
                  {author.name}
                </Link>
                {` `}
                <span className="post-count">{authorPostCount} Posts</span>
              </div>
            )}
            <div className="author-card-meta Posts">
              {/* authorPostCount &&
                <div className="author-card-item postcount">
                  <AiOutlineFile /><span>{authorPostCount} Posts</span>
                </div>
              */}
              {author.location && (
                <div className="author-card-item location">
                  <AiOutlineHome/>
                  <span>{author.location}</span>
                </div>
              )}
              {author.website && (
                <a
                  href={author.website}
                  className="author-card-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineLink/>
                  <span>Site</span>
                </a>
              )}
              {authorGithub && (
                <a
                  href={authorGithub}
                  className="author-card-item github"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineGithub/>
                  <span>Github</span>
                </a>
              )}
              {authorTwitterUrl && (
                <a
                  href={authorTwitterUrl}
                  className="author-card-item twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiOutlineTwitter/>
                  <span>Twitter</span>
                </a>
              )}
            </div>
            {author.bio && <p className="author-card-bio">{author.bio}</p>}
          </div>
        </div>
        <p className="author-card-bio-mobile">{author.bio}</p>
      </div>
    </>
  )
}

AuthorCard.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    profile_image: PropTypes.string,
    website: PropTypes.string,
    twitter: PropTypes.string,
    facebook: PropTypes.string,
    location: PropTypes.string,
    postCount: PropTypes.number,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
  template: PropTypes.string,
  page: PropTypes.string.isRequired,
}

export default AuthorCard
