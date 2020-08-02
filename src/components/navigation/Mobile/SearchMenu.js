import React from 'react'
import { Configure,
  Hits,
  InstantSearch,
  SearchBox,
  Index } from 'react-instantsearch-dom'
import { HitsWrapper } from '../../search/SearchStyles'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import PostHit from './PostHit'
import { SearchClient, SearchResults, SearchStats } from '../../search/SearchClient'
import { FaSearch, FaChartLine } from 'react-icons/fa'

class SearchMenu extends React.Component {
  constructor(props) {
    super(props)
    this.topSearches = props.data.topSearches.edges
    this.state = { query: `` }
  }

  render() {
    return (
      <>
        <Menu
          right width={ `85%` }
          burgerButtonClassName={ `mobile-search-button` }
          customBurgerIcon={ <img src="/images/search.svg" alt="search-icon" /> }
          className="mobile-menu"
          htmlClassName={ `menu-lock-screen` }
          disableAutoFocus
        >
          <div className="search-container">
            <InstantSearch
              searchClient={SearchClient}
              indexName="hackers_posts"
              searchState={{ query: this.state.query }}
              onSearchStateChange={({ query }) => this.setState(({ query: query }))}
              onSearchParameters={() => this.setState({ focus: true })}
            >
              <Configure hitsPerPage={10} analytics={true}/>
              <label id="search-input-label" className="search-label" htmlFor="search-input">
                Search Posts
              </label>
              <SearchBox
                searchAsYouType={true}
                placeholder="Search all posts..."
                onFocus={() => this.setState({ focus: true })}
                translations={{
                  placeholder: `Search all posts`,
                }}
              />
              <FaSearch />
              <HitsWrapper
                show={(this.state.query.length > 0 && this.state.focus)}
                className="search-results"
              >
                <Index indexName="hackers_posts">
                  <header>
                    <div className="search-results-title">Search results</div>
                    <div className="search-results-count"><SearchStats/></div>
                  </header>
                  <SearchResults>
                    <Hits hitComponent={PostHit(() => this.setState({ focus: true }))}/>
                  </SearchResults>
                </Index>
              </HitsWrapper>
            </InstantSearch>
          </div>
          <div className="top-searches">
            <div className="top-search-title"><FaChartLine /> Trending Searches</div>
            <div className="sublinks">
              {this.topSearches.map(({ node }) => (
                <button
                  className="search-suggestion"
                  key={node.search}
                  onClick={ () => this.setState({ query: node.search }) }
                >
                  { node.search }
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
            topSearches: allMysqlAlgoliaTopSearches(limit: 16) {
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
