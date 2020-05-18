import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

/**
* About widget
*/

const AboutWidget = ({ site }) => {
  const logo = site.logo

  return (
    <>
      <div className="widget about">
        <Link to="/">
          {logo
            ? <img className="widget-logo lazyload" data-src={logo} alt={site.title} />
            : <h1 className="site-headline">{site.title} </h1>
          }
        </Link>
        <p className="description">{site.description}</p>
      </div>
    </>
  )
}

AboutWidget.propTypes = {
  site: PropTypes.shape({
    logo: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
}

export default AboutWidget
