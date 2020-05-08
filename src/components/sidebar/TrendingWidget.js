import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'
import { FaChartLine } from 'react-icons/fa'
import config from '../../utils/siteConfig'

const TrendingWidget = ({ data }) => {
  const topPages = data.allMysqlWeeklyPageAnalytics.edges

  return (
    <div className="widget trending">
      <div className="widget-header">
        <div className="label trending"><FaChartLine /> <span>Trending Posts</span></div>
      </div>
      <div className="widget-content">
        {topPages.map(({ node }) => (
          <Link to={`${node.url.split(config.siteUrl).pop()}`} className="link" key={node.title}>{node.title}</Link>
        ))}
      </div>
    </div>
  )
}

TrendingWidget.propTypes = {
  data: PropTypes.shape({
    allMysqlWeeklyPageAnalytics: PropTypes.object.isRequired,
  }).isRequired,
}

const TrendingWidgetQuery = props => (
  <StaticQuery
    query={graphql`
          query TrendingPages {
            allMysqlWeeklyPageAnalytics(limit: 10) {
              edges {
                node {
                  title
                  url
                  views
                }
              }
            }
          }
        `}
    render={data => <TrendingWidget data={data} {...props} />}
  />
)

export default TrendingWidgetQuery
