import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import { faUserEdit, faGlobe, faHome } from '@fortawesome/pro-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { AuthorCard } from './'

library.add(faUserEdit, faGlobe, faHome)

const AuthorCards = ({ allAuthors }) => {
    const authors = allAuthors.allGhostAuthor.edges

    return (
      <>
          <div className="author-card-list">
              <h2 className="author-list-title">Authors</h2>
              {authors.map(({ node }) => (
                  <AuthorCard author={node} key={node.id}/>
              ))}
          </div>
      </>
    )
}

AuthorCards.propTypes = {
    data: PropTypes.shape({
        allGhostAuthor: PropTypes.object.isRequired,
    }).isRequired,
}

const AuthorCardsQuery = props => (
    <StaticQuery
        query={graphql`
          query AuthorCardsQuery {
            allGhostAuthor {
              edges {
                node {
                  name
                  postCount
                  profile_image
                  slug
                  twitter
                  website
                  location
                  facebook
                  cover_image
                  bio
                }
              }
            }
          }
        `}
        render={data => <AuthorCards allAuthors={data} {...props} />}
    />
)


export default AuthorCardsQuery
