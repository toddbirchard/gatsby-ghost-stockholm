import React from 'react'
import PropTypes from 'prop-types'
import { AiOutlineGithub } from 'react-icons/ai'

const AuthorGithub = ({ url }) => {
  const isGithub = url.indexOf(`https://github.com`) ? true : false
  const githubUrl = isGithub && url.replace(`https://www.facebook.com/`, ``)

  return (
    <>
      {isGithub &&
        <div className="author-card-item github">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <AiOutlineGithub/><span>Github</span>
          </a>
        </div>
      }
    </>
  )
}

AuthorGithub.propTypes = {
  url: PropTypes.string.isRequired,
}

export default AuthorGithub
