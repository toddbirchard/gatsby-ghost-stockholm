import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import config from '../../../utils/siteConfig'
import { FaChevronDown } from 'react-icons/fa'

class MobileMenu extends React.Component {
  constructor(props) {
    super(props)
    this.tags = props.data.tags.edges
    this.series = props.data.series.edges
    this.authors = props.data.authors.edges
    this.classes = props.data.fullWidth ? `fullWidth` : null
    this.state = { active: false, query: ``, focus: false }
  }

  render() {
    return (
      <>
        <Menu right width={ `90%` } isOpen={ false } burgerButtonClassName={ `hamburger-button` } crossClassName={ `hamburger-cross-bar` } className={this.state.active ? `mobile-menu full-width` : `mobile-menu`} htmlClassName={ `menu-lock-screen` } disableAutoFocus>
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
                    <Link to={`/series/${ node.slug }`} className="tag-link" key={ node.ghostId }>{ node.meta_title }</Link>
                  ))}
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <span>Authors</span> <FaChevronDown />
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {this.authors.map(({ node }) => (
                    <Link to={`/author/${ node.slug }`} className="tag-link" key={ node.id }>{ node.name }</Link>
                  ))}
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
            <Link className={`navigation-link`} to={`/join-us/`}>Join</Link>
            <a className={`navigation-link`} href={config.social.feedly}>RSS</a>
            <a className={`navigation-link`} href="https://www.buymeacoffee.com/hackersslackers">Donate</a>
          </div>
          <div className="top-searches">
            <div className="top-search-title">Trending Searches</div>
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
    series: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          ghostId: PropTypes.string,
          slug: PropTypes.string,
          description: PropTypes.string,
          meta_title: PropTypes.string,
        }).isRequired,
      ),
    }),
    tags: PropTypes.object.isRequired,
    authors: PropTypes.object.isRequired,
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
                  ghostId
                  slug
                  description
                  meta_title
                }
              }
            }
            authors: allGhostAuthor(filter: {postCount: {gt: 1}}) {
              edges {
                node {
                  name
                  slug
                  id
                  count {
                    posts
                  }
                }
              }
            }
          }
        `}
    render={data => <MobileMenu data={data} {...props} />}
  />
)

export default MobileMenuQuery
