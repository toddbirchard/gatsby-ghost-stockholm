import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Layout, PostCard } from '../components/common'
import { Pagination } from '../components/navigation'
import { AuthorCard } from '../components/authors'
import { MetaData } from '../components/common/meta'

import '../styles/pages/page.less'
import '../styles/author-card.less'

/**
* Author page (/author/:slug)
*
* Loads all posts for the requested author incl. pagination.
*
*/
const Author = ({ data, location, pageContext }) => {
    const author = data.ghostAuthor
    const posts = data.allGhostPost.edges
    const authorData = data
    const pageCount = pageContext.humanPageNumber > 1 ? pageContext.humanPageNumber : null
    // const authorTweets = data.authorTweets.edges
    // const authorTwitterUser = data.authorTwitterProfile.user

    return (
        <>
            <MetaData
                data={data}
                title={`${author.name}'s posts (page ${pageCount})`}
                description={author.bio}
                location={location}
                type="profile"
            />
            <Layout template="author-template" hasSidebar={true} authorData={authorData}>
                <div className="author-container">
                    <AuthorCard author={author} headerClass={false} page={`author`} template={`author-template`} pageContext={pageContext}/>
                    <section className="post-feed">
                        {posts.map(({ node }) => (
                            <PostCard key={node.id} post={node} />
                        ))}
                        <Pagination pageContext={pageContext} />
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
        }).isRequired,
        authorTwitterProfile: PropTypes.shape({
            user: PropTypes.shape({
                profile_image_url_https: PropTypes.string,
                name: PropTypes.string.isRequired,
                url: PropTypes.string,
                display_url: PropTypes.string,
                screen_name: PropTypes.string.isRequired,
            }).isRequired,
        }),
        authorTrendingPosts: PropTypes.shape({
            title: PropTypes.string,
            url: PropTypes.string,
            views: PropTypes.number,
        }),
        authorPocket: PropTypes.object,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
    headerClass: PropTypes.boolean,
}

export default Author

export const pageQuery = graphql`
    query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
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
        authorTweets: allTwitterStatusesUserTimelineHackersTweets(limit: 3) {
          edges {
            node {
              full_text
              created_at
              entities {
                urls {
                  url
                }
              }
            }
          }
        }
        authorTwitterProfile: twitterStatusesUserTimelineHackersTweets {
          user {
            profile_image_url_https
            name
            url
            screen_name
          }
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
      authorPocket: allPocketArticle(sort: {fields: readDay, order: DESC}, filter: {title: {nin: [null, ""]}}) {
        edges {
          node {
            id
            url
            title
            excerpt
            is_article
            has_image
            word_count
            time_read
            articleDomain
            domainFavicon
          }
        }
      }
    }
`
