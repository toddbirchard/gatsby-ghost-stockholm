import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Form, Input } from './styles'

export default connectSearchBox(({ refine, ...rest }) => (
    <Form className="search-form">
        <Input
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={e => refine(e.target.value)}
            {...rest}
        />
        <FontAwesomeIcon icon={[`far`, `search`]} size="xs" />
    </Form>
))
