const postQuery = `{
  posts: allGhostPost(filter: {primary_tag: {slug: {nin: ["roundup"]}, visibility: {eq: "public"}}}) {
    edges {
      node {
        objectID: ghostId
        id
        slug
        title
        feature_image
        excerpt
        meta_description
        published_at
        updated_at
        custom_excerpt
        created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
        tags {
          name
          slug
        }
        primary_tag {
          name
          slug
          accent_color
        }
        primary_author {
          slug
          name
          profile_image
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

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges), // optional
    indexName: `hackers_posts`,
  },
]

module.exports = queries
