import React from 'react'
import PropTypes from 'prop-types'
import { AboutWidget,
  NewsletterWidget,
  SocialWidget,
  TagsWidget,
  TrendingWidget,
  TwitterWidget,
  GithubWidget } from '.'
import { AuthorTrendingWidget,
  AuthorTwitterWidget,
  AuthorWebsiteWidget } from './authors'

import '../../styles/sidebar.less'

/**
* Sidebar
*/

const Sidebar = ({ site, template, authorData }) => {
  const authorTwitter = authorData && authorData.authorTwitterProfile
  const authorWebsite = authorData && authorData.ghostAuthor.website
  const corePages = [`home-template`, `page-template`, `tag-template`]
  const isCorePage = corePages.includes(template)

  return (
    <>
      <aside className="sidebar">
        {isCorePage && <AboutWidget site={site} /> }
        {authorWebsite && <AuthorWebsiteWidget authorWebsite={authorWebsite}/> }
        <SocialWidget site={site} />
        {template === `author-template` ? <AuthorTrendingWidget authorData={authorData} /> : <TrendingWidget /> }
        {template != `author-template` ? <TagsWidget /> : null }
        {isCorePage ? <NewsletterWidget /> : null }
        {template === `home-template` ? <GithubWidget /> : null }
        {isCorePage ? <TwitterWidget /> : null }
        {authorTwitter && <AuthorTwitterWidget data={authorTwitter} />}
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
