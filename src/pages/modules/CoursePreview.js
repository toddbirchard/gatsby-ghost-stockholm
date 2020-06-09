import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const CoursePreview = ({ course }) => {
  const url = `/series/${course.slug}`
  const image = course.feature_image
  const name = course.name.replace(`#`, ``)
  const description = course.description
  const postCount = course.postCount

  return (
    <>
      <Link to={url} className="series-card">
        <div className="series-card-image" style={{ backgroundImage: `url(${image})` }}> </div>
        <div className="series-card-info">
          <h3 className="series-card-title">{name}</h3>
          <p className="series-card-description">{description}</p>
          <span className="series-card-count">{postCount} Posts</span>
        </div>
      </Link>
    </>
  )
}

CoursePreview.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    postCount: PropTypes.number.isRequired,
    feature_image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default CoursePreview
