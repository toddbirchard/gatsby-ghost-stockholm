import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Layout } from '../components/common'
import { StaticQuery, graphql } from 'gatsby'
import '../styles/pages/404.less'

const NotFoundPage = ({ data }) => {
  const topPages = data.allMysqlWeeklyPostAnalytics.edges

  return (
    <>
      <Layout template="error-template" hasSidebar={false}>
        <header className="not-found-header">
          <h1 className="title">404</h1>
          <p className="go-home">
            Page not found, <Link to="/">return home</Link> to start over.
          </p>
        </header>
        <main>
          <h2 className="trending-title">
            Having trouble? Here are some of our trending posts:
          </h2>
          <div className="trending-posts">
            {topPages.map(({ node }) => (
              <div className="post-card" key={node.id}>
                <Link to={node.url}>
                  <picture className="feature-image">
                    {node.feature_image && (
                      <img
                        className="post-card-image lazyload"
                        data-src={node.feature_image}
                        alt={node.title}
                        title={node.title}
                      />
                    )}
                  </picture>
                </Link>
                <div className="post-card-detail">
                  {node.primary_tag_slug && (
                    <Link
                      to={`/tag/${node.primary_tag_slug}`}
                      className="primary-tag"
                    >
                      {node.primary_tag_slug}
                    </Link>
                  )}
                  <Link to={node.url}>
                    <h3 className="post-card-title">{node.title}</h3>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </Layout>
    </>
  )
}

NotFoundPage.propTypes = {
  data: PropTypes.shape({
    allMysqlWeeklyPostAnalytics: PropTypes.object.isRequired,
  }),
}

const NotFoundPageQuery = props => (
  <StaticQuery
    query={graphql`
      query PopularPostsQuery {
        allMysqlWeeklyPostAnalytics(
          sort: { fields: views, order: DESC }
          limit: 8
        ) {
          edges {
            node {
              id
              title
              slug
              url
              custom_excerpt
              feature_image
              author_name
              author_slug
              primary_tag_name
              primary_tag_slug
            }
          }
        }
      }
    `}
    render={data => <NotFoundPage data={data} {...props} />}
  />
)

export default NotFoundPageQuery
