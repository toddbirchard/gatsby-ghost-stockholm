import React from 'react'
import PropTypes from 'prop-types'
import {
  AuthorTrending,
  AuthorTwitter,
  AuthorWebsite,
  //AuthorPocket,
  //AuthorGithub,
} from '.'

/**
 *
 * Author Sidebar
 *
*/

const AuthorSidebar = ({ authorData, websiteMeta }) => {
  const authorTwitter = authorData && authorData.authorTwitterProfile
  const authorTopPosts = authorData && authorData.authorTrendingPosts.edges

  return (
    <>
      <aside className="sidebar">
        {websiteMeta && <AuthorWebsite websiteMeta={websiteMeta} />}
        {authorTopPosts && <AuthorTrending authorTopPosts={authorTopPosts} /> }
        {authorTwitter && <AuthorTwitter data={authorTwitter} />}
      </aside>
    </>
  )
}

AuthorSidebar.propTypes = {
  template: PropTypes.string,
  authorData: PropTypes.object,
  websiteMeta: PropTypes.object,
}

export default AuthorSidebar
