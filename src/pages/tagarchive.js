import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

import '../styles/pages/tag.less'

/**
* Series page (/series/)
*
* Loads all posts for the requested tag incl. pagination.
*
*/
const TagArchive = ({ data, location }) => {
    const tags = data.allGhostTag.edges
    const page = data.ghostPage

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
            <Layout template="TagArchive-template page-template" hasSidebar={true}>
                <div className="page-content post-content">
                    {page.title ? <h1>{page.title}</h1> : null }
                    {page.plaintext ? <p>{page.plaintext}</p> : null }
                    <div className="series-grid">
                        {tags.map(({ node }) => (
                            <Link to={`/series/${node.slug}`} className="series-card" key={node.id}>
                                {
                                    node.feature_image && <div className="series-card-image" style={{
                                        backgroundImage: `url(${node.feature_image})`,
                                    }}></div>
                                }
                                <div className="series-card-info">
                                    <h2 className="series-card-title">{node.meta_title}</h2>
                                    <p className="series-card-description">{node.description}</p>
                                    <span className="series-card-count">{node.postCount} Posts</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    )
}

TagArchive.propTypes = {
    data: PropTypes.shape({
        allGhostTag: PropTypes.object.isRequired,
        ghostPage: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object,
}

export default TagArchive

export const tagQuery = graphql`
    query GhostTagArchiveQuery($slug: String) {
      allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}, postCount: {gt: 2}}) {
        edges {
          node {
            slug
            url
            postCount
            feature_image
            description
            name
            meta_title
          }
        }
      }
      ghostPage(slug: {eq: $slug}) {
        ...GhostPageFields
      }
  }`
