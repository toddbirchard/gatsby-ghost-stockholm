import React from 'react'
import PropTypes from 'prop-types'
import { AboutWidget,
    NewsletterWidget,
    SocialWidget,
    TagsWidget,
    TrendingWidget,
    TwitterWidget } from '.'
import { AuthorTrending, AuthorPocket } from '../authors'

/**
* Sidebar component
*/

const Sidebar = ({ site, tags, template, authorData }) => {
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.twitter ? `https://facebook.com/${site.facebook.replace(/^@/, ``)}` : null

    return (
        <>
            <aside className="sidebar">
                {template === `home-template` ? <AboutWidget site={site} /> : null }
                {template === `author-template` ? <AuthorTrending authorData={authorData} /> : null }
                <SocialWidget facebookUrl={facebookUrl} twitterUrl={twitterUrl} />
                {template === `home-template` ? <TrendingWidget /> : null }
                <TagsWidget tags={tags} />
                <NewsletterWidget />
                <TwitterWidget />
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
    template: PropTypes.string.isRequired,
}

export default Sidebar
