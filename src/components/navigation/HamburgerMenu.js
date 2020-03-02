import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import Search from './Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class HamburgerMenu extends React.Component {
  constructor(props) {
    super(props)
    this.tags = props.data.tags.edges
    this.topSearches = props.data.topSearches.edges
    this.classes = props.data.fullWidth ? `fullWidth` : null
    this.state = { active: false, query: `` }
  }

  toggleClass() {
    const currentState = this.state.active
    this.setState({ active: !currentState })
  }

  render() {
    return (
      <>
        <Menu right width={ `85%` } isOpen={ false } burgerButtonClassName={ `hamburger-button` } crossClassName={ `hamburger-cross-bar` } className={this.state.active ? `mobile-menu full-width` : `mobile-menu`} htmlClassName={ `menu-lock-screen` } disableAutoFocus>
          <div className="search-container" onClick={ () => this.setState({ active: true })}><Search collapse className="search-widget" forcedQuery={this.state.query ? this.state.query : null} /></div>
          <div className="pages">
            <Link className={`navigation-link`} to={`/about/`}><FontAwesomeIcon icon={[`fad`, `indent`]} size="xs"/>About</Link>
            <Link className={`navigation-link`} to={`/series/`}><FontAwesomeIcon icon={[`fad`, `books`]} size="xs"/>Series</Link>
            <Link className={`navigation-link`} to={`/join-us/`}><FontAwesomeIcon icon={[`fad`, `user-plus`]} size="xs"/>Join</Link>
            <Link className={`navigation-link`} to={`/search/`}><FontAwesomeIcon icon={[`fad`, `search`]} size="xs"/>All Posts</Link>
            <a className={`navigation-link`} href={`/rss/`}><FontAwesomeIcon icon={[`fad`, `rss`]} size="xs"/>RSS</a>
            <a className={`navigation-link`} href="https://www.buymeacoffee.com/hackersslackers"><FontAwesomeIcon icon={[`fad`, `coffee-togo`]} size="xs"/> Donate</a>
          </div>
          <div className="tags">
            <div className="sublinks">
              {this.tags.map(({ node }) => (
                <Link to={`/tag/${ node.slug }`} className="tag-link" key={ node.name }>{ node.name }</Link>
              ))}
            </div>
          </div>
          <div className="top-searches">
            <h4 className="top-search-title">Trending Searches</h4>
            <div className="sublinks">
              {this.topSearches.map(({ node }) => (
                <div className="search-suggestion" key={node.search} onClick={ () => this.setState({ query: node.search }) }>
                  <FontAwesomeIcon icon={[`fad`, `chart-line`]} size="xs" /> <span>{ node.search }</span>
                </div>
              ))}
            </div>
          </div>
        </Menu>
      </>
    )
  }
}

HamburgerMenu.propTypes = {
  data: PropTypes.shape({
    navigation: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }).isRequired,
    ),
    tags: PropTypes.object.isRequired,
    topSearches: PropTypes.object,
    fullWidth: PropTypes.boolean,
  }).isRequired,

}

const HamburgerMenuQuery = props => (
  <StaticQuery
    query={graphql`
          query HamburgerNavQuery {
            ghostSettings {
              navigation {
                label
                url
              }
            }
            tags: allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "public"}, slug: {nin: ["roundup", "excel"]}}) {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            topSearches: allMysqlAlgoliaTopSearches(limit: 5) {
              edges {
                node {
                  search
                  count
                }
              }
            }
          }
        `}
    render={data => <HamburgerMenu data={data} {...props} />}
  />
)

export default HamburgerMenuQuery
