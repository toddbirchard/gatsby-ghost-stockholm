const postQuery = `{
  posts: allGhostPost(filter: {primary_tag: {slug: {nin: ["roundup", null]}, visibility: {eq: "public"}}}) {
    edges {
      node {
        objectID: ghostId
        id
        slug
        title
        feature_image
        excerpt
        meta_description
        tags {
          name
          slug
        }
        primary_tag {
          name
        }
        primary_author {
          slug
          name
        }
        published_at(formatString: "MMMM DD")
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
]

module.exports = queries
