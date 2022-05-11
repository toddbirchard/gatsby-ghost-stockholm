import algoliasearch from 'algoliasearch/lite'
import { connectStateResults } from 'react-instantsearch-dom'

const algoliaClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY,
)

export const SearchClient = {
  search(requests) {
    const newRequests = requests.map((request)=>{
      // Test for empty string and change request parameter: analytics
      if(!request.params.query || request.params.query.length===0) {
        request.params.analytics=false
      }
      return request
    })
    return algoliaClient.search(newRequests)
  },
}

export const SearchResults = connectStateResults(
  ({ searchState: state, searchResults: res, children }) => (res && res.nbHits > 0 ? children : `No results for '${state.query}'`),
)

export const SearchStats = connectStateResults(
  ({ searchResults: res }) => res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`,
)
