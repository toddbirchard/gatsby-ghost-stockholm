import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const SeriesTOC = ({ seriesPosts, postCount, currentPost }) => {
    const numberOfPosts = postCount + 1
    const listStyle = {
        counterReset: `li ${numberOfPosts}`,
    }

    return (
        <>
            { postCount ? <div className="series-posts">
                <ol style={listStyle}>
                    {seriesPosts.map(({ node }) => (
                        <li key={node.slug} className={ currentPost === node.slug ? `current-post` : null }><Link to={`/${ node.slug }`}>{node.title}</Link></li>
                    ))}
                </ol>
            </div> : null }
        </>
    )
}

SeriesTOC.propTypes = {
    seriesPosts: PropTypes.arrayOf(
        PropTypes.shape({
            slug: PropTypes.string,
            title: PropTypes.string,
        }),
    ),
    postCount: PropTypes.number,
    currentPost: PropTypes.string,
}

export default SeriesTOC
