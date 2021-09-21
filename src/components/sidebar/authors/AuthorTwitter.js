import React from 'react'
import PropTypes from 'prop-types'
import { FaTwitter, FaUserFriends, FaHeartbeat } from 'react-icons/fa'

const AuthorTwitter = ({ data }) => {
  const twitterUsername = data && data.screen_name
  const twitterUrl =
    twitterUsername && `https://twitter.com/` + twitterUsername + `/`
  const twitterFollowUrl =
    twitterUsername &&
    `https://twitter.com/intent/user?screen_name=` + twitterUsername

  return (
    <>
      <div className="widget twitter">
        <div className="twitter-header">
          <img
            className="twitter-avatar lazyload"
            data-src={data.profile_image_url_https}
            alt={`${data.name}-twitter-avatar`}
            title={`${data.name}-twitter-avatar`}
          />
          <div className="profile-details">
            <div className="profile-details">
              <a
                href={twitterUrl}
                className="twitter-name"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.name.toLowerCase()}
              </a>
              <a
                href={twitterUrl}
                className="twitter-user"
                rel="nofollow noreferrer"
              >{`@${data.screen_name}`}</a>
            </div>
          </div>
        </div>
        <p className="twitter-profile-description">{data.description}</p>
        <div className="twitter-profile-meta">
          <div className="tweets meta-item">
            <FaTwitter/> <span>{data.statuses_count} Tweets</span>
          </div>
          <div className="followers meta-item">
            <FaUserFriends/> <span>{data.followers_count} Followers</span>
          </div>
          <div className="favorites meta-item">
            <FaHeartbeat/> <span>{data.favourites_count} Favorites</span>
          </div>
        </div>
        <a href={twitterFollowUrl} className="twitter-follow-button">
          <FaTwitter/> Follow
        </a>
      </div>
    </>
  )
}

AuthorTwitter.propTypes = {
  data: PropTypes.shape({
    screen_name: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    followers_count: PropTypes.number,
    profile_image_url_https: PropTypes.string,
    statuses_count: PropTypes.number,
    favourites_count: PropTypes.number,
  }),
}

export default AuthorTwitter
