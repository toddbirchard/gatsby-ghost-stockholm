import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Prism from 'prismjs'
import Helmet from 'react-helmet'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { Tags } from '@tryghost/helpers-gatsby'
import { faUserEdit, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { RecentPosts, RelatedPosts, PostAuthor } from '../components/common/posts'



import '../styles/nord.less'
/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
library.add(faUserEdit, faGlobe)

const Post = ({ data, location }) => {
    const post = data.ghostPost
    const tags = data.ghostTag
    const relatedPosts = data.allGhostPost
    const readingTime = readingTimeHelper(post)
    const authorUrl = post.primary_author.slug ? `author/${post.primary_author.slug}` : null

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
                { post.feature_image ?
                    <figure className="post-image">
                        <img src={ post.feature_image } alt={ post.title } />
                    </figure> : null }
                    <div className="post-wrapper">
                    <article className="post">

                        <section className="post-content">
                            <div className="post-meta">
                                <div className="meta-item author"> <Link to="/about"><FontAwesomeIcon icon="user-edit" /><span>{post.primary_author.name}</span> </Link></div>
                                <div className="meta-item tag"> <FontAwesomeIcon icon="tag" />{tags && <Tags post={post} limit={1} visibility="public" autolink={false}/>} </div>
                                <div className="meta-item reading-time"> <FontAwesomeIcon icon="eye" /><span> {readingTime}</span> </div>
                                <div className="meta-item date"> <FontAwesomeIcon icon="eye" />{post.published_at_pretty} </div>
                            </div>
                            <h1 className="post-title">{post.title}</h1>
                            {/* The main post content */ }
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                        </section>
                        <div className="post-tags">
                            <Tags post={post} visibility="public" autolink={true} />
                            {/*{tags.map(({ name, slug }) => (
                                <Link to={`/tag/${ slug }`} className="tag" key={ name }>{ name }</Link>
                            ))}*/}
                        </div>
                    </article>

                    </div>
                    <section className="post-footer">
                        <RelatedPosts data={data} />
                        <PostAuthor author={post.primary_author} />
                    </section>
                </Layout>
            </>
    )
  }

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
            tags: PropTypes.shape({
                name: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                slug: PropTypes.string.isRequired,
            }).isRequired,
            primary_author: PropTypes.object.isRequired,
        }).isRequired,
        ghostTag: PropTypes.object.isRequired,
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
query($slug: String!, $primaryTag: String!) {
    ghostPost(slug: { eq: $slug }) {
        ...GhostPostFields
        primary_author {
          name
          url
          bio
          website
          twitter
          facebook
        }
    }
    ghostTag(visibility: {eq: "public"}) {
      slug
      name
    }
    allGhostPost(limit: 3, sort: {order: DESC, fields: published_at}, filter: {tags: {elemMatch: {slug: {eq: $primaryTag}}}}) {
      edges {
        node {
          url
          feature_image
          title
          slug
        }
      }
    }
}
`
