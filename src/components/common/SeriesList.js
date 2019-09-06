import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'


const SeriesList = ({ data }) => {
  const series = data.allGhostTag.edges
  return (
    <>
        {series.map((slug, url, postCount, feature_image, description, name) => {
              <p>name</p>
        })}
    </>
  )
}

export default SeriesList

/*
SeriesList.propTypes = {
  data: PropTypes.shape({
      allGhostTag: PropTypes.object.isRequired,
  }).isRequired,
}



const SeriesListQuery = props => (
    <StaticQuery
        query={graphql`
        query {
          allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}}) {
            edges {
              node {
                slug
                url
                postCount
                feature_image
                description
                name
              }
            }
          }
        }
      `}
      render={data => <SeriesList data={data} {...props} />}
  />
)

export default SeriesListQuery
*/
