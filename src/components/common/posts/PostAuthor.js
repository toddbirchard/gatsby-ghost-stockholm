import React from 'react'
import PropTypes from 'prop-types'

// import { faUserEdit, faGlobe, fa } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Link } from 'gatsby'


const PostAuthor = ({ author }) => {
    const authorTwitterUrl = author.twitter ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}` : null
    const authorFacebookUrl = author.facebook ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}` : null

    return (
            <>
              <div className="post-author">
                <div className="post-author-image">
                    {author.profile_image ? <img src={author.profile_image} alt={author.name} /> : <FontAwesomeIcon icon="user-edit" /> }
                </div>
                  <div className="post-author-content">
                      <Link to={`/author/${author.slug}`} className="post-author-name">{author.name}</Link>
                      <div className="post-author-meta">
                          {author.postCount && <span className="post-author-item"><FontAwesomeIcon icon={[`fas`, `pencil-alt`]} />{author.postCount} Posts</span>}
                          {author.location && <span className="post-author-item"><FontAwesomeIcon icon={[`fas`, `home`]} />{author.location}</span>}
                          {author.website && <a href="post-author-item" className="post-author-item" to={author.website} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fas`, `globe`]} />Website</a>}
                          {authorTwitterUrl && <a href="post-author-item" className="post-author-item" to={ authorTwitterUrl } target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fab`, `twitter`]} />Twitter</a>}
                          {authorFacebookUrl && <a href="post-author-item" className="post-author-item" to={ authorFacebookUrl } target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fab`, `facebook`]} />Facebook</a>}
                      </div>
                      {author.bio && <p className="post-author-bio">{author.bio}</p>}
                  </div>

              </div>
            </>
    )
}

PostAuthor.propTypes = {
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        profile_image: PropTypes.string.isRequired,
        website: PropTypes.string,
        twitter: PropTypes.string,
        facebook: PropTypes.string,
        postCount: PropTypes.number.isRequired,
    }).isRequired,
}

export default PostAuthor
