import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineSearch,
  AiOutlineTags,
  AiOutlineBook,
  AiOutlineUser,
  AiOutlineUserAdd,
  AiOutlineDollarCircle,
} from "react-icons/ai"
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import { FaChevronDown } from 'react-icons/fa'
import { FiRss } from 'react-icons/fi'

class MobileMenu extends React.Component {
  constructor(props) {
    super(props)
    this.tags = props.data.tags.edges
    this.series = props.data.series.edges
    this.authors = props.data.authors.edges
  }

  render() {
    return (
      <>
        <Menu
          right
          width={`90%`}
          isOpen={false}
          burgerButtonClassName={`hamburger-button`}
          crossClassName={`hamburger-cross-bar`}
          className="mobile-menu"
          htmlClassName={`menu-lock-screen`}
          disableAutoFocus
        >
          <div className="pages">
            <Link className={`navigation-link`} to={`/`}><AiOutlineHome/>Home</Link>
            <Link className={`navigation-link`} to={`/about/`}><AiOutlineInfoCircle/>About</Link>
            <Link className={`navigation-link`} to={`/search/`}><AiOutlineSearch/>Search</Link>
            <Accordion allowZeroExpanded>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <span><AiOutlineTags/>Tags</span> <FaChevronDown className="chevron"/>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {this.tags.map(({ node }) => (
                    <Link
                      to={`/tag/${node.slug}`}
                      className="tag-link"
                      key={node.id}>
                      {node.name}
                    </Link>
                  ))}
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <span><AiOutlineBook/>Series</span> <FaChevronDown className="chevron"/>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {this.series.map(({ node }) => (
                    <Link
                      to={`/series/${node.slug}`}
                      className="tag-link"
                      key={node.ghostId}
                    >
                      {node.meta_title}
                    </Link>
                  ))}
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <span><AiOutlineUser/>Authors</span> <FaChevronDown className="chevron"/>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  {this.authors.map(({ node }) => (
                    <Link
                      to={`/author/${node.slug}`}
                      className="tag-link"
                      key={node.id}
                    >
                      {node.name}
                    </Link>
                  ))}
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
            <Link to="/join-us/" className={`navigation-link`}>
              <AiOutlineUserAdd/>
              <span>Join</span>
            </Link>
            <Link to="/rss.xml" className={`navigation-link`}>
              <FiRss/>
              <span>RSS</span>
            </Link>
            <a
              className={`navigation-link`}
              href="https://www.buymeacoffee.com/hackersslackers"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineDollarCircle/> Donate
            </a>
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
            series: allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}, postCount: {gt: 1}, slug: {ne: "adventures-in-excel", nin: "code-snippet-corner"}}) {
              edges {
                node {
                  ghostId
                  slug
                  description
                  meta_title
                }
              }
            }
            authors: allGhostAuthor(filter: {postCount: {gte: 1}, slug: {ne: "data-schema-author"}}, sort: {fields: id, order: ASC}) {
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
