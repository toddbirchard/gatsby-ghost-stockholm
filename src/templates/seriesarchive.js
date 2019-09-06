import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { Layout, Pagination, Sidebar } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Series page (/series/)
*
* Loads all posts for the requested tag incl. pagination.
*
*/
const SeriesArchive = ({ data, location, pageContext }) => {
    const tags = data.allGhostTag.edges
    const page = data.ghostPage

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
            <Layout template="seriesarchive-template" hasSidebar={true}>
                <div className="content">
                        <header className="tag-header">
                            {page.title ? <h1>{page.title}</h1> : null }
                            {page.description ? <p>{page.description}</p> : null }
                        </header>
                        <div className="series-grid">
                        {tags.map(({ node }) => (
                            <Link to={node.url} className="series-card" key={node.id}>
                                {
                                    node.feature_image && <div className="series-card-image" style={{
                                        backgroundImage: `url(${node.feature_image})`
                                    }}></div>
                                }
                              <div className="series-card-info">
                                <h2 className="series-card-title">{node.name}</h2>
                                <p className="series-card-description">{node.description}</p>
                                <span className="series-card-count">{node.postCount}</span>
                              </div>
                            </Link>
                        ))}
                        </div>
                </div>
            </Layout>
        </>
    )
}

SeriesArchive.propTypes = {
    data: PropTypes.shape({
        allGhostTag: PropTypes.object.isRequired,
        ghostPage: PropTypes.object.isRequired,
    }).isRequired,
}

export default SeriesArchive

export const pageQuery = graphql`
    query GhostSeriesArchiveQuery($slug: String!) {
        allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}}) {
          edges {
             node {
               id
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
    }
`
