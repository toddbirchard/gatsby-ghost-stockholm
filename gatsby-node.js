const path = require(`path`)
const { postsPerPage } = require(`./src/utils/siteConfig`)
const { paginate } = require(`gatsby-awesome-pagination`)
/* const cheerio = require(`cheerio`)
const fetch = require(`node-fetch`)

const fetchWebsiteData = async (url) => {
  if (url === null || url === `` || url === `undefined`) {
    return undefined
  }
  try {
    return await fetch(url)
      .then(res => res.text())
      .then(body => cheerio.load(body))
      .then($ => Object({
        description: $(`meta[name=description]`).attr(`content`) || $(`meta[property='og:description']`).attr(`content`) || ``,
        image: $(`meta[property='og:image']`).attr(`content`) || ``,
        icon: $(`link[rel=shortcut]`).attr(`href`) || $(`link[rel='fluid-icon']`).attr(`href`) || ``,
        themeColor: $(`meta[name='theme-color']`).attr(`href`) || ``,
        url: url,
      }))
  } catch (error) {
    console.log(error.response.body)
  }
}

const createAuthorFields = async (node, websiteMeta, fields) => {
  for (let [key, value] in Object.entries(websiteMeta)) {
    fields.createNodeField({
      node,
      name: key,
      value: value,
    })
  }
}

exports.onCreateNode = async ({node, actions, getNode}) => {
  if (node.internal.type === `GhostAuthor`) {
    await fetchWebsiteData(node.website)
      .then(meta => createAuthorFields(node, meta, actions))
      .catch(error => console.log(error))
  }
}*/

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      posts: allGhostPost(sort: {order: ASC, fields: published_at}, filter: {slug: {ne: "data-schema"}, primary_tag: {slug: {ne: "roundup"}}}) {
        edges {
          node {
            slug
            primary_tag {
              slug
              name
            }
            tags {
              slug
              name
              visibility
            }
          }
        }
      }
      lynx: allGhostPost(sort: {order: ASC, fields: published_at}, filter: {primary_tag: {slug: {eq: "roundup"}}}) {
        edges {
          node {
            slug
            primary_tag {
              slug
            }
            tags {
              slug
            }
          }
        }
      }
      allGhostTag(sort: {order: ASC, fields: name}, filter: {slug: {ne: "data-schema"}}) {
        edges {
          node {
            slug
            postCount
          }
        }
      }
      allGhostAuthor(sort: {order: ASC, fields: name}, filter: {slug: {ne: "data-schema-author"}}) {
        edges {
          node {
            slug
            url
            postCount
            twitter
            website
          }
        }
      }
      allGhostPage {
        edges {
          node {
            slug
            title
            url
            feature_image
          }
        }
      }
      series: allGhostTag(sort: {order: ASC, fields: name}, filter: {visibility: {eq: "internal"}}) {
        edges {
          node {
            slug
            url
            name
            postCount
          }
        }
      }
    }`
  )
  // Check for errors
  if (result.errors) {
    throw new Error(result.errors)
  }

  // Query results
  const tags = result.data.allGhostTag.edges
  const authors = result.data.allGhostAuthor.edges
  const pages = result.data.allGhostPage.edges
  const posts = result.data.posts.edges
  const series = result.data.series.edges
  const lynx = result.data.lynx.edges

  // Templates
  const indexTemplate = path.resolve(`./src/templates/index.js`)
  const tagsTemplate = path.resolve(`./src/templates/tag.js`)
  const authorTemplate = path.resolve(`./src/templates/author.js`)
  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const postTemplate = path.resolve(`./src/templates/post.js`)
  const seriesDetail = path.resolve(`./src/templates/seriesdetail.js`)

  // Pages
  const aboutPage = path.resolve(`./src/pages/about.js`)
  const searchPage = path.resolve(`./src/pages/search.js`)
  const seriesArchivePage = path.resolve(`./src/pages/seriesarchive.js`)

  // Create tag pages
  tags.forEach(({ node }) => {
    const totalPosts = node.postCount !== null ? node.postCount : 0
    const numberOfPages = Math.ceil(totalPosts / postsPerPage)

    // This part here defines, that our tag pages will use
    // a `/tag/:slug/` permalink.
    node.url = `/tag/${node.slug}/`

    Array.from({ length: numberOfPages }).forEach((_, i) => {
      const currentPage = i + 1
      const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
      const nextPageNumber = currentPage + 1 > numberOfPages ? null : currentPage + 1
      const previousPagePath = prevPageNumber
        ? prevPageNumber === 1
          ? node.url
          : `${node.url}page/${prevPageNumber}/`
        : null
      const nextPagePath = nextPageNumber
        ? `${node.url}page/${nextPageNumber}/`
        : null

      createPage({
        path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
        component: tagsTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numberOfPages: numberOfPages,
          currentPage: currentPage,
          prevPageNumber: prevPageNumber,
          nextPageNumber: nextPageNumber,
          previousPagePath: previousPagePath,
          nextPagePath: nextPagePath,
        },
      })
    })
  })

  // Create series pages
  series.forEach(({ node }) => {
    const totalPosts = node.postCount !== null ? node.postCount : 0
    const numberOfPages = Math.ceil(totalPosts / postsPerPage)

    node.url = `/series/${node.slug}/`

    Array.from({ length: numberOfPages }).forEach((_, i) => {
      const currentPage = i + 1
      const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
      const nextPageNumber =
        currentPage + 1 > numberOfPages ? null : currentPage + 1
      const previousPagePath = prevPageNumber
        ? prevPageNumber === 1
          ? node.url
          : `${node.url}page/${prevPageNumber}/`
        : null
      const nextPagePath = nextPageNumber
        ? `${node.url}page/${nextPageNumber}/`
        : null

      createPage({
        path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
        component: seriesDetail,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numberOfPages: numberOfPages,
          currentPage: currentPage,
          prevPageNumber: prevPageNumber,
          nextPageNumber: nextPageNumber,
          previousPagePath: previousPagePath,
          nextPagePath: nextPagePath,
        },
      })
    })
  })

  // Create author pages
  authors.forEach(({ node }) => {
    const totalPosts = node.postCount !== null ? node.postCount : 0
    const numberOfPages = Math.ceil(totalPosts / postsPerPage)

    node.url = `/author/${node.slug}/`
    node.twitterRegex = ``

    if (node.twitter !== null) {
      node.twitterRegex = `/(` + node.twitter.replace(`@`, ``) + `)/i`
    }

    Array.from({ length: numberOfPages }).forEach((_, i) => {
      const currentPage = i + 1
      const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
      const nextPageNumber =
        currentPage + 1 > numberOfPages ? null : currentPage + 1
      const previousPagePath = prevPageNumber
        ? prevPageNumber === 1
          ? node.url
          : `${node.url}page/${prevPageNumber}/`
        : null
      const nextPagePath = nextPageNumber
        ? `${node.url}page/${nextPageNumber}/`
        : null

      createPage({
        path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
        component: authorTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
          limit: postsPerPage,
          twitterUsernameRegex: node.twitterRegex,
          skip: i * postsPerPage,
          numberOfPages: numberOfPages,
          currentPage: currentPage,
          prevPageNumber: prevPageNumber,
          nextPageNumber: nextPageNumber,
          previousPagePath: previousPagePath,
          nextPagePath: nextPagePath,
          // websiteMeta: node.websiteMeta,
        },
      })
    })
  })

  // Create pages
  pages.forEach(({ node }) => {
    node.url = `/${node.slug}/`

    createPage({
      path: node.url,
      component: pageTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug,
        title: node.title,
      },
    })
  })

  lynx.forEach(({ node }) => {
    node.url = `/roundup/${node.slug}/`
    node.tagSlugs = []
    node.series = null

    node.tags.forEach(function (element) {
      node.tagSlugs.push(element.slug)
    })

    createPage({
      path: node.url,
      component: postTemplate,
      context: {
        slug: node.slug,
        url: node.url,
        tags: node.tagSlugs,
        seriesSlug: node.series,
      },
    })
  })

  // Create post pages
  posts.forEach(({ node }) => {
    node.url = `/${node.slug}/`
    node.series = null
    node.name = null
    node.tagSlugs = []
    node.primary = null
    node.primary_tag_name

    node.tags.forEach(function (element, index) {
      node.tagSlugs.push(element.slug)

      // get primary tag
      if (index === 0) {
        node.primary = element.slug
        node.primary_tag_name = element.name
      }

      // determine if post is in series
      if (element.visibility === `internal`) {
        node.series = element.slug
      }
    })

    createPage({
      path: node.url,
      component: postTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug,
        tags: node.tagSlugs,
        url: node.url,
        primaryTag: node.primary,
        seriesSlug: node.series,
        seriesTitle: node.name,
      },
    })
  })

  // Create pagination
  paginate({
    createPage,
    items: posts,
    itemsPerPage: postsPerPage,
    component: indexTemplate,
    pathPrefix: ({ pageNumber }) => {
      if (pageNumber === 0) {
        return `/`
      } else {
        return `/page`
      }
    },
  })

  createPage({
    path: `/series/`,
    component: seriesArchivePage,
    context: {
      slug: `series`,
    },
  })

  createPage({
    path: `/search/`,
    component: searchPage,
    context: {
      slug: `search`,
      title: `Search all Posts`,
    },
  })

  createPage({
    path: `/about/`,
    component: aboutPage,
    context: {
      slug: `about`,
      title: `About Us`,
    },
  })
}
