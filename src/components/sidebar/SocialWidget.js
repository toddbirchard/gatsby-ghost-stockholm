import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import config from '../../utils/siteConfig'

/**
* Social widget
*/

const SocialWidget = ({ site }) => {
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.twitter ? `https://facebook.com/${site.facebook.replace(/^@/, ``)}` : null

    return (
        <>
            <div className="widget social">
                <a href={ twitterUrl } className="twitter" key="twitter-sidebar" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fab`, `twitter`]} size="xs" /></a>
                <a href={ config.social.mediumProfile } className="medium" key="medium-sidebar" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fab`, `medium`]} size="xs" /></a>
                <a href={ config.social.linkedinProfile } className="linkedin" key="linkedin-sidebar" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fab`, `linkedin`]} size="xs" /></a>
                <a href={ config.social.githubProfile } className="github" key="github-sidebar" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fab`, `github`]} size="xs" /></a>
                <a href={ facebookUrl } className="facebook" key="facebook-sidebar" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fab`, `facebook`]} size="xs" /></a>
                <a href={ config.social.feedlyProfile } className="rss" key="rss-sidebar" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={[`fad`, `rss-square`]} size="xs" /></a>
            </div>
        </>
    )
}

SocialWidget.propTypes = {
    site: PropTypes.shape({
        twitter: PropTypes.string,
        facebook: PropTypes.string,
    }),
}

export default SocialWidget
