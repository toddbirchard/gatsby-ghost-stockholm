const path = require(`path`);
const { postsPerPage } = require(`./src/utils/siteConfig`);
const { paginate } = require(`gatsby-awesome-pagination`);

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allGhostPost(
        sort: { order: ASC, fields: published_at }
        filter: {
          slug: { ne: "data-schema" }
          primary_tag: { slug: { ne: "roundup" } }
        }
      ) {
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
      allGhostTag(
        sort: { order: ASC, fields: name }
        filter: { slug: { ne: "data-schema" } }
      ) {
        edges {
          node {
            slug
            postCount
          }
        }
      }
      allGhostAuthor(
        sort: { order: ASC, fields: name }
        filter: { slug: { ne: "data-schema-author" } }
      ) {
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
      series: allGhostTag(
        sort: { order: ASC, fields: name }
        filter: { visibility: { eq: "internal" } }
      ) {
        edges {
          node {
            slug
            url
            name
            postCount
          }
        }
      }
    }
  `);
  // Check for errors
  if (result.errors) {
    for (let error in result.errors) {
      throw error;
    }
  }

  // Query results
  const tags = result.data.allGhostTag.edges;
  const authors = result.data.allGhostAuthor.edges;
  const pages = result.data.allGhostPage.edges;
  const posts = result.data.allGhostPost.edges;
  const series = result.data.series.edges;

  // Templates
  const indexTemplate = path.resolve(`./src/templates/index.js`);
  const tagsTemplate = path.resolve(`./src/templates/tag.js`);
  const authorTemplate = path.resolve(`./src/templates/author.js`);
  const pageTemplate = path.resolve(`./src/templates/page.js`);
  const postTemplate = path.resolve(`./src/templates/post.js`);
  const seriesDetail = path.resolve(`./src/templates/series-detail.js`);

  // Pages
  const aboutPage = path.resolve(`./src/pages/about.js`);
  const searchPage = path.resolve(`./src/pages/search.js`);
  const seriesArchivePage = path.resolve(`./src/pages/series-archive.js`);

  // Create tag pages
  tags.forEach(({ node }) => {
    const totalPosts = node.postCount !== null ? node.postCount : 0;
    const numberOfPages = Math.ceil(totalPosts / postsPerPage);

    // This part here defines, that our tag pages will use
    // a `/tag/:slug/` permalink.
    node.url = `/tag/${node.slug}/`;

    Array.from({ length: numberOfPages }).forEach((_, i) => {
      const currentPage = i + 1;
      const prevPageNumber = currentPage <= 1 ? null : currentPage - 1;
      const nextPageNumber =
        currentPage + 1 > numberOfPages ? null : currentPage + 1;
      const previousPagePath = prevPageNumber
        ? prevPageNumber === 1
          ? node.url
          : `${node.url}page/${prevPageNumber}/`
        : null;
      const nextPagePath = nextPageNumber
        ? `${node.url}page/${nextPageNumber}/`
        : null;

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
      });
    });
  });

  // Create series pages
  series.forEach(({ node }) => {
    const totalPosts = node.postCount !== null ? node.postCount : 0;
    const numberOfPages = Math.ceil(totalPosts / postsPerPage);

    node.url = `/series/${node.slug}/`;

    Array.from({ length: numberOfPages }).forEach((_, i) => {
      const currentPage = i + 1;
      const prevPageNumber = currentPage <= 1 ? null : currentPage - 1;
      const nextPageNumber =
        currentPage + 1 > numberOfPages ? null : currentPage + 1;
      const previousPagePath = prevPageNumber
        ? prevPageNumber === 1
          ? node.url
          : `${node.url}page/${prevPageNumber}/`
        : null;
      const nextPagePath = nextPageNumber
        ? `${node.url}page/${nextPageNumber}/`
        : null;

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
      });
    });
  });

  // Create author pages
  authors.forEach(({ node }) => {
    const totalPosts = node.postCount !== null ? node.postCount : 0;
    const numberOfPages = Math.ceil(totalPosts / postsPerPage);

    node.url = `/author/${node.slug}/`;
    node.twitterRegex = ``;

    if (node.twitter !== null) {
      node.twitterRegex = `/(` + node.twitter.replace(`@`, ``) + `)/i`;
    }

    Array.from({ length: numberOfPages }).forEach((_, i) => {
      const currentPage = i + 1;
      const prevPageNumber = currentPage <= 1 ? null : currentPage - 1;
      const nextPageNumber =
        currentPage + 1 > numberOfPages ? null : currentPage + 1;
      const previousPagePath = prevPageNumber
        ? prevPageNumber === 1
          ? node.url
          : `${node.url}page/${prevPageNumber}/`
        : null;
      const nextPagePath = nextPageNumber
        ? `${node.url}page/${nextPageNumber}/`
        : null;

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
        },
      });
    });
  });

  // Create pages
  pages.forEach(({ node }) => {
    node.url = `/${node.slug}/`;

    createPage({
      path: node.url,
      component: pageTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug,
        title: node.title,
      },
    });
  });

  // Create post pages
  posts.forEach(({ node }) => {
    node.url = `/${node.slug}/`;
    node.series = null;
    node.name = null;
    node.tagSlugs = [];
    node.primary = null;
    node.primary_tag_name = null;

    node.tags.forEach(function (element, index) {
      node.tagSlugs.push(element.slug);

      // get primary tag
      if (index === 0) {
        node.primary = element.slug;
        node.primary_tag_name = element.name;
      }

      // determine if post is in series
      if (element.visibility === `internal`) {
        node.series = element.slug;
      }
    });

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
    });
  });

  // Create pagination
  paginate({
    createPage,
    items: posts,
    itemsPerPage: postsPerPage,
    component: indexTemplate,
    pathPrefix: ({ pageNumber }) => {
      if (pageNumber === 0) {
        return `/`;
      } else {
        return `/page`;
      }
    },
  });

  createPage({
    path: `/series/`,
    component: seriesArchivePage,
    context: {
      slug: `series`,
    },
  });

  createPage({
    path: `/search/`,
    component: searchPage,
    context: {
      slug: `search`,
      title: `Search all Posts`,
    },
  });

  createPage({
    path: `/about/`,
    component: aboutPage,
    context: {
      slug: `about`,
      title: `About Us`,
    },
  });
};
