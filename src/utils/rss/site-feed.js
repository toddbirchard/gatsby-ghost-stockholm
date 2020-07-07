const generateRssFeed = require(`./generate-feed`)
const siteConfig = require(`../siteConfig`)

const siteTitle = siteConfig.siteTitleMeta
const feedUrl = `/rss.xml`
const siteRssQuery = `{
    allGhostPost(sort: {order: DESC, fields: published_at}, filter: {primary_tag: {slug: {ne: "roundup"}}}) {
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
}
`

const siteRssFeed = generateRssFeed(siteConfig, siteRssQuery, siteTitle, feedUrl)

module.exports = siteRssFeed
