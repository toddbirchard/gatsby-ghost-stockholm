import React from 'react'
import PropTypes from 'prop-types'

/**
* Author Widgets component
*/

const AuthorWidgets = ({ site, tags, template }) => (
    <>
        <aside className="sidebar">
            {template === `home-template` ? <AboutWidget site={site} /> : null }
            <SocialWidget facebookUrl={facebookUrl} twitterUrl={twitterUrl} />
            <TrendingWidget />
            <TagsWidget tags={tags} />
            {/*<SeriesWidget />*/}
            <NewsletterWidget />
            <TwitterWidget />
        </aside>
    </>
)

export default AuthorWidgets
