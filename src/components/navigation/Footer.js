import React from 'react'
import PropTypes from 'prop-types'

import {
    Link,
    StaticQuery,
    graphql,
} from 'gatsby'
import config from '../../utils/siteConfig'
import NavLinks from './NavLinks'

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
                <div className="widget links">
                    <h5 className="footer-widget-title">Links</h5>
                    <NavLinks navigation={navigation} />
                    <a href="/sitemap.xml" className="sitemap navigation-link" key="sitemap">Sitemap</a>
                </div>
                <div className="widget tags">
                    <h5 className="footer-widget-title">Tags</h5>
                    {topTags.map(({ node }) => (
                        <Link to={`/tag/${ node.slug }`} className="navigation-link" key={ node.slug }>{ node.name }</Link>
                    ))}
                </div>
                <div className="widget authors">
                    <h5 className="footer-widget-title">Authors</h5>
                    {authorLinks.map(({ node }) => (
                        <Link to={`/author/${ node.slug }`} className="navigation-link" key={ node.name } >{ node.name }</Link>
                    ))}
                </div>
                <div className="widget social">
                    <h5 className="footer-widget-title">Social</h5>
                    <a href={ twitterUrl } className="twitter navigation-link" key="twitter-footer">Twitter</a>
                    <a href={ facebookUrl } className="facebook navigation-link" key="facebook-footer">Facebook</a>
                    <a href={ config.social.angellist } className="angellist-footer navigation-link" key="angellist">Angellist</a>
                    <a href={ config.social.github } className="github navigation-link" key="github-footer">Github</a>
                    <a href="/rss" className="rss navigation-link" key="rss">RSS</a>
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
