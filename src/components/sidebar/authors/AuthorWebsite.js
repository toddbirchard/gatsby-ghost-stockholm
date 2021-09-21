import React from 'react'
import PropTypes from 'prop-types'

const AuthorWebsite = ({ websiteMeta }) => {
  const title = websiteMeta.title
  const url = websiteMeta.url
  const description = websiteMeta.description
  const icon = websiteMeta.icon

  return (
    <div className="widget website">
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title && <span>{title}</span>}
      </a>
      {`hello`}
      {description && <p>{description}</p>}
      {icon && <img src={icon} alt={title}/>}
    </div>
  )
}

AuthorWebsite.propTypes = {
  websiteMeta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.string,
  }),
}

export default AuthorWebsite
