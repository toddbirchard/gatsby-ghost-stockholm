import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'
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

const SearchPage = ({ data, location }) => {
  const metaTitle = data.searchPage.meta_title
  const metaDescription = data.searchPage.meta_description
  const [searchState, setSearchState] = useState(urlToSearchState(location))
  const onSearchStateChange = (updatedSearchState) => {
    setSearchState(updatedSearchState)
  }

  return (
    <>
      <MetaData
        data={data}
        location={location}
        title={metaTitle}
        description={metaDescription}
        type="website"
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
            <Configure query="allPostQuery" hitsPerPage={40} analytics/>
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
                    <FaSearch className="search-icon"/>
                  </div>
                  <SortBy
                    items={[
                      { value: `hackers_posts`, label: `Relevance` },
                      {
                        value: `hackers_posts_published_at_desc`,
                        label: `Published (desc)`,
                      },
                      {
                        value: `hackers_posts_published_at_asc`,
                        label: `Published (asc)`,
                      },
                    ]}
                    defaultRefinement="hackers_posts"
                  />
                </div>
              </div>
              <div className="search-sidebar-container">
                <Hits hitComponent={Hit}/>
                <aside className="search-sidebar">
                  <Panel header="Tags">
                    <RefinementList
                      attribute="tags.name"
                      limit={100}
                      showMore
                      showMoreLimit={30}
                      transformItems={items => items.filter(
                        item => item.label.indexOf(`#`) === -1 && item.count > 1,
                      )
                      }
                    />
                  </Panel>
                  <Panel header="Authors">
                    <RefinementList attribute="primary_author.name"/>
                  </Panel>
                </aside>
              </div>
              <Pagination
                showFirst={false}
                translations={{
                  previous: <FaArrowLeft/>,
                  next: <FaArrowRight/>,
                }}
              />
            </div>
          </InstantSearch>
        </div>
      </Layout>
    </>
  )
}

const Hit = ({ hit }) => <PostCard post={hit} key={hit.objectID}/>

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
}

SearchPage.propTypes = {
  data: PropTypes.shape({
    searchPage: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.object,
}

const SearchPageQuery = props => (
  <StaticQuery
    query={graphql`
      query SearchPageData {
        searchPage: ghostPage(slug: { eq: "search" }) {
          ...GhostPageFields
        }
      }
    `}
    render={data => <SearchPage data={data} {...props} />}
  />
)

export default SearchPageQuery
