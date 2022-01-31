import React from 'react'
import PropTypes from 'prop-types'
import {
  AuthorTrending,
  AuthorTwitter,
  // AuthorWebsite,
  // AuthorPocket,
  // AuthorGithub,
} from '.'

/**
 *
 * Author Sidebar
 *
 */

const AuthorSidebar = ({ authorData, authorTrendingPosts }) => {
  const authorWebsite = authorData && authorData.website
  const authorTwitter = authorData && authorData.authorTwitterProfile
  const authorTopPosts = authorTrendingPosts && authorTrendingPosts.edges

  return (
    <>
      <aside className="sidebar">
        {/* websiteMeta && <AuthorWebsite websiteMeta={websiteMeta} /> */}
        <div className="widget website" id="author-website-widget">
          <a href={authorWebsite} target="_blank" rel="noopener noreferrer" id="author-website">{authorWebsite}</a>
        </div>
        {authorTopPosts && <AuthorTrending authorTopPosts={authorTopPosts}/>}
        {authorTwitter && <AuthorTwitter data={authorTwitter}/>}
      </aside>
    </>
  )
}

AuthorSidebar.propTypes = {
  template: PropTypes.string,
  authorData: PropTypes.object,
  websiteMeta: PropTypes.object,
  authorTrendingPosts: PropTypes.array,
}

export default AuthorSidebar
