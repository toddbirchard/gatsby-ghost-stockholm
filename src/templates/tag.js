import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PostCard } from '../components/common'
import { Pagination } from '../components/navigation'
import { MetaData } from '../components/common/meta'
import { FaTags } from 'react-icons/fa'

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
  const pageCount = pageContext.humanPageNumber > 1 ? pageContext.humanPageNumber : null

  return (
    <>
      <MetaData
        data={data}
        location={location}
        pageContext={pageContext}
        type="website"
      />
      <Layout template="tag-template page-template" hasSidebar={true}>
        <section className="post-feed">
          <header className="info-card">
            <div className="page-title">
              <FaTags />
              <h1 className="page-title">{tag.name}{pageCount && <span>{` (page ${pageCount})`}</span>}</h1>
            </div>
            {tag.description ? <p className="tag-description">{tag.description}</p> : null }
          </header>
          {posts.map(({ node }) => (
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
    allGhostPost: PropTypes.shape({
      title: PropTypes.string,
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
  }).isRequired,
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
