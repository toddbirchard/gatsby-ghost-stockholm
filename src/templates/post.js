import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { Tags } from '@tryghost/helpers-gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { RelatedPosts, SeriesTOC } from '../components/posts'
import { AuthorCard } from '../components/authors'
import { Commento } from '../components/posts'
import { NewsletterWidget } from '../components/sidebar'

import '../styles/posts/index.less'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/

const Post = ({ data, location }) => {
    const post = data.ghostPost
    const tags = data.ghostPost.tags
    const author = data.ghostAuthor
    const relatedPosts = data.relatedPosts
    const readingTime = readingTimeHelper(post)
    const seriesPosts = data.seriesPosts
    const authorUrl = post.primary_author.slug
        ? `/author/${post.primary_author.slug}/`
        : null
    const authorFirstName = author.name.split(` `)[0]
    // const retinaFeatureImage = post.feature_image ? post.feature_image.replace(`q_auto:best`, `f_auto,w_700,dpr_2.0`) : null

    return (
      <>
      < MetaData data = { data } location = { location } type = "article" />
      <Layout template="post-template">
          <div className="post-wrapper">
              <div className="post-head">
                  <h1 className="post-title">{post.title}</h1>
                  <div className="post-meta">
                      <div className="meta-item author">
                          <Link to={authorUrl}><FontAwesomeIcon icon={[`far`, `user-edit`]} size="xs"/>
                              <span>{authorFirstName}</span>
                          </Link>
                      </div>
                      <div className="meta-item tag">
                          <FontAwesomeIcon icon={[`far`, `tag`]} size="xs"/>{tags && <Tags post={post} limit={1} visibility="public" autolink={true} separator={null} permalink="/tag/:slug" classes={tags.ghostId}/>}
                      </div>
                      <div className="meta-item reading-time">
                          <FontAwesomeIcon icon={[`far`, `eye`]} size="xs"/>
                          <span>{readingTime}</span>
                      </div>
                      <div className="meta-item date">
                          <FontAwesomeIcon icon={[`far`, `calendar`]} size="xs"/>
                          <span>{post.published_at_pretty}</span>
                      </div>
                  </div>
                  { post.feature_image ?
                      <figure className="post-image">
                          <img data-src={post.feature_image} className="lazyload" alt={post.title} data-rjs="2" width="900" height="518" />
                      </figure>
                      : null }
              </div>

              <article className="post">

                  {
                      seriesPosts
                          ? <SeriesTOC seriesPosts={seriesPosts.edges} postCount={seriesPosts.totalCount} currentPost={post.slug}/>
                          : null
                  }
                  {/* The main post content */}
                  <main className="post-content content-body load-external-scripts" dangerouslySetInnerHTML={{ __html: post.html }}></main>
                  <div className="post-tags">
                      <Tags post={post} visibility="public" permalink="/tag/:slug" autolink={true} separator={false} suffix={false} classes="post-tag-footer"/>
                  </div>
                  <AuthorCard author={author}/>
                  <Commento id={post.id} data-css-override="../styles/posts/comments.less" data-no-fonts={true}/>
              </article>

          </div>
          <section className="post-footer">
              {relatedPosts && <RelatedPosts data={relatedPosts}/>}
              <NewsletterWidget/>
          </section>

          <div className="bottom-vector"><svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 280">
              <g fill="#ecf2f9" >
                  <path d="M1920 0v19.387c-211.21 136.245-517.564 173.305-919.061 111.18C679.068 80.763 345.422 103.907 0 200L-2 0h1922z"></path>
                  <path d="M1920 0v4c-252.04 171.948-554.875 231.087-908.506 177.417C361.105 82.709-2.15 200 .254 200 1.858 200 1.106 133.333-2 0h1922z" fillOpacity=".35"></path>
                  <path d="M1920 0v29.724c-230.661 164.917-529.816 221.768-897.464 170.553C568.815 137.072 198.92 150.114 0 269V0h1920z" fillOpacity=".17"></path>
                  <path d="M1920 0v29.724c-223.98 145.48-526.685 188.553-908.112 129.22C630.46 99.61 293.3 122.961.407 229V0H1920z" fillOpacity=".45"></path>
              </g>
          </svg></div>
      </Layout>
</>)
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            excerpt: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            primary_author: PropTypes.object.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
            tags: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired, slug: PropTypes.string.isRequired })),
            published_at_pretty: PropTypes.string,
            codeinjection_styles: PropTypes.string,
        }).isRequired,
        ghostAuthor: PropTypes.object.isRequired,
        relatedPosts: PropTypes.object.isRequired,
        seriesPosts: PropTypes.object,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql `
query($slug: String!, $tags: [String], $primaryAuthor: String!, $seriesSlug: String) {
    ghostPost(slug: { eq: $slug }) {
        ...GhostPostFields
    }
    ghostAuthor(slug: {eq: $primaryAuthor}) {
      postCount
      location
      facebook
      cover_image
      bio
      name
      slug
      twitter
      website
      profile_image
    }
    relatedPosts: allGhostPost(limit: 3, sort: {order: DESC, fields: published_at}, filter: {primary_tag: {slug: {in: $tags}}, slug: {ne: $slug}}) {
      edges {
        node {
          ghostId
          feature_image
          title
          slug
          tags {
            name
          }
        }
      }
    }
    seriesPosts: allGhostPost(filter: {tags: {elemMatch: {slug: {eq: $seriesSlug}}}}) {
      edges {
        node {
          slug
          title
        }
      }
      totalCount
    }
  }
`
