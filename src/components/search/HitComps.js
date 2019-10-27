import React, { Fragment } from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"

const PostHit = clickHandler => ({ hit }) => (
    <div>
        <Link to={`/` + hit.slug} onClick={clickHandler}>
            <h4>
                <Highlight attribute="title" hit={hit} tagName="mark" />
            </h4>
        </Link>
        <div>
      &nbsp;
            <Highlight attribute="date" hit={hit} tagName="mark" />
      &emsp;
            {hit.tags.map((tag, index) => (
                <Fragment key={tag}>
                    {index > 0 && `, `}
                    {tag}
                </Fragment>
            ))}
        </div>
        <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
)

export default PostHit
