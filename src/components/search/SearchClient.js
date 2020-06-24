import algoliasearch from 'algoliasearch/lite'
import { connectStateResults } from "react-instantsearch-dom"

const algoliaClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY,
)

export const SearchClient = {
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
    return algoliaClient.search(requests)
  },
}

export const SearchResults = connectStateResults(
  ({ searchState: state, searchResults: res, children }) => (res && res.nbHits > 0 ? children : `No results for '${state.query}'`)
)

export const SearchStats = connectStateResults(
  ({ searchResults: res }) => res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)
