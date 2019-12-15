import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'

const AuthorCard = ({ author, headerClass, page }) => {
    const authorTwitterUrl = author.twitter ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}` : null
    const authorFacebookUrl = author.facebook ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}` : null
    const classes = headerClass ? `author-card info-card` : `author-card`

    return (
            <>
              <div className={`${classes} ${page}`}>
                  <div className="author-card-head">
                      <div className="author-card-image">
                          {author.profile_image ? <img className="lazyload" data-src={author.profile_image} alt={author.name} /> : <img className="lazyload" data-src="/images/icons/avatar.svg" alt={author.name} />}
                      </div>
                      <div className="author-card-content">
                          <Link to={`/author/${author.slug}`} className="author-card-name">{author.name}</Link>
                          <div className="author-card-meta">
                              {author.postCount && <span className="author-card-item"><FontAwesomeIcon icon={[`fad`, `pencil-alt`]} size="xs" />{author.postCount} Posts</span>}
                              {author.location && <span className="author-card-item location"><FontAwesomeIcon icon={[`fad`, `home`]} size="xs" />{author.location}</span>}
                              {author.website && <a className="author-card-item" href={author.website} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fad`, `globe`]} size="xs" />Website</a>}
                              {authorTwitterUrl && <a className="author-card-item" href={ authorTwitterUrl } target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fab`, `twitter`]} size="xs" />Twitter</a>}
                              {authorFacebookUrl && <a className="author-card-item" href={ authorFacebookUrl } target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fab`, `facebook`]} size="xs" />Facebook</a>}
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
        bio: PropTypes.string.isRequired,
        profile_image: PropTypes.string,
        website: PropTypes.string,
        twitter: PropTypes.string,
        facebook: PropTypes.string,
        postCount: PropTypes.number,
        location: PropTypes.string,
        slug: PropTypes.string,
    }).isRequired,
    headerClass: PropTypes.string,
    page: PropTypes.string.isRequired,
}

export default AuthorCard
