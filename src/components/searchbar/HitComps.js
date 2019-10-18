import React, { Fragment } from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"
import { Calendar } from "styled-icons/octicons/Calendar"
import { Tags } from "styled-icons/fa-solid/Tags"

export const PostHit = clickHandler => ({ hit }) => (
    <div>
        <Link to={hit.slug} onClick={clickHandler}>
            <h4>
                {hit.primary_tag}
            </h4>
        </Link>
        <div>
            <Calendar size="1em" />
            <Highlight attribute="date" hit={hit} tagName="mark" />
            <Tags size="1em" />
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
