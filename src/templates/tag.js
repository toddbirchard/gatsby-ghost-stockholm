import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PostCard } from '../components/common'
import { Pagination } from '../components/navigation'
import { MetaData } from '../components/common/meta'
import { InfoCard } from '../components/misc'
import '../styles/pages/tag.less'

/**
 * Tag page (/tag/:slug)
 *
 * Loads all posts for the requested tag incl. pagination.
 *
 */

const Tag = ({ data, location, pageContext }) => {
  const tag = data.ghostTag
  const posts = data.allGhostPost.edges
  const title =
    pageContext.currentPage > 1
      ? tag.name +
      ` (page ` +
      pageContext.currentPage +
      ` of ` +
      pageContext.numberOfPages +
      `)`
      : tag.name

  return (
    <>
      <MetaData
        data={tag}
        title={title}
        description={tag.description}
        location={location}
        pageContext={pageContext}
      />
      <Layout template="tag-template" hasSidebar>
        <InfoCard tag={tag} count={pageContext.currentPage} version={`mobile`}/>
        <section className="post-feed">
          <InfoCard tag={tag} count={pageContext.currentPage} version={`desktop`}/>
          {posts.map(({ node }) => (
            <PostCard key={node.id} post={node}/>
          ))}
          <Pagination pageContext={pageContext}/>
        </section>
      </Layout>
    </>
  )
}

Tag.propTypes = {
  data: PropTypes.shape({
    ghostTag: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
      allGhostPost: PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            primary_author: PropTypes.object.isRequired,
            feature_image: PropTypes.string.isRequired,
            tags: PropTypes.arrayOf(
              PropTypes.shape({
                name: PropTypes.string.isRequired,
                slug: PropTypes.string.isRequired,
              }),
            ),
            published_at_pretty: PropTypes.string.isRequired,
          }).isRequired,
        ),
      }),
    }),
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
}

export default Tag

export const pageQuery = graphql`
  query GhostTagQuery($slug: String!, $limit: Int!, $skip: Int!) {
    ghostTag(slug: { eq: $slug }) {
      ...GhostTagFields
    }
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
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
