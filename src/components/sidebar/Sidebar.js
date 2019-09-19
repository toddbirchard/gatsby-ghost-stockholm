import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'gatsby'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss, faTag } from '@fortawesome/pro-regular-svg-icons'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

/**
* Sidebar component
*/

library.add(fab, faRss, faTag)

const Sidebar = ({ site, tags }) => {
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.twitter ? `https://facebook.com/${site.facebook.replace(/^@/, ``)}` : null
    const newsletterCopy = `Are you into data to the point where it's almost embarrasing? Toss us your email and we'll promise to only give you the good stuff.`

    return (
      <>
        <aside className="sidebar">
            <div className="widget about">
                <Link to="/" className="about-logo-link">
                    {site.logo ? <img className="site-logo" src={site.logo} alt={site.title} /> : <h1> {site.title} </h1> }
                </Link>
                <p className="description">{site.description}</p>
            </div>

            <div className="widget social">
                <a href={ twitterUrl } className="twitter" key="twitter-sidebar"><FontAwesomeIcon icon={[`fab`, `twitter`]} size="sm" /></a>
                <a href="https://angel.co/company/hackers-and-slackers/" className="angellist" key="angellist-sidebar"><FontAwesomeIcon icon={[`fab`, `angellist`]} size="sm" /></a>
                <a href="https://www.linkedin.com/in/hackersandslackers/" className="linkedin" key="linkedin-sidebar"><FontAwesomeIcon icon={[`fab`, `linkedin`]} size="sm" /></a>
                <a href="https://github.com/hackersandslackers" className="github" key="github-sidebar"><FontAwesomeIcon icon={[`fab`, `github`]} size="sm" /></a>
                <a href={ facebookUrl } className="facebook" key="facebook-sidebar"><FontAwesomeIcon icon={[`fab`, `facebook`]} size="sm" /></a>
                <a href="/rss/" className="rss" key="rss-sidebar"><FontAwesomeIcon icon={[`far`, `rss`]} size="sm" /></a>
            </div>

            <div className="widget tags">
                {tags.map(({ node }) => (
                    <Link to={`/tag/${ node.slug }`} className="tag" key={ node.name }>{ node.name }</Link>
                ))}
            </div>

            <div className="widget newsletter">
                <p className="newsletter-description">{newsletterCopy}</p>
                <form name="newsletter" method="POST" netlify data-netlify="true" netlify-honeypot="phone-number" action="/confirmation" >
                    <input className="subscribe-input-class" type="email" name="email" placeholder="Your email address" required />
                    <input className="phone-number" type="phone" name="phone" placeholder="Your phone number" style={{ display: `none` }} />
                    <button type="submit">Send</button>
                </form>
            </div>

            {site.twitter ?
                <div className="widget twitter">
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        options={{ height: 800 }}
                        screenName="HackersSlackers"
                        transparent
                        noScrollbar
                        noHeader
                        noFooter
                        noBorders
                        linkColor="#067bff"
                        className="widget twitter"
                    />
                </div> : null }
        </aside>
    </>
    )
}

Sidebar.propTypes = {
    site: PropTypes.shape({
        logo: PropTypes.string,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        twitter: PropTypes.string,
        facebook: PropTypes.string,
    }).isRequired,
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            slug: PropTypes.string,
            postCount: PropTypes.number,
        })
    ).isRequired,
}

export default Sidebar
