import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const RelatedPosts = ({ data }) => {
    const related = data.edges

    return (
      <>
          <div className="related-posts">
              {related.map(({ node }) => (
                  <Link to={ node.slug } className="related-post-card" key={ node.slug }>
                      <img className="related-post-image" src={ node.feature_image } alt={ node.slug }/>
                      <div className="related-post-info">
                          <h5 className="related-post-title"> { node.title } </h5>
                          <div className="meta-item tag"> <FontAwesomeIcon icon={[`far`, `tag`]} /><Tags post={node} limit={3} visibility="public" autolink={false}/> </div>
                      </div>
                  </Link>
              ))}
          </div>
      </>
    )
}

RelatedPosts.propTypes = {
    data: PropTypes.object,
}

export default RelatedPosts
