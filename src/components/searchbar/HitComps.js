import React, { Fragment } from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"

export const PostHit = clickHandler => ({ hit }) => (
    <div>
        <Link to={hit.slug} onClick={clickHandler}>
            <h4> {hit.title} </h4>
        </Link>
        <p>{hit.excerpt}</p>
        <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
)
