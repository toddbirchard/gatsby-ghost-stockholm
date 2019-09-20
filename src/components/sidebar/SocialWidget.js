import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss, faTag } from '@fortawesome/pro-regular-svg-icons'

/**
* Social widget
*/

library.add(fab, faRss, faTag)

const SocialWidget = ({ twitterUrl, facebookUrl }) => (
      <>
        <div className="widget social">
            <a href={ twitterUrl } className="twitter" key="twitter-sidebar"><FontAwesomeIcon icon={[`fab`, `twitter`]} size="sm" /></a>
            <a href="https://angel.co/company/hackers-and-slackers/" className="angellist" key="angellist-sidebar"><FontAwesomeIcon icon={[`fab`, `angellist`]} size="sm" /></a>
            <a href="https://www.linkedin.com/in/hackersandslackers/" className="linkedin" key="linkedin-sidebar"><FontAwesomeIcon icon={[`fab`, `linkedin`]} size="sm" /></a>
            <a href="https://github.com/hackersandslackers" className="github" key="github-sidebar"><FontAwesomeIcon icon={[`fab`, `github`]} size="sm" /></a>
            <a href={ facebookUrl } className="facebook" key="facebook-sidebar"><FontAwesomeIcon icon={[`fab`, `facebook`]} size="sm" /></a>
            <Link to="/rss/" className="rss" key="rss-sidebar"><FontAwesomeIcon icon={[`far`, `rss`]} size="sm" /></Link>
        </div>
    </>
)

SocialWidget.propTypes = {
    twitterUrl: PropTypes.string,
    facebookUrl: PropTypes.string,
}

export default SocialWidget
