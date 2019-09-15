import React from 'react'
import PropTypes from 'prop-types'

import { StaticQuery, Link, graphql } from 'gatsby'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss, faTag } from '@fortawesome/pro-regular-svg-icons'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

import { AuthorGithub } from '.'

/**
* Author Sidebar component
*/

library.add(fab, faRss, faTag)

const AuthorSidebar = ({ author }) => {

    return (
      <>
        <aside className="sidebar">
            <div className="widget about">
              <AuthorGithub author={author}/>
            </div>
        </aside>
    </>
    )
}

export default AuthorSidebar
