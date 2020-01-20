import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'gatsby'

const AuthorCard = ({ author, headerClass, page, template, pageContext }) => {
    const authorTwitterUrl = author.twitter ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}` : null
    const authorFacebookUrl = author.facebook ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}` : null
    const classes = headerClass ? `author-card info-card` : `author-card`
    const pageCount = pageContext && pageContext.humanPageNumber > 1 ? pageContext.humanPageNumber : null

    return (
        <>
            <div className={`${classes} ${page}`}>
                <div className="author-card-head">
                    <div className="author-card-image">
                        {author.profile_image ? <img className="lazyload" data-src={author.profile_image} alt={author.name} /> : <img className="lazyload" data-src="/images/icons/avatar.svg" alt={author.name} />}
                    </div>
                    <div className="author-card-content">
                        {template === `author-template` ? <h1 className="author-card-name">{author.name}{pageCount && <span>{` (page ${pageCount})`}</span>}</h1> : <Link to={`/author/${author.slug}`} className="author-card-name">{author.name}</Link>}
                        <div className="author-card-meta">
                            {author.postCount && <div className="author-card-item"><FontAwesomeIcon icon={[`fad`, `pencil-alt`]} size="xs" /> <span>{author.postCount} Posts</span></div>}
                            {author.location && <div className="author-card-item location"><FontAwesomeIcon icon={[`fad`, `home`]} size="xs" /> <span>{author.location}</span></div>}
                            {author.website && <div className="author-card-item"><a href={author.website} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fad`, `globe`]} size="xs" /> <span>Website</span></a></div>}
                            {authorTwitterUrl && <div className="author-card-item"><a href={ authorTwitterUrl } target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fab`, `twitter`]} size="xs" /> <span>Twitter</span></a></div>}
                            {authorFacebookUrl && <div className="author-card-item"><a href={ authorFacebookUrl } target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fab`, `facebook`]} size="xs" /> <span>Facebook</span></a></div>}
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
    headerClass: PropTypes.boolean,
    pageContext: PropTypes.object,
    template: PropTypes.string,
    page: PropTypes.string.isRequired,
}

export default AuthorCard
