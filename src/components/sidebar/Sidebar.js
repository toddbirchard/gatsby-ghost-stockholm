import React from 'react'
import PropTypes from 'prop-types'

import { AboutWidget, NewsletterWidget, SocialWidget, TagsWidget, TwitterWidget } from '.'

/**
* Sidebar component
*/

const Sidebar = ({ site, tags }) => {
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.twitter ? `https://facebook.com/${site.facebook.replace(/^@/, ``)}` : null

    return (
      <>
        <aside className="sidebar">
            <AboutWidget site={site} />
            <SocialWidget facebookUrl={facebookUrl} twitterUrl={twitterUrl} />
            <TagsWidget tags={tags} />
            <NewsletterWidget />
            <TwitterWidget twitterUrl={twitterUrl} />
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
