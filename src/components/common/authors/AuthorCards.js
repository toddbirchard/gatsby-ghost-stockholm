import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, Link, graphql } from 'gatsby'

import { faUserEdit, faGlobe, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { PostAuthor } from '../posts'


library.add(faUserEdit, faGlobe, faHome)


const AuthorCards = ({ allAuthors }) => {
    const authors = allAuthors.allGhostAuthor.edges

    return (
      <>
          <div className="author-card-list">
            <h2 className="author-list">Authors</h2>
            {authors.map(({ node }) => (
                <PostAuthor author={node} />
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
