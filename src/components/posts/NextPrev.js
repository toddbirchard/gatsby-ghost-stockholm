import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'


const NextPrevQuery = props => (
    <StaticQuery
        query={graphql`
          query MyQuery {
            allGhostPost(filter: {tags: {elemMatch: {slug: {eq: "data-analysis-with-pandas"}}}}, sort: {order: DESC, fields: published_at}) {
              edges {
                next {
                  slug
                  title
                  feature_image
                }
                previous {
                  slug
                  feature_image
                  title
                }
                node {
                  title
                  slug
                }
              }
            }
          }`}
        render={data => <NextPrevQuery data={data} {...props} />}
    />
)

export default NextPrevQuery
