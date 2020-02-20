import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PostCard } from '../components/common'
import { Pagination } from '../components/navigation'
import { MetaData } from '../components/common/meta'
import config from '../utils/siteConfig'

import '../styles/post-card.less'
import '../styles/sidebar.less'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Index = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges
    const metaTitle = config.siteTitleMeta

    return (
        <>
            <MetaData location={location} data={data} />
            <Layout hasSidebar={true} template="home-template">
                <main className="site-main">
                    <section className="post-feed">
                        {posts.map(({ node }) => (
                            <PostCard key={node.id} post={node} />
                        ))}
                        <Pagination pageContext={pageContext} metaTitle={metaTitle} />
                    </section>
                </main>
            </Layout>
        </>
    )
}

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
        sort: { order: DESC, fields: [published_at]}, filter: {tags: {elemMatch: {slug: {ne: "roundup"}, visibility: {eq: "public"}}}},
        limit: $limit,
        skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`
