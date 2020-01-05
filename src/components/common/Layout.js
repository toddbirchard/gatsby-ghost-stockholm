import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Navigation, Footer } from '../navigation'
import { Sidebar } from '../sidebar'
import config from '../../utils/siteConfig'
import { library } from '@fortawesome/fontawesome-svg-core'
import 'lazysizes'
import { faLinkedin,
    faAngellist,
    faTwitter,
    faGithub,
    faFacebook,
    faGetPocket,
    faMedium } from '@fortawesome/free-brands-svg-icons'
import { faTags,
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
    faSearch,
    faRetweet,
    faHeartbeat } from '@fortawesome/pro-duotone-svg-icons'

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
    faSearch,
    faLinkedin,
    faAngellist,
    faTwitter,
    faGithub,
    faFacebook,
    faGetPocket,
    faMedium,
    faRetweet,
    faHeartbeat)

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/

const DefaultLayout = ({ data, children, hasSidebar, template, authorData }) => {
    const site = data.allGhostSettings.edges[0].node
    const tags = data.allGhostTag.edges

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={ template } />
                
                {template === `post-template` ?
                    <script
                        defer
                        src="https://cdn.commento.io/js/commento.js"
                        data-css-override="https://hackersandslackers.com/comments.css"
                        data-no-fonts={true}
                    /> : null }
            </Helmet>

            <Navigation data={site.navigation} navClass="site-nav-item" logo={site.icon} mobileLogo={config.mobileLogo} template={template} />
            <div className="viewport">

                <div className={ hasSidebar ? `sidebar-container` : `container` }>
                    {/* All the main content gets inserted here, index.js, post.js */}
                    {children}
                    {hasSidebar && <Sidebar site={site} tags={tags} template={template} authorData={authorData} />}
                </div>
            </div>
            {/* The footer at the very bottom of the screen */}
            <Footer navigation={site.navigation} site={site} template={template} />
        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    hasSidebar: PropTypes.bool,
    hasAuthorSidebar: PropTypes.bool,
    template: PropTypes.string,
    authorTrendingPosts: PropTypes.object,
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
        allGhostTag: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
                allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "public"}, postCount: {gt: 1}, slug: {nin: "roundup"}}) {
                  edges {
                    node {
                      name
                      slug
                      postCount
                    }
                  }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
