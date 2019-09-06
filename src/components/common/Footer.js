import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { faUserEdit, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRss, faTag } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Img from 'gatsby-image'
import {
    Link,
    StaticQuery,
    graphql
} from 'gatsby'


library.add(fab, faRss, faTag)

const Footer = ({ data }) => {
  const site = data.allGhostSettings.edges[0].node
  const pageLinks = data.allGhostPage.edges
  const tagLinks = data.allGhostTag.edges
  const authorLinks = data.allGhostAuthor.edges

    return (
    <>
        {/* The footer at the very bottom of the screen */}
        <footer className="site-footer">
            <div className="footer-wrapper">
              <div className="widget about">
                <Link to="logo" href="/">
                  {site.logo ? <img className="logo" src={site.logo} alt={site.title} /> : <Img className="logo" fixed={site.logo} alt={site.title} loading="lazy" /> }
                </Link>
                <p className="description">Community of hackers obsessed with data science, data engineering, and analysis. Openly pushing a pro-robot agenda.</p>
                <div className="social-btns">
                  <a href="temp" className="twitter" key="twitter"><FontAwesomeIcon icon={[`fab`, `twitter`]} /></a>
                  <a href="https://angel.co/todd-birchard?public_profile=1" className="angellist" key="angellist"><FontAwesomeIcon icon={[`fab`, `angellist`]} /></a>
                  <a href="https://www.linkedin.com/in/toddbirchard/" className="linkedin" key="linkedin"><FontAwesomeIcon icon={[`fab`, `linkedin`]} /></a>
                  <a href="https://github.com/toddbirchard" className="github" key="github"><FontAwesomeIcon icon={[`fab`, `github`]} /></a>
                  <a href="https://www.quora.com/profile/Todd-Birchard" className="quora" key="quora"><FontAwesomeIcon icon={[`fab`, `quora`]} /></a>
                  <a href="/rss/" className="rss" key="rss"><FontAwesomeIcon icon="rss" /></a>
                </div>
                <p className="copyright">©2019 Hackers and Slackers, All Rights Reserved.</p>
              </div>
              <div className="widget links">
                <h5 className="footer-widget-title">Links</h5>
                <ul>
                  {pageLinks.map(({ node }) => (
                      <li key={ node.title }><Link to={ node.url } className="tag" key={ node.slug }>{ node.title }</Link></li>
                  ))}
                  </ul>
                </div>
                <div className="widget authors">
                  <h5 className="footer-widget-title">Authors</h5>
                  <ul>
                  {authorLinks.map(({ node }) => (
                      <li key={ node.name }><Link to={`/tag/${ node.slug }`} className="tag">{ node.name }</Link></li>
                  ))}
                  </ul>
                </div>
                <div className="widget tags">
                  <h5 className="footer-widget-title">Tags</h5>
                  <ul>
                  {tagLinks.map(({ node }) => (
                      <li key={ node.slug }><Link to={`/tag/${ node.slug }`} className="tag">{ node.name }</Link></li>
                  ))}
                </ul>
              </div>
            </div>
        </footer>
    </>
    )
}

Footer.propTypes = {
    data: PropTypes.shape({
        allGhostAuthor: PropTypes.object.isRequired,
        allGhostTag: PropTypes.object.isRequired,
        allGhostPage: PropTypes.object.isRequired,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const FooterQuery = props => ( <
        StaticQuery query = {
            graphql `
            query FooterQuery {
              allGhostAuthor(sort: {order: DESC, fields: postCount}) {
                edges {
                  node {
                    url
                    name
                  }
                }
              }
              allGhostTag(limit: 10, sort: {order: DESC, fields: postCount}, filter: {}) {
                edges {
                  node {
                    slug
                    url
                    name
                  }
                }
              }
              allGhostPage {
                edges {
                  node {
                    url
                    title
                  }
                }
              }
              allGhostSettings {
                edges {
                  node {
                    logo
                    title
                    description
                    icon
                  }
                }
              }
            }
        `}
        render={data => <Footer data={data} {...props} />}
        />
    )

        export default FooterQuery
