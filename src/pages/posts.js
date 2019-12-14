import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PostCard } from '../components/common'
import { Pagination } from '../components/navigation'
import { MetaData } from '../components/common/meta'

/**
* Series page (/series/)
*
* Loads all posts for the requested tag incl. pagination.
*
*/
const PostArchive = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
            <Layout template="postarchive-template page-template" hasSidebar={false}>
                <div className="page-content post-content">
                    <h1>All Posts</h1>
                    <div className="posts-grid">
                        {posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} page={`about`} />
                        ))}
                        <Pagination pageContext={pageContext} />
                    </div>
                </div>
            </Layout>
        </>
    )
}

PostArchive.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
        ghostPage: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object,
    pageContext: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }),
}

export default PostArchive

export const postArchiveQuery = graphql`
    query GhostPostArchiveQuery($slug: String) {
      allGhostPost(filter: {primary_tag: {slug: {nin: ["roundup", null]}}}, limit: 30) {
          edges {
            node {
              ...GhostPostFields
            }
          }
        }
        ghostPage(slug: {eq: $slug}) {
          ...GhostPageFields
        }
    }
`
