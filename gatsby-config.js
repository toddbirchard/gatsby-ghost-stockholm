require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const queries = require("./src/utils/algolia")


const path = require(`path`)
const config = require(`./src/utils/siteConfig`)
const generateRSSFeed = require(`./src/utils/rss/generate-feed`)

let ghostConfig

try {
    ghostConfig = require(`./.ghost`)
} catch (e) {
    ghostConfig = {
        production: {
            apiUrl: process.env.GHOST_API_URL,
            contentApiKey: process.env.GHOST_CONTENT_API_KEY,
        },
    }
} finally {
    const {
        apiUrl,
        contentApiKey
    } = process.env.NODE_ENV === `development` ? ghostConfig.development : ghostConfig.production

    if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
        throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`) // eslint-disable-line
    }
}


/**
 * This is the place where you can tell Gatsby which plugins to use
 * and set them up the way you want.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
 *
 */
module.exports = {
    siteMetadata: {
        title: config.shortTitle,
        siteUrl: config.siteUrl,
        description: config.siteDescriptionMeta,
    },
    plugins: [
        /**
         *  Content Plugins
         */
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `pages`),
                name: `pages`,
            },
        },
        {
        resolve: `gatsby-source-git`,
        options: {
          name: `jupyter`,
          remote: `https://github.com/hackersandslackers/jupyter`,
          branch: `master`,
          //patterns: `*.ipynb`
        }
      },
        `@gatsby-contrib/gatsby-transformer-ipynb`,
        // Setup for optimised images.
        // See https://www.gatsbyjs.org/packages/gatsby-image/
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `images`),
                name: `images`,
            },
        },
        {
            resolve: `gatsby-source-ghost`,
            options: process.env.NODE_ENV === `development` ?
                ghostConfig.development :
                ghostConfig.production,
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        /**
         *  Style Plugins
         */
        {
            resolve: `gatsby-plugin-less`,
            options: {
                javascriptEnabled: true,
            }
        },

        /**
         *  Utility Plugins
         */
        {
            resolve: `gatsby-plugin-ghost-manifest`,
            options: {
                short_name: config.shortTitle,
                start_url: `/`,
                background_color: config.backgroundColor,
                theme_color: config.themeColor,
                display: `minimal-ui`,
                icon: `static/${config.siteIcon}`,
                legacy: true,
                query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
                feeds: [
                    generateRSSFeed(config),
                ],
            },
        },
        {
            resolve: `gatsby-plugin-advanced-sitemap`,
            options: {
                query: `
                {
                  allGhostPost(filter: {tags: {elemMatch: {slug: {nin: "roundup"}}}}) {
                      edges {
                        node {
                          id
                          slug
                          updated_at
                          created_at
                          feature_image
                        }
                      }
                    }
                    allGhostPage {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostTag {
                        edges {
                            node {
                                id
                                slug
                                feature_image
                            }
                        }
                    }
                    allGhostAuthor {
                        edges {
                            node {
                                id
                                slug
                                profile_image
                            }
                        }
                    }
                }`,
                mapping: {
                    allGhostPost: {
                        sitemap: `posts`,
                    },
                    allGhostTag: {
                        sitemap: `tags`,
                    },
                    allGhostAuthor: {
                        sitemap: `authors`,
                    },
                    allGhostPage: {
                        sitemap: `pages`,
                    },
                },
                exclude: [
                    `/dev-404-page`,
                    `/404`,
                    `/404.html`,
                    `/offline-plugin-app-shell-fallback`,
                    `/confirmed`,
                ],
                createLinkInHead: true,
                addUncaughtPages: true,
            },
        },
        `gatsby-plugin-netlify-cache`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-force-trailing-slashes`,
        `gatsby-plugin-offline`,
        {
          resolve: 'gatsby-plugin-segment-js',
          options: {
            prodKey: process.env.SEGMENT_WRITE_KEY,
            writeKey: process.env.SEGMENT_WRITE_KEY,
            trackPage: true
          }
        },
        {
          resolve: `gatsby-source-twitter`,
          options: {
            credentials: {
              consumer_key: process.env.TWITTER_CONSUMER_KEY,
              consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
              bearer_token: process.env.TWITTER_BEARER_TOKEN,
            },
            queries: {
              HackersTweets: {
                endpoint: "statuses/user_timeline",
                params: {
                  screen_name: "hackersslackers",
                  include_rts: false,
                  exclude_replies: true,
                  tweet_mode: "extended",
                  count: 7,
                },
              },
            },
          },
        },
        {
          resolve: "gatsby-source-pg",
          options: {
            connectionString: process.env.POSTGRES_CONNECTION_STRING,
            schema: process.env.POSTGRES_SCHEMA,
            refetchInterval: 6000, // Refetch data every 60 seconds
          },
        },
        /* Search */
        {
          resolve: `gatsby-plugin-algolia`,
          options: {
            appId: process.env.GATSBY_ALGOLIA_APP_ID,
            apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
            indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
            queries,
            chunkSize: 1000, // default: 1000
          },
        },
        `gatsby-plugin-styled-components`,
    ],
}
