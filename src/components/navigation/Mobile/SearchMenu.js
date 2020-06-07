import React from 'react'
import { Configure,
  connectStateResults,
  Hits,
  InstantSearch,
  SearchBox,
  Index } from 'react-instantsearch-dom'
import { HitsWrapper } from './SearchStyles'
import algoliasearch from 'algoliasearch/lite'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import PostHit from './PostHit'
import { FaSearch } from 'react-icons/fa'

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
    return algoliaClient.search(requests)
  },
}

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) => (res && res.nbHits > 0 ? children : <div className="no-results">{`No results for ${state.query}`}</div>),
)

const Stats = connectStateResults(
  ({ searchResults: res }) => res && res.nbHits > 0 && `${res.nbHits} results`
)

class SearchMenu extends React.Component {
  constructor(props) {
    super(props)
    this.topSearches = props.data.topSearches.edges
    this.state = { query: `` }
  }

  render() {
    return (
      <>
        <Menu right width={ `90%` } burgerButtonClassName={ `mobile-search-button` } customBurgerIcon={ <img src="/images/search.svg" alt="search-icon" /> } className="mobile-menu" htmlClassName={ `menu-lock-screen` } disableAutoFocus>
          <div className="search-container">
            <InstantSearch
              searchClient={searchClient}
              indexName="hackers_posts"
              searchState={{ query: this.state.query }}
              onSearchStateChange={({ query }) => this.setState(({ query: query }))}
              onSearchParameters={() => this.setState({ focus: true })}
            >
              <Configure hitsPerPage={10} analytics={true}/>
              <SearchBox
                searchAsYouType={true}
                placeholder="Search all posts..."
                onFocus={() => this.setState({ focus: true })}
                translations={{
                  placeholder: `Search all posts`,
                }}
              />
              <FaSearch />
              <HitsWrapper show={(this.state.query.length > 0 && this.state.focus)} className="search-results">
                <Index indexName="hackers_posts">
                  <header>
                    <div className="search-results-title">Search results</div>
                    <div className="search-results-count"><Stats/></div>
                  </header>
                  <Results>
                    <Hits hitComponent={PostHit(() => this.setState({ focus: true }))}/>
                  </Results>
                </Index>
              </HitsWrapper>
            </InstantSearch>
          </div>
          <div className="top-searches">
            <div className="top-search-title">Trending Searches</div>
            <div className="sublinks">
              {this.topSearches.map(({ node }) => (
                <button className="search-suggestion" key={node.search} onClick={ () => this.setState({ query: node.search }) }>
                  <span>{ node.search }</span>
                </button>
              ))}
            </div>
          </div>
        </Menu>
      </>
    )
  }
}

SearchMenu.propTypes = {
  data: PropTypes.shape({
    topSearches: PropTypes.object,
  }).isRequired,
}

const SearchMenuQuery = props => (
  <StaticQuery
    query={graphql`
          query MobileSearchQuery {
            topSearches: allMysqlAlgoliaTopSearches(limit: 8) {
              edges {
                node {
                  search
                  count
                }
              }
            }
          }
        `}
    render={data => <SearchMenu data={data} {...props} />}
  />
)

export default SearchMenuQuery
