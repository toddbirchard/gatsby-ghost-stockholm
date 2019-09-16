import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { NavigationLinks } from '.'

/**
* Navigation component
*
* The Navigation component takes an array of your Ghost
* navigation property that is fetched from the settings.
* It differentiates between absolute (external) and relative link (internal).
* You can pass it a custom class for your own styles, but it will always fallback
* to a `site-nav-item` class.
*
*/

const Navigation = ({ navClass, logo }) => (
    <>
        <nav className="navigation">
            <div className="nav-wrapper">
                <Link to="/" className="logo"><img src={logo} alt="logo" /></Link>
                <div className="nav-links">
                    <div className="left-links">
                        <NavigationLinks navClass={navClass} />
                    </div>
                    <div className="right-links">
                        <a href="https://patreon.com/hackersandslackers" className="donate-btn">Donate</a>
                    </div>
                </div>
            </div>
        </nav>
    </>
)

Navigation.defaultProps = {
    navClass: `site-nav-item`,
    navType: `home-nav`,
}

export default Navigation
