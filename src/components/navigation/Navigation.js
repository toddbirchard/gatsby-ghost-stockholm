import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Search from './Search'
import NavLinks from './NavLinks'
import HamburgerMenu from './HamburgerMenu'

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

const Navigation = ({ data, smallLogo, fullLogo, template }) => (
    <>
        <nav className="navigation">
            <div className="nav-wrapper">
                <div className="nav-left">
                    <Link to="/" className="logo"><img className="lazyload" data-src={smallLogo} alt="logo" /></Link>
                    <Link to="/" className="mobile-logo"><img className="lazyload" data-src={fullLogo} alt="logo" /></Link>
                    <div className="nav-links">
                        <NavLinks navigation={data} />
                    </div>
                </div>
                {template !== `search-template` ? <div className="nav-right">
                    <Search collapse className="search-widget" />
                </div> : null }
                <HamburgerMenu />
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
    smallLogo: PropTypes.string,
    fullLogo: PropTypes.string,
    template: PropTypes.string,
}

export default Navigation
