import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { FaPencilAlt, FaTwitter, FaHome, FaGlobe } from 'react-icons/fa'

import '../../styles/author-card.less'

const AuthorCard = ({ author, page, template, pageContext }) => {
  const authorTwitterUrl = author.twitter ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}` : null
  const pageCount = pageContext && pageContext.humanPageNumber > 1 ? pageContext.humanPageNumber : null

  return (
    <>
      <div className={`author-card ${page}`}>
        <div className="author-card-head">
          <div className="author-card-image">
            {author.profile_image ? <img className="lazyload" data-src={author.profile_image} alt={`${author.name}'s avatar`} title={author.name}/> : <img className="lazyload" data-src="/images/icons/avatar.svg" alt={author.name} title={author.name}/>}
          </div>
          <div className="author-card-content">
            {template === `author-template` ? <h1 className="author-card-name">{author.name}{pageCount && <span>{` (page ${pageCount})`}</span>}</h1> : <Link to={`/author/${author.slug}`} className="author-card-name">{author.name}</Link>}
            <div className="author-card-meta">
              {author.postCount && <div className="author-card-item"><FaPencilAlt /> <span>{author.postCount} Posts</span></div>}
              {author.location && <div className="author-card-item location"><FaHome /> <span>{author.location}</span></div>}
              {author.website && <div className="author-card-item"><a href={author.website} target="_blank" rel="noopener noreferrer"><FaGlobe /> <span>Website</span></a></div>}
              {authorTwitterUrl && <div className="author-card-item"><a href={ authorTwitterUrl } target="_blank" rel="noopener noreferrer"><FaTwitter /> <span>Twitter</span></a></div>}
            </div>
            {author.bio && <p className="author-card-bio">{author.bio}</p>}
          </div>
        </div>
        {author.bio && <p className="author-card-bio-mobile">{author.bio}</p>}
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
    postCount: PropTypes.number,
    location: PropTypes.string,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
  template: PropTypes.string,
  page: PropTypes.string.isRequired,
}

export default AuthorCard
