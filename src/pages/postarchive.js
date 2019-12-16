import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PostCard } from '../components/common'
import { Pagination } from '../components/navigation'
import { MetaData } from '../components/common/meta'

import '../styles/pages/postarchive.less'

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
            <Layout template="postarchive-template" hasSidebar={false}>
                <div className="post-archive-body">
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
    query GhostPostArchiveQuery {
       allGhostPost(sort: {order: DESC, fields: [published_at]}, limit: 700, filter: {primary_tag: {slug: {ne: "roundup"}}}) {
          edges {
            node {
              ...GhostPostFields
            }
          }
        }
    }
`
