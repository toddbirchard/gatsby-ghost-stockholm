import React, { createRef, useState } from 'react'
import { Configure,
  Hits,
  InstantSearch,
  SearchBox,
  Index } from 'react-instantsearch-dom'
import { useClickOutside } from '../../utils/hooks'
import { HitsWrapper, Root } from './SearchStyles'
import { Link } from 'gatsby'
import { FaSearch } from 'react-icons/fa'
import PropTypes from "prop-types"
import { SearchClient, SearchResults, SearchStats } from './SearchClient'

const Search = ({ collapse, hitsAsGrid, forcedQuery }) => {
  const ref = createRef()
  const [searchQuery, setQuery] = useState(forcedQuery ? forcedQuery : ``)
  const [focus, setFocus] = useState(false)
  const PostHit = clickHandler => ({ hit }) => (
    <Link to={`/${hit.slug}/`} onClick={clickHandler}>
      <div className="search-result">
        <img data-src={hit.feature_image} alt={hit.slug} className="search-result-image lazyload"/>
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

  const focusFalse = () => setFocus(false)
  useClickOutside(ref, focusFalse)
  return (
    <Root ref={ref} className="search-root">
      <InstantSearch
        searchClient={SearchClient}
        indexName="hackers_posts"
        onSearchStateChange={({ query }) => setQuery(query)}
        onSearchParameters={() => setFocus(true)} {...{ collapse, focus }}
      >
        <Configure hitsPerPage={10} analytics={true}/>
        <label
          id="search-input-label"
          className="search-label"
          htmlFor="search-input"
        >
          Search Posts
        </label>
        <SearchBox
          id="search-input"
          searchAsYouType={true}
          placeholder="Search all posts..."
          onFocus={() => setFocus(true)} {...{ collapse, focus }}
          defaultRefinement={forcedQuery && forcedQuery}
          translations={{
            placeholder: `Search all posts`,
          }}
        />
        <FaSearch className="search-icon" />
        <HitsWrapper
          show={(searchQuery.length > 0 && focus) || (!!forcedQuery)}
          asGrid={hitsAsGrid}
          className="search-results"
        >
          <Index indexName="hackers_posts">
            <header>
              <div className="search-results-title">Search results</div>
              <div className="search-results-count"><SearchStats/></div>
            </header>
            <SearchResults>
              <Hits hitComponent={PostHit(() => setFocus(false))}/>
            </SearchResults>
          </Index>
        </HitsWrapper>
      </InstantSearch>
    </Root>
  )
}

Search.displayName = `Search`

Search.propTypes = {
  forcedQuery: PropTypes.string,
  collapse: PropTypes.bool.isRequired,
  hitsAsGrid: PropTypes.object,
  hit: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    feature_image: PropTypes.string,
    primary_tag: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      accent_color: PropTypes.string.isRequired,
    }),
  }),
}

export default Search
