import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

const SeriesNextPrev = ({ seriesPosts, seriesIndex, seriesLength }) => {
  const currentPostNumber = seriesIndex + 1
  const prevPost = currentPostNumber < seriesLength ? seriesPosts.edges[seriesIndex + 1].node : null
  const nextPost = currentPostNumber > 1 ? seriesPosts.edges[seriesIndex - 1].node : null

  return (
    <>
      <div className="series-next-prev">
        {prevPost &&
        <Link to={`/${prevPost.slug}`} className="prev-post series-nextprev">
          <span><AiOutlineArrowLeft /> Previous post</span>
          <h6>{prevPost.title}</h6>
        </Link>
        }

        {nextPost &&
        <Link to={`/${nextPost.slug}`} className="next-post series-nextprev">
          <span>Next post <AiOutlineArrowRight/></span>
          <h6>{nextPost.title}</h6>
        </Link>
        }
      </div>
    </>
  )
}

SeriesNextPrev.propTypes = {
  seriesPosts: PropTypes.object,
  seriesIndex: PropTypes.number,
  seriesLength: PropTypes.number,
}

export default SeriesNextPrev
