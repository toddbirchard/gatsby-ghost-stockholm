import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const TwitterWidget = ({ twitter }) => {
    const tweets = twitter.allTwitterStatusesUserTimelineTweetQuery.edges
    const user = twitter.twitterStatusesUserTimelineTweetQuery.user

    return (
          <>
            <div className="widget twitter">
                <div className="twitter-header">
                    <img src={user.profile_image_url_https} className="twitter-avatar"/>
                    <div>
                        <a href={user.url} className="twitter-name">{user.name}</a>
                        <div className="twitter-user">@{user.screen_name}</div>
                    </div>
                </div>
                {tweets.map(({ node }) => (
                    <div className="tweet" key={node.favorite_count}>
                        <p className="tweet-content">{node.full_text.split(`#`)[0].split(`http`)[0]}</p>
                        <p className="tweet-hastags">{node.entities.hashtags.map(({ text }) => (
                            <a href={text} key={text} className="hashtag">#{text}</a>
                        ))}</p>
                        <div className="tweet-head">
                            {node.entities.urls.map(({ url }) => (
                                <a href={url} key={url} className="tweet-link">{ url }</a>
                            ))}
                            <span className="date">{node.created_at.split(` `, 3).join(` `)}</span>
                        </div>

                    </div>
                ))}
            </div>
          </>
    )
}

TwitterWidget.propTypes = {
    twitter: PropTypes.shape({
        full_text: PropTypes.string,
        favorite_count: PropTypes.number,
        retweet_count: PropTypes.number,
        created_at: PropTypes.string.isRequired,
        user: PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            profile_image_url: PropTypes.string.isRequired,
            screen_name: PropTypes.string.isRequired,
        }).isRequired,
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
    user: PropTypes.shape({
        profile_image_url_https: PropTypes.string,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        screen_name: PropTypes.string.isRequired,
    }).isRequired,
}

const TwitterQuery = props => (
    <StaticQuery
        query={graphql`
          query TwitterQuery {
            allTwitterStatusesUserTimelineTweetQuery {
              edges {
                node {
                  full_text
                  favorite_count
                  retweet_count
                  created_at
                  user {
                    name
                    url
                    profile_image_url
                    screen_name
                  }
                  entities {
                    urls {
                      url
                    }
                    hashtags {
                      text
                    }
                  }
                }
              }
            }
            twitterStatusesUserTimelineTweetQuery {
              user {
                profile_image_url_https
                name
                url
                screen_name
              }
            }
          }`
        }
        render={data => <TwitterWidget twitter={data} user={data} {...props} />}
    />
)

export default TwitterQuery
