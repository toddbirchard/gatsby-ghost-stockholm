import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { FaGetPocket } from 'react-icons/fa'

const AuthorPocket = ({ data }) => {
  const pocketLinks = data.allPocketArticle.edges

  return (
    <div className="widget pocket">
      <div className="widget-header">
        <div className="label pocket"><FaGetPocket /> <span>Recommended Reads</span></div>
      </div>
      <div className="widget-content">
        {pocketLinks.map(({ node }) => (
          <a href={node.url} className="link" key={ node.id } target="_blank" rel="noopener noreferrer">
            {node.domainFavicon &&
              <img className="favicon lazyload" data-src={node.domainFavicon} alt={node.title} />
            } {node.title}
          </a>
        ))}
      </div>
    </div>
  )
}

AuthorPocket.propTypes = {
  data: PropTypes.shape({
    allPocketArticle: PropTypes.object,
  }).isRequired,
}

const AuthorPocketQuery = props => (
  <StaticQuery
    query={graphql`
          query AuthorPocketQuery {
            allPocketArticle(sort: {fields: readDay, order: DESC}, filter: {title: {nin: [null, ""]}}) {
              edges {
                node {
                  id
                  url
                  title
                  excerpt
                  is_article
                  has_image
                  word_count
                  time_read
                  articleDomain
                  domainFavicon
                }
              }
            }
          }
        `}
    render={data => <AuthorPocket data={data} {...props} />}
  />
)

export default AuthorPocketQuery
