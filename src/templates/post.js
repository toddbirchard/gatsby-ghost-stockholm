import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { Tags } from '@tryghost/helpers-gatsby'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { RelatedPosts, SeriesTOC, Commento, SupportWidget } from '../components/posts'
import { AuthorCard } from '../components/authors'
import { AiOutlineEye, AiOutlineTags, AiOutlineCalendar, AiOutlineUser, AiTwotoneExperiment } from 'react-icons/ai'

import '../styles/posts/post.less'

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
  const id = data.ghostPost.id
  const relatedPosts = data.relatedPosts
  const readingTime = readingTimeHelper(post)
  const seriesPosts = data.seriesPosts
  const authorUrl = post.primary_author.slug
    ? `/author/${post.primary_author.slug}/`
    : null
  const authorFirstName = author.name.split(` `)[0]
  const retinaImage = post.feature_image && post.feature_image.indexOf(`@2x`) === -1 ? post.feature_image.replace(`.jpg`, `@2x.jpg`) : null
  const lynxBlurb = `Resident Scientist Snkia works tirelessly towards robot utopia. These are his findings.`

  return (
    <>
      <MetaData
        data={data}
        location={location}
        title={post.title}
        description={post.excerpt}
        type="article"
      />
      <Layout template="post-template">
        <div className="post-wrapper">
          <div className="post-head">
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <div className="meta-item author">
                <Link to={authorUrl}>
                  <AiOutlineUser />
                  <span>{authorFirstName}</span>
                </Link>
              </div>
              {tags &&
              <div className="meta-item tag">
                <AiOutlineTags />
                <Tags post={post} limit={1} visibility="public" autolink separator="" permalink="/tag/:slug"
                  classes={tags.ghostId}/>
              </div>}
              <div className="meta-item reading-time">
                <AiOutlineEye />
                <span>{readingTime}</span>
              </div>
              <div className="meta-item date">
                <AiOutlineCalendar />
                <span>{post.published_at_pretty}</span>
              </div>
            </div>
            <figure className="post-image">
              {retinaImage
                ? <img className="post-card-image lazyload" data-src={retinaImage} alt={post.title}/>
                : <img className="post-card-image lazyload" data-src={post.feature_image} alt={post.title}/>}
            </figure>
          </div>

          <article className="post">
            {seriesPosts &&
              <SeriesTOC
                seriesPosts={seriesPosts.edges}
                postCount={seriesPosts.totalCount}
                currentPost={post.slug}
              />
            }
            {post.slug.includes(`lynx`) &&
               <div className="post-roundup-blurb">
                 <AiTwotoneExperiment /> <p>{lynxBlurb}</p>
               </div>
            }
            <main
              className="post-content content-body load-external-scripts"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <div className="post-tags">
              <Tags post={post} visibility="public" permalink="/tag/:slug" autolink separator={false} suffix={false}
                classes="post-tag-footer"/>
            </div>
            <AuthorCard author={author}/>
          </article>

        </div>
        <section className="post-footer">
          <Commento id={id}/>
          {relatedPosts && <RelatedPosts data={relatedPosts}/>}
          <SupportWidget/>
        </section>
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
    }).isRequired,
    ghostAuthor: PropTypes.object.isRequired,
    relatedPosts: PropTypes.objectOf(PropTypes.array),
    seriesPosts: PropTypes.object,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
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
          id
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
