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
            <div className="widget-trending-header">
                <div className="trending"><FontAwesomeIcon icon={[`far`, `chart-line`]} size="sm" /> <span>Trending</span></div>
                <div className="trend-type">Top Posts This Week</div>
            </div>
            <div className="widget-trending-pages">
                {topPages.map(({ node }) => (
                    <Link to={ node.path } className="trending-page" key={ node.title }>{`${node.title.split(` | `)[0]}`}</Link>
                ))}
            </div>
        </div>
    )
}

TrendingWidget.propTypes = {
    data: PropTypes.shape({
        postgres: PropTypes.shape({
            allTopPages: PropTypes.arrayOf(
                PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    path: PropTypes.string.isRequired,
                    count: PropTypes.number.isRequired,
                }),
            ),
        }).isRequired,
    }).isRequired,
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
