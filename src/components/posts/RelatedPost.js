import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { AiOutlineTags } from 'react-icons/ai'

const RelatedPost = ({ post }) => (
  <>
    <Link to={`/${post.slug.includes(`lynx`) ? `/roundup/${post.slug}` : post.slug}/`} className="related-post-card" key={post.ghostId}>
      <div className="related-post-image-wrapper"><img className="related-post-image lazyload" data-src={post.feature_image} alt={post.slug} /></div>
      <div className="related-post-info">
        <h5 className="related-post-title">{post.title}</h5>
        <div className="related-post-tags">
          <AiOutlineTags className="tags-icon" />
          <Tags
            post={post}
            limit={2}
            visibility="public"
            autolink={false}
            classes="tag"
            separator=", "
            separatorClasses={`${post.ghostId} tag-separator`}
          />
        </div>
      </div>
    </Link>
  </>
)

RelatedPost.propTypes = {
  post: PropTypes.object,
}

export default RelatedPost
