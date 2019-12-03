import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Search from '../search'
import NavLinks from './NavLinks'
import { stack as Menu } from 'react-burger-menu'

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

const searchIndices = [
    { name: `hackers_posts`, title: `Posts`, hitComp: `PostHit` },
]

const Navigation = ({ data, logo, mobileLogo }) => (
    <>
        <nav className="navigation">
            <div className="nav-wrapper">
                <div className="nav-left">
                    <Link to="/" className="logo"><img className="lazyload" data-src={logo} alt="logo" /></Link>
                    <Link to="/" className="mobile-logo"><img className="lazyload" data-src={mobileLogo} alt="logo" /></Link>
                    <div className="nav-links">
                        <NavLinks navigation={data} />
                    </div>
                </div>
                <div className="nav-right">
                    <Search collapse indices={searchIndices} className="search-widget" />
                </div>
                <Menu right width={ `100%` } isOpen={ false } burgerButtonClassName={ `hamburger-button` } crossClassName={ `hamburger-cross-bar` }>
                    <NavLinks navigation={data} />
                </Menu>
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
    mobileLogo: PropTypes.string,
}

export default Navigation
