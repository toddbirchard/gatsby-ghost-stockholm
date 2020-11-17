import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Navigation, Footer } from '../navigation'
import { Sidebar } from '../sidebar'
import { AuthorSidebar } from '../sidebar/authors'
import { IdentityContextProvider } from "react-netlify-identity"
import config from '../../utils/siteConfig'
import '../../styles/app.less'

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */

const DefaultLayout = ({ data, children, hasSidebar, template, authorData }) => {
  const site = data.ghostSettings
  const corePages = [`home-template`, `page-template`, `tag-template`]
  const isCorePage = corePages.includes(template)
  const authUrl = `https://hackersandslackers.com`

  return (
    <>
      <IdentityContextProvider url={authUrl}>
        <Helmet>
          <html lang={site.lang} />
          <body className={template} />
        </Helmet>

        <Navigation
          data={site.navigation}
          navClass="site-nav-item"
          smallLogo={config.mobileLogo}
        />

        <div className="viewport">
          <div className={hasSidebar ? `sidebar-container` : `container`}>
            {/* All main content gets inserted here (comments.js, post.js, etc). */}
            {children}
            {template === `author-template` && <AuthorSidebar authorData={authorData} /> }
            {isCorePage && <Sidebar site={site} template={template} />}
          </div>
        </div>
        <Footer navigation={site.navigation} site={site} template={template} />
        <script defer src="https://ghostboard.io/t/5b6d07675e853714ea2d75ea.js" type="text/javascript" async></script>
        <noscript><img src="https://ghostboard.io/api/noscript/5b6d07675e853714ea2d75ea/pixel.gif" alt="" border="0" /></noscript>
      </IdentityContextProvider>
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool,
  template: PropTypes.string,
  authorData: PropTypes.object,
  data: PropTypes.shape({
    ghostSettings: PropTypes.object.isRequired,
    allGhostTag: PropTypes.object,
  }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
  <StaticQuery
    query={graphql`
            query GhostSettings {
              ghostSettings {
                ...GhostSettingsFields
              }
            }
        `}
    render={data => <DefaultLayout data={data} {...props} />}
  />
)

export default DefaultLayoutSettingsQuery
