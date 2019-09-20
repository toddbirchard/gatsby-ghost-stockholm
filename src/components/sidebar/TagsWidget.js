import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

/**
* Tags widget
*/
const TagsWidget = ({ tags }) => (
      <>
        <div className="widget tags">
            {tags.map(({ node }) => (
                <Link to={`/tag/${ node.slug }`} className="tag" key={ node.name }>{ node.name }</Link>
            ))}
        </div>
    </>
)

TagsWidget.propTypes = {
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
        }),
    ),
}

export default TagsWidget
