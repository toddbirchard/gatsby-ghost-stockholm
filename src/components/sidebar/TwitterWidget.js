import React from 'react'
import PropTypes from 'prop-types'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

/**
* Twitter widget
*/

const TwitterWidget = ({ twitterUrl }) => (
      <>
        {twitterUrl ?
            <div className="widget twitter">
                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="HackersSlackers"
                    autoHeight
                    transparent
                    noScrollbar
                    noHeader
                    noFooter
                    noBorders
                    linkColor="#067bff"
                />
            </div> : null }
    </>
)

TwitterWidget.propTypes = {
    twitterUrl: PropTypes.string.isRequired,
}

export default TwitterWidget
