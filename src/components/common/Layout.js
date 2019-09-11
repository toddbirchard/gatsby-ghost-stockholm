import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'

import Img from 'gatsby-image'

import { Navigation } from './navigation'

import { Sidebar, Footer } from '.'
import config from '../../utils/siteConfig'

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


const DefaultLayout = ({ data, children, bodyClass, hasSidebar, template }) => {
    const site = data.allGhostSettings.edges[0].node
    const tags = data.allGhostTag.edges

    return (
    <>
        <Helmet>
            <html lang={site.lang} />
            <style type="text/css">{`${site.codeinjection_styles}`}</style>
            <body className={ template } />
        </Helmet>

        <Navigation data={site.navigation} navClass="site-nav-item" navType="home-nav" logo={site.icon} url={site.url} />
        <div className="viewport">

            <div className={ hasSidebar ? `home-container` : `container` }>
                {/* All the main content gets inserted here, index.js, post.js */}

                {children}
                { hasSidebar ? <Sidebar site={site} tags={tags} /> : null}
            </div>
        </div>
        {/* The footer at the very bottom of the screen */}
        <Footer />
    </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    hasSidebar: PropTypes.bool,
    template: PropTypes.string,
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
                allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "public"}}) {
                edges {
                  node {
                    name
                    slug
                    url
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
