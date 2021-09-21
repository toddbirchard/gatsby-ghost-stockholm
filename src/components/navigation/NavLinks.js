import React from 'react'
import PropTypes from 'prop-types'
import config from '../../utils/siteConfig'
import { Link } from 'gatsby'
// import AuthButton from "../auth/AuthButton"

const NavLinks = ({ navigation }) => (
  <>
    <div className="nav-links">
      {navigation.map((navItem, i) => {
        if (navItem.url.includes(`/rss`)) {
          return (
            <a
              className="navigation-link rss"
              href={navItem.url}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
            >
              {navItem.label}
            </a>
          )
        } else if (navItem.url.includes(`coffee`)) {
          return (
            <a
              className="navigation-link donate"
              href={navItem.url}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
            >
              {navItem.label}
            </a>
          )
        } else {
          return (
            <Link
              className={`navigation-link ${navItem.label}`}
              to={navItem.url.replace(config.siteUrl, ``)}
              key={i}
            >
              {navItem.label}
            </Link>
          )
        }
      })}
      {/* <AuthButton />*/}
    </div>
  </>
)

NavLinks.propTypes = {
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}

export default NavLinks
