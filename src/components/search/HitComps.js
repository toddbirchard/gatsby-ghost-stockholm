import React, { Fragment } from "react"
import { connectHits } from "react-instantsearch-dom"
import { Link } from "gatsby"

const Hits = ({ hits }) => (
    <ol>
        {hits.map(hit => (
            <li key={hit.objectID}>{hit.name}</li>
        ))}
    </ol>
)

const PostHits = connectHits(Hits)

export default PostHits
