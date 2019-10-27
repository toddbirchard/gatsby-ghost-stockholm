import React, { useState, useEffect, createRef } from "react"
import { InstantSearch, Index, Hits, connectStateResults, SearchBox, Configure } from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite"
import { Root, HitsWrapper } from "./SearchStyles"
import Input from "./SearchInput"
import PostHit from "./HitComps"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Results = connectStateResults(
    ({ searchState: state, searchResults: res, children }) => (res && res.nbHits > 0 ? children : `No results for '${state.query}'`)
)
const Stats = connectStateResults(
    ({ searchResults: res }) => res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)
const useClickOutside = (ref, handler, events) => {
    if (!events) {
        events = [`mousedown`, `touchstart`]
    }
    const detectClickOutside = event => !ref.current.contains(event.target) && handler()
    useEffect(() => {
        for (const event of events) {
            document.addEventListener(event, detectClickOutside)
        }
        return () => {
            for (const event of events) {
                document.removeEventListener(event, detectClickOutside)
            }
        }
    })
}

export default function Search({ indices, collapse, hitsAsGrid }) {
    const ref = createRef()
    const [query, setQuery] = useState(``)
    const [focus, setFocus] = useState(false)
    const searchClient = algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY
    )
    useClickOutside(ref, () => setFocus(false))
    return (
        <InstantSearch
            searchClient={searchClient}
            indexName="Posts"
            onSearchStateChange={({ query }) => setQuery(query)}
            root={{ Root, props: { ref } }}
        >
            <Configure hitsPerPage={5} />
            <SearchBox onFocus={() => setFocus(true)} {...{ collapse, focus }} />
            <FontAwesomeIcon icon={[`far`, `search`]} size="xs" />
            <HitsWrapper show={query.length > 0 && focus} asGrid={hitsAsGrid}>
              <Results>
                  <Hits hitComponent={PostHit} />
                </Results>
            </HitsWrapper>
        </InstantSearch>
    )
}
