import React from 'react'
import PropTypes from 'prop-types'

import { Link, StaticQuery, graphql } from 'gatsby'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss, faTag } from '@fortawesome/free-solid-svg-icons'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/

library.add(fab, faRss, faTag)

const Sidebar = ({ site, tags }) => {
    // const site = data.allGhostSettings.edges[0].node
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null

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
                <a href={ twitterUrl } className="twitter"><FontAwesomeIcon icon={[`fab`, `twitter`]} /></a>
                <a href="https://angel.co/todd-birchard?public_profile=1" className="angellist"><FontAwesomeIcon icon={[`fab`, `angellist`]} /></a>
                <a href="https://www.linkedin.com/in/hackersandslackers/" className="linkedin"><FontAwesomeIcon icon={[`fab`, `linkedin`]} /></a>
                <a href="https://github.com/hackersandslackers" className="github"><FontAwesomeIcon icon={[`fab`, `github`]} /></a>
                <a href="https://www.quora.com/profile/Todd-Birchard" className="quora"><FontAwesomeIcon icon={[`fab`, `quora`]} /></a>
                <a href="/rss/" className="rss"><FontAwesomeIcon icon="rss" /></a>
            </div>

            <div className="widget tags">
                {tags.map(({ node }) => (
                    <Link to={`/tag/${ node.slug }`} className="tag" key={ node.name }>{ node.name }</Link>
                ))}
            </div>

            {site.twitter ?
                <div className="widget twitter">
                    <TwitterTimelineEmbed
                        sourceType="profile"
                        options={{ height: 500 }}
                        screenName="HackersSlackers"
                        transparent
                        noScrollbar
                        noHeader
                        noFooter
                        noBorders
                        linkColor="#b15d5d"
                        className="widget twitter"
                    />
                </div> : null }
        </aside>
    </>
    )
}

export default Sidebar
