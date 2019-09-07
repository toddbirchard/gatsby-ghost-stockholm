import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const RelatedPosts = ({ data }) => {
    const related = data.allGhostPost.edges

    return (
      <>
          <div className="related-posts">
              {related.map(({ node }) => (
                  <Link to={ node.slug } className="related-post-card" key={ node.slug }>
                      <img className="related-post-image" src={ node.feature_image } alt={ node.slug }/>
                      <div className="related-post-info">
                        <h5 className="related-post-title"> { node.title } </h5>
                        <p className="related-post-excerpt"> { node.custom_excerpt } </p>
                      </div>
                  </Link>
              ))}
          </div>
      </>
    )
}

RelatedPosts.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
}

export default RelatedPosts
