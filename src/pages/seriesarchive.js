import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

import '../styles/series/seriesarchive.less'

/**
* Series page (/series/)
*
* Lists all multi-part post series.
*
*/
const SeriesArchive = ({ data, location }) => {
    const tags = data.allGhostTag.edges
    const title = data.ghostPage.title
    const plaintext = data.ghostPage.plantext

    return (
        <>
            <MetaData
                data={data}
                location={location}
                description={`Explore full topics in software development and data science by following our dedicated multi-part series'.`}
                type="series"
            />
            <Layout template="seriesarchive-template page-template" hasSidebar={true}>
                <div className="page-content post-content">
                    {title && <h1>{title}</h1> }
                    {plaintext && <p>{plaintext}</p> }
                    <div className="series-grid">
                        {tags.map(({ node }) => (
                            <Link to={`/series/${node.slug}`} className="series-card" key={node.id}>
                                {node.feature_image && <div className="series-card-image" style={{
                                    backgroundImage: `url(${node.feature_image})`,
                                }}>
                                </div>
                                }
                                <div className="series-card-info">
                                    <h2 className="series-card-title">{node.name.replace(`#`, ``)}</h2>
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

SeriesArchive.propTypes = {
    data: PropTypes.shape({
        allGhostTag: PropTypes.object.isRequired,
        ghostPage: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object,
}

export default SeriesArchive

export const seriesQuery = graphql`
    query GhostSeriesArchiveQuery($slug: String) {
        allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}, postCount: {gt: 1}}) {
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
    }`
