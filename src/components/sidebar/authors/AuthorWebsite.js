import React from 'react'
import PropTypes from 'prop-types'
import { urlPreview } from '../../../util/scrape'

const AuthorWebsite = ({ authorWebsite }) => (
  <div className="widget website">
    <a
      href={authorWebsite}
      id="author-website"
      target="_blank"
      rel="noopener noreferrer">
      {urlPreview(authorWebsite)}
    </a>
  </div>
)

AuthorWebsite.propTypes = {
  authorWebsite: PropTypes.string,
}

export default AuthorWebsite
