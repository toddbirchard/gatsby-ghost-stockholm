import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'

const NavigationLinks = ({ data, navClass }) => {
    const pageLinks = data.allGhostPage.edges

    return (
    <>
      {pageLinks.map(({ node }) => (
          <Link to={ `/${ node.slug }` } className={navClass} key={ node.slug }>{ node.title }</Link>
      ))}
    </>
    )
}

NavigationLinks.defaultProps = {
    navClass: `site-nav-item`,
    navType: `home-nav`,
}

NavigationLinks.propTypes = {
    data: PropTypes.shape({
        allGhostPage: PropTypes.object.isRequired,
    }).isRequired,
    navClass: PropTypes.string.isRequired,
}

const NavigationLinksQuery = props => (
    <StaticQuery query = {
        graphql `
            query NavQuery {
              allGhostPage {
                edges {
                  node {
                    title
                    slug
                  }
                }
              }
            }
        `}
    render={data => <NavigationLinks data={data} {...props} />}
    />
)

export default NavigationLinksQuery
