import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

/**
* About widget
*/

const AboutWidget = ({ site }) => (
      <>
        <div className="widget about">
            <Link to="/" className="about-logo-link">
                {site.logo ? <img className="site-logo" src={site.logo} alt={site.title} /> : <h1> {site.title} </h1> }
            </Link>
            <p className="description">{site.description}</p>
        </div>
    </>
)

AboutWidget.propTypes = {
    site: PropTypes.shape({
        logo: PropTypes.string,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
    }).isRequired,
}

export default AboutWidget
