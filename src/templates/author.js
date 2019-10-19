import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard } from '../components/common'
import { Pagination } from '../components/navigation'
import { AuthorCard } from '../components/authors'
import { MetaData } from '../components/common/meta'

import '../styles/pages/index.less'

/**
* Author page (/author/:slug)
*
* Loads all posts for the requested author incl. pagination.
*
*/
const Author = ({ data, location, pageContext }) => {
    const author = data.ghostAuthor
    const posts = data.allGhostPost.edges
    const coverHeaderClass = author.cover_image ? `author-page-header cover-header` : `author-page-header`

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="profile"
            />
          <Layout template="author-template" hasSidebar={true}>
              <article className="content">
                  <div className={coverHeaderClass}>
                      { author.cover_image ?
                          <figure className="author-feature-image">
                              <img src={ author.cover_image } alt={ author.name } />
                          </figure> : null }
                      <AuthorCard author={author} headerClass={true} />
                  </div>
                  <div className="post-full-content">
                      <section className="post-feed">
                          {posts.map(({ node }) => (
                              <PostCard key={node.id} post={node} />
                          ))}
                          <Pagination pageContext={pageContext} />
                      </section>
                  </div>
              </article>
          </Layout>
        </>
    )
}

Author.propTypes = {
    data: PropTypes.shape({
        ghostAuthor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            cover_image: PropTypes.string,
            profile_image: PropTypes.string,
            website: PropTypes.string,
            bio: PropTypes.string,
            location: PropTypes.string,
            facebook: PropTypes.string,
            twitter: PropTypes.string,
        }),
        allGhostPost: PropTypes.arrayOf(
            PropTypes.shape({
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
            }).isRequired,
        ),
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Author

export const pageQuery = graphql`
    query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostAuthor(slug: { eq: $slug }) {
            ...GhostAuthorFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {authors: {elemMatch: {slug: {eq: $slug}}}},
            limit: $limit,
            skip: $skip
        ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
    }
`
