import React from 'react'
import { Configure,
  connectStateResults,
  Hits, InstantSearch,
  SearchBox,
  Index } from 'react-instantsearch-dom'
import { HitsWrapper } from './SearchStyles'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import algoliasearch from 'algoliasearch/lite'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import PostHit from './PostHit'
import config from '../../../utils/siteConfig'
import { FaSearch, FaChevronDown } from 'react-icons/fa'

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

class MobileMenu extends React.Component {
  constructor(props) {
    super(props)
    this.tags = props.data.tags.edges
    this.series = props.data.series.edges
    this.topSearches = props.data.topSearches.edges
    this.classes = props.data.fullWidth ? `fullWidth` : null
    this.state = { active: false, query: ``, focus: false }
  }

  render() {
    return (
      <>
        <Menu right width={ `85%` } isOpen={ false } burgerButtonClassName={ `hamburger-button` } crossClassName={ `hamburger-cross-bar` } className={this.state.active ? `mobile-menu full-width` : `mobile-menu`} htmlClassName={ `menu-lock-screen` } disableAutoFocus>
          <div className="search-container" onClick={ () => this.setState({ active: true })}>
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
          <div className="pages">
            <Link className={`navigation-link`} to={`/about/`}>About</Link>
            <Link className={`navigation-link`} to={`/search/`}>All Posts</Link>
            <Accordion allowZeroExpanded>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <span>Tags</span> <FaChevronDown />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel >
                  {this.tags.map(({ node }) => (
                    <Link to={`/tag/${ node.slug }`} className="tag-link" key={ node.id }>{ node.name }</Link>
                  ))}
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <span>Series</span> <FaChevronDown />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {this.series.map(({ node }) => (
                    <Link to={`/series/${ node.slug }`} className="tag-link" key={ node.id }>{ node.meta_title }</Link>
                  ))}
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
            <Link className={`navigation-link`} to={`/join-us/`}>Join</Link>
            <a className={`navigation-link`} href={config.social.feedly}>RSS</a>
            <a className={`navigation-link`} href="https://www.buymeacoffee.com/hackersslackers">Donate</a>
          </div>
          {/*<div className="tags">
            <div className="sublinks">
              <div className="mobile-tag-title">Tags</div>
              {this.tags.map(({ node }) => (
                <Link to={`/tag/${ node.slug }`} className="tag-link" key={ node.name }>{ node.name }</Link>
              ))}
            </div>
          </div>*/}
          <div className="top-searches">
            <div className="top-search-title">Trending Searches</div>
            <div className="sublinks">
              {this.topSearches.map(({ node }) => (
                <div className="search-suggestion" key={node.search} onClick={ () => this.setState({ query: node.search }) }>
                  <span>{ node.search }</span>
                </div>
              ))}
            </div>
          </div>
        </Menu>
      </>
    )
  }
}

MobileMenu.propTypes = {
  data: PropTypes.shape({
    navigation: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired,
    ),
    tags: PropTypes.object.isRequired,
    topSearches: PropTypes.object,
    fullWidth: PropTypes.bool,
  }).isRequired,

}

const MobileMenuQuery = props => (
  <StaticQuery
    query={graphql`
          query HamburgerNavQuery {
            ghostSettings {
              navigation {
                label
                url
              }
            }
            tags: allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "public"}, slug: {nin: ["roundup", "excel"]}, postCount: {gt: 10}}) {
              edges {
                node {
                  id
                  name
                  slug
                }
              }
            }
            series: allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}, postCount: {gt: 1}}) {
              edges {
                node {
                  id
                  slug
                  description
                  meta_title
                }
              }
            }
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
    render={data => <MobileMenu data={data} {...props} />}
  />
)

export default MobileMenuQuery
