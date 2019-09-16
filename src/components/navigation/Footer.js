import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRss, faTag } from '@fortawesome/pro-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Img from 'gatsby-image'
import {
    Link,
    StaticQuery,
    graphql,
} from 'gatsby'

library.add(fab, faRss, faTag)

const Footer = ({ data }) => {
    const site = data.allGhostSettings.edges[0].node
    const pageLinks = data.allGhostPage.edges
    const authorLinks = data.allGhostAuthor.edges
    const topTags = data.allGhostTag.edges
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

    return (
      <>
        {/* The footer at the very bottom of the screen */}
        <footer className="site-footer">
            <div className="footer-wrapper">
                <div className="widget about">
                    <Link to="/" alt="/">
                        {site.logo ? <img className="logo" src={site.logo} alt={site.title} /> : <Img className="logo" fixed={site.logo} alt={site.title} loading="lazy" /> }
                    </Link>
                    <p className="description">Community of hackers obsessed with data science, data engineering, and analysis. Openly pushing a pro-robot agenda.</p>
                    <div className="social-btns">
                        <a href={ twitterUrl } className="twitter" key="twitter-footer"><FontAwesomeIcon icon={[`fab`, `twitter`]} size="sm" /></a>
                        <a href={ facebookUrl } className="facebook" key="facebook-footer"><FontAwesomeIcon icon={[`fab`, `facebook`]} size="sm" /></a>
                        <a href="https://angel.co/company/hackers-and-slackers/" className="angellist-footer" key="angellist"><FontAwesomeIcon icon={[`fab`, `angellist`]} size="sm" /></a>
                        <a href="https://www.linkedin.com/company/hackers-and-slackers/" className="linkedin-footer" key="linkedin"><FontAwesomeIcon icon={[`fab`, `linkedin`]} size="sm" /></a>
                        <a href="https://github.com/hackersandslackers" className="github" key="github-footer"><FontAwesomeIcon icon={[`fab`, `github`]} size="sm" /></a>
                        <a href="https://hackersandslackers.blog" className="tumblr" key="tumblr-footer"><FontAwesomeIcon icon={[`fab`, `tumblr`]} size="sm" /></a>
                        <a href="/rss/" className="rss" key="rss"><FontAwesomeIcon icon={[`far`, `rss`]} size="sm" /></a>
                    </div>
                    <p className="copyright">©2019 Hackers and Slackers, All Rights Reserved.</p>
                </div>
                <div className="widget links">
                    <h5 className="footer-widget-title">Links</h5>
                    <ul>
                        {pageLinks.map(({ node }) => (
                            <li key={ node.title }><Link to={ `/${ node.slug }` } key={ node.slug }>{ node.title }</Link></li>
                        ))}
                    </ul>
                </div>
                <div className="widget authors">
                    <h5 className="footer-widget-title">Authors</h5>
                    <ul>
                        {authorLinks.map(({ node }) => (
                            <li key={ node.name }><Link to={`/author/${ node.slug }`} >{ node.name }</Link></li>
                        ))}
                    </ul>
                </div>
                <div className="widget tags">
                    <h5 className="footer-widget-title">Tags</h5>
                    <ul>
                        {topTags.map(({ node }) => (
                            <li key={ node.slug }><Link to={`/tag/${ node.slug }`}>{ node.name }</Link></li>
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
        allGhostTag: PropTypes.object,
        allGhostPage: PropTypes.object.isRequired,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const FooterQuery = props => (
    <StaticQuery query = {
        graphql `
            query FooterQuery {
              allGhostAuthor(sort: {order: DESC, fields: postCount}) {
                edges {
                  node {
                    url
                    name
                    slug
                  }
                }
              }
              allGhostTag(limit: 10, sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "public"}, slug: {nin: "roundup"}}) {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }
              allGhostPage {
                edges {
                  node {
                    url
                    title
                    slug
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
