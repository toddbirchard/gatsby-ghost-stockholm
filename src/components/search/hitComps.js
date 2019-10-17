import React, { Fragment } from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"
import { Tags } from "styled-icons/fa-solid/Tags"

export const PostHit = clickHandler => ({ hit }) => (
    <div>
        <Link to={`/blog` + hit.slug} onClick={clickHandler}>
            <h4> <Highlight attribute="title" hit={hit} tagName="mark" /> </h4>
        </Link>
        <div className="tag"> <Tags size="1em" />   {hit.primary_tag} </div>
        <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
)
