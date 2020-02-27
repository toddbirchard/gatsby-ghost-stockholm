import React from 'react'
import PropTypes from 'prop-types'
import { AboutWidget,
    NewsletterWidget,
    SocialWidget,
    TagsWidget,
    TrendingWidget,
    TwitterWidget } from '.'
import { AuthorTrendingWidget,
    AuthorTwitterWidget } from './authors'

import '../../styles/sidebar.less'

/**
* Sidebar
*/

const Sidebar = ({ site, template, authorData }) => {
    const authorTwitterData = authorData && authorData.authorTwitterProfile

    return (
        <>
            <aside className="sidebar">
                {template === `home-template` ? <AboutWidget site={site} /> : null }
                <SocialWidget site={site} />
                {template === `author-template` ? <AuthorTrendingWidget authorData={authorData} /> : <TrendingWidget /> }
                {template === `home-template` ? <TagsWidget /> : null }
                {template === `home-template` ? <NewsletterWidget /> : null }
                {template === `home-template` ? <TwitterWidget /> : null }
                {authorTwitterData && <AuthorTwitterWidget data={authorTwitterData} />}
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
    template: PropTypes.string.isRequired,
    authorData: PropTypes.object,
}

export default Sidebar
