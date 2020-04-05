import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Pagination = ({ pageContext, metaTitle }) => {
  const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext

  return (
    <nav className="pagination" role="navigation">
      <div className="pagination-button">
        {previousPagePath && (
          <Link to={previousPagePath} rel="prev" className="prev">Previous</Link>
        )}
      </div>
      {numberOfPages > 1 && <div className="pagination-location">
        {metaTitle && <h1>{metaTitle}</h1> }
        <span className="page-count">Page {humanPageNumber} of {numberOfPages}</span>
      </div>}
      {nextPagePath && (
        <Link to={nextPagePath} rel="next" className="next">
          Next
        </Link>
      )}
    </nav>
  )
}

Pagination.propTypes = {
  pageContext: PropTypes.object.isRequired,
  metaTitle: PropTypes.string,
}

export default Pagination
