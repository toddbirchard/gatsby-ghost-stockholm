const queries = require(`./src/utils/algolia`)
const path = require(`path`)
const config = require(`./src/utils/siteConfig`)
const siteRSSFeed = require(`./src/utils/rss/site-feed`)
require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
})

let ghostConfig

try {
  ghostConfig = require(`./.ghost`)
} catch (e) {
  ghostConfig = {
    production: {
      apiUrl: process.env.GHOST_API_URL,
      contentApiKey: process.env.GHOST_CONTENT_API_KEY,
    },
    development: {
      apiUrl: process.env.GHOST_API_URL,
      contentApiKey: process.env.GHOST_CONTENT_API_KEY,
    },
  }
} finally {
  const { apiUrl, contentApiKey } =
    process.env.NODE_ENV === `development`
      ? ghostConfig.development
      : ghostConfig.production

  if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
        throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`) // eslint-disable-line
  }
}

if (
  process.env.NODE_ENV === `production` &&
  config.siteUrl === `http://localhost:8000` &&
  !process.env.SITEURL
) {
    throw new Error(`siteUrl can't be localhost and needs to be configured in siteConfig. Check the README.`) // eslint-disable-line
}

const gatsbyRequiredRules = path.join(
  process.cwd(),
  `node_modules`,
  `gatsby`,
  `dist`,
  `utils`,
  `eslint-rules`
)

module.exports = {
  flags: {
    // PRESERVE_WEBPACK_CACHE: true,
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
    PARALLEL_QUERY_RUNNING: true,
    DETECT_NODE_MUTATIONS: true,
  },
  siteMetadata: {
    title: config.shortTitle,
    siteUrl: config.siteUrl,
    description: config.siteDescriptionMeta,
    url: config.siteUrl, // No trailing slash allowed!
    twitterUsername: config.links.twitter,
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
      resolve: `gatsby-source-ghost`,
      apiUrl: process.env.GHOST_API_URL,
      contentApiKey: process.env.GHOST_CONTENT_API_KEY,
      version: `v3`,
      options:
        process.env.NODE_ENV === `development`
          ? ghostConfig.development
          : ghostConfig.production,
    },
    /* {
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
    },*/
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
              exclude_replies: false,
              tweet_mode: `extended`,
              count: 30,
            },
          },
          AuthorTwitterProfiles: {
            endpoint: `lists/members`,
            params: {
              list_id: `1043490256052539392`,
              include_rts: true,
              exclude_replies: false,
              tweet_mode: `extended`,
              count: 30,
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
            statement: `SELECT * FROM weekly_post_analytics`,
            idFieldName: `id`,
            name: `weekly_post_analytics`,
          },
          {
            statement: `SELECT * FROM algolia_top_suggested_searches`,
            idFieldName: `search`,
            name: `algolia_top_searches`,
          },
          {
            statement: `SELECT * FROM hackers_prod.donations WHERE message <> '' ORDER BY created_at DESC LIMIT 5`,
            idFieldName: `id`,
            name: `donations`,
          },
          {
            statement: `SELECT * FROM hackers_prod.comments`,
            idFieldName: `id`,
            name: `comments`,
          },
        ],
      },
    },
    /**
     *  Style Plugins
     */
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
        postCssPlugins: [
          // require(`autoprefixer`),
          require(`cssnano`)({ preset: `default` }),
          require(`stylelint`),
        ],
      },
    },
    /**
     *  Linter Plugins
     */
    {
      resolve: `gatsby-plugin-eslint`,
      options: {
        // Gatsby required rules directory
        rulePaths: [gatsbyRequiredRules],
        // Default settings that may be ommitted or customized
        stages: [`develop`],
        extensions: [`js`, `jsx`, `ts`, `tsx`],
        exclude: [`node_modules`, `bower_components`, `.cache`, `public`],
        // Any additional eslint-webpack-plugin options below
        // ...
      },
    },
    /**
     *  Netlify Plugins
     */
    {
      resolve: `gatsby-plugin-netlify-identity`,
      options: {
        url: `https://hackersandslackers.com/`, // required!
      },
    },
    /**
     *  SEO & Feed Plugins
     */
    {
      resolve: `gatsby-plugin-ghost-manifest`,
      options: {
        name: config.shortTitle,
        short_name: config.shortTitle,
        description: config.siteDescriptionMeta,
        start_url: `/`,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: `standalone`,
        icon: `static/${config.siteIcon}`,
        categories: config.categories,
        lang: config.lang,
        legacy: false,
        query: `
            {
              ghostSettings {
                title
                description
                logo
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
              logo
            }
          }
        `,
        feeds: [siteRSSFeed],
      },
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        query: `{
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
          `/(/)?roundupS*/`,
        ],
        createLinkInHead: false,
        addUncaughtPages: false,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: config.siteUrl,
        sitemap: `${config.siteUrl}/sitemap.xml`,
        policy: [
          {
            userAgent: `*`,
            allow: `/`,
            disallow: [`/ghost/`, `/p/`, `/roundup/`],
          },
        ],
        output: `/robots.txt`,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: config.siteUrl,
        stripQueryString: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    /**
     *  Analytics Plugins
     */
    {
      resolve: `gatsby-plugin-segment-js`,
      options: {
        prodKey: process.env.SEGMENT_WRITE_KEY,
        writeKey: process.env.SEGMENT_WRITE_KEY,
        trackPage: true,
        delayLoad: true,
      },
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `hackersandslackers.com`,
      },
    },
    /**
     *  Search Plugins
     */
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        queries,
        chunkSize: 500, // default: 1000
        settings: {
          replicaUpdateMode: `replace`,
        },
        enablePartialUpdates: true,
        matchFields: [`slug`, `updated_at`],
        concurrentQueries: false,
        continueOnFailure: true,
      },
    },
    /**
     *  Misc Plugins
     */
    `gatsby-plugin-force-trailing-slashes`,
  ],
}
