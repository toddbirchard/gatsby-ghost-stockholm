const path = require(`path`)
const { postsPerPage } = require(`./src/utils/siteConfig`)
const { paginate } = require(`gatsby-awesome-pagination`)

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const result = await graphql(`
        {
            allGhostPost(sort: { order: ASC, fields: published_at }) {
                edges {
                    node {
                        slug
                        primary_tag {
                          slug
                        }
                        primary_author {
                          slug
                        }
                        tags {
                          slug
                          name
                          visibility
                        }
                    }
                }
            }
            allGhostTag(sort: { order: ASC, fields: name }) {
                edges {
                    node {
                        slug
                        postCount
                    }
                }
            }
            allGhostAuthor(sort: { order: ASC, fields: name }) {
                edges {
                    node {
                        slug
                        url
                        postCount
                        twitter
                    }
                }
            }
            allGhostPage(sort: { order: ASC, fields: published_at }) {
                edges {
                    node {
                        slug
                        url
                    }
                }
            }
            internalTags: allGhostTag(sort: {order: ASC, fields: name}, filter: {visibility: {eq: "internal"}}) {
              edges {
                node {
                  slug
                  url
                  name
                  postCount
                }
              }
            }
            jupyter: allFile(filter: {ext: {eq: ".ipynb"}}) {
              edges {
                node {
                  id
                  name
                }
              }
            }
        }
    `)

    // Check for any errors
    if (result.errors) {
        throw new Error(result.errors)
    }

    // Extract query results
    const tags = result.data.allGhostTag.edges
    const authors = result.data.allGhostAuthor.edges
    const pages = result.data.allGhostPage.edges
    const posts = result.data.allGhostPost.edges
    const series = result.data.internalTags.edges
    const jupyter = result.data.jupyter.edges

    // Load templates
    const indexTemplate = path.resolve(`./src/templates/index.js`)
    const tagsTemplate = path.resolve(`./src/templates/tag.js`)
    const authorTemplate = path.resolve(`./src/templates/author.js`)
    const pageTemplate = path.resolve(`./src/templates/page.js`)
    const postTemplate = path.resolve(`./src/templates/post.js`)
    const seriesDetail = path.resolve(`./src/templates/seriesdetail.js`)
    const jupyterTemplate = path.resolve(`./src/templates/notebook.js`)

    // Load Pages
    const jupyterArchive = path.resolve(`./src/pages/jupyterarchive.js`)
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
                component: tagsTemplate,
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    slug: node.slug,
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numberOfPages: numberOfPages,
                    humanPageNumber: currentPage,
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

        // This part here defines, that our tag pages will use
        // a `/tag/:slug/` permalink.
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
                    humanPageNumber: currentPage,
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

        // This part here defines, that our author pages will use
        // a `/author/:slug/` permalink.
        node.url = `/author/${node.slug}/`
        node.twitterRegex = null

        if (node.twitter !== null) {
            console.log(node.slug)
            console.log(node.twitter)
            node.twitterRegex = `/(` + node.twitter.replace(`@`, ``) + `)/i`
            console.log(node.twitterRegex)
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
                    humanPageNumber: currentPage,
                    prevPageNumber: prevPageNumber,
                    nextPageNumber: nextPageNumber,
                    previousPagePath: previousPagePath,
                    nextPagePath: nextPagePath,
                },
            })
        })
    })

    // Create pages
    pages.forEach(({ node }) => {
        // This part here defines, that our pages will use
        // a `/:slug/` permalink.
        node.url = `/${node.slug}/`

        createPage({
            path: node.url,
            component: pageTemplate,
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.slug,
            },
        })
    })

    // Create Jupyter Notebook posts
    jupyter.forEach(({ node }) => {
        // This part here defines, that our jupyter will use
        // a `/:slug/` permalink.
        node.title = node.name.split(`/`).pop().replace(`.ipynb`, ``)
        node.slug = `${node.title.split(` `).join(`-`).toLowerCase()}`
        node.url = `/jupyter/${node.slug}/`
        node.primary = `Jupyter`

        createPage({
            path: node.url,
            component: jupyterTemplate,
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                id: node.id,
                name: node.name,
                title: node.title,
                slug: node.slug,
                primaryTag: node.primary,
            },
        })
    })

    // Create post pages
    posts.forEach(({ node }) => {
        // This part here defines, that our posts will use
        // a `/:slug/` permalink.
        node.url = `/${node.slug}/`
        node.series = null
        node.name = null
        node.tagSlugs = []
        node.primary = null

        if (node.url.includes(`lynx`)) {
            node.url = `/roundup/${node.slug}/`
        }

        node.tags.forEach(function (element, index) {
            node.tagSlugs.push(element.slug)

            // get primary tag
            if (index === 0) {
                node.primary = element.slug
            }

            // determine if post is in series
            if (element.visibility === `internal`) {
                node.series = element.slug
                // node.name = element = name
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
                primaryAuthor: node.primary_author.slug,
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
            title: `Series'`,
            description: `When we find a topic we hold true to our hearts, we'll occasionally cling long enough to produce a series. These publications cover topics from start to finish, just enough to arm readers with enough to be dangerous. We may not be a 500 dollar online bootcamp, but we do explain things like human beings, and occasionally even drop the F bomb. Trust us, it's way more fun (and perhaps effective) to stick to something this way.`,
            metaTitle: `Series and multi-part tutorials about software.`,
            metaDescription: `Explore full topics in software development and data science by following our dedicated multi-part series'.`,
        },
    })

    createPage({
        path: `/search/`,
        component: searchPage,
        context: {
            slug: `search`,
            title: `Search all posts`,
            description: `Search for tutorials about Data Science, Engineering, Software, and more.`,
        },
    })

    createPage({
        path: `/jupyter/`,
        component: jupyterArchive,
        context: {
            slug: `jupyter`,
            title: `Jupyter Notebooks`,
            description: `Our collection of Jupyter notebooks.`,
        },
    })
}
