import React, { createRef, useState } from 'react'
import { Configure,
  connectStateResults,
  Hits,
  InstantSearch,
  SearchBox,
  Index } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import { useClickOutside } from '../../utils/hooks'
import { HitsWrapper, Root } from './SearchStyles'
import { Link } from 'gatsby'
import { FaTags, FaSearch } from 'react-icons/fa'
import PropTypes from "prop-types"

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) => (res && res.nbHits > 0 ? children : <div className="no-results">{`No results for ${state.query}`}</div>),
)

const Stats = connectStateResults(
  ({ searchResults: res }) => res && res.nbHits > 0 && `${res.nbHits} results`
)

export default function Search({ collapse, hitsAsGrid, forcedQuery }) {
  const ref = createRef()
  const [query, setQuery] = useState(forcedQuery ? forcedQuery : ``)
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

  const appId = process.env.GATSBY_ALGOLIA_APP_ID
  const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY

  const algoliaClient = algoliasearch(
    appId,
    searchKey,
  )

  const searchClient = {
    search(requests) {
      if (requests.every(({ params }) => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => {
            return {
              hits: [],
              nbHits: 0,
              nbPages: 0,
              processingTimeMS: 0,
            }
          }),
        })
      }
      focusTrue(true)
      return algoliaClient.search(requests)
    },
  }

  const focusFalse = () => setFocus(false)
  const focusTrue = () => setFocus(true)
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
        <HitsWrapper show={(query.length > 0 && focus) || (!!forcedQuery)} asGrid={hitsAsGrid} className="search-results">
          <Index indexName="hackers_posts">
            <header>
              <div className="search-results-title">Search results</div>
              <div className="search-results-count"><Stats/></div>
            </header>
            <Results>
              <Hits hitComponent={PostHit(() => setFocus(false))}/>
            </Results>
          </Index>
        </HitsWrapper>
      </InstantSearch>
    </Root>
  )
}

Search.propTypes = {
  forcedQuery: PropTypes.string,
  collapse: PropTypes.object.isRequired,
  hitsAsGrid: PropTypes.object,
}
