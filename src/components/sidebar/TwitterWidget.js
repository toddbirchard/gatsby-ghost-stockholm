import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TwitterWidget = ({ data }) => {
    const tweets = data.allTwitterStatusesUserTimelineHackersTweets.edges

    return (
        <>
            <div className="widget twitter">
                <div className="tweets">
                    {tweets.map(({ node }) => (
                        <div className="tweet" key={node.id}>

                            {node.retweeted_status ?
                                <div className="retweeted-tweet">

                                    <div className="retweeted-header">
                                        <FontAwesomeIcon icon={[`fad`, `retweet`]} size="xs" swapOpacity />
                                        <span>{`${node.user.name} retweeted`}</span>
                                    </div>
                                    <div className="retweeted-body">
                                        <div className="twitter-header">
                                            <div className="twitter-avatar">
                                                <img className="lazyload" data-src={node.retweeted_status.user.profile_image_url_https} alt="twitter-avatar" />
                                            </div>
                                            <div className="profile-details">
                                                <a href={node.retweeted_status.user.url} className="twitter-name" target="_blank" rel="noopener noreferrer">{node.retweeted_status.user.name}</a>
                                                <a href={node.retweeted_status.user.url} className="twitter-user" rel="nofollow noreferrer">@{node.retweeted_status.user.screen_name}</a>
                                            </div>
                                        </div>

                                        <p className="tweet-content">{node.retweeted_status.full_text}</p>
                                        {node.entities.urls.map(({ display_url, expanded_url }) => (
                                            <a href={expanded_url} className="tweet-link" key={`${node.id}-link`} rel="nofollow noreferrer">{ expanded_url }</a>
                                        ))}
                                    </div>
                                </div>
                                :
                                <div>
                                    <div className="twitter-header">
                                        <img className="twitter-avatar lazyload" data-src={node.user.profile_image_url_https} alt="twitter-avatar"/>
                                        <div className="profile-details">
                                            <div className="profile-details">
                                                <a href={node.user.url} className="twitter-name" target="_blank" rel="noopener noreferrer">{node.user.name}</a>
                                                <a href={node.user.url} className="twitter-user" rel="nofollow noreferrer">{`@${node.user.screen_name}`}</a>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="tweet-content">{node.full_text}</p>
                                    {node.entities.urls.map(({ display_url, expanded_url }) => (
                                        <a href={expanded_url} className="tweet-link" key={`${node.id}-link`} rel="nofollow noreferrer">{ expanded_url }</a>
                                    ))}
                                </div> }
                            {/*{node.entities.hashtags.length > 0 ? <div className="tweet-hastags">{node.entities.hashtags.map(({ text }) => (
                                <a href={`https://twitter.com/hashtag/${text}`} key={`${node.id}-${text}`} className="hashtag" rel="nofollow noreferrer">#{text}</a>
                            ))}</div> : null }*/}
                            {node.retweeted_status ? null : <div className="tweet-footer">
                                <div className="retweets meta-item"><FontAwesomeIcon icon={[`fad`, `retweet`]} size="xs" swapOpacity /> <span>{node.retweet_count}</span></div>
                                <div className="favorites meta-item"><FontAwesomeIcon icon={[`fad`, `heartbeat`]} size="xs"/> <span>{node.favorite_count}</span></div>
                                <div className="date meta-item"><FontAwesomeIcon icon={[`fad`, `calendar`]} size="xs" /> {node.created_at.split(` `, 3).join(` `)}</div>
                            </div> }
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

TwitterWidget.propTypes = {
    data: PropTypes.shape({
        allTwitterStatusesUserTimelineHackersTweets: PropTypes.shape({
            full_text: PropTypes.string,
            favorite_count: PropTypes.number,
            retweet_count: PropTypes.number,
            created_at: PropTypes.string,
            id: PropTypes.string,
            user: PropTypes.shape({
                name: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                profile_image_url_https: PropTypes.string.isRequired,
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
            retweeted_status: PropTypes.shape({
                user: PropTypes.shape({
                    profile_image_url_https: PropTypes.string,
                    url: PropTypes.string,
                    screen_name: PropTypes.string,
                    name: PropTypes.string,
                }),
            }),
        }).isRequired,
        twitterStatusesUserTimelineHackersTweets: PropTypes.shape({
            user: PropTypes.shape({
                profile_image_url_https: PropTypes.string,
                name: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
                display_url: PropTypes.string,
                screen_name: PropTypes.string.isRequired,
            }).isRequired,
        }),
    }),
}

const TwitterQuery = props => (
    <StaticQuery
        query={graphql`
          query TweetQuery {
            allTwitterStatusesUserTimelineHackersTweets {
              edges {
                node {
                  full_text
                  favorite_count
                  retweet_count
                  created_at
                  id
                  user {
                    name
                    url
                    profile_image_url_https
                    screen_name
                  }
                  entities{
                    urls {
                      display_url
                      expanded_url
                    }
                  }
                  retweeted_status {
                    user {
                      profile_image_url_https
                      url
                      screen_name
                      name
                    }
                    full_text
                  }
                }
              }
            }
          }`
        }
        render={data => <TwitterWidget data={data} {...props} />}
    />
)

export default TwitterQuery
