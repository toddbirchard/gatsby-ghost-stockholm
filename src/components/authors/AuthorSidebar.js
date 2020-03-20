import React from 'react'
import PropTypes from 'prop-types'
import { AuthorTrending } from '.'
/**
* AuthorSidebar component
*/

const AuthorSidebar = ({ authorData }) => {
  // const authorTweets = authorData.authorTweets.edges
  //const authorTwitterProfile = authorData.authorTwitterProfile.edges

  return (
    <>
      <aside className="AuthorSidebar">
        <AuthorTrending authorData={authorData}/>
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
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
      postCount: PropTypes.number,
    })
  ).isRequired,
  template: PropTypes.string.isRequired,
}

export default AuthorSidebar
