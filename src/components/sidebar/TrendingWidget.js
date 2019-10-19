import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'
import { faChartLine } from '@fortawesome/pro-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faChartLine)


const TrendingWidget = ({ data }) => {
  const topPages = data.postgres.allTopPages.edges

    return (
        <div className="widget trending">
          {topPages.map(({ node }) => (
              <Link to={ node.path } className="trending-page" key={ node.title }>{`${node.title.split(' | ')[0]}`}</Link>
          ))}
          <div className="trending-widget-footer"><FontAwesomeIcon icon={[`far`, `chart-line`]} size="sm" /> <span>Top Posts This Week</span></div>
        </div>
    )
}

const TrendingWidgetQuery = props => (
    <StaticQuery
        query={graphql`
          query TrendingPages {
            postgres {
              allTopPages(orderBy: COUNT_DESC) {
                edges {
                  node {
                    title
                    path
                    count
                  }
                }
              }
            }
          }
        `}
        render={data => <TrendingWidget data={data} {...props} />}
    />
)

export default TrendingWidgetQuery
