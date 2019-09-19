import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { TwitterTimelineEmbed } from 'react-twitter-embed'


/**
* Twitter widget
*/

const TwitterWidget = ({ site }) => {

    return (
      <>
        {site.twitter ?
            <div className="widget twitter">
                <TwitterTimelineEmbed
                    sourceType="profile"
                    options={{ height: 800 }}
                    screenName="HackersSlackers"
                    transparent
                    noScrollbar
                    noHeader
                    noFooter
                    noBorders
                    linkColor="#067bff"
                    className="widget twitter"
                />
            </div> : null }
    </>
    )
}

export default TwitterWidget
