import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'

/**
* Navigation component
*
* The Navigation component takes an array of your Ghost
* navigation property that is fetched from the settings.
* It differentiates between absolute (external) and relative link (internal).
* You can pass it a custom class for your own styles, but it will always fallback
* to a `site-nav-item` class.
*
*/

const Navigation = ({ data, navClass, logo }) => {
    const pageLinks = data.allGhostPage.edges

    return (
      <>
        <nav className="navigation">
            <div className="nav-wrapper">
                <Link to="/" className="logo"><img src={logo} alt="logo" /></Link>
                <div className="nav-links">
                    <div className="left-links">
                        {pageLinks.map(({ node }) => (
                            <Link to={ `/${ node.slug }` } className={navClass} key={ node.slug }>{ node.title }</Link>
                        ))}
                        <a href="https://patreon.com/hackersandslackers" className={navClass}>Donate</a>
                    </div>
                </div>
            </div>
        </nav>
    </>
    )
}

Navigation.defaultProps = {
    navClass: `site-nav-item`,
    navType: `home-nav`,
}

Navigation.propTypes = {
    data: PropTypes.shape({
        allGhostPage: PropTypes.object.isRequired,
    }).isRequired,
    navClass: PropTypes.string,
    logo: PropTypes.string,
}

const NavigationQuery = props => (
    <StaticQuery query = {
        graphql `
            query NavQuery {
              allGhostPage(sort: {order: ASC, fields: published_at}) {
                edges {
                  node {
                    title
                    slug
                  }
                }
              }
            }
        `}
    render={data => <Navigation data={data} {...props} />}
    />
)

export default NavigationQuery
