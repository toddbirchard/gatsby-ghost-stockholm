import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Layout, SeriesPostCard, Sidebar } from '../components/common'
import { MetaData } from '../components/common/meta'

import '../styles/seriesdetail.less'

/**
* Tag page (/tag/:slug)
*
* Loads all posts for the requested tag incl. pagination.
*
*/
const SeriesDetail = ({ data, location, pageContext }) => {
    const tag = data.ghostTag
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
            <Layout template="tag-template" hasSidebar={true}>
              <div className="series-container">
                <header className="tag-header">
                    <h1>{tag.name}</h1>
                    {tag.description ? <p>{tag.description}</p> : null }
                </header>
                <section className="post-feed">
                    {posts.map(({ node }, index) => (
                        // The tag below includes the markup for each post - components/common/PostCard.js
                        <SeriesPostCard key={node.id} post={node} count={index}/>
                    ))}
                </section>
                </div>
            </Layout>
        </>
    )
}

SeriesDetail.propTypes = {
    data: PropTypes.shape({
        ghostTag: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
    icon: PropTypes.string,
}

export default SeriesDetail

export const pageQuery = graphql`
    query GhostSeriesQuery($slug: String!) {
        ghostTag(slug: { eq: $slug }) {
            ...GhostTagFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {tags: {elemMatch: {slug: {eq: $slug}}}},
        ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
        allGhostSettings {
          edges {
            node {
              icon
            }
          }
      }
    }
`
