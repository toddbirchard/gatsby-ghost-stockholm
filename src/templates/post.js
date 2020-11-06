import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { Tags } from '@tryghost/helpers-gatsby'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { Comments } from '../components/comments'
import {
  RelatedPost,
  SeriesTOC,
  SupportWidget,
} from '../components/posts'
import { AuthorCard } from '../components/authors'
import {
  AiOutlineEye,
  AiOutlineTags,
  AiOutlineCalendar,
  AiOutlineUser,
  AiTwotoneExperiment,
} from 'react-icons/ai'
import Prism from "prismjs"

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */

const Post = ({ data, location }) => {
  const post = data.ghostPost
  const tags = data.ghostPost.tags
  const author = data.ghostPost.primary_author
  const relatedPosts = data.relatedPosts.edges
  const readingTime = readingTimeHelper(post)
  const seriesPosts = data.seriesPosts
  const authorUrl = post.primary_author.slug && `/author/${post.primary_author.slug}/`
  const authorFirstName = author.name.split(` `)[0]
  const lynxBlurb = `Resident Scientist Snkia works tirelessly towards robot utopia. These are his findings.`
  const featureImage = post.feature_image
  const comments = data.comments.edges
  const authors = data.authors.edges
  const featureImageSlash = featureImage && featureImage.lastIndexOf(`/`)
  const featureMobileImage = featureImageSlash && [featureImage.slice(0, featureImageSlash), `/_mobile`, featureImage.slice(featureImageSlash)].join(``)
  const featureRetinaImage = featureImageSlash && [featureImage.slice(0, featureImageSlash), `/_retina`, featureImage.slice(featureImageSlash)].join(``)
  React.useEffect(() => {
    Prism.highlightAll()
  })

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

          <article className="post">
            {/*    Post head     */}
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
                  <Tags
                    post={post}
                    limit={1}
                    visibility="public"
                    autolink
                    separator={null}
                    permalink="/tag/:slug"
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
              {post.feature_image &&
                  <picture className="post-image">
                    <source
                      media="(max-width:600px)"
                      data-srcset={featureMobileImage}
                    />
                    <source data-srcset={featureRetinaImage} />
                    <img
                      className="post-card-image lazyload"
                      data-src={featureImage}
                      alt={post.title}
                      title={post.title}
                    />
                  </picture>
              }
            </div>

            {/*  Series table of contents  */}
            {seriesPosts &&
              <SeriesTOC
                seriesPosts={seriesPosts.edges}
                postCount={seriesPosts.totalCount}
                currentPost={post.slug}
              />
            }

            {/*  Lynx blurb  */}
            {post.slug.includes(`lynx`) &&
               <div className="post-roundup-blurb">
                 <AiTwotoneExperiment /> <p>{lynxBlurb}</p>
               </div>
            }

            {/*  Lynx blurb  */}
            <main
              className="post-content content-body load-external-scripts"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {/*  Tags  */}
            <div className="post-tags">
              <Tags
                post={post}
                visibility="public"
                permalink="/tag/:slug"
                autolink
                separator={null}
                suffix={false}
                classes={`post-tag-footer ${tags.ghostId}`}/>
            </div>

            {/*  Post Author Details  */}
            <AuthorCard author={author} page={`post`}/>

          </article>

          {/*  Comments, related posts, & donation widgets   */}
          <section className="post-footer">
            <Comments data={data} comments={comments} moderators={authors} />
            <div className="related-posts">
              {relatedPosts.map(({ node }) => (
                <RelatedPost key={`${node.ghostId}_related`} post={node} />
              ))}
            </div>
            <SupportWidget/>
          </section>

        </div>
      </Layout>
    </>
  )
}

Post.propTypes = {
  data: PropTypes.shape({
    ghostPost: PropTypes.shape({
      id: PropTypes.string.isRequired,
      ghostId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
        })
      ),
      published_at_pretty: PropTypes.string,
      primary_author: PropTypes.shape({
        name: PropTypes.string,
        slug: PropTypes.string,
        bio: PropTypes.string,
        profile_image: PropTypes.string,
        twitter: PropTypes.string,
        facebook: PropTypes.string,
        website: PropTypes.string,
        postCount: PropTypes.number,
      }).isRequired,
    }).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        body: PropTypes.string,
        user_name: PropTypes.string,
        user_avatar: PropTypes.string,
        user_email: PropTypes.string,
        user_role: PropTypes.string,
        created_at: PropTypes.string,
      }),
    ),
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
    relatedPosts: PropTypes.objectOf(PropTypes.array),
    seriesPosts: PropTypes.object,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
  query($slug: String!, $tags: [String], $seriesSlug: String) {
    ghostPost(slug: { eq: $slug }) {
      ...GhostPostFields
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
    },
    comments: allMysqlComments(sort: {fields: created_at, order: ASC}, filter: {post_slug: {eq: $slug}}) {
      edges {
        node {
          body
          user_name
          user_avatar
          user_role
          created_at(fromNow: true)
        }
      }
    },
    authors: allGhostAuthor {
      edges {
        node {
          name
        }
      }
    }
  }
`
