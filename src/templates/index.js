import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PostCard } from '../components/common'
import { Pagination } from '../components/navigation'
import { MetaData } from '../components/common/meta'
import config from '../utils/siteConfig'

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
  const pageNumber = pageContext.pageNumber
  const baseTitle = config.siteTitleMeta
  const title =
    pageContext.pageNumber > 0
      ? baseTitle +
      ` (page ` +
      pageNumber +
      ` of ` +
      pageContext.numberOfPages +
      `)`
      : baseTitle
  const description = config.siteDescriptionMeta

  return (
    <>
      <MetaData
        data={data}
        title={title}
        description={description}
        location={location}
        pageContext={pageContext}
      />
      <Layout hasSidebar={true} template="home-template">
        <main className="site-main">
          <section className="post-feed">
            {posts.map(({ node }) => (
              <PostCard key={node.id} post={node}/>
            ))}
            <Pagination
              pageContext={pageContext}
              metaTitle={baseTitle}
              template="home-template"
            />
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
      sort: { order: DESC, fields: [published_at] }
      filter: {
        tags: {
          elemMatch: {
            slug: { nin: ["roundup", "data-schema"] }
            visibility: { eq: "public" }
          }
        }
      }
      limit: $limit
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
