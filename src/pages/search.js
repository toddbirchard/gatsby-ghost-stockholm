import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import {
  InstantSearch,
  SearchBox,
  Configure,
  Hits,
  Pagination,
  SortBy,
  RefinementList,
  Panel,
} from 'react-instantsearch-dom'
import { FaArrowRight, FaArrowLeft, FaSearch } from 'react-icons/fa'
import algoliasearch from 'algoliasearch'
import qs from 'qs'
import { MetaData } from '../components/common/meta'
import { Layout, PostCard } from '../components/common'
import '../styles/pages/search.less'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY,
)
const createURL = state => `?${qs.stringify(state)}`
const urlToSearchState = location => qs.parse(location.search.slice(1))

const SearchPage = ({ data, location, pageContext }) => {
  const title = pageContext.title
  const description = pageContext.description
  const [searchState, setSearchState] = useState(urlToSearchState(location))
  const onSearchStateChange = (updatedSearchState) => {
    setSearchState(updatedSearchState)
  }

  return (
    <>
      <MetaData
        data={data}
        location={location}
        title={title}
        description={description}
      />
      <Layout template="search-template" hasSidebar={false}>
        <div className="search-container">
          <InstantSearch
            searchClient={searchClient}
            indexName="hackers_posts"
            createURL={createURL}
            hitsPerPage={40}
            analytics
            searchState={searchState}
            onSearchStateChange={onSearchStateChange}
          >
            <Configure query="allPostQuery" hitsPerPage={40} analytics />
            <div className="search-body">
              <div className="search-header">
                <h1>Search All Posts</h1>
                <div className="search-header-flex">
                  <div className="searchbar-container">
                    <SearchBox
                      className="searchbox"
                      placeholder="Search"
                      showLoadingIndicator
                    />
                    <FaSearch className="search-icon" />
                  </div>
                  <SortBy
                    items={[
                      { value: `hackers_posts`, label: `Relevance` },
                      { value: `hackers_posts_published_at_desc`, label: `Published (desc)` },
                      { value: `hackers_posts_published_at_asc`, label: `Published (asc)` },
                    ]}
                    defaultRefinement="hackers_posts"
                  />
                </div>
              </div>
              <div className="search-sidebar-container">
                <Hits hitComponent={Hit} />
                <aside className="search-sidebar">
                  <Panel header="Tags">
                    <RefinementList
                      attribute="tags.name"
                      limit={20}
                      showMore
                      showMoreLimit={40}
                    />
                  </Panel>
                  <Panel header="Authors">
                    <RefinementList
                      attribute="primary_author.name"
                    />
                  </Panel>
                </aside>

              </div>
              <Pagination
                showFirst={false}
                translations={{
                  previous: <FaArrowLeft />,
                  next: <FaArrowRight />,
                }}
              />
            </div>
          </InstantSearch>
        </div>
      </Layout>
    </>
  )
}

const Hit = ({ hit }) => (
  <PostCard post={hit} key={hit.objectID} />
)

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
}

SearchPage.propTypes = {
  data: PropTypes.shape({
    ghostPage: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.object,
  pageContext: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
}

export const SearchPageQuery = graphql`
    query SearchPageQuery($slug: String) {
        ghostPage(slug: {eq: $slug}) {
          ...GhostPageFields
        }
    }`

export default SearchPage
