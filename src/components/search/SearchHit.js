import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const SearchHit = ({ hit }) => {
  const featureImage = hit.feature_image
  const title = hit.title
  const slug = hit.slug
  const primary_tag = hit.primary_tag
  const featureImageRetina = featureImage.replaceAll(`.jpg`, `@2x.jpg`).replaceAll(`.png`, `@2x.png`)
  const featureImageSlash = featureImage && featureImage.lastIndexOf(`/`)
  const featureImageSmall =
    featureImageSlash &&
    [
      featureImageRetina.slice(0, featureImageSlash),
      `/_mobile`,
      featureImageRetina.slice(featureImageSlash),
    ].join(``)

  return (
    <Link to={`/${slug}/`}>
      <div className="search-result">
        <div className="image-wrapper">
          <img
            className="search-result-image"
            src={featureImageSmall}
            alt={title}
            title={title}
          />
        </div>
        <div className="search-result-details">
          <div className="search-result-title">{title}</div>
          {primary_tag ? (
            <Link
              to={`/tag/${primary_tag.slug}/`}
              className="primary-tag"
              style={{
                background: primary_tag.accent_color,
                border: `1px solid ${primary_tag.accent_color}`,
              }}
            >
              {` `}
              {primary_tag.name}
              {` `}
            </Link>
          ) : null}
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
