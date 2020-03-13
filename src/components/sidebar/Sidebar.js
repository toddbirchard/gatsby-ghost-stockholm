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
  const genericPages = [`home-template`, `page-template`, `tag-template`]

  return (
    <>
      <aside className="sidebar">
        {genericPages.includes(template) && <AboutWidget site={site} /> }
        {authorWebsite && <AuthorWebsiteWidget authorWebsite={authorWebsite}/> }
        <SocialWidget site={site} />
        {template === `author-template` ? <AuthorTrendingWidget authorData={authorData} /> : <TrendingWidget /> }
        {genericPages.includes(template) ? <TagsWidget /> : null }
        {genericPages.includes(template) ? <NewsletterWidget /> : null }
        {template === `home-template` ? <GithubWidget /> : null }
        {genericPages.includes(template) ? <TwitterWidget /> : null }
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
