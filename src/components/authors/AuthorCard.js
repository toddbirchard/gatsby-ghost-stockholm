import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'


const AuthorCard = ({ author }) => {
    const authorTwitterUrl = author.twitter ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}` : null
    const authorFacebookUrl = author.facebook ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}` : null

    return (
            <>
              <header className="author-card info-card">
                <div className="author-card-image">
                    {author.profile_image ? <img src={author.profile_image} alt={author.name} /> : <FontAwesomeIcon icon="user-edit" /> }
                </div>
                  <div className="author-card-content">
                      <Link to={`/author/${author.slug}`} className="author-card-name">{author.name}</Link>
                      <div className="author-card-meta">
                          {author.postCount && <span className="author-card-item"><FontAwesomeIcon icon={[`far`, `pencil-alt`]} />{author.postCount} Posts</span>}
                          {author.location && <span className="author-card-item"><FontAwesomeIcon icon={[`far`, `home`]} />{author.location}</span>}
                          {author.website && <a href="author-card-item" className="author-card-item" to={author.website} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`far`, `globe`]} />Website</a>}
                          {authorTwitterUrl && <a href="author-card-item" className="author-card-item" to={ authorTwitterUrl } target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fab`, `twitter`]} />Twitter</a>}
                          {authorFacebookUrl && <a href="author-card-item" className="author-card-item" to={ authorFacebookUrl } target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fab`, `facebook`]} />Facebook</a>}
                      </div>
                      {author.bio && <p className="author-card-bio">{author.bio}</p>}
                  </div>
              </header>
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
    }).isRequired,
}

export default AuthorCard
