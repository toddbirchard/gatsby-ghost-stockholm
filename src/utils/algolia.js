const postQuery = `{
  posts: allGhostPost(filter: {primary_tag: {slug: {nin: ["roundup", null]}, visibility: {eq: "public"}}}) {
    edges {
      node {
        objectID: ghostId
        slug
        title
        feature_image
        excerpt
        tags {
          name
        }
      }
    }
  }
}
`

const flatten = arr =>
  arr.map(({ node: { tags, ...rest } }) => ({
    ...tags,
    ...rest,
  }))

//const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `hackers_posts`,
  },
]
module.exports = queries
