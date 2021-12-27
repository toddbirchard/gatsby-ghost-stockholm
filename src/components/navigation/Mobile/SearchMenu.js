import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import {
  Configure,
  Hits,
  InstantSearch,
  SearchBox,
  Index,
} from 'react-instantsearch-dom'
import { StaticQuery, graphql } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import {
  SearchClient,
  SearchResults,
  SearchStats,
} from '../../search/SearchClient'
import { FaSearch, FaChartLine } from 'react-icons/fa'

class SearchMenu extends React.Component {
  constructor(props) {
    super(props)
    this.topSearches = props.data.topSearches.edges
    this.state = { query: `` }
  }

  PostHit =
    clickHandler => ({ hit }) => {
      const title = hit.title
      const slug = hit.slug
      const primary_tag = hit.primary_tag
      const featureImage = hit.feature_image
      const featureImageRetina = featureImage.replaceAll(`.jpg`, `@2x.jpg`).replaceAll(`.png`, `@2x.png`)
      const featureImageSlash = featureImage && featureImage.lastIndexOf(`/`)
      const featureImageSmall =
        featureImageSlash &&
        [
          featureImageRetina.slice(0, featureImageSlash),
          `/_mobile`,
          featureImageRetina.slice(featureImageSlash),
        ].join(``)

      return (
        <div className="search-result">
          <div className="image-wrapper">
            <img
              className="search-result-image lazyload"
              data-src={featureImageSmall}
              alt={title}
              title={title}
            />
          </div>
          <div className="search-result-details">
            <Link
              to={`/${slug}/`}
              onClick={clickHandler}
              className="search-result-title"
            >
              {title}
            </Link>
            {primary_tag ? (
              <div
                className="primary-tag"
                style={{
                  background: primary_tag.accent_color,
                  border: `1px solid ${primary_tag.accent_color}`,
                }}
              >
                {` `}
                {primary_tag.name}
                {` `}
              </div>
            ) : null}
          </div>
        </div>
      )
    }

  render() {
    return (
      <>
        <Menu
          right
          width={`90%`}
          burgerButtonClassName={`mobile-search-button`}
          customBurgerIcon={
            <img
              data-src="/images/search.svg"
              alt="mobile-menu"
              className={`lazyload`}
            />
          }
          className="mobile-menu"
          htmlClassName={`menu-lock-screen`}
          disableAutoFocus
        >
          <div className="search-container">
            <InstantSearch
              searchClient={SearchClient}
              indexName="hackers_posts"
              searchState={{ query: this.state.query }}
              onSearchStateChange={({ query }) => this.setState({ query: query })
              }
              onSearchParameters={() => this.setState({ focus: true })}
            >
              <Configure hitsPerPage={10} analytics={true}/>
              <label
                id="search-input-label"
                className="search-label"
                htmlFor="search-input"
              >
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
              <FaSearch/>
              <div className="search-results">
                <Index indexName="hackers_posts">
                  <header>
                    <div className="search-results-title">Search results</div>
                    <div className="search-results-count">
                      <SearchStats/>
                    </div>
                  </header>
                  <SearchResults>
                    <Hits
                      hitComponent={this.PostHit(() => this.setState({ focus: true }),
                      )}
                    />
                  </SearchResults>
                </Index>
              </div>
            </InstantSearch>
          </div>
          <div className="top-searches">
            <div className="top-search-title">
              <FaChartLine/> Trending Searches
            </div>
            <div className="sublinks">
              {this.topSearches.map(({ node }) => (
                <button
                  className="search-suggestion"
                  key={node.search}
                  onClick={() => this.setState({ query: node.search })}
                >
                  {node.search}
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
        topSearches: allMysqlAlgoliaTopSearches(limit: 12) {
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
