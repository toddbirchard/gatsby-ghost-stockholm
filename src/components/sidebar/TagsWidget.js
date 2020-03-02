import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

/**
* Tags widget
*/
const TagsWidget = ({ data }) => {
  const tags = data.allGhostTag.edges

  return (
    <>
      <div className="widget tags">
        {tags.map(({ node }) => (
          <a href={`/tag/${ node.slug }`} className="tag" key={ node.name }>{ node.name }</a>
        ))}
      </div>
    </>
  )
}

const TagsWidgetQuery = props => (
  <StaticQuery
    query={graphql`
            query allGhostTags {
                allGhostTag(sort: {order: DESC, fields: postCount}, filter: {visibility: {eq: "public"}, postCount: {gt: 3}, slug: {nin: "roundup"}}) {
                  edges {
                    node {
                      name
                      slug
                      postCount
                    }
                  }
                }
            }
        `}
    render={data => <TagsWidget data={data} {...props} />}
  />
)

TagsWidget.propTypes = {
  data: PropTypes.shape({
    allGhostTag: PropTypes.object,
  }),
}

export default TagsWidgetQuery
