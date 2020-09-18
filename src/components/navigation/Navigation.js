import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Search from '../search/Search'
import NavLinks from './NavLinks'
import MobileMenu from './Mobile/MobileMenu'
import SearchMenu from './Mobile/SearchMenu'

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

const Navigation = ({ data, smallLogo }) => (
  <>
    <nav className="navigation">
      <div className="nav-wrapper">
        <div className="nav-left">
          <Link to="/" className="logo">
            <img src={smallLogo} alt={`Hackers and Slackers Logo`} title={`Hackers and Slackers Logo`} />
          </Link>
          <NavLinks navigation={data} />
        </div>
        <div className="nav-right">
          <Search collapse className="search-widget" />
          <SearchMenu />
          <MobileMenu />
        </div>
      </div>
    </nav>
  </>
)

Navigation.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  smallLogo: PropTypes.string,
  template: PropTypes.string,
}

export default Navigation
