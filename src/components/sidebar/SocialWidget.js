import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import config from '../../utils/siteConfig'

/**
* Social widget
*/

const SocialWidget = ({ twitterUrl, facebookUrl }) => (
      <>
        <div className="widget social">
            <a href={ twitterUrl } className="twitter" key="twitter-sidebar"><FontAwesomeIcon icon={[`fab`, `twitter`]} size="xs" /></a>
            <a href={ config.social.angellist } className="angellist" key="angellist-sidebar"><FontAwesomeIcon icon={[`fab`, `angellist`]} size="xs" /></a>
            <a href={ config.social.linkedin } className="linkedin" key="linkedin-sidebar"><FontAwesomeIcon icon={[`fab`, `linkedin`]} size="xs" /></a>
            <a href={ config.social.github } className="github" key="github-sidebar"><FontAwesomeIcon icon={[`fab`, `github`]} size="xs" /></a>
            <a href={ facebookUrl } className="facebook" key="facebook-sidebar"><FontAwesomeIcon icon={[`fab`, `facebook`]} size="xs" /></a>
            <Link to="/rss" className="rss" key="rss-sidebar"><FontAwesomeIcon icon={[`far`, `rss`]} size="xs" /></Link>
        </div>
    </>
)

SocialWidget.propTypes = {
    twitterUrl: PropTypes.string,
    facebookUrl: PropTypes.string,
}

export default SocialWidget
