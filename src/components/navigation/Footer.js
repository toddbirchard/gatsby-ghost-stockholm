import React from 'react'
import PropTypes from 'prop-types'

import {
    Link,
    StaticQuery,
    graphql,
} from 'gatsby'
import config from '../../utils/siteConfig'
import NavLinks from './NavLinks'

const Footer = ({ navigation, site, data, template }) => {
    const authorLinks = data.allGhostAuthor.edges
    const seriesLinks = data.series.edges
    const topTags = data.tags.edges
    const siteTitle = site.title
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null

    return (
      <>
        {/* The footer at the very bottom of the screen */}
        <footer className="site-footer">
            <div className="footer-wrapper">
                <div className="footer-row">
                    { siteTitle && <h1 className="site-headline">{site.title} </h1> }
                    <div className="footer-links">
                        <NavLinks navigation={navigation} />
                        {/*<a href="/sitemap.xml" className="sitemap navigation-link">Sitemap</a>*/}
                    </div>
                </div>
                <div className="footer-widgets">
                    <div className="widget tags">
                        <h5 className="footer-widget-title">Tags</h5>
                        {topTags.map(({ node }) => (
                            <Link to={`/tag/${ node.slug }`} className="navigation-link" key={`${ node.slug }-footer-link`}>{ node.name }</Link>
                        ))}
                    </div>
                    <div className="widget series">
                        <h5 className="footer-widget-title">Series</h5>
                        {seriesLinks.map(({ node }) => (
                            <Link to={`/series/${ node.slug}`} className="navigation-link" key={`${ node.slug }-footer-link`}>{ node.meta_title }</Link>
                        ))}
                    </div>
                    <div className="widget authors">
                        <h5 className="footer-widget-title">Authors</h5>
                        {authorLinks.map(({ node }) => (
                            <Link to={`/author/${ node.slug }`} className="navigation-link" key={`${ node.name }-footer-link`} >{ node.name }</Link>
                        ))}
                    </div>
                    <div className="widget social">
                        <h5 className="footer-widget-title">Social</h5>
                        <a href={ twitterUrl } className="twitter navigation-link" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href={ facebookUrl } className="facebook navigation-link" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href={ config.social.angellist } className="angellist-footer navigation-link" target="_blank" rel="noopener noreferrer">Angellist</a>
                        <a href={ config.social.github } className="github navigation-link" target="_blank" rel="noopener noreferrer">Github</a>
                        <a href="/rss" className="rss navigation-link">RSS</a>
                    </div>
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
        tags: PropTypes.object,
        series: PropTypes.object,
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
              tags: allGhostTag(limit: 8, sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "public"}, slug: {nin: ["roundup", "excel"]}}) {
                edges {
                  node {
                    name
                    slug
                  }
                }
              }
              series: allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}, postCount: {gt: 4}, slug: {nin: "adventures-in-excel"}}) {
                edges {
                  node {
                    slug
                    name
                    meta_title
                  }
                }
              }
            }`
    }
    render={data => <Footer data={data} {...props} />}
    />
)

export default FooterQuery
