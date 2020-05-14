import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { FaTwitter, FaUsers, FaRetweet, FaHeartbeat, FaCalendar, FaReply } from 'react-icons/fa'

const TwitterWidget = ({ data }) => {
  const tweets = data.tweets.edges
  const twitterProfile = data.twitterProfile.user
  const twitterProfileURL = `https://twitter.com/${twitterProfile.screen_name}/`

  return (
    <>
      <div className="widget twitter">
        <div className="tweets">
          <div className="twitter-header">
            <FaTwitter className="twitter-avatar" />
            <div className="profile-details">
              <div className="profile-details">
                <a href={twitterProfileURL} className="twitter-name" target="_blank" rel="noopener noreferrer">{`@${twitterProfile.screen_name}`}</a>
                <div className="twitter-followers"><FaUsers /> <span>{twitterProfile.followers_count} Followers</span></div>
              </div>
            </div>
          </div>
          {tweets.map(({ node }) => (
            <div className="tweet" key={node.id}>

              {node.retweeted &&
                <div className="retweeted-tweet">
                  <div className="retweeted-header">
                    <FaRetweet /> <span>{`${node.user.name} retweeted`}</span>
                  </div>
                  <div className="retweeted-body">
                    <div className="tweet-header">
                      <div className="twitter-avatar">
                        <img className="lazyload" data-src={node.user.profile_image_url_https} alt="twitter-avatar" />
                      </div>
                      <a href={node.user.url} className="twitter-name" rel="nofollow noreferrer">@{node.user.screen_name}</a>
                    </div>
                    <p className="tweet-content">{node.full_text.split(`http`)[0]}</p>
                    {node.entities.urls &&
                      node.entities.urls.map(({ url }) => (
                        <a href={url} className="tweet-link" key={url} rel="nofollow noreferrer">{ url }</a>
                      ))}
                  </div>
                </div>}

              {node.in_reply_to_screen_name &&
                  <div className="reply-tweet">
                    <div className="retweeted-header">
                      <FaReply /> <span>{`Replying to @${node.in_reply_to_screen_name}`}</span>
                    </div>
                    <p className="tweet-content">{node.full_text.split(`#`)[0].split(`https`)[0]}</p>
                  </div>}

              {node.retweeted === false && node.in_reply_to_screen_name === false &&
                    <div>
                      <p className="tweet-content">{node.full_text.split(`#`)[0].split(`https`)[0]}</p>
                      {node.entities.hashtags.length > 0 ?
                        <div className="tweet-hastags">
                          {node.entities.hashtags.map(({ text }) => (
                            <a href={`https://twitter.com/hashtag/${text}`} key={`${node.id}-${text}`} className="hashtag" rel="nofollow noreferrer">#{text}</a>
                          ))}
                        </div>
                        : null}
                      {node.entities.urls.length > 0 ?
                        node.entities.urls.map(({ url }) => (
                          <a href={url} className="tweet-link" key={`${node.id}-link`} rel="nofollow noreferrer">{url}</a>
                        ))
                        : null}
                    </div>}

              <div className="tweet-footer">
                <div className="retweets meta-item"><FaRetweet /> <span className="meta-count">{node.retweet_count}</span></div>
                <div className="favorites meta-item"><FaHeartbeat /> <span className="meta-count">{node.favorite_count}</span></div>
                <div className="date meta-item"><FaCalendar /> <span className="meta-count">{node.created_at.split(` `, 3).join(` `)}</span></div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}

TwitterWidget.propTypes = {
  data: PropTypes.shape({
    tweets: PropTypes.shape({
      full_text: PropTypes.string,
      favorite_count: PropTypes.number,
      retweet_count: PropTypes.number,
      created_at: PropTypes.string,
      id: PropTypes.string,
      retweeted: PropTypes.bool,
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
    }).isRequired,
    twitterProfile: PropTypes.shape({
      user: PropTypes.shape({
        profile_image_url_https: PropTypes.string,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        display_url: PropTypes.string,
        screen_name: PropTypes.string.isRequired,
        followers_count: PropTypes.number.isRequired,
      }).isRequired,
    }),
  }),
}

const TwitterQuery = props => (
  <StaticQuery
    query={graphql`
      query TwitterQuery {
        tweets: allTwitterStatusesUserTimelineHackersTweets {
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
              user {
                profile_image_url_https
                url
                screen_name
                name
              }
              retweeted
              entities {
                user_mentions {
                  screen_name
                }
                hashtags {
                  text
                }
                urls {
                  url
                }
              }
              in_reply_to_screen_name
            }
          }
        }
        twitterProfile: twitterStatusesUserTimelineHackersTweets {
          user {
            url
            screen_name
            profile_image_url_https
            name
            followers_count
          }
        }
      }`
    }
    render={data => <TwitterWidget data={data} {...props} />}
  />
)

export default TwitterQuery
