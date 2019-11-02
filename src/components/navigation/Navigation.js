import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Search from '../search/Search'
import NavLinks from './NavLinks'

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

const Navigation = ({ data, logo }) => (
    <>
    <nav className="navigation">
        <div className="nav-wrapper">
            <div className="nav-left">
                <Link to="/" className="logo"><img src={logo} alt="logo" /></Link>
                <div className="nav-links">
                    <NavLinks navigation={data} />
                </div>
            </div>
            <div className="nav-right">
                <Search collapse className="search-widget" />
            </div>
        </div>
    </nav>
    </>
)

Navigation.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    logo: PropTypes.string,
}

export default Navigation
