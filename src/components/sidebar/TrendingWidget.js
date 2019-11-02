import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import config from '../../utils/siteConfig'

const TrendingWidget = ({ data }) => {
    const topPages = data.allMysqlAnalytics.edges

    return (
        <div className="widget trending">
            <div className="widget-trending-header">
                <div className="trending"><FontAwesomeIcon icon={[`far`, `chart-line`]} size="xs" /> <span>Trending</span></div>
                <div className="trend-type">Top Posts This Week</div>
            </div>
            <div className="widget-trending-pages">
                {topPages.map(({ node }) => (
                    <Link to={`${node.url.split(config.siteUrl).pop()}`} className="trending-page" key={ node.title }>{`${node.title.split(` | `)[0].split(` - `)[0]}`}</Link>
                ))}
            </div>
        </div>
    )
}

TrendingWidget.propTypes = {
    data: PropTypes.shape({
        allMysqlAnalytics: PropTypes.object.isRequired,
    }).isRequired,
}

const TrendingWidgetQuery = props => (
    <StaticQuery
        query={graphql`
          query TrendingPages {
            allMysqlAnalytics(limit: 10) {
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
