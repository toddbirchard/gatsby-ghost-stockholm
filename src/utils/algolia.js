const postQuery = `{
  allGhostPost(filter: {primary_tag: {slug: {ne: "roundup"}}}){
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
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ node: { primary_tag, ...rest } }) => ({
    ...primary_tag,
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }
const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.edges),
    indexName: "Posts",
    settings,
  },
]
module.exports = queries
