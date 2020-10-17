import React from 'react'
import PropTypes from 'prop-types'
import { useIdentityContext } from "react-netlify-identity-widget"
import { AboutWidget,
  NewsletterWidget,
  SocialWidget,
  TagsWidget,
  TrendingWidget,
  CoffeeWidget,
  TwitterWidget,
  GithubWidget } from '.'

/**
 * Sidebar
*/

const Sidebar = ({ site, template }) => {
  const identity = useIdentityContext()
  const user = !identity.user

  return (
    <>
      <aside className="sidebar">
        <AboutWidget site={site} />
        <SocialWidget site={site} />
        <TrendingWidget />
        <TagsWidget />
        {user && <NewsletterWidget /> }
        <CoffeeWidget />
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
