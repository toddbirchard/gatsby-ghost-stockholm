import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'gatsby'

import { NavigationLinks } from '.'

/*const NavigationAlt = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}))*/

const NavigationAlt = ({ data, navClass, logo }) => (

      <>
        <div className={`navigation`}>
            <AppBar position="static">
                <Toolbar>
                    {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>*/}
                    <Link to="/" className="logo"><img src={logo} alt="logo" /></Link>
                      <div className="nav-links">
                          <div className="left-links">
                          <NavigationLinks data={data} navClass={navClass} />
                        </div>
                          <div className="right-links">
                              <a href="https://patreon.com/hackersandslackers" className="donate-btn"><Button>Donate</Button></a>
                        </div>
                    </div>
                    Login
                </Toolbar>
            </AppBar>
        </div>
        </>
)
NavigationAlt.defaultProps = {
    navClass: `site-nav-item`,
    navType: `home-nav`,
}

NavigationAlt.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    navClass: PropTypes.string,
    navType: PropTypes.string,
    logo: PropTypes.string,
}

export default NavigationAlt
