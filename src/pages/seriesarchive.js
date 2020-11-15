import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { CourseCard } from '../components/misc'
import '../styles/pages/seriesarchive.less'
import '../styles/pages/page.less'

/**
* Series page (/series/)
*
* Lists multi-part post series.
*
*/

const SeriesArchive = ({ data, location }) => {
  const dataScienceCourses = data.datascience.edges
  const softwareCourses = data.software.edges
  const analysisCourses = data.analysis.edges
  const cloudCourses = data.cloud.edges
  const title = data.seriesPage.title
  const metaTitle = data.seriesPage.meta_title
  const metaDescription = data.seriesPage.meta_description
  const html = data.seriesPage.html

  return (
    <>
      <MetaData
        data={data}
        location={location}
        title={metaTitle}
        description={metaDescription}
        type="series"
      />
      <Layout template="seriesarchive-template page-template" hasSidebar={false}>
        <div className="info-card">
          <div className="page-title-card">
            <h1>{title}</h1>
          </div>
          <div
            className="post-content content-body load-external-scripts"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        <main className="courses">
          <h2 className="course-section-title">Data Science & Engineering</h2>
          <div className="series-grid">
            {dataScienceCourses.map(({ node }) => (
              <CourseCard course={node} key={node.id} />
            ))}
          </div>
          <h2 className="course-section-title">Software Engineering</h2>
          <div className="series-grid">
            {softwareCourses.map(({ node }) => (
              <CourseCard course={node} key={node.id} />
            ))}
          </div>
          <h2 className="course-section-title">Data Analysis</h2>
          <div className="series-grid">
            {analysisCourses.map(({ node }) => (
              <CourseCard course={node} key={node.id} />
            ))}
          </div>
          <h2 className="course-section-title">Cloud Architecture</h2>
          <div className="series-grid">
            {cloudCourses.map(({ node }) => (
              <CourseCard course={node} key={node.id} />
            ))}
          </div>
        </main>
      </Layout>
    </>
  )
}

SeriesArchive.propTypes = {
  data: PropTypes.shape({
    seriesPage: PropTypes.object.isRequired,
    datascience: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
          postCount: PropTypes.number.isRequired,
          feature_image: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
    }).isRequired,
    software: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
          postCount: PropTypes.number.isRequired,
          feature_image: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
    }).isRequired,
    cloud: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
          postCount: PropTypes.number.isRequired,
          feature_image: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ),
    }).isRequired,
    analysis: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
          postCount: PropTypes.number.isRequired,
          feature_image: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
      ),
    }).isRequired,
  }),
  location: PropTypes.object.isRequired,
}

export const seriesQuery = graphql`
    query seriesPage($slug: String) {
      seriesPage: ghostPage(slug: {eq: $slug}) {
        ...GhostPageFields
      }
      datascience: allGhostTag(sort: {order: ASC, fields: meta_title}, filter: {visibility: {eq: "internal"}, postCount: {gt: 1}, slug: {in: ["data-analysis-pandas", "code-snippet-corner", "mapping-data-with-mapbox", "learning-apache-spark", "welcome-to-sql", "web-scraping-with-python"]}}) {
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
      software: allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}, postCount: {gt: 1}, slug: {in: ["build-flask-apps", "starting-django", "mastering-sqlalchemy", "graphql-hype", "working-with-mysql"]}}) {
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
      cloud: allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "internal"}, postCount: {gt: 1}, slug: {in: ["the-rise-of-google-cloud", "create-an-aws-api", "mongodb-cloud"]}}) {
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
    }`

export default SeriesArchive
