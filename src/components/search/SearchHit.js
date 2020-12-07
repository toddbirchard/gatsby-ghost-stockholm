import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const SearchHit = ({ hit }) => {
  const featureImage = hit.feature_image
  const featureImageSlash = featureImage && featureImage.lastIndexOf(`/`)
  const featureMobileImage = featureImageSlash && [featureImage.slice(0, featureImageSlash), `/_mobile`, featureImage.slice(featureImageSlash)].join(``).replace(`.jpg`, `@2x.jpg`).replace(`.png`, `@2x.png`)

  return (
    <Link to={`/${hit.slug}/`}>
      <div className="search-result">
        <div className="image-wrapper">
          <img
            className="search-result-image lazyload"
            data-src={featureMobileImage}
            alt={hit.title}
            title={hit.title}
          />
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
}

SearchHit.propTypes = {
  hit: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    feature_image: PropTypes.string,
    primary_tag: PropTypes.object,
  }).isRequired,
}

export default SearchHit
