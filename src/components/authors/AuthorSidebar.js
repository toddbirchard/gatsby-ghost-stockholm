import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, Link, graphql } from 'gatsby'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRss, faTag } from '@fortawesome/pro-regular-svg-icons'

/**
* Author Sidebar component
*/

library.add(fab, faRss, faTag)

const AuthorSidebar = ({ author }) => (
      <>
        <aside className="sidebar">
            <div className="widget about">
            </div>
        </aside>
    </>
)

export default AuthorSidebar
