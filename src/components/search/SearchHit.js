import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const SearchHit = ({ hit }) => (
  <Link to={`/${hit.slug}/`}>
    <div className="search-result">
      <div className="image-wrapper">
        <img data-src={hit.feature_image} alt={hit.slug} className="search-result-image lazyload"/>
      </div>
      <div className="search-result-details">
        <div className="search-result-title">{hit.title}</div>
        {hit.primary_tag ?
          <Link
            to={`/tag/${hit.primary_tag.slug}/`}
            className="primary-tag"
            style={{
              background: hit.primary_tag.accent_color,
              border: `1px solid ${hit.primary_tag.accent_color}`,
            }}> {hit.primary_tag.name} </Link>
          : null}
      </div>
    </div>
  </Link>
)

SearchHit.propTypes = {
  hit: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    feature_image: PropTypes.string,
    primary_tag: PropTypes.object,
  }).isRequired,
}

export default SearchHit
