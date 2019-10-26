import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Pagination = ({ pageContext }) => {
    const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext

    return (
        <nav className="pagination" role="navigation">
            <div className="pagination-button">
                {previousPagePath && (
                    <Link to={previousPagePath} rel="prev">
                        <FontAwesomeIcon icon={[`far`, `arrow-left`]} size="xs" /> Previous
                    </Link>
                )}
            </div>
            {numberOfPages > 1 && <div className="pagination-location">Page {humanPageNumber} of {numberOfPages}</div>}
            {nextPagePath && (
                <Link to={nextPagePath} rel="next">
                         Next <FontAwesomeIcon icon={[`far`, `arrow-right`]} size="xs" />
                </Link>
            )}
        </nav>
    )
}

Pagination.propTypes = {
    pageContext: PropTypes.object.isRequired,
}

export default Pagination
