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

TwitterWidget.propTypes = {
    twitterUrl: PropTypes.string,
}

export default TwitterWidget
