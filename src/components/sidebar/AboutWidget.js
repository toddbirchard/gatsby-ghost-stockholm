import React from 'react'
import PropTypes from 'prop-types'

/**
* About widget
*/

const AboutWidget = ({ site }) => (
      <>
        <div className="widget about">
            <h1 className="site-headline">{site.title} </h1>
            {/*<img className="post-card-image lazyload" src="https://storage.googleapis.com/hackersandslackers-cdn/2019/10/logo-blue-full.png" alt={site.title}/>*/}
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
