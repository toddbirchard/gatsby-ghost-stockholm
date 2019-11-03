import React from 'react'
import { stack as Menu } from 'react-burger-menu'
import NavLinks from './NavLinks'

const Hamburger = ({ data }) => (
    <>
    <Menu>
      <NavLinks navigation={data} />
    </Menu>
    </>
)


export default Hamburger
