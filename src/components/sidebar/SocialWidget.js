import React from 'react'
import PropTypes from 'prop-types'
import { FaTwitter, FaMedium, FaLinkedin, FaGithub, FaFacebook, FaRssSquare } from 'react-icons/fa'

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
        <a href={ twitterUrl } className="twitter" key="twitter-sidebar" target="_blank" rel="noopener noreferrer"><button aria-label="twitter"><FaTwitter /></button></a>
        <a href={ config.social.medium } className="medium" key="medium-sidebar" target="_blank" rel="noopener noreferrer"><button aria-label="medium"><FaMedium /></button></a>
        <a href={ config.social.linkedin } className="linkedin" key="linkedin-sidebar" target="_blank" rel="noopener noreferrer"><button aria-label="linkedin"><FaLinkedin /></button></a>
        <a href={ config.social.github } className="github" key="github-sidebar" target="_blank" rel="noopener noreferrer"><button aria-label="github"><FaGithub /></button></a>
        <a href={ facebookUrl } className="facebook" key="facebook-sidebar" target="_blank" rel="noopener noreferrer"><button aria-label="facebook"><FaFacebook /></button></a>
        <a href={ config.social.feedly } className="rss" key="rss-sidebar" target="_blank" rel="noopener noreferrer"><button aria-label="rss"><FaRssSquare /></button></a>
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
