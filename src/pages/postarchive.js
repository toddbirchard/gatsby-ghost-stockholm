import React, { Component } from 'react'
import {
    InstantSearch,
    SearchBox,
    Configure,
    Hits,
    Menu,
    Pagination,
    Panel,
    SortBy,
    MenuSelect,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch'
import qs from 'qs'
import PropTypes from 'prop-types'
import { Layout, PostCard } from '../components/common'
import { queries } from '../utils/algolia'

import '../styles/pages/postarchive.less'

const DEBOUNCE_TIME = 700
const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY,
)

const createURL = state => `?${qs.stringify(state)}`

const searchStateToUrl = (props, searchState) => (searchState ? `${props.location.pathname}${createURL(searchState)}` : ``)

const urlToSearchState = location => qs.parse(location.search.slice(1))

class PostArchive extends Component {
  state = {
      searchState: urlToSearchState(this.props.location),
      lastLocation: this.props.location,
  };

  componentDidUpdate(prevProps) {
      if (prevProps.location !== this.props.location) {
          this.setState({ searchState: urlToSearchState(this.props.location) })
      } 
      /*else {
          return { query: `allPostQuery` }
      }*/ 
  }

  onSearchStateChange = (searchState) => {
      clearTimeout(this.debouncedSetState)

      this.debouncedSetState = setTimeout(() => {
          this.props.history.push(
              searchStateToUrl(this.props, searchState),
              searchState
          )
      }, DEBOUNCE_TIME)
      this.setState({ searchState })
  };

  render() {
      return (
          <Layout template="postarchive-template" hasSidebar={false}>
              <div className="postarchive-container">
                  <InstantSearch
                      searchClient={searchClient}
                      indexName={`hackers_posts_all`}
                      createURL={createURL}
                      hitsPerPage={100}
                      analytics={true}
                      searchState={this.state.searchState}
                      onSearchStateChange={this.onSearchStateChange}
                  >
                      <Configure query={`allPostQuery`} hitsPerPage={100} analytics={true}/>
                      <div className="search-body">
                          <div className="postarchive-header">
                              <h1>All Posts</h1>
                              <div className="search-bar-container">
                                  <SearchBox className="searchbox" placeholder="Search" />
                                  <SortBy
                                      items={[
                                          { value: `hackers_posts_all`, label: `Relevance` },
                                          { value: `hackers_posts_all_published_at_desc`, label: `Published (desc)` },
                                          { value: `hackers_posts_all_published_at_asc`, label: `Published (asc)` },
                                      ]}
                                  />
                              </div>
                          </div>
                          <Hits hitComponent={Hit} />
                          <Pagination showFirst={false} />
                      </div>
                                            
                      <div className="search-filters">
                          <Panel className="tag filter">
                              <h2 className="filter-title">Tags</h2>
                              <Menu
                                  attribute="tags.name"
                                  limit={30}
                                  showMore={true}
                                  showMoreLimit={30} 
                              />
                          </Panel>
                      
                          <Panel className="author filter">
                              <h2 className="filter-title">Authors</h2>
                              <Menu
                                  attribute="primary_author.name"
                                  limit={100}
                              />
                          </Panel>
                      </div>  
                  </InstantSearch>
              </div>
          </Layout>
      )
  }
}

const Hit = ({ hit }) => (
    <PostCard post={hit} key={hit.objectID}/>
)

Hit.propTypes = {
    hit: PropTypes.object.isRequired,
}

PostArchive.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
    location: PropTypes.object.isRequired,
}

export default PostArchive
