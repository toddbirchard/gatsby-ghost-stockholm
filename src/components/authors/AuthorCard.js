import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { twitter } from '@tryghost/social-urls'
import { AiOutlineFile, AiOutlineTwitter, AiOutlineHome, AiOutlineLink, AiOutlineUser } from 'react-icons/ai'

import '../../styles/author-card.less'

const AuthorCard = ({ author, page, template, pageContext }) => {
  const authorTwitterUrl = author.twitter && twitter(author.twitter)
  const pageCount = pageContext && pageContext.humanPageNumber > 1 ? pageContext.humanPageNumber : null
  const authorCardClass = page ? `author-card ${page}` : `author-card`

  return (
    <>
      <div className={authorCardClass}>
        <div className="author-card-head">
          <div className="author-card-image">
            {author.profile_image
              ? <img className="lazyload" data-src={author.profile_image} alt={`${author.name}'s avatar`} title={author.name} />
              : <AiOutlineUser />
            }
          </div>
          <div className="author-card-content">
            {template === `author-template`
              ? <h1 className="author-card-name">{author.name}{pageCount && <span>{` (page ${pageCount})`}</span>}</h1>
              : <Link to={`/author/${author.slug}/`} className="author-card-name">{author.name}</Link>
            }
            <div className="author-card-meta">
              {author.count.posts &&
                <div className="author-card-item">
                  <AiOutlineFile /><span>{author.count.posts} Posts</span>
                </div>
              }
              {author.location &&
                <div className="author-card-item location">
                  <AiOutlineHome /><span>{author.location}</span>
                </div>
              }
              {author.website &&
                <div className="author-card-item">
                  <a href={author.website} target="_blank" rel="noopener noreferrer">
                    <AiOutlineLink /><span>Website</span>
                  </a>
                </div>
              }
              {authorTwitterUrl &&
                <div className="author-card-item">
                  <a href={authorTwitterUrl} target="_blank" rel="noopener noreferrer">
                    <AiOutlineTwitter /><span>Twitter</span>
                  </a>
                </div>
              }
            </div>
            {author.bio && <p className="author-card-bio">{author.bio}</p>}
          </div>
        </div>
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
    count: PropTypes.shape({
      posts: PropTypes.number,
    }),
    location: PropTypes.string,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
  template: PropTypes.string,
  page: PropTypes.string.isRequired,
}

export default AuthorCard
