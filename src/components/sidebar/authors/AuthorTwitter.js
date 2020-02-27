import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AuthorTwitterWidget = ({ authorProfile }) => {
    const twitterUrl = `https://twitter.com/` + authorProfile.screen_name + `/`
    const twitterFollowUrl = `https://twitter.com/intent/user?screen_name=` + authorProfile.screen_name

    return (
        <>
            <div className="widget twitter">
                <div className="twitter-header">
                    <img className="twitter-avatar lazyload" data-src={authorProfile.profile_image_url_https} alt="twitter-avatar"/>
                    <div className="profile-details">
                        <div className="profile-details">
                            <a href={twitterUrl} className="twitter-name" target="_blank" rel="noopener noreferrer">{authorProfile.name}</a>
                            <a href={twitterUrl} className="twitter-user" rel="nofollow noreferrer">{`@${authorProfile.screen_name}`}</a>
                        </div>
                    </div>
                </div>
                <p className="twitter-profile-description">
                    {authorProfile.description}
                </p>
                <div className="twitter-profile-meta">
                    <div className="tweets meta-item"><FontAwesomeIcon icon={[`fab`, `twitter`]} size="xs" /> <span>{authorProfile.statuses_count} Tweets</span></div>
                    <div className="followers meta-item"><FontAwesomeIcon icon={[`fad`, `user-friends`]} size="xs" /> <span>{authorProfile.followers_count} Followers</span></div>
                    <div className="favorites meta-item"><FontAwesomeIcon icon={[`fad`, `heartbeat`]} size="xs"/> <span>{authorProfile.favourites_count} Favorites</span></div>
                </div>
                <a href={twitterFollowUrl} className="twitter-follow-button"><FontAwesomeIcon icon={[`fab`, `twitter`]} size="xs" /> Follow</a>
            </div>
        </>
    )
}

AuthorTwitterWidget.propTypes = {
    authorProfile: PropTypes.shape({
        screen_name: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        followers_count: PropTypes.string,
        profile_image_url_https: PropTypes.string,
        statuses_count: PropTypes.string,
        favourites_count: PropTypes.string,
    }),
}

export default AuthorTwitterWidget
