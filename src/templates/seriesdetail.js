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
 * Loads all posts belonging to a `series` of posts.
 */

const SeriesDetail = ({ data, location }) => {
  const tag = data.seriesTag
  const tagName = tag.name.replace(`#`, ``)
  const posts = data.allGhostPost.edges
  const page = data.seriesPage

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
        <main>
          <header className="series-header">
            <h1 className="series-title">{tagName}</h1>
            {page
              ? <main
                className="post-content content-body load-external-scripts"
                dangerouslySetInnerHTML={{ __html: page.html }}
              />
              : <p className="series-description">{tag.description}</p>
            }
          </header>
          <section className="post-feed">
            {posts.map(({ node }, index) => (
              <SeriesPostCard key={node.id} post={node} count={index}/>
            ))}
          </section>
        </main>
      </Layout>
    </>
  )
}

SeriesDetail.propTypes = {
  data: PropTypes.shape({
    seriesTag: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      feature_image: PropTypes.string,
    }),
    seriesPage: PropTypes.shape({
      id: PropTypes.string.isRequired,
      ghostId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
    }),
    allGhostPost: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
          primary_author: PropTypes.object.isRequired,
          html: PropTypes.string.isRequired,
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
    seriesTag: ghostTag(slug: { eq: $slug }) {
      ...GhostTagFields
    }
    seriesPage: ghostPage(slug: { eq: $slug }) {
      ...GhostPageFields
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
