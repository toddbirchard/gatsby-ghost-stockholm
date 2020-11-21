import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PostCard } from '../components/common'
import { Pagination } from '../components/navigation'
import { AuthorCard } from '../components/authors'
import { MetaData } from '../components/common/meta'

import '../styles/pages/page.less'

/**
 * Author page (/author/:slug)
 *
 * Loads all posts for the requested author incl. pagination.
 *
 */
const Author = ({ data, location, pageContext }) => {
  const author = data.ghostAuthor
  const baseTitle = author.name + `'s posts'`
  const title = pageContext.humanPageNumber > 1 ? baseTitle + ` (page ` + pageContext.humanPageNumber + ` of ` + pageContext.numberOfPages + `)` : baseTitle
  const posts = data.allGhostPost.edges

  return (
    <>
      <MetaData
        data={data}
        title={title}
        description={author.bio}
        location={location}
        pageContext={pageContext}
      />
      <Layout template="author-template" hasSidebar authorData={data}>
        <div className="author-container">
          <AuthorCard
            author={author}
            page="author"
            template="author-template"
            pageContext={pageContext
            }/>
          <section className="post-feed">
            {posts.map(({ node }) => (
              <PostCard key={node.id} post={node}/>
            ))}
            <Pagination pageContext={pageContext} metaTitle={title} template="author-template"/>
          </section>
        </div>
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
      postCount: PropTypes.number.isRequired,
    }),
    allGhostPost: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          primary_author: PropTypes.object,
          feature_image: PropTypes.string,
          published_at_pretty: PropTypes.string,
        }),
      ),
    }).isRequired,
    authorTweets: PropTypes.shape({
      full_text: PropTypes.string,
      favorite_count: PropTypes.number,
      retweet_count: PropTypes.number,
      created_at: PropTypes.string,
      id: PropTypes.string,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        profile_image_url: PropTypes.string.isRequired,
        screen_name: PropTypes.string.isRequired,
      }),
      entities: PropTypes.shape({
        urls: PropTypes.arrayOf(
          PropTypes.shape({
            url: PropTypes.string,
          }),
        ),
        hashtags: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string,
          }),
        ),
      }),
    }),
    authorTwitterProfile: PropTypes.shape({
      screen_name: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      followers_count: PropTypes.string,
      profile_image_url_https: PropTypes.string,
      statuses_count: PropTypes.string,
      favourites_count: PropTypes.string,
    }),
    authorTrendingPosts: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
        views: PropTypes.number,
      }),
    ),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
}

export default Author

export const pageQuery = graphql`
  query GhostAuthorQuery($slug: String!, $twitterUsernameRegex: String, $limit: Int!, $skip: Int!) {
    ghostAuthor(slug: { eq: $slug }) {
      ...GhostAuthorFields
      postCount
    }
    allGhostPost(
      sort: { order: DESC, fields: [published_at] },
      filter: {tags: {elemMatch: {slug: {ne: "hash-newsletter"}}}, authors: {elemMatch: {slug: {eq: $slug}}}},
      limit: $limit,
      skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
    authorTwitterProfile: twitterListsMembersAuthorTwitterProfiles(screen_name: {regex: $twitterUsernameRegex}) {
      screen_name
      name
      description
      followers_count
      profile_image_url_https
      statuses_count
      favourites_count
    }
    authorTrendingPosts: allMysqlMonthlyPageAnalytics(sort: {fields: views, order: DESC}, filter: {author_slug: {eq: $slug}, views: {gt: 10}}, limit: 10) {
      edges {
        node {
          title
          url
          views
          slug
        }
      }
    }
  }
`
