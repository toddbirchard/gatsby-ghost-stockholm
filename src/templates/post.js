import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { Tags } from '@tryghost/helpers-gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { RelatedPosts, SeriesTOC, Commento, SupportWidget } from '../components/posts'
import { AuthorCard } from '../components/authors'

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
    const id = data.ghostPost.id
    const relatedPosts = data.relatedPosts
    const readingTime = readingTimeHelper(post)
    const seriesPosts = data.seriesPosts
    const authorUrl = post.primary_author.slug
        ? `/author/${post.primary_author.slug}/`
        : null
    const authorFirstName = author.name.split(` `)[0]
    const retinaImage = post.feature_image && post.feature_image.indexOf(`@2x`) === -1 ? post.feature_image.replace(`.jpg`, `@2x.jpg`) : null

    return (
        <>
            <MetaData location={ location } data={data} type="article" />
            <Layout template="post-template">
                <div className="post-wrapper">
                    <div className="post-head">
                        <h1 className="post-title">{post.title}</h1>
                        <div className="post-meta">
                            <div className="meta-item author">
                                <Link to={authorUrl}>
                                    <FontAwesomeIcon icon={[`fad`, `user-edit`]} size="xs"/>
                                    <span>{authorFirstName}</span>
                                </Link>
                            </div>
                            {tags && <div className="meta-item tag">
                                <FontAwesomeIcon icon={[`fad`, `tags`]} size="xs" swapOpacity />
                                <Tags post={post} limit={1} visibility="public" autolink={true} separator={null} permalink="/tag/:slug" classes={tags.ghostId}/>
                            </div>}
                            <div className="meta-item reading-time">
                                <FontAwesomeIcon icon={[`fad`, `eye`]} size="xs" swapOpacity />
                                <span>{readingTime}</span>
                            </div>
                            <div className="meta-item date">
                                <FontAwesomeIcon icon={[`fad`, `calendar`]} size="xs"/>
                                <span>{post.published_at_pretty}</span>
                            </div>
                        </div>
                        <figure className="post-image">
                            { retinaImage ?
                                <img className="post-card-image lazyload" data-src={retinaImage} alt={post.title} /> :
                                <img className="post-card-image lazyload" data-src={post.feature_image} alt={post.title} /> }
                        </figure>
                    </div>

                    <article className="post">
                        { seriesPosts
                            ? <SeriesTOC seriesPosts={seriesPosts.edges} postCount={seriesPosts.totalCount} currentPost={post.slug}/>
                            : null
                        }
                        <main className="post-content content-body load-external-scripts" dangerouslySetInnerHTML={{ __html: post.html }}></main>
                        <div className="post-tags">
                            <Tags post={post} visibility="public" permalink="/tag/:slug" autolink={true} separator={false} suffix={false} classes="post-tag-footer"/>
                        </div>
                        <AuthorCard author={author} page={`post`} />
                    </article>
                </div>
                <section className="post-footer">
                    <Commento id={ id } />
                    { relatedPosts && <RelatedPosts data={relatedPosts} /> }
                    <SupportWidget />
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
