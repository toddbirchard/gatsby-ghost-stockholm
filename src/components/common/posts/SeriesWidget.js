`{
  allGhostPost(filter: {tags: {elemMatch: {slug: {eq: "welcome-to-sql"}}}}, sort: {order: DESC, fields: published_at}) {
    edges {
      node {
        slug
      }
    }
  }
}`
