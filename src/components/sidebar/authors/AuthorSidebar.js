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

const AuthorSidebar = ({ authorData }) => {
  const authorTwitter = authorData && authorData.authorTwitterProfile
  const authorWebsite = authorData && authorData.ghostAuthor.website
  const authorTopPosts = authorData && authorData.authorTrendingPosts.edges

  return (
    <>
      <aside className="sidebar">
        {authorWebsite && <AuthorWebsite authorWebsite={authorWebsite} />}
        {authorTopPosts && <AuthorTrending authorTopPosts={authorTopPosts} /> }
        {authorTwitter && <AuthorTwitter data={authorTwitter} />}
      </aside>
    </>
  )
}

AuthorSidebar.propTypes = {
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

export default AuthorSidebar
