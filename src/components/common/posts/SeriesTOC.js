import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

const SeriesTOC = ({ series }) => {

    return (
            <>
              <ul>

              </ul>
            </>
    )
}

SeriesTOC.propTypes = {
    author: PropTypes.string.isRequired
}
/*
export const seriesQuery = graphql`
query{
allGhostPost(filter: {tags: {elemMatch: {slug: {eq: $series}}}}, sort: {fields: published_at, order: ASC}) {
  edges {
    node {
      slug
      title
    }
  }
}}`


*/


export default SeriesTOC
