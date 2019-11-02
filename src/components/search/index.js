import React, { useState, createRef, useMemo } from 'react'
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

import { useClickOutside } from '../../utils/hooks'
import { Root, HitsWrapper } from './styles'
import Input from './Input'
import * as hitComps from './hitComps'

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

const Stats = connectStateResults(
  ({ searchResults: res }) => res && res.nbHits > 0 && `${res.nbHits} Treffer`
)

export default function Search({ indices, collapse, hitsAsGrid }) {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)

  const appId = process.env.GATSBY_ALGOLIA_APP_ID
  const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY
  // useMemo prevents the searchClient from being recreated on every render.
  // Avoids unnecessary XHR requests (see https://tinyurl.com/yyj93r2s).
  const searchClient = useMemo(() => algoliasearch(appId, searchKey), [
    appId,
    searchKey,
  ])
  const focusFalse = () => setFocus(false)
  useClickOutside(ref, focusFalse)
  return (
    <Root ref={ref}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
        <HitsWrapper show={query.length > 0 && focus} asGrid={hitsAsGrid}>
          {indices.map(({ name, title, hitComp }) => (
            <Index key={name} indexName={name}>
              <header>
                <h3>{title}</h3>
                <Stats />
              </header>
              <Results>
                <Hits hitComponent={hitComps[hitComp](focusFalse)} />
              </Results>
            </Index>
          ))}
        </HitsWrapper>
      </InstantSearch>
    </Root>
  )
}
