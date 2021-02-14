import React from 'react'
import PropTypes from 'prop-types'
import {
  Link,
  StaticQuery,
  graphql,
} from 'gatsby'
import config from '../../utils/siteConfig'
import SocialWidget from '../sidebar/SocialWidget'
import AuthButton from "../auth/AuthButton"

const Footer = ({ navigation, site, data }) => {
  const authorLinks = data.authors.edges
  const seriesLinks = data.series.edges
  const logo = site.logo
  const description = site.description

  return (
    <>
      <footer className="site-footer">
        <div className="footer-wrapper">
          <div className="footer-widgets">
            <div className="widget about">
              <Link to="/" className="footer-logo">
                {logo
                  ? <img className="lazyload" data-src={logo} alt={`${site.title} Logo`} title={`${site.title} Logo`} />
                  : <h1 className="site-headivine">{site.title}</h1>}
              </Link>
              <p className="description">{description}</p>

            </div>
            <div className="widget pages">
              <span className="footer-widget-title">Pages</span>
              {navigation.map((navItem, i) => {
                if (navItem.url.includes(`/rss`)) {
                  return <a
                    className="footer-navigation-link rss"
                    href={navItem.url}
                    key={i}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {navItem.label}
                  </a>
                } else if (navItem.url.includes(config.siteUrl)) {
                  return <Link key={i} className={`footer-navigation-link ${navItem.label}`} to={navItem.url.replace(config.siteUrl, ``)}>
                    {navItem.label}
                  </Link>
                } else {
                  return <a className="footer-navigation-link donate" href={navItem.url} key={i} target="_blank" rel="noopener noreferrer">
                    {navItem.label}
                  </a>
                }
              })}
              <AuthButton styleClass="footer-navigation-link" />
            </div>
            <div className="widget series">
              <span className="footer-widget-title">Series</span>
              {seriesLinks.map(({ node }) => (
                <a href={`/series/${node.slug}`} key={`${node.slug}-footer-link`} className="footer-navigation-link">
                  {node.name.replace(`#`, ``)}
                </a>
              ))}
            </div>
            <div className="widget authors">
              <span className="footer-widget-title">Authors</span>
              {authorLinks.map(({ node }) => (
                <a href={`/author/${node.slug}`} key={`${node.name}-footer-link`} className="footer-navigation-link">
                  {node.name}
                </a>
              ))}
            </div>
          </div>
          <div className="subfooter">
            <SocialWidget site={site} />
            <div className="copyright">{config.siteCopyright}</div>
          </div>
        </div>
      </footer>
    </>
  )
}

Footer.propTypes = {
  data: PropTypes.shape({
    authors: PropTypes.object.isRequired,
    tags: PropTypes.object,
    series: PropTypes.object,
  }).isRequired,
  site: PropTypes.shape({
    title: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    twitter: PropTypes.string,
    facebook: PropTypes.string,
    description: PropTypes.string,
  }),
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
}

const FooterQuery = props => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
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
            tags: allGhostTag(limit: 12, sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "public"}, slug: {nin: ["roundup", "excel"]}}) {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            series: allGhostTag(limit: 8, sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}, postCount: {gt: 2}, slug: {ne: "adventures-in-excel", nin: ["code-snippet-corner", "hacking-tableau-server", "mongodb-cloud", "the-rise-of-google-cloud", "create-an-aws-api"]}}) {
              edges {
                node {
                  slug
                  name
                }
              }
            }
          }
    `}
    render={data => <Footer data={data} {...props} />}
  />
)

export default FooterQuery
