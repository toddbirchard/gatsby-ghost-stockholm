import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { Form, Input } from "./SearchStyles"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default connectSearchBox(({ refine, ...rest }) => (
    <Form>
        <Input
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={e => refine(e.target.value)}
            {...rest}
        />
        
    </Form>
))
