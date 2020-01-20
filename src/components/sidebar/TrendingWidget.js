import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import config from '../../utils/siteConfig'

const TrendingWidget = ({ data }) => {
    const topPages = data.allMysqlWeeklyStats.edges

    return (
        <div className="widget trending">
            <div className="widget-header">
                <div className="label trending"><FontAwesomeIcon icon={[`fad`, `chart-line`]} size="xs" /> <span>Trending</span></div>
                <div className="trend-type">Top Posts This Week</div>
            </div>
            <div className="widget-content">
                {topPages.map(({ node }) => (
                    <Link to={`${node.url.split(config.siteUrl).pop()}`} className="link" key={ node.title }>{`${node.title.split(` | `)[0].split(` - `)[0]}`}</Link>
                ))}
            </div>
        </div>
    )
}

TrendingWidget.propTypes = {
    data: PropTypes.shape({
        allMysqlWeeklyStats: PropTypes.object.isRequired,
    }).isRequired,
}

const TrendingWidgetQuery = props => (
    <StaticQuery
        query={graphql`
          query TrendingPages {
            allMysqlWeeklyStats(limit: 10) {
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
