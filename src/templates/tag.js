import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PostCard } from '../components/common'
import { Pagination } from '../components/navigation'
import { MetaData } from '../components/common/meta'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
* Tag page (/tag/:slug)
*
* Loads all posts for the requested tag incl. pagination.
*
*/
const Tag = ({ data, location, pageContext }) => {
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
                <section className="post-feed">
                    <header className="tag-header info-card">
                        <h1 className="tag-title"><FontAwesomeIcon icon={[`fad`, `tag`]} size="1x" /> {tag.name}</h1>
                        {tag.description ? <p className="tag-description">{tag.description}</p> : null }
                    </header>
                    {posts.map(({ node }) => (
                        // The tag below includes the markup for each post - components/common/PostCard.js
                        <PostCard key={node.id} post={node} />
                    ))}
                    <Pagination pageContext={pageContext} />
                </section>
            </Layout>
        </>
    )
}

Tag.propTypes = {
    data: PropTypes.shape({
        ghostTag: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
        }),
        allGhostPost: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                slug: PropTypes.string.isRequired,
                primary_author: PropTypes.object.isRequired,
                html: PropTypes.string.isRequired,
                feature_image: PropTypes.string,
                tags: PropTypes.arrayOf(
                    PropTypes.shape({
                        name: PropTypes.string.isRequired,
                        slug: PropTypes.string.isRequired,
                    })
                ).isRequired,
                published_at_pretty: PropTypes.string,
            }).isRequired,
        ),
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
    icon: PropTypes.string,
}

export default Tag

export const pageQuery = graphql`
    query GhostTagQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostTag(slug: { eq: $slug }) {
            ...GhostTagFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {tags: {elemMatch: {slug: {eq: $slug}}}},
            limit: $limit,
            skip: $skip
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
