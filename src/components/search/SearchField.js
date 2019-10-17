import React from "react"
import { StaticQuery, Link } from "gatsby"
import { graphql } from "gatsby"


const SearchField = () => (
  <StaticQuery
    query={graphql`
      query posts {
        allGhostPost(filter: {tags: {elemMatch: {slug: {nin: "roundup"}}}}) {
          edges {
            node {
              title
              slug
              primary_tag {
                name
              }
              feature_image
              excerpt
            }
          }
        }
      }
    `}
    render={data => (
          <Search searchIndex={data.posts} />
      )}
    />
)

export default SearchField
