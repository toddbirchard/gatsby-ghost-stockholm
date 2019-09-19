import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'


/**
* Tags widget
*/

const TagsWidget = ({ tags }) => {

    return (
      <>
        <div className="widget tags">
            {tags.map(({ node }) => (
                <Link to={`/tag/${ node.slug }`} className="tag" key={ node.name }>{ node.name }</Link>
            ))}
        </div>
    </>
    )
}

export default TagsWidget
