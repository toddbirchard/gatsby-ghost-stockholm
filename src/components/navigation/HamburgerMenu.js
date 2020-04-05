import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import Search from './Search'
import config from '../../utils/siteConfig'

class HamburgerMenu extends React.Component {
  constructor(props) {
    super(props)
    this.tags = props.data.tags.edges
    this.topSearches = props.data.topSearches.edges
    this.classes = props.data.fullWidth ? `fullWidth` : null
    this.state = { active: false, query: `` }
  }

  render() {
    return (
      <>
        <Menu right width={ `85%` } isOpen={ false } burgerButtonClassName={ `hamburger-button` } crossClassName={ `hamburger-cross-bar` } className={this.state.active ? `mobile-menu full-width` : `mobile-menu`} htmlClassName={ `menu-lock-screen` } disableAutoFocus>
          <div className="search-container" onClick={ () => this.setState({ active: true })}>
            <Search collapse className="search-widget" />
          </div>
          <div className="pages">
            <Link className={`navigation-link`} to={`/about/`}>About</Link>
            <Link className={`navigation-link`} to={`/series/`}>Series</Link>
            <Link className={`navigation-link`} to={`/join-us/`}>Join</Link>
            <Link className={`navigation-link`} to={`/search/`}>All Posts</Link>
            <a className={`navigation-link`} href={config.social.feedly}>RSS</a>
            <a className={`navigation-link`} href="https://www.buymeacoffee.com/hackersslackers">Donate</a>
          </div>
          <div className="tags">
            <div className="sublinks">
              {this.tags.map(({ node }) => (
                <Link to={`/tag/${ node.slug }`} className="tag-link" key={ node.name }>{ node.name }</Link>
              ))}
            </div>
          </div>
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
    fullWidth: PropTypes.bool,
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
    render={data => <HamburgerMenu data={data} {...props} />}
  />
)

export default HamburgerMenuQuery
