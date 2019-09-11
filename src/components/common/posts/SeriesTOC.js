import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import '../../../styles/seriestoc.less'

const SeriesTOC = ({ seriesPosts, seriesTitle, postCount }) => {
  const title = seriesTitle.replace('#', '')
  const numberOfPosts = postCount + 1
  const listStyle = {
    counterReset: `li ${numberOfPosts}`
  }

  return (
    <>
      <div className="series-posts">
        {/*<h5 className="series-title">{ title }</h5>*/}
        <ol className="series-posts" style={listStyle}>
          {seriesPosts.map(({ node }) => (
              <li key={node.slug}><Link to={`/series/${node.slug}`}>{node.title}</Link></li>
          ))}
        </ol>
      </div>
    </>
  )
}

export default SeriesTOC
