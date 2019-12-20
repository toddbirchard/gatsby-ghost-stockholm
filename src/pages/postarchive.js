import React, { Component } from 'react'
import {
    InstantSearch,
    SearchBox,
    Configure,
    Hits,
    Pagination,
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
              <InstantSearch
                  searchClient={searchClient}
                  indexName="hackers_posts"
                  createURL={createURL}
                  hitsPerPage={200}
                  analytics={true}
                  searchState={this.state.searchState}
                  onSearchStateChange={this.onSearchStateChange}
              >
                  <Configure query={queries} hitsPerPage={100} />
                  <div className="post-archive-body">
                      <h1>All Posts</h1>
                      <SearchBox className="searchbox" placeholder="Search" />
                  </div>
                  <Hits hitComponent={Hit} />
                  <Pagination hitsPerPage={100} showFirst={false} showPrevious={false} />
              </InstantSearch>
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
