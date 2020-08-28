const generateRssFeed = require(`./generate-feed`)
const siteConfig = require(`../siteConfig`)

const feedTitle = siteConfig.siteTitleMeta
const feedUrl = siteConfig.siteUrl + `/author/todd`
const matchPattern = undefined
const externalLink = `https://feedly.com/i/subscription/feed/https://hackersandslackers.com/rss.xml`
const feedRssQuery = `{
  allGhostPost(sort: {order: DESC, fields: published_at}, filter: {primary_author: {slug: {eq: "todd"}}}) {
    edges {
      node {
        id
        title
        slug
        featured
        feature_image
        created_at
        published_at
        updated_at
        excerpt
        meta_title
        meta_description
        primary_author {
          name
        }
        tags {
          name
          visibility
        }
        html
        url
        canonical_url
      }
    }
  }
}`

const siteRssFeed = generateRssFeed(
  siteConfig,
  feedRssQuery,
  feedTitle,
  feedUrl,
  matchPattern,
  externalLink
)

module.exports = siteRssFeed
