import { Link } from 'gatsby'
import React from 'react'
import { Highlight, Snippet } from 'react-instantsearch-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const PageHit = clickHandler => ({ hit }) => (
    <div>
        <Link to={`/` + hit.slug} onClick={clickHandler}>
            <h4>
                <Highlight attribute="title" hit={hit} tagName="mark" />
            </h4>
        </Link>
        <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
)

export const PostHit = clickHandler => ({ hit }) => (
    <div className="search-result">
        <img src={hit.feature_image} alt={hit.slug} className="search-result-image" />
        <div className="search-result-details">
            <Link to={`/${hit.slug}/`} onClick={clickHandler} className="search-result-title">{hit.title}</Link>
            <div className="meta-item tag"> <FontAwesomeIcon icon={[`far`, `tag`]} size="xs" /> {hit.primary_tag.name} </div>
            {/*<p className="search-result-excerpt">{hit.excerpt}</p>*/}
            <Snippet attribute="excerpt" hit={hit} tagName="mark" />
        </div>
    </div>
)
