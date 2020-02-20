import React from 'react'
import PropTypes from 'prop-types'
import { AboutWidget,
    NewsletterWidget,
    SocialWidget,
    TagsWidget,
    TrendingWidget,
    TwitterWidget } from '.'
import { AuthorTrending } from '../authors'

import '../../styles/sidebar.less'

/**
* Sidebar
*/

const Sidebar = ({ site, template, authorData }) => (
    <>
        <aside className="sidebar">
            {template === `home-template` ? <AboutWidget site={site} /> : null }
            {template === `author-template` ? <AuthorTrending authorData={authorData} /> : null }
            <SocialWidget site={site} />
            {template === `home-template` ? <TrendingWidget /> : null }
            <TagsWidget />
            <NewsletterWidget />
            <TwitterWidget />
        </aside>
    </>
)

Sidebar.propTypes = {
    site: PropTypes.shape({
        logo: PropTypes.string,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        twitter: PropTypes.string,
        facebook: PropTypes.string,
    }).isRequired,
    template: PropTypes.string.isRequired,
    authorData: PropTypes.object,
}

export default Sidebar
