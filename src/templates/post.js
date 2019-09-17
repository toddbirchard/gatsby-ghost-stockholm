import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { Tags } from '@tryghost/helpers-gatsby'
import { faUserEdit, faGlobe, faHome, faCalendar } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { RelatedPosts, SeriesTOC } from '../components/posts'
import { AuthorCard } from '../components/authors'
import { Commento } from '../components/posts'

import '../styles/posts/index.less'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
library.add(faUserEdit, faGlobe, faHome, faCalendar)

const Post = ({ data, location }) => {
    const post = data.ghostPost
    const tags = data.ghostPost.tags
    const author = data.ghostAuthor
    const relatedPosts = data.relatedPosts
    const readingTime = readingTimeHelper(post)
    const seriesPosts = data.seriesPosts
    const authorUrl = post.primary_author.slug ? `author/${post.primary_author.slug}` : null
    const authorFirstName = author.name.split(` `)[0]

    return (
            <>
                <MetaData
                    data={data}
                    location={location}
                    type="article"
                />
                <Helmet>
                    <style type="text/css">{`${post.codeinjection_styles}`}</style>
                </Helmet>
                <Layout template="post-template">
                    <div className="post-wrapper">
                        <article className="post">
                            { post.feature_image ?
                                <figure className="post-image">
                                    <img data-src={ post.feature_image } className="lazyload" alt={ post.title } />
                                </figure> : null }
                            <div className="post-head">
                                <div className="post-meta">
                                    <div className="meta-item author"> <Link to={ authorUrl }><FontAwesomeIcon icon={[`far`, `user-edit`]} size="sm" /> <span>{authorFirstName}</span> </Link></div>
                                    <div className="meta-item tag"> <FontAwesomeIcon icon={[`far`, `tag`]} size="sm" />{tags && <Tags post={post} limit={1} visibility="public" autolink={true} separator={null} permalink="/tag/:slug" classes={tags.index} />} </div>
                                    <div className="meta-item reading-time"> <FontAwesomeIcon icon={[`far`, `eye`]} size="sm" /> <span>{readingTime}</span> </div>
                                    <div className="meta-item date"> <FontAwesomeIcon icon={[`far`, `calendar`]} size="sm" /> <span>{post.published_at_pretty}</span> </div>
                                </div>
                                <h1 className="post-title">{post.title}</h1>
                            </div>
                            { seriesPosts ?
                                <SeriesTOC seriesPosts={seriesPosts.edges} postCount={seriesPosts.totalCount} currentPost={post.slug}/>
                                : null }
                            <section className="post-content">
                                {/* The main post content */ }
                                <section
                                    className="content-body load-external-scripts"
                                    dangerouslySetInnerHTML={{ __html: post.html }}
                                />
                                <div className="post-tags">
                                    <Tags post={post} visibility="public" permalink="/tag/:slug" autolink={true} separator={false} suffix={false} classes={post.id} />
                                </div>
                            </section>
                            <AuthorCard author={author} />
                        </article>
                    </div>
                    <section className="post-footer">
                        <Commento id={post.id} data-css-override="../styles/posts/comments.less" data-no-fonts={true} />
                        { relatedPosts.length ? <RelatedPosts data={relatedPosts} /> : null }
                    </section>
                </Layout>
            </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            primary_author: PropTypes.object.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    slug: PropTypes.string.isRequired,
                })
            ).isRequired,
            published_at_pretty: PropTypes.string,
            codeinjection_styles: PropTypes.string,
        }).isRequired,
        ghostAuthor: PropTypes.object.isRequired,
        relatedPosts: PropTypes.object,
        seriesPosts: PropTypes.object,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
query($slug: String!, $primaryTag: String, $primaryAuthor: String!, $seriesSlug: String) {
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
    relatedPosts: allGhostPost(limit: 3, sort: {order: DESC, fields: published_at}, filter: {tags: {elemMatch: {slug: {eq: $primaryTag}}}, slug: {ne: $slug}}) {
      edges {
        node {
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
          excerpt
          title
        }
      }
      totalCount
    }
  }
`
