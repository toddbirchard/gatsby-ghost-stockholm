import React, { createRef, useState } from 'react'
import { Configure,
  Hits,
  InstantSearch,
  SearchBox,
  Index } from 'react-instantsearch-dom'
import { useClickOutside } from '../../utils/hooks'
import { HitsWrapper, Root } from './SearchStyles'
import { Link } from 'gatsby'
import { FaTags, FaSearch } from 'react-icons/fa'
import PropTypes from "prop-types"
import { searchClient, searchResults, searchStats } from './SearchClient'

export default function Search({ collapse, hitsAsGrid, forcedQuery }) {
  const ref = createRef()
  const [searchQuery, setQuery] = useState(forcedQuery ? forcedQuery : ``)
  const [focus, setFocus] = useState(false)
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

  const focusFalse = () => setFocus(false)
  useClickOutside(ref, focusFalse)
  return (
    <Root ref={ref} className="search-root">
      <InstantSearch
        searchClient={searchClient}
        indexName="hackers_posts"
        onSearchStateChange={({ query }) => setQuery(query)}
        onSearchParameters={() => setFocus(true)} {...{ collapse, focus }}
      >
        <Configure hitsPerPage={10} analytics={true}/>
        <SearchBox
          searchAsYouType={true}
          placeholder="Search all posts..."
          onFocus={() => setFocus(true)} {...{ collapse, focus }}
          defaultRefinement={forcedQuery && forcedQuery}
          translations={{
            placeholder: `Search all posts`,
          }}
        />
        <FaSearch className="search-icon" />
        <HitsWrapper show={(searchQuery.length > 0 && focus) || (!!forcedQuery)} asGrid={hitsAsGrid} className="search-results">
          <Index indexName="hackers_posts">
            <header>
              <div className="search-results-title">Search results</div>
              <div className="search-results-count"><searchStats/></div>
            </header>
            <searchResults>
              <Hits hitComponent={PostHit(() => setFocus(false))}/>
            </searchResults>
          </Index>
        </HitsWrapper>
      </InstantSearch>
    </Root>
  )
}

Search.propTypes = {
  forcedQuery: PropTypes.string,
  collapse: PropTypes.bool.isRequired,
  hitsAsGrid: PropTypes.object,
}
