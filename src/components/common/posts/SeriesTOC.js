import React from 'react'
import { Link } from 'gatsby'

const SeriesTOC = ({ seriesPosts, postCount }) => {
  const numberOfPosts = postCount + 1
  const listStyle = {
    counterReset: `li ${numberOfPosts}`
  }

  return (
    <>
    <div className="series-posts">
        <ol className="series-posts" style={listStyle}>
          {seriesPosts.map(({ node }) => (
              <li key={node.slug}><Link to={node.slug}>{node.title}</Link></li>
          ))}
        </ol>
      </div>
    </>
  )
}

export default SeriesTOC
