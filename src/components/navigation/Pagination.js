import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const Pagination = ({ pageContext, metaTitle, template }) => {
  const { previousPagePath, nextPagePath, currentPage, numberOfPages } =
    pageContext;
  const title =
    pageContext.pageNumber > 0
      ? metaTitle +
        ` (page ` +
        pageContext.pageNumber +
        ` of ` +
        numberOfPages +
        `)`
      : metaTitle;

  return (
    <>
      <nav className="pagination" role="navigation">
        <div className="pagination-button">
          {previousPagePath && (
            <Link to={previousPagePath} rel="prev" className="prev">
              Previous
            </Link>
          )}
        </div>
        <div className="pagination-location">
          {template === `home-template` ? title && <h1>{title}</h1> : null}
          <span className="page-count">
            Page {currentPage} of {numberOfPages}
          </span>
        </div>
        {nextPagePath && (
          <Link to={nextPagePath} rel="next" className="next">
            Next
          </Link>
        )}
      </nav>
    </>
  );
};

Pagination.propTypes = {
  pageContext: PropTypes.object.isRequired,
  metaTitle: PropTypes.string,
  template: PropTypes.string,
};

export default Pagination;
