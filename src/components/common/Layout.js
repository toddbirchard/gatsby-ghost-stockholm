import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Navigation, Footer } from '../navigation'
import { Sidebar } from '../sidebar'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faLinkedin,
  faAngellist,
  faTwitter,
  faGithub,
  faFacebook,
  faGetPocket,
  faMedium,
} from '@fortawesome/free-brands-svg-icons'
import {
  faTags,
  faEye,
  faPencilAlt,
  faUserEdit,
  faCalendar,
  faArrowLeft,
  faArrowRight,
  faGlobe,
  faHome,
  faChartLine,
  faRss,
  faRssSquare,
  faSearch,
  faRetweet,
  faHeartbeat,
  faUserPlus,
  faIndent,
  faUserFriends,
  faStar,
  faCodeBranch,
  faCode,
  faProjectDiagram,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

// Styles
import '../../styles/app.less'

library.add(faTags,
  faEye,
  faPencilAlt,
  faUserEdit,
  faCalendar,
  faArrowLeft,
  faArrowRight,
  faGlobe,
  faHome,
  faChartLine,
  faRss,
  faRssSquare,
  faSearch,
  faLinkedin,
  faAngellist,
  faTwitter,
  faGithub,
  faFacebook,
  faGetPocket,
  faMedium,
  faRetweet,
  faHeartbeat,
  faUserPlus,
  faIndent,
  faUserFriends,
  faStar,
  faCodeBranch,
  faCode,
  faProjectDiagram,
  faUsers)

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

  return (
    <>
      <Helmet>
        <html lang={site.lang}/>
        <style type="text/css">{`${site.codeinjection_styles}`}</style>
        <body className={template}/>
      </Helmet>

      <Navigation data={site.navigation} navClass="site-nav-item" smallLogo={site.icon} fullLogo={site.logo}
        template={template}/>
      <div className="viewport">
        <div className={hasSidebar ? `sidebar-container` : `container`}>
          {/* All the main content gets inserted here, index.js, post.js */}
          {children}
          {hasSidebar && <Sidebar site={site} template={template} authorData={authorData}/>}
        </div>
      </div>
      <Footer navigation={site.navigation} site={site} template={template}/>
    </>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool,
  hasAuthorSidebar: PropTypes.bool,
  template: PropTypes.string,
  authorTrendingPosts: PropTypes.object,
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
