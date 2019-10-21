import React, { Fragment } from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"

export const PostHit = clickHandler => ({ hit }) => (
    <div>
        <Link to={hit.slug} onClick={clickHandler}>
            <h4>
                {hit.primary_tag}
            </h4>
        </Link>
        <div>
            <Highlight attribute="date" hit={hit} tagName="mark" />
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
