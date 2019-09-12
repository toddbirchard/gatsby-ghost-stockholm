import React from 'react'
import { Link } from 'gatsby'

const SeriesTOC = ({ seriesPosts, postCount, currentPost }) => {
    const numberOfPosts = postCount + 1
    const listStyle = {
        counterReset: `li ${numberOfPosts}`
    }

    return (
    <>
    { postCount ? <div className="series-posts">
        <ol className="series-posts" style={listStyle}>
            {seriesPosts.map(({ node }) => (
                <li key={node.slug} className={ currentPost === node.slug ? `current-post` : null }><Link to={node.slug}>{node.title}</Link></li>
            ))}
        </ol>
    </div> : null }
    </>
    )
}

export default SeriesTOC
