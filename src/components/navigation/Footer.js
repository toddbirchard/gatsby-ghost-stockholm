import React from 'react'
import PropTypes from 'prop-types'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRss, faTag } from '@fortawesome/pro-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Img from 'gatsby-image'
import {
    Link,
    StaticQuery,
    graphql,
} from 'gatsby'
import config from '../../utils/siteConfig'

library.add(fab, faRss, faTag)

const Footer = ({ navigation, site, data }) => {
    const authorLinks = data.allGhostAuthor.edges
    const topTags = data.allGhostTag.edges
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

    return (
      <>
        {/* The footer at the very bottom of the screen */}
        <footer className="site-footer">
            <div className="footer-wrapper">
                {/*<div className="widget about">
                    <Link to="/" alt="/">
                        {site.logo ? <img className="logo" src="/light-logo-small-2.png" alt={site.title} /> : <Img className="logo" fixed={site.logo} alt={site.title} loading="lazy" /> }
                    </Link>
                    <p className="description">{config.description}</p>
                    <div className="social-btns">

                    </div>
                </div>*/}
                <div className="widget links">
                    <h5 className="footer-widget-title">Links</h5>
                    {navigation.map((navItem, i) => {
                        if (navItem.url.includes(config.siteUrl)) {
                            return <Link className="footer-link" to={`${navItem.url.split(`/`).pop()}`} key={i} >{navItem.label}</Link>
                        } else {
                            return <a className="footer-link" href={navItem.url} key={i} target="_blank" rel="noopener noreferrer">{navItem.label}</a>
                        }
                    })}
                    <Link to="/sitemap.xml" className="sitemap footer-link" key="sitemap">Sitemap</Link>
                </div>
                <div className="widget tags">
                    <h5 className="footer-widget-title">Tags</h5>
                    {topTags.map(({ node }) => (
                        <Link to={`/tag/${ node.slug }`} className="footer-link" key={ node.slug }>{ node.name }</Link>
                    ))}
                </div>
                <div className="widget authors">
                    <h5 className="footer-widget-title">Authors</h5>
                    {authorLinks.map(({ node }) => (
                        <Link to={`/author/${ node.slug }`} className="footer-link" key={ node.name } >{ node.name }</Link>
                    ))}
                </div>
                <div className="widget social">
                    <h5 className="footer-widget-title">Social</h5>
                    <a href={ twitterUrl } className="twitter footer-link" key="twitter-footer">Twitter</a>
                    <a href={ facebookUrl } className="facebook footer-link" key="facebook-footer">Facebook</a>
                    <a href={ config.social.angellist } className="angellist-footer footer-link" key="angellist">Angellist</a>
                    {/*<a href={ config.social.linkedin } className="linkedin-footer" key="linkedin"><FontAwesomeIcon icon={[`fab`, `linkedin`]} size="sm" /></a>*/}
                    <a href={ config.social.github } className="github footer-link" key="github-footer">Github</a>
                    {/*<a href={ config.social.tumblr } className="tumblr" key="tumblr-footer"><FontAwesomeIcon icon={[`fab`, `tumblr`]} size="sm" /></a>*/}
                    <Link to="/rss/" className="rss footer-link" key="rss">RSS</Link>
                </div>
            </div>
            <div className="copyright">
                <p className="copyright-txt">{config.siteCopyright}</p>
            </div>
        </footer>

    </>
    )
}

Footer.propTypes = {
    data: PropTypes.shape({
        allGhostAuthor: PropTypes.object.isRequired,
        allGhostTag: PropTypes.object,
    }).isRequired,
    site: PropTypes.shape({
        title: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        twitter: PropTypes.string,
        facebook: PropTypes.string,
    }),
    navigation: PropTypes.arrayOf(
        PropTypes.shape({
            slug: PropTypes.string,
            name: PropTypes.string,
        })
    ).isRequired,
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
              allGhostTag(limit: 8, sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "public"}, slug: {nin: ["roundup", "excel"]}}) {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }
            }
        `}
    render={data => <Footer data={data} {...props} />}
    />
)

export default FooterQuery
