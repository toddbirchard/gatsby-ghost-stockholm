import React from 'react'
import PropTypes from 'prop-types'

const AuthorWebsiteWidget = ({ authorWebsite }) => (
  <div className="widget website">
    <a href={authorWebsite} className="website-link" target="_blank" rel="noopener noreferrer">{authorWebsite}</a>
  </div>
)

AuthorWebsiteWidget.propTypes = {
  authorWebsite: PropTypes.string,
}

export default AuthorWebsiteWidget
