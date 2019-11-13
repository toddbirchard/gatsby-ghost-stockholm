import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const AuthorTwitterWidget = ({ authorTweets, authorProfile }) => {
    const tweets = authorTweets.edges
    const user = authorProfile.user

    return (
          <>
            <div className="widget twitter author">
                <div className="twitter-header">
                    <img src={user.profile_image_url_https} className="twitter-avatar" alt="twitter-avatar"/>
                    <div>
                        <a href={user.url} className="twitter-name" target="_blank" rel="noopener noreferrer">{user.name}</a>
                        <div className="twitter-user">@{user.screen_name}</div>
                    </div>
                </div>
                <div className="tweets">
                    {tweets.map(({ node }) => (
                        <div className="tweet" key={node.id}>
                            <p className="tweet-content">{node.full_text.split(`#`)[0].split(`http`)[0]}</p>
                            {node.entities.hashtags.length > 0 ? <div className="tweet-hastags">{node.entities.hashtags.map(({ text }) => (
                                <a href={`https://twitter.com/hashtag/${text}`} key={text} className="hashtag">#{text}</a>
                            ))}</div> : null }
                            <div className="tweet-head">
                                {node.entities.urls.map(({ display_url }) => (
                                    <a href={display_url} className="tweet-link" key="1">{ display_url }</a>
                                ))}
                                <span className="date">{node.created_at.split(` `, 3).join(` `)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </>
    )
}

AuthorTwitterWidget.propTypes = {
    data: PropTypes.shape({
        authorTweets: PropTypes.shape({
            full_text: PropTypes.string,
            favorite_count: PropTypes.number,
            retweet_count: PropTypes.number,
            created_at: PropTypes.string,
            id: PropTypes.string,
            user: PropTypes.shape({
                name: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                profile_image_url: PropTypes.string.isRequired,
                screen_name: PropTypes.string.isRequired,
            }),
            entities: PropTypes.shape({
                urls: PropTypes.arrayOf(
                    PropTypes.shape({
                        url: PropTypes.string,
                    }),
                ),
                hashtags: PropTypes.arrayOf(
                    PropTypes.shape({
                        text: PropTypes.string,
                    }),
                ),
            }),
        }).isRequired,
        authorTwitterProfile: PropTypes.shape({
            user: PropTypes.shape({
                profile_image_url_https: PropTypes.string,
                name: PropTypes.string.isRequired,
                url: PropTypes.string,
                display_url: PropTypes.string,
                screen_name: PropTypes.string.isRequired,
            }).isRequired,
        }),
    }),
}

export default AuthorTwitterWidget
