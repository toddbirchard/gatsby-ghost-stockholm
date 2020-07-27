const generateRssFeed = require(`./generate-feed`)
const siteConfig = require(`../siteConfig`)

const feedTitle = `Todd Birchard`
const feedUrl = `/author/todd/rss.xml`
const matchPattern = `\/author\/todd`
const externalLink = undefined
const feedRssQuery = `{
    allGhostPost(sort: {order: DESC, fields: published_at}, filter: {primary_tag: {slug: {ne: "roundup"}}, primary_author: {slug: {eq: "todd"}}}) {
        edges {
            node {
                # Main fields
                id
                title
                slug
                featured
                feature_image

                # Dates unformatted
                created_at
                published_at
                updated_at

                # SEO
                excerpt
                meta_title
                meta_description

                # Authors
                authors {
                    name
                }
                primary_author {
                    name
                }
                tags {
                    name
                    visibility
                }

                # Content
                html

                # Additional fields
                url
                canonical_url
            }
        }
    }
}`

const authorRssFeed = generateRssFeed(siteConfig, feedRssQuery, feedTitle, feedUrl, matchPattern, externalLink)

module.exports = authorRssFeed
