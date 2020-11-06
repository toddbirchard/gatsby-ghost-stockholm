import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { AiOutlineTags } from 'react-icons/ai'

const RelatedPost = ({ post }) => {
  const featureImage = post.feature_image
  const featureImageSlash = featureImage && featureImage.lastIndexOf(`/`)
  const featureMobileImage = featureImageSlash && [featureImage.slice(0, featureImageSlash), `/_mobile`, featureImage.slice(featureImageSlash)].join(``)
  const featureRetinaImage = featureImageSlash && [featureImage.slice(0, featureImageSlash), `/_retina`, featureImage.slice(featureImageSlash)].join(``)
  return (
    <>
      <Link
        to={`/${post.slug.includes(`lynx`) ? `/roundup/${post.slug}` : post.slug}/`}
        className="related-post-card"
        key={post.ghostId}
      >
        {post.feature_image &&
        <picture className="related-post-image-wrapper">
          <source
            media="(max-width:600px)"
            data-srcset={featureMobileImage}
          />
          <source data-srcset={featureRetinaImage} />
          <img
            className="related-post-image lazyload"
            data-src={featureImage}
            alt={post.title}
            title={post.title}
          />
        </picture> }
        <div className="related-post-info">
          <h5 className="related-post-title">{post.title}</h5>
          <div className="related-post-tags">
            <AiOutlineTags className="tags-icon"/>
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
}

RelatedPost.propTypes = {
  post: PropTypes.object,
}

export default RelatedPost
