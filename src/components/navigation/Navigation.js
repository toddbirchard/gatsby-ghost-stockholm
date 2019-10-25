import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import config from '../../utils/siteConfig'
import Search from '../searchbar/Search'

const searchIndices = [
    { name: `Posts`, title: `Blog Posts`, hitComp: `PostHit` },
]
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

const Navigation = ({ data, navClass, logo }) => (
    <>
    <nav className="navigation">
        <div className="nav-wrapper">
            <div className="nav-left">
                <Link to="/" className="logo"><img src={logo} alt="logo" /></Link>
                <div className="nav-links">
                    {data.map((navItem, i) => {
                        if (navItem.url.includes(`rss`) || navItem.url.includes(`sitemap`)) {
                            return <a className={`${navClass} ${navItem.label}`} href={navItem.url} key={i} target="_blank" rel="noopener noreferrer">{navItem.label}</a>
                        } else if (navItem.url.includes(config.siteUrl)) {
                            return <Link className={`${navClass} ${navItem.label}`} to={`/${navItem.url.split(`/`).pop()}/`} key={i}>{navItem.label}</Link>
                        } else {
                            return <a className={`${navClass} ${navItem.label}`} href={navItem.url} key={i} target="_blank" rel="noopener noreferrer">{navItem.label}</a>
                        }
                    })}
                </div>
            </div>
            <div className="nav-right">
                <Search collapse indices={searchIndices} className="search-widget" />
            </div>
        </div>
    </nav>
    </>
)

Navigation.defaultProps = {
    navClass: `site-nav-item`,
}

Navigation.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    navClass: PropTypes.string,
    logo: PropTypes.string,
}

export default Navigation
