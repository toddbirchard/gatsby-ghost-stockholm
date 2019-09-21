import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Navigation, Footer } from '../navigation'
import { Sidebar } from '../sidebar'

// Styles
import '../../styles/app.less'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/

const DefaultLayout = ({ data, children, hasSidebar, template }) => {
    const site = data.allGhostSettings.edges[0].node
    const tags = data.allGhostTag.edges

    return (
    <>
        <Helmet>
            <html lang={site.lang} />
            <style type="text/css">{`${site.codeinjection_styles}`}</style>
            <link rel="preconnect" href="https://storage.googleapis.com" />
            <body className={ template } />
        </Helmet>

        <Navigation data={site.navigation} navClass="site-nav-item" logo={site.icon} />
        <div className="viewport">

            <div className={ hasSidebar ? `home-container` : `container` }>
                {/* All the main content gets inserted here, index.js, post.js */}
                {children}
                { hasSidebar ? <Sidebar site={site} tags={tags} /> : null}
            </div>
        </div>
        {/* The footer at the very bottom of the screen */}
        <Footer navigation={site.navigation} site={site} />
    </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    hasSidebar: PropTypes.bool,
    template: PropTypes.string,
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
        allGhostTag: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                slug: PropTypes.string.isRequired,
                postCount: PropTypes.number.isRequired,
            })
        ).isRequired,
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
