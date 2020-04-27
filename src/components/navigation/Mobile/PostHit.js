import React from 'react'
import { FaTags } from 'react-icons/fa'
import { Link } from 'gatsby'

const PostHit = clickHandler => ({ hit }) => (
  <div className="search-result">
    <img data-src={hit.feature_image} alt={hit.slug} className="search-result-image lazyload"/>
    <div className="search-result-details">
      <Link to={`/${hit.slug}/`} onClick={clickHandler} className="search-result-title">{hit.title}</Link>
      <div className="search-result-tag">
        <FaTags />
        <span>{hit.primary_tag.name}</span>
      </div>
    </div>
  </div>
)

export default PostHit
