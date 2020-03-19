require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
})
const queries = require(`./src/utils/algolia`)
const path = require(`path`)
const config = require(`./src/utils/siteConfig`)
const generateRSSFeed = require(`./src/utils/rss/generate-feed`)
const generateAuthorRSSFeed = require(`./src/utils/rss/author-feed`)

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
    url: config.siteUrl, // No trailing slash allowed!
    image: config.siteIcon, // Path to your image you placed in the 'static' folder,
    twitterUsername: config.social.twitter,
  },
  mapping: {
    'allGhostAuthor.slug': `frontmatter`,
  },
  plugins: [
    /**
     *  Source Plugins
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `pages`),
        name: `pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
        ignore: [`**/.*`], // ignore files starting with a dot
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
              count: 3,
            },
          },
          AuthorTwitterProfiles: {
            endpoint: `lists/members`,
            params: {
              list_id: `1043490256052539392`,
              include_rts: true,
              exclude_replies: true,
              tweet_mode: `extended`,
              count: 20,
            },
          },
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
            statement: `SELECT * FROM monthly_page_analytics`,
            idFieldName: `id`,
            name: `monthly_page_analytics`,
          },
          {
            statement: `SELECT * FROM weekly_page_analytics`,
            idFieldName: `id`,
            name: `weekly_page_analytics`,
          },
          {
            statement: `SELECT * FROM algolia_top_suggested_searches`,
            idFieldName: `search`,
            name: `algolia_top_searches`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-github`,
      options: {
        headers: {
          Authorization: process.env.GITHUB_ACCESS_TOKEN,
        },
        queries: [
          `{
              organization(login: "hackersandslackers") {
                name
                description
                login
                url
                itemShowcase {
                  items(first: 3) {
                    edges {
                      node {
                        ... on Repository {
                          id
                          name
                          description
                          url
                          forkCount
                          primaryLanguage {
                            color
                            name
                          }
                          stargazers {
                            totalCount
                          }
                        }
                      }
                    }
                  }
                }
                repositories {
                  totalCount
                }
                membersWithRole(first: 20) {
                  totalCount
                  nodes {
                    bio
                    avatarUrl
                    login
                    name
                    company
                    followers {
                      totalCount
                    }
                    following {
                      totalCount
                    }
                    repositories(orderBy: {field: STARGAZERS, direction: DESC}, first: 5, privacy: PUBLIC) {
                      edges {
                        node {
                          name
                          description
                          url
                          forks {
                            totalCount
                          }
                          stargazers {
                            totalCount
                          }
                          watchers {
                            totalCount
                          }
                          primaryLanguage {
                            name
                            color
                          }
                        }
                      }
                      totalCount
                    }
                  }
                }
              }
            }`,
        ],
      },
    },
    /**
     *  Transformer Plugins
     */
    `@gatsby-contrib/gatsby-transformer-ipynb`,
    /**
     *  Font Plugins
     */
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        custom: {
          families: [`TTNormsPro-DemiBold`, `TTCommons-Medium`, `TTCommons-Regular`, `dm`],
          urls: [`/css/fonts.css`],
        },
        timeout: 10000,
      },
    },
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
          require(`cssnano`)({ preset: `default` }),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: false, // Enable while using `gatsby develop`
        whitelist: [`searchbox`, `search-result`, `tableContainer`], // Don't remove these selectors
        whitelistPatterns: [`*-template$`, `.content-body > pre`],
        ignore: [`/ignored.css`, `prismjs/`, `docsearch.js/`], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css'], // Purge only these files/folders
      },
    },
    `gatsby-plugin-split-css`,
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
        transformHeaders: headers => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
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
              ghostSettings {
                title
                description
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
                  ghostSettings {
                    title
                    description
                    url
                  }
                }
              `,
        feeds: [
          generateRSSFeed(config),
          generateAuthorRSSFeed(config, `todd`, `Todd Birchard`),
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
                    allGhostTag(filter: {visibility: {eq: "public"}}) {
                      edges {
                        node {
                          id
                          slug
                          feature_image
                          description
                          name
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
    /* Analytics */
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
    `gatsby-plugin-preload-link-crossorigin`,
    /*{
       resolve: `@bundle-analyzer/gatsby-plugin`,
       options: { token: process.env.BUNDLE_ANALYZER_TOKEN },
   },*/
  ],
}
