const postQuery = `{
  posts: allGhostPost(filter: {slug: {nin: "roundup"}}) {
    edges {
      node {
        objectID: slug
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

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }
const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings,
  },
]
module.exports = queries
