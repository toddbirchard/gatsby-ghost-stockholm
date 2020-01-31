import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import { slide as Menu } from 'react-burger-menu'
import Search from './Search'

class HamburgerMenu extends React.Component {
    showSettings(event) {
        event.preventDefault()
    }

    render() {
        return (
            <Menu right width={ `85%` } isOpen={ false } burgerButtonClassName={ `hamburger-button` } crossClassName={ `hamburger-cross-bar` } className="mobile-menu">
                <div className="pages">
                    <div className="search-container"><Search collapse indices={searchIndices} className="search-widget" /></div>
                    <Link className={`navigation-link`} to={`/about/`}><FontAwesomeIcon icon={[`fad`, `indent`]} size="xs"/>About</Link>
                    <Link className={`navigation-link`} to={`/series/`}><FontAwesomeIcon icon={[`fad`, `books`]} size="xs"/>Series</Link>
                    <Link className={`navigation-link`} to={`/join-us/`}><FontAwesomeIcon icon={[`fad`, `user-plus`]} size="xs"/>Join</Link>
                    <Link className={`navigation-link`} to={`/search/`}><FontAwesomeIcon icon={[`fad`, `search`]} size="xs"/>Search</Link>
                    <Link className={`navigation-link`} to={`/rss/`}><FontAwesomeIcon icon={[`fad`, `rss`]} size="xs"/>RSS</Link>
                    <a className={`navigation-link`} href="https://www.buymeacoffee.com/hackersslackers"><FontAwesomeIcon icon={[`fad`, `coffee-togo`]} size="xs"/> Donate</a>
                </div>
            </Menu>
        )
    }
}

export default HamburgerMenu
