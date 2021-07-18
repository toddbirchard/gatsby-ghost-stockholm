import React, { createRef, useState, useEffect } from 'react'
import PropTypes from "prop-types"
import { Configure,
  Hits,
  InstantSearch,
  SearchBox,
  Index } from 'react-instantsearch-dom'
import { SearchClient, SearchResults, SearchStats } from './SearchClient'
import { SearchHit } from './'
import { useIdentityContext } from "react-netlify-identity-widget"

const Search = ({ collapse, forcedQuery }) => {
  const boxRef = createRef()
  const menuRef = createRef()
  const [searchQuery, setQuery] = useState(forcedQuery ? forcedQuery : ``)
  const [focus, setFocus] = useState(false)
  const visibilityState = searchQuery.length > 0 && focus ? `visible` : `hidden`
  const identity = useIdentityContext()
  const user = identity.user
  const userId = user && user.id

  useEffect(() => {
    if (focus) {
      boxRef.current.classList.add(`focus`)
    } else if (focus === false && searchQuery === ``) {
      boxRef.current.classList.add(`focus`)
    } else {
      boxRef.current.classList.remove(`focus`)
    }
  })

  return (
    <div ref={boxRef} className="search-root">
      <InstantSearch
        searchClient={SearchClient}
        indexName="hackers_posts"
        onSearchStateChange={({ query }) => setQuery(query)}
        onSearchParameters={() => setFocus(true)} {...{ collapse, focus }}
      >
        <Configure hitsPerPage={10} analytics={true} userToken={userId}/>
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
          onFocus={() => setFocus(true) } {...{ collapse, focus }}
          defaultRefinement={forcedQuery && forcedQuery}
          translations={{
            placeholder: `Search all posts`,
          }}
        />
        <div
          style={{ visibility: visibilityState }}
          className="search-results"
          ref={menuRef}
        >
          <Index indexName="hackers_posts">
            <header>
              <div className="search-results-title">Search results</div>
              <div className="search-results-count"><SearchStats/></div>
            </header>
            <SearchResults>
              <Hits hitComponent={SearchHit}/>
            </SearchResults>
          </Index>
        </div>
      </InstantSearch>
    </div>
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
