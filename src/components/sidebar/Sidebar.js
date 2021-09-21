import React from 'react'
import PropTypes from 'prop-types'
import {
  AboutWidget,
  NewsletterWidget,
  SocialWidget,
  TagsWidget,
  TrendingWidget,
  CoffeeWidget,
  TwitterWidget,
} from '.'

/**
 * Sidebar
 */

const Sidebar = ({ site, template }) => (
  <>
    <aside className="sidebar">
      <AboutWidget site={site}/>
      <SocialWidget site={site}/>
      <TrendingWidget/>
      <TagsWidget/>
      <NewsletterWidget/>
      <CoffeeWidget/>
      {/* template === `home-template` ? <GithubWidget /> : null*/}
      {template === `home-template` ? <TwitterWidget/> : null}
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
