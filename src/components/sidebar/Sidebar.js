import React from 'react'
import PropTypes from 'prop-types'
import { AboutWidget,
  NewsletterWidget,
  SocialWidget,
  TagsWidget,
  TrendingWidget,
  TwitterWidget,
  GithubWidget } from '.'

/**
 *
 * Sidebar
 *
*/

const Sidebar = ({ site, template }) => {
  const corePages = [`home-template`, `page-template`, `tag-template`]
  const isCorePage = corePages.includes(template)

  return (
    <>
      <aside className="sidebar">
        {isCorePage && <AboutWidget site={site} />}
        <SocialWidget site={site} />
        <TrendingWidget />
        <TagsWidget />
        {isCorePage ? <NewsletterWidget /> : null}
        {template === `home-template` ? <GithubWidget /> : null}
        {template === `home-template` ? <TwitterWidget /> : null}
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
