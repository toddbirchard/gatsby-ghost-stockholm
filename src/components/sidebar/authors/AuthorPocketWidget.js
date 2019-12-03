import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AuthorPocketWidget = ({ data }) => {
    const pocketLinks = data.allPocketArticle.edges

    return (
        <div className="widget pocket">
            <div className="widget-header">
                <div className="label pocket"><FontAwesomeIcon icon={[`fab`, `get-pocket`]} size="xs" /> <span>Recommended Reads</span></div>
                {/*<div className="trend-type">Top Posts This Week</div>*/}
            </div>
            <div className="widget-content">
                {pocketLinks.map(({ node }) => (
                    <a href={node.url} className="link" key={ node.id } target="_blank" rel="noopener noreferrer"><img className="favicon lazyload" data-src={node.domainFavicon} alt={node.title} /> {node.title}</a>
                ))}
            </div>
        </div>
    )
}

AuthorPocketWidget.propTypes = {
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
                  image {
                    item_id
                    src
                    width
                    height
                  }
                }
              }
            }
          }
        `}
        render={data => <AuthorPocketWidget data={data} {...props} />}
    />
)

export default AuthorPocketQuery
