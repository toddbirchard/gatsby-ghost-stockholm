require(`dotenv`).config({
    path: `.env.${process.env.NODE_ENV}`,
})
const queries = require(`./src/utils/algolia`)
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
        contentApiKey,
    } = process.env.NODE_ENV === `development` ? ghostConfig.development : ghostConfig.production

    if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
        throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`) // eslint-disable-line
    }
}

module.exports = {
    siteMetadata: {
        title: config.shortTitle,
        siteUrl: config.siteUrl,
        description: config.siteDescriptionMeta,
        url: config.siteURL, // No trailing slash allowed!
        image: config.siteIcon, // Path to your image you placed in the 'static' folder
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
                remote: `https://github.com/hackersandslackers/hackers-jupyter-posts`,
                branch: `master`,
                patterns: `*.ipynb`,
            },
        },
        {
            resolve: `gatsby-source-ghost`,
            options: process.env.NODE_ENV === `development` ?
                ghostConfig.development :
                ghostConfig.production,
        },
        {
            resolve: `gatsby-source-pocket`,
            options: {
                consumerKey: process.env.POCKET_CONSUMER_KEY,
                accessToken: process.env.POCKET_ACCESS_TOKEN,
                weeksOfHistory: 10,
                apiMaxRecordsToReturn: 10,
                getCurrentWeekOnly: `y`,
                stateFilterString: `all`,
                tagFilter: false,
                favouriteFilter: false,
                searchFilter: false,
            },
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
                        endpoint: `statuses/user_timeline`,
                        params: {
                            screen_name: `hackersslackers`,
                            include_rts: true,
                            exclude_replies: true,
                            tweet_mode: `extended`,
                            count: 6,
                        },
                    },
                    AuthorToddTweets: {
                        endpoint: `statuses/user_timeline`,
                        params: {
                            screen_name: `toddrbirchard`,
                            include_rts: true,
                            exclude_replies: true,
                            tweet_mode: `extended`,
                            count: 6,
                        },
                    },
                    /*AuthorMattTweets: {
                        endpoint: `statuses/user_timeline`,
                        params: {
                            screen_name: `MattAlhonte`,
                            include_rts: true,
                            exclude_replies: true,
                            tweet_mode: `extended`,
                            count: 6,
                        },
                    },
                    AuthorMaxTweets: {
                        endpoint: `statuses/user_timeline`,
                        params: {
                            screen_name: `MaxMileaf`,
                            include_rts: true,
                            exclude_replies: true,
                            tweet_mode: `extended`,
                            count: 6,
                        },
                    },*/
                },
            },
        },
        {
            resolve: `gatsby-source-mysql`,
            options: {
                connectionDetails: {
                    host: process.env.MYSQL_HOST,
                    port: process.env.MYSQL_PORT,
                    user: process.env.MYSQL_USERNAME,
                    password: process.env.MYSQL_PASSWORD,
                    database: process.env.MYSQL_DATABASE_NAME,
                },
                queries: [
                    {
                        statement: `SELECT * FROM weekly_stats`,
                        idFieldName: `id`,
                        name: `weekly_stats`,
                    },
                    {
                        statement: `SELECT * FROM monthly_stats`,
                        idFieldName: `id`,
                        name: `monthly_stats`,
                    },
                    {
                        statement: `SELECT * FROM monthly_page_analytics`,
                        idFieldName: `id`,
                        name: `monthly_page_analytics`,
                    },
                    {
                        statement: `SELECT * FROM weekly_page_analytics`,
                        idFieldName: `id`,
                        name: `weekly_page_analytics`,
                    },
                ],
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `@gatsby-contrib/gatsby-transformer-ipynb`,
        {
            resolve: `gatsby-plugin-web-font-loader`,
            options: {
                custom: {
                    families: [`TTNormsPro-DemiBold`, `TTNormsPro-Medium`, `TTNormsPro-Regular`],
                    urls: [`/css/fonts.css`],
                },
                timeout: 7000,
            },
        },
        `gatsby-plugin-preload-fonts`,
        /**
         *  Style Plugins
         */
        {
            resolve: `gatsby-plugin-less`,
            options: {
                javascriptEnabled: true,
            },
        },
        {
            resolve: `gatsby-plugin-postcss`,
            options: {
                parser: `less`,
                postCssPlugins: [
                    require(`autoprefixer`)(),
                    require(`stylelint`)()],
            },
        },
        /*{
            resolve: `gatsby-plugin-purgecss`,
            options: {
                printRejected: true, // Print removed selectors and processed file names
                develop: false, // Enable while using `gatsby develop`
                // tailwind: true, // Enable tailwindcss support
                whitelist: [`searchbox`, `search-result`, `tableContainer`], // Don't remove this selector
                whitelistPatterns: [`*-template$`],
                //ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
                // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
            },
        },*/
        /**
         *  Netlify Plugins
         */
        `gatsby-plugin-netlify-cache`,
        {
            resolve: `gatsby-plugin-netlify`,
            options: {
                headers: { "/*": [
                    `Referrer-Policy: no-referrer-when-downgrade`,
                    `Expect-CT: enforce,max-age=604800`,
                ],
                "/css/commento.css": [
                    `content-type: "text/css; charset=UTF-8`,
                    `Expect-CT: enforce,max-age=604800`,
                ] },
                // option to add more headers. `Link` headers are transformed by the below criteria
                allPageHeaders: [`set-cookie: HttpOnly;Secure;SameSite=None`], // option to add headers for all pages. `Link` headers are transformed by the below criteria
                mergeSecurityHeaders: true, // boolean to turn off the default security headers
                mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
                mergeCachingHeaders: true, // boolean to turn off the default caching headers
                transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
                generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
            },
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
                display: `browser`,
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
                title: config.siteTitle,
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
                    `/roundup`,
                    `/roundup/*`,
                    /(\/)?roundup\S*/,
                ],
                createLinkInHead: true,
                addUncaughtPages: false,
            },
        },
        {
            resolve: `gatsby-plugin-canonical-urls`,
            options: {
                siteUrl: config.siteUrl,
                stripQueryString: true,
            },
        },
        {
            resolve: `gatsby-plugin-segment-js`,
            options: {
                prodKey: process.env.SEGMENT_WRITE_KEY,
                writeKey: process.env.SEGMENT_WRITE_KEY,
                trackPage: true,
                delayLoad: true,
            },
        },
        /* Search */
        {
            resolve: `gatsby-plugin-algolia`,
            options: {
                appId: process.env.GATSBY_ALGOLIA_APP_ID,
                apiKey: process.env.ALGOLIA_ADMIN_KEY,
                queries,
                chunkSize: 100, // default: 1000
            },
        },
        /* Misc */
        `gatsby-plugin-styled-components`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-force-trailing-slashes`,
        `gatsby-plugin-offline`,
        /*{
            resolve: `@bundle-analyzer/gatsby-plugin`,
            options: { token: process.env.BUNDLE_ANALYZER_TOKEN },
        },*/
    ],
}
