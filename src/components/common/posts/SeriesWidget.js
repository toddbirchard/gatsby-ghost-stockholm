import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'


const SeriesWidget = ({ seriesPosts, seriesTitle }) => {

  return (
    <>
      <span className="series-title">{ seriesTitle }</span>
      <ul className="series-posts">
        {seriesPosts.map(({ node }) => (
            <li key={node.slug}><Link to={`/series/${node.slug}`}>{node.title}</Link></li>
        ))}
      </ul>
    </>
  )
}

export default SeriesWidget
