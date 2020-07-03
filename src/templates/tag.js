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
  const pageNumber = pageContext.pageNumber
  const baseTitle = tag.name
  const title = pageContext.pageNumber > 0 ? baseTitle + ` (page ` + pageNumber + ` of ` + pageContext.numberOfPages + `)` : baseTitle
  const pageCount = pageContext.humanPageNumber > 1 ? pageContext.humanPageNumber : null

  return (
    <>
      <MetaData
        data={data}
        title={title}
        location={location}
        pageContext={pageContext}
        type="website"
      />
      <Layout template="tag-template page-template" hasSidebar>
        <section className="post-feed">
          <InfoCard tag={tag} count={pageCount}/>
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
      description: PropTypes.string,
    }),
    allGhostPost: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          slug: PropTypes.string,
          primary_author: PropTypes.object,
          feature_image: PropTypes.string,
          tags: PropTypes.arrayOf(
            PropTypes.shape({
              name: PropTypes.string.isRequired,
              slug: PropTypes.string.isRequired,
            })
          ),
          published_at_pretty: PropTypes.string,
        }).isRequired,
      ),
    }).isRequired,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
}

export default Tag

export const tagQuery = graphql`
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
  }`
