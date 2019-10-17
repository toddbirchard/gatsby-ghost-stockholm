import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft, faArrowRight } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faArrowLeft, faArrowRight)

const Pagination = ({ pageContext }) => {
    const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext

    return (
        <nav className="pagination" role="navigation">
            <div className="pagination-button">
                {previousPagePath && (
                    <Link to={previousPagePath} rel="prev">
                        <FontAwesomeIcon icon={[`far`, `arrow-left`]} size="sm" /> Previous
                    </Link>
                )}
            </div>
            {numberOfPages > 1 && <div className="pagination-location">Page {humanPageNumber} of {numberOfPages}</div>}
]                 {nextPagePath && (
                <Link to={nextPagePath} rel="next">
                         Next <FontAwesomeIcon icon={[`far`, `arrow-right`]} size="sm" />
                </Link>
            )}
        </nav>
    )
}

Pagination.propTypes = {
    pageContext: PropTypes.object.isRequired,
}

export default Pagination
