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
        plaintext
        tags {
          name
          slug
        }
        primary_tag {
          name
        }
        primary_author {
          name
        }
        published_at
      }
    }
  }
}
`
const allPostQuery = `{
  posts: allGhostPost(filter: {visibility: {eq: "public"}, primary_tag: {visibility: {eq: "public"}}}) {
    edges {
      node {
        objectID: ghostId
        id
        slug
        title
        feature_image
        excerpt
        meta_description
        plaintext
        tags {
          name
        }
        primary_tag {
          name
        }
        primary_author {
          name
        }
        published_at
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

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges), // optional
    indexName: `hackers_posts`,
  },
  {
    query: allPostQuery,
    transformer: ({ data }) => flatten(data.posts.edges), // optional
    indexName: `hackers_posts_all`,
  },
]

module.exports = queries
