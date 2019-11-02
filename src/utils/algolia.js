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
const pageQuery = `{
  pages: allGhostPage {
    edges {
      node {
        objectID: ghostId
        slug
        title
        excerpt
      }
    }
  }
}`

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => data.posts.edges.map(({ node }) => node), // optional
  },
  {
    query: pageQuery,
    transformer: ({ data }) => data.posts.edges.map(({ node }) => node), // optional
  },
];

module.exports = queries
