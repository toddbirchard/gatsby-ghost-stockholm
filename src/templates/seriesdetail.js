import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../components/common'
import { SeriesPostCard } from '../components/misc'
import { MetaData } from '../components/common/meta'

import '../styles/pages/seriesdetail.less'

/**
 * Series detail page (/tag/:slug)
 *
 * Loads all posts for the requested tag incl. pagination.
 *
 */
const SeriesDetail = ({ data, location }) => {
  const tag = data.ghostTag
  const tagName = tag.name.replace(`#`, ``)
  const posts = data.allGhostPost.edges

  return (
    <>
      <MetaData
        data={data}
        title={`${tagName} Series`}
        description={tag.description}
        location={location}
        type="series"
      />
      <Layout template="tag-template page-template series-template series-container" hasSidebar={false}>
        {tag.feature_image ?
          <figure className="series-feature-image">
            <img className="lazyload" data-src={tag.feature_image} alt={tag.name}/>
          </figure> : null}
        <header className="series-header">
          <h1 className="series-title">{tagName}</h1>
          {tag.description ? <p className="series-description">{tag.description}</p> : null}
        </header>
        <section className="post-feed">
          {posts.map(({ node }, index) => (
            // The tag below includes the markup for each post - components/common/PostCard.js
            <SeriesPostCard key={node.id} post={node} count={index}/>
          ))}
        </section>

      </Layout>
    </>
  )
}

SeriesDetail.propTypes = {
  data: PropTypes.shape({
    ghostTag: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      feature_image: PropTypes.string,
    }),
    allGhostPost: PropTypes.shape({
      edges: PropTypes.arrayOf(
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
  }),
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
      sort: { order: ASC, fields: [published_at] },
      filter: {tags: {elemMatch: {slug: {eq: $slug}}}},
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
    ghostSettings {
      icon
    }
  }
`
