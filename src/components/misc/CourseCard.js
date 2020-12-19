import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const CourseCard = ({ course, page }) => {
  const url = `/series/${course.slug}`
  const image = course.feature_image
  const name = course.name.replace(`#`, ``)
  const description = course.description
  const postCount = course.postCount
  const courseTags = page && page.tags
  const tags = courseTags && courseTags.filter(function (tag) {
    return tag.name.indexOf(`#`) === -1
  })

  return (
    <>
      <Link to={url} className="series-card">
        <div className="series-card-image-wrapper">
          <img className="series-card-image" alt={name} src={image} title={name} />
        </div>

        <div className="series-card-info">
          <h3 className="series-card-title">{name}</h3>
          {tags !== undefined ?
            <div className="series-topics">
              {tags.map(tag => (
                <div className="topic" key={tag.slug}>{tag.name}</div>
              )) }
            </div> : null }
          <p className="series-card-description">{description}</p>
          <span className="series-card-count">{postCount} Posts</span>
        </div>
      </Link>
    </>
  )
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    postCount: PropTypes.number.isRequired,
    feature_image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  page: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    tags: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          slug: PropTypes.string,
          visibility: PropTypes.string,
        }),
      ),
    }),
  }),
}

export default CourseCard
