import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import { faChartLine } from '@fortawesome/pro-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faChartLine)


const SeriesWidget = ({ data }) => {
    const series = data.ghostTag
    const url = `/series/${ series.slug }/`
    const title = series.name.replace('#', '')

    return (
      <div className="widget series">
        { series.feature_image && <Link to={url}><img className="series-widget-image lazyload" data-src={series.feature_image} alt={series.name}/></Link> }
        <div className="series-widget-detail">
            <Link to={url}><h3 className="series-widget-title">{title}</h3></Link>
            <section className="series-widget-description">{series.description}</section>
            <div className="series-widget-footer"><div className="series-widget-trending"><FontAwesomeIcon icon={[`far`, `chart-line`]} size="sm" /> <span>Trending Series</span></div> <div className="post-count">{series.postCount} <span>posts</span></div></div>
        </div>
    </div>
  )
}

SeriesWidget.propTypes = {
    data: PropTypes.shape({
        ghostTag: PropTypes.shape({
          feature_image: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          postCount: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired
}

const SeriesWidgetQuery = props => (
    <StaticQuery
        query={graphql`
          query FeaturedSeries {
            ghostTag(slug: {eq: "data-analysis-pandas"}) {
              feature_image
              slug
              name
              description
              postCount
            }
          }
        `}
        render={data => <SeriesWidget data={data} {...props} />}
    />
)

export default SeriesWidgetQuery
