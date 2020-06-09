import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { CoursePreview } from './modules'

import '../styles/pages/seriesarchive.less'
import '../styles/pages/page.less'

/**
* Series page (/series/)
*
* Lists all multi-part post series.
*
*/

const SeriesArchive = ({ data, location, pageContext }) => {
  const dataScienceCourses = data.datascience.edges
  const softwareCourses = data.software.edges
  const analysisCourses = data.analysis.edges
  const cloudCourses = data.cloud.edges
  const title = pageContext.title
  const description = pageContext.description
  const metaDescription = pageContext.metaDescription

  return (
    <>
      <MetaData
        data={data}
        location={location}
        title={title}
        description={metaDescription}
        type="series"
      />
      <Layout template="seriesarchive-template page-template" hasSidebar={false}>
        <div className="info-card">
          <div className="page-title-card">
            <h1>{title}</h1>
          </div>
          <p>{description}</p>
        </div>
        <div className="courses">
          <h2 className="course-section-title">Data Science & Engineering</h2>
          <div className="series-grid">
            {dataScienceCourses.map(({ node }) => (
              <CoursePreview course={node} key={node.id} />
            ))}
          </div>
          <h2 className="course-section-title">Software Engineering</h2>
          <div className="series-grid">
            {softwareCourses.map(({ node }) => (
              <CoursePreview course={node} key={node.id} />
            ))}
          </div>
          <h2 className="course-section-title">Data Analysis</h2>
          <div className="series-grid">
            {analysisCourses.map(({ node }) => (
              <CoursePreview course={node} key={node.id} />
            ))}
          </div>
          <h2 className="course-section-title">Cloud Architecture</h2>
          <div className="series-grid">
            {cloudCourses.map(({ node }) => (
              <CoursePreview course={node} key={node.id} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

SeriesArchive.propTypes = {
  data: PropTypes.shape({
    datascience: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        postCount: PropTypes.number.isRequired,
        feature_image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    software: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        postCount: PropTypes.number.isRequired,
        feature_image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    cloud: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        postCount: PropTypes.number.isRequired,
        feature_image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    analysis: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        postCount: PropTypes.number.isRequired,
        feature_image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    ghostPage: PropTypes.object.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    metaDescription: PropTypes.string,
  }),
  location: PropTypes.object,
}

export default SeriesArchive

export const seriesQuery = graphql`
    query GhostSeriesArchiveQuery($slug: String) {
        datascience: allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}, postCount: {gt: 1}, slug: {in: ["data-analysis-pandas", "code-snippet-corner", "mapping-data-with-mapbox", "learning-apache-spark", "welcome-to-sql"]}}) {
          edges {
            node {
              id
              slug
              postCount
              feature_image
              description
              name
            }
          }
        }
        software: allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}, postCount: {gt: 1}, slug: {in: ["building-flask-apps", "starting-django", "mastering-sqlalchemy", "graphql-hype", "mongodb-cloud"]}}) {
          edges {
            node {
              id
              slug
              postCount
              feature_image
              description
              name
            }
          }
        }
        cloud: allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}, postCount: {gt: 1}, slug: {in: ["the-rise-of-google-cloud", "create-an-aws-api"]}}) {
          edges {
            node {
              id
              slug
              postCount
              feature_image
              description
              name
            }
          }
        }
        analysis: allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}, postCount: {gt: 1}, slug: {in: ["adventures-in-excel", "microsoft-powerpivot", "hacking-tableau-server"]}}) {
          edges {
            node {
              id
              slug
              postCount
              feature_image
              description
              name
            }
          }
        }
        courses: allGhostPost(filter: {tags: {elemMatch: {visibility: {eq: "internal"}}}}) {
          group(field: primary_tag___slug) {
                fieldValue
                totalCount
                nodes {
                  meta_title
                  meta_description
                }
              }
              totalCount
            }
        ghostPage(slug: {eq: $slug}) {
          ...GhostPageFields
        }
    }`
