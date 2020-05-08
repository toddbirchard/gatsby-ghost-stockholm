import React from 'react'
import PropTypes from 'prop-types'

import {
  Link,
  StaticQuery,
  graphql,
} from 'gatsby'
import config from '../../utils/siteConfig'
import SocialWidget from '../sidebar/SocialWidget'

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
                  : <h1 className="site-headline">{site.title}</h1>}
              </Link>
              <p className="description">{description}</p>

            </div>
            <dl className="widget pages">
              <dt className="footer-widget-title">Pages</dt>
              {navigation.map((navItem, i) => {
                if (navItem.url.includes(config.siteUrl)) {
                  return <dd key={i}><Link className={`footer-navigation-link ${navItem.label}`} to={`/${navItem.url.split(`/`).pop()}/`}>{navItem.label}</Link></dd>
                } else {
                  return <dd key={i}><a className="footer-navigation-link donate" href={navItem.url} target="_blank" rel="noopener noreferrer">{navItem.label}</a></dd>
                }
              })}
            </dl>
            <dl className="widget series">
              <dt className="footer-widget-title">Series</dt>
              {seriesLinks.map(({ node }) => (
                <dd key={`${node.slug}-footer-link`}><a href={`/series/${node.slug}`} className="footer-navigation-link">{node.name.replace(`#`, ``)}</a></dd>
              ))}
            </dl>
            <dl className="widget authors">
              <dt className="footer-widget-title">Authors</dt>
              {authorLinks.map(({ node }) => (
                <dd key={`${node.name}-footer-link`}><a href={`/author/${node.slug}`} className="footer-navigation-link">{node.name}</a></dd>
              ))}
            </dl>
          </div>
        </div>
        <div className="copyright">
          <SocialWidget site={site} />
          <p>{config.siteCopyright}</p>
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
              authors: allGhostAuthor(sort: {order: DESC, fields: postCount}) {
                edges {
                  node {
                    url
                    name
                    slug
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
              series: allGhostTag(limit: 7, sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}, postCount: {gt: 3}, slug: {nin: "adventures-in-excel"}}) {
                edges {
                  node {
                    slug
                    name
                  }
                }
              }
            }`}
    render={data => <Footer data={data} {...props} />}
  />
)

export default FooterQuery
