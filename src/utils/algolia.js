const postQuery = `{
  posts: allGhostPost(filter: {slug: {nin: "roundup"}}) {
    edges {
      node {
        slug
        title
        primary_tag {
          name
        }
        feature_image
        excerpt
        tags {
          name
          description
        }
      }
    }
  }
}`

const flatten = arr => arr.map(({ node: { frontmatter, ...rest } }) => {
    return {
      ...frontmatter,
      ...rest,
    }
})
const settings = { attributesToSnippet: [`excerpt:40`] }

const queries = [
    {
        query: postQuery,
        transformer: ({ data }) => flatten(data.posts.edges),
        indexName: `Posts`,
        settings,
    },
]

module.exports = queries
